#!/usr/bin/env node
/**
 * deckcraft style import — v0
 *
 * Reads a URL through a real browser, extracts computed styles + DOM geometry,
 * and writes a Deckcraft style card + generated theme. No screenshots yet.
 *
 * Usage:
 *   node skills/deckcraft/tools/style-import.mjs https://example.com --out ./style
 *   node skills/deckcraft/tools/style-import.mjs https://example.com --dark --viewport 1440x900
 *
 * Requires Node 22+ and a local Chrome/Chromium (or CHROME_PATH).
 */

import fs from 'node:fs/promises';
import fssync from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

const VERSION = '0.2.0';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── CLI ──────────────────────────────────────────────────────────────────

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    out: { type: 'string', default: './style' },
    viewport: { type: 'string', default: '1440x900' },
    dark: { type: 'boolean', default: false },
    light: { type: 'boolean', default: false },
    timeout: { type: 'string', default: '30000' },
    wait: { type: 'string', default: '800' },
    preview: { type: 'boolean', default: false },
    screenshots: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (values.help || positionals.length === 0) {
  console.log(`deckcraft style import v${VERSION}

Usage:
  node skills/deckcraft/tools/style-import.mjs <url> [options]

Options:
  --out <dir>         Output directory (default: ./style)
  --viewport <WxH>    Capture viewport (default: 1440x900)
  --dark              Emulate prefers-color-scheme: dark
  --light             Emulate prefers-color-scheme: light
  --timeout <ms>      Page load timeout (default: 30000)
  --wait <ms>         Extra wait after load for client-rendered pages (default: 800)
  --preview           Generate a sample deck in <out>/sample
  --screenshots       Save reference screenshots in <out>/reference
  -h, --help          Show this help

Requires Chrome/Chromium. Set CHROME_PATH if it is not in a standard location.
`);
  process.exit(0);
}

const targetUrl = positionals[0];
try {
  const parsed = new URL(targetUrl);
  if (!/^https?:$/.test(parsed.protocol)) throw new Error('Only http(s) URLs are supported.');
} catch (error) {
  console.error(`Invalid URL: ${targetUrl}`);
  process.exit(1);
}

const [viewportWidth, viewportHeight] = values.viewport
  .toLowerCase()
  .split('x')
  .map((n) => Number.parseInt(n, 10));

if (!viewportWidth || !viewportHeight) {
  console.error(`Invalid viewport: ${values.viewport}. Use WIDTHxHEIGHT, e.g. 1440x900.`);
  process.exit(1);
}

if (values.dark && values.light) {
  console.error('Use either --dark or --light, not both.');
  process.exit(1);
}

const timeoutMs = Number.parseInt(values.timeout, 10) || 30000;
const waitMs = Math.max(0, Number.parseInt(values.wait, 10) || 0);
const outDir = path.resolve(values.out);

// ─── Chrome discovery ─────────────────────────────────────────────────────

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  ].filter(Boolean);

  if (process.platform === 'darwin') {
    candidates.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    );
  } else if (process.platform === 'win32') {
    candidates.push(
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    );
  } else {
    candidates.push(
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/snap/bin/chromium',
    );
  }

  return candidates.find((candidate) => {
    try {
      return fssync.existsSync(candidate);
    } catch {
      return false;
    }
  });
}

// ─── Browser lifecycle ────────────────────────────────────────────────────

async function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

async function waitForDevtools(port, timeoutMs) {
  const started = Date.now();
  let lastError;

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return response.json();
    } catch (error) {
      lastError = error;
    }
    await sleep(150);
  }

  throw new Error(`Chrome did not expose a DevTools endpoint: ${lastError?.message ?? 'timeout'}`);
}

async function launchChrome(executable, port, profileDir) {
  const child = spawn(
    executable,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-background-networking',
      '--disable-extensions',
      '--disable-component-update',
      '--hide-scrollbars',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profileDir}`,
      `--window-size=${viewportWidth},${viewportHeight}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );

  let stderr = '';
  child.stderr?.on('data', (chunk) => {
    stderr += chunk.toString();
    if (stderr.length > 4000) stderr = stderr.slice(-4000);
  });

  try {
    await waitForDevtools(port, 15000);
  } catch (error) {
    child.kill('SIGKILL');
    throw new Error(`${error.message}\n${stderr}`);
  }

  return child;
}

async function getPageTarget(port) {
  const response = await fetch(`http://127.0.0.1:${port}/json`);
  const targets = await response.json();
  const page = targets.find((target) => target.type === 'page');
  if (!page?.webSocketDebuggerUrl) throw new Error('Chrome did not create a page target.');
  return page;
}

async function connectCdp(wsUrl) {
  if (typeof WebSocket === 'undefined') {
    throw new Error('This tool needs Node 22+ (global WebSocket).');
  }

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = () => reject(new Error('Could not connect to Chrome DevTools.'));
  });

  let nextId = 0;
  const pending = new Map();

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  };

  function send(method, params = {}, sessionId) {
    return new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      const payload = { id, method, params };
      if (sessionId) payload.sessionId = sessionId;
      ws.send(JSON.stringify(payload));
    });
  }

  return { ws, send };
}

async function waitFor(send, expression, timeout = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try {
      const result = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
      });
      if (result.result?.value) return true;
    } catch {
      // Page may be navigating.
    }
    await sleep(250);
  }
  return false;
}

// ─── In-page extraction ───────────────────────────────────────────────────
// Runs inside Chrome. Keep self-contained: no imports, no outer variables.

function extractPage() {
  const MAX_ELEMENTS = 5000;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = 1;
  colorCanvas.height = 1;
  const colorCtx = colorCanvas.getContext('2d', { willReadFrequently: true });
  const colorCache = new Map();

  function normalizeColor(input) {
    if (!input) return null;
    if (colorCache.has(input)) return colorCache.get(input);
    let result = null;
    try {
      colorCtx.clearRect(0, 0, 1, 1);
      colorCtx.fillStyle = '#000000';
      colorCtx.fillStyle = input;
      colorCtx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = colorCtx.getImageData(0, 0, 1, 1).data;
      const hex =
        '#' +
        [r, g, b]
          .map((value) => value.toString(16).padStart(2, '0'))
          .join('');
      result = { hex, r, g, b, a: Number((a / 255).toFixed(3)) };
    } catch {
      result = null;
    }
    colorCache.set(input, result);
    return result;
  }

  function isVisible(element) {
    const style = getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) {
      return false;
    }
    const rect = element.getBoundingClientRect();
    return rect.width > 1 && rect.height > 1;
  }

  function rectOf(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
  }

  function styleRecord(element) {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      tag: element.tagName.toLowerCase(),
      className:
        typeof element.className === 'string'
          ? element.className.trim().slice(0, 160)
          : element.getAttribute('class')?.slice(0, 160) ?? '',
      text: (element.innerText || element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 180),
      color: normalizeColor(style.color),
      backgroundColor: normalizeColor(style.backgroundColor),
      backgroundImage:
        style.backgroundImage && style.backgroundImage !== 'none'
          ? style.backgroundImage.slice(0, 220)
          : null,
      fontFamily: style.fontFamily,
      fontSize: Number.parseFloat(style.fontSize) || null,
      fontWeight: style.fontWeight,
      fontStyle: style.fontStyle,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      textTransform: style.textTransform,
      textAlign: style.textAlign,
      borderTopWidth: Number.parseFloat(style.borderTopWidth) || 0,
      borderTopStyle: style.borderTopStyle,
      borderTopColor: normalizeColor(style.borderTopColor),
      borderRadius: style.borderRadius,
      padding: style.padding,
      margin: style.margin,
      gap: style.gap,
      display: style.display,
      gridTemplateColumns: style.gridTemplateColumns,
      flexDirection: style.flexDirection,
      justifyContent: style.justifyContent,
      alignItems: style.alignItems,
      boxShadow: style.boxShadow === 'none' ? null : style.boxShadow.slice(0, 220),
      backdropFilter: style.backdropFilter === 'none' ? null : style.backdropFilter,
      maxWidth: style.maxWidth,
      opacity: style.opacity,
      rect: {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      },
    };
  }

  function firstVisible(selector, limit = 3) {
    return Array.from(document.querySelectorAll(selector))
      .filter(isVisible)
      .slice(0, limit)
      .map(styleRecord);
  }

  const samples = {
    body: firstVisible('body', 1),
    header: firstVisible('header', 1),
    nav: firstVisible('nav', 1),
    main: firstVisible('main', 2),
    section: firstVisible('section', 3),
    h1: firstVisible('h1', 3),
    h2: firstVisible('h2', 3),
    h3: firstVisible('h3', 3),
    p: firstVisible('p', 5),
    a: firstVisible('a', 5),
    button: firstVisible('button, [role="button"]', 3),
    code: firstVisible('code', 3),
    pre: firstVisible('pre', 2),
    card: firstVisible(
      '[class*="card"], [class*="Card"], article, [class*="tile"], [class*="panel"]',
      4,
    ),
    footer: firstVisible('footer', 1),
    label: firstVisible('label, [class*="label"], [class*="eyebrow"], [class*="kicker"]', 4),
  };

  const allElements = Array.from(document.querySelectorAll('body *')).slice(0, MAX_ELEMENTS);
  const palette = new Map();
  const accentCandidates = new Map();
  const motifs = new Map();
  const radii = new Map();
  const shadows = new Map();
  const spacings = new Map();
  let counted = 0;
  let borderCount = 0;
  let shadowCount = 0;
  let radiusCount = 0;
  let glassCount = 0;
  let uppercaseCount = 0;
  let gridCount = 0;
  let flexCount = 0;
  let imageCount = 0;
  let monoCount = 0;

  function addToMap(map, key, weight) {
    if (!key) return;
    const current = map.get(key) || 0;
    map.set(key, current + weight);
  }

  function addColor(color, weight) {
    if (!color || color.a < 0.08) return;
    addToMap(palette, color.hex, weight);
  }

  function addMotif(type, signature, sample, weight = 1) {
    const key = `${type}|${String(signature).slice(0, 90)}`;
    const current = motifs.get(key) || {
      type,
      signature: String(signature).slice(0, 120),
      sample: String(sample || '').slice(0, 200),
      count: 0,
      weight: 0,
    };
    current.count += 1;
    current.weight += weight;
    motifs.set(key, current);
  }

  for (const element of allElements) {
    if (!isVisible(element) || !(element instanceof HTMLElement)) continue;
    counted += 1;
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const area = Math.min(rect.width * rect.height, vw * vh) || 1;

    addColor(normalizeColor(style.backgroundColor), area);

    if (element.childElementCount === 0) {
      const textLength = (element.textContent || '').trim().length;
      if (textLength > 0) addColor(normalizeColor(style.color), Math.min(textLength, 600));
    }

    const borderWidth = Number.parseFloat(style.borderTopWidth) || 0;
    if (borderWidth > 0 && style.borderTopStyle !== 'none') {
      borderCount += 1;
      addColor(normalizeColor(style.borderTopColor), Math.min(area * 0.25, 4000));
    }

    if (style.boxShadow && style.boxShadow !== 'none') {
      shadowCount += 1;
      addToMap(shadows, style.boxShadow.slice(0, 220), 1);
    }

    if (style.borderRadius && style.borderRadius !== '0px') {
      radiusCount += 1;
      addToMap(radii, style.borderRadius, 1);
    }

    if (style.backdropFilter && style.backdropFilter !== 'none') glassCount += 1;
    if (style.textTransform === 'uppercase') uppercaseCount += 1;
    if (style.display === 'grid') gridCount += 1;
    if (style.display === 'flex') flexCount += 1;
    if (/mono|code|courier|consolas|menlo/i.test(style.fontFamily)) monoCount += 1;

    const backgroundImage = style.backgroundImage;
    if (backgroundImage && backgroundImage !== 'none') {
      if (/gradient\(/i.test(backgroundImage)) {
        addMotif('gradient', backgroundImage.slice(0, 90), backgroundImage, 2);
      } else if (/url\(/i.test(backgroundImage)) {
        addMotif('image-texture', 'background-image', 'background-image: url(...)', 1);
      }
      const patternSize =
        style.backgroundSize && !/cover|contain|100%|auto/i.test(style.backgroundSize);
      if (
        style.backgroundRepeat &&
        style.backgroundRepeat !== 'no-repeat' &&
        (/url\(|repeating-/i.test(backgroundImage) || patternSize)
      ) {
        addMotif('pattern', `${style.backgroundRepeat} ${style.backgroundSize}`, backgroundImage.slice(0, 120), 1);
      }
    }

    if (style.boxShadow && style.boxShadow !== 'none') {
      if (/(?:^|,\s*)0(?:px)?\s+0(?:px)?\s+\d+(?:\.\d+)?px/.test(style.boxShadow)) {
        addMotif('glow', 'zero-offset blur', style.boxShadow.slice(0, 160), 2);
      } else {
        addMotif('elevation', 'offset shadow', style.boxShadow.slice(0, 160), 1);
      }
    }

    if (borderWidth > 0 && style.borderTopStyle !== 'none') {
      if (style.borderTopStyle === 'dashed' || style.borderTopStyle === 'dotted') {
        addMotif('dashed-rule', style.borderTopStyle, `${style.borderTopWidth} ${style.borderTopStyle}`, 1);
      } else if (borderWidth <= 1.5) {
        addMotif('hairline-rule', '1px rule', `${style.borderTopWidth} solid`, 1);
      } else {
        addMotif('border', 'solid border', `${style.borderTopWidth} solid`, 1);
      }
    }

    const radiusValue = Number.parseFloat(style.borderRadius) || 0;
    if (radiusValue > 20) addMotif('pill', 'fully rounded', 'border-radius: 9999px', 1);
    else if (radiusValue > 0) addMotif('rounded-corner', 'rounded surface', style.borderRadius, 1);

    if (style.backdropFilter && style.backdropFilter !== 'none') {
      addMotif('glass', 'backdrop blur', style.backdropFilter, 2);
    }
    const blurMatch = style.filter && style.filter.match(/blur\(([\d.]+)px\)/i);
    if (blurMatch && Number(blurMatch[1]) > 0.5) {
      addMotif('blur', 'filter blur', style.filter, 1);
    }
    if (style.clipPath && style.clipPath !== 'none') {
      addMotif('clip-shape', 'clipped geometry', style.clipPath, 1);
    }
    if (style.maskImage && style.maskImage !== 'none') {
      addMotif('mask', 'masked geometry', style.maskImage, 1);
    }
    if (style.mixBlendMode && style.mixBlendMode !== 'normal') {
      addMotif('blend', 'blend mode', style.mixBlendMode, 1);
    }
    if (style.textShadow && style.textShadow !== 'none') {
      addMotif('text-glow', 'text shadow', style.textShadow.slice(0, 120), 1);
    }
    if (style.writingMode && style.writingMode !== 'horizontal-tb') {
      addMotif('vertical-type', 'vertical writing', style.writingMode, 1);
    }
    if (style.transform && style.transform !== 'none' && /rotate/i.test(style.transform)) {
      addMotif('rotated', 'rotated element', style.transform.slice(0, 120), 1);
    }
    if (style.position === 'fixed') addMotif('fixed-overlay', 'fixed layer', 'position: fixed', 1);
    if (style.position === 'sticky') addMotif('sticky-element', 'sticky layer', 'position: sticky', 1);
    if (
      /(auto|scroll)/.test(style.overflowX) &&
      element.scrollWidth > element.clientWidth + 4
    ) {
      addMotif('horizontal-scroll', 'horizontal overflow', 'overflow-x: scroll', 2);
    }

    const tag = element.tagName.toLowerCase();
    const className = typeof element.className === 'string' ? element.className : '';
    const looksLikeAccent =
      tag === 'a' ||
      tag === 'button' ||
      /(?:^|[\s_-])(?:accent|brand|primary|cta|btn|button|badge|pill|tag)(?:[\s_-]|$)/i.test(
        className,
      );
    if (looksLikeAccent) {
      addToMap(accentCandidates, normalizeColor(style.color)?.hex, 1);
      addToMap(accentCandidates, normalizeColor(style.backgroundColor)?.hex, 2);
    }

    for (const prop of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'gap']) {
      const value = Number.parseFloat(style[prop]);
      if (value > 0) addToMap(spacings, String(Math.round(value)), 1);
    }
  }

  imageCount = Array.from(document.querySelectorAll('img, picture, video, canvas')).filter(
    isVisible,
  ).length;

  const pseudoTargets = allElements
    .filter(
      (element) =>
        isVisible(element) &&
        (!element.textContent.trim() || element.getAttribute('aria-hidden') === 'true'),
    )
    .slice(0, 300);

  for (const element of pseudoTargets) {
    for (const pseudo of ['::before', '::after']) {
      let pseudoStyle;
      try {
        pseudoStyle = getComputedStyle(element, pseudo);
      } catch {
        continue;
      }
      if (!pseudoStyle || pseudoStyle.content === 'none' || pseudoStyle.content === 'normal') {
        continue;
      }

      const pseudoBg = pseudoStyle.backgroundImage;
      const pseudoColor = normalizeColor(pseudoStyle.backgroundColor);
      const pseudoBorder = Number.parseFloat(pseudoStyle.borderTopWidth) || 0;
      const hasVisual =
        (pseudoBg && pseudoBg !== 'none') ||
        (pseudoColor && pseudoColor.a > 0.05) ||
        pseudoBorder > 0 ||
        (pseudoStyle.clipPath && pseudoStyle.clipPath !== 'none') ||
        (pseudoStyle.maskImage && pseudoStyle.maskImage !== 'none');

      if (!hasVisual) continue;

      if (pseudoBg && /gradient\(/i.test(pseudoBg)) {
        addMotif('pseudo-gradient', pseudo, pseudoBg.slice(0, 160), 2);
      } else if (pseudoBg && /url\(/i.test(pseudoBg)) {
        addMotif('pseudo-image', pseudo, 'background-image: url(...)', 1);
      } else if (pseudoColor && pseudoColor.a > 0.05) {
        addMotif('pseudo-shape', pseudo, `background: ${pseudoColor.hex}`, 1);
      } else if (pseudoBorder > 0) {
        addMotif('pseudo-rule', pseudo, `${pseudoBorder}px ${pseudoStyle.borderTopStyle}`, 1);
      }

      if (pseudoStyle.boxShadow && pseudoStyle.boxShadow !== 'none') {
        addMotif('pseudo-shadow', pseudo, pseudoStyle.boxShadow.slice(0, 160), 1);
      }
    }
  }

  const svgCount = Array.from(document.querySelectorAll('svg')).filter(isVisible).length;
  if (svgCount > 4) {
    addMotif('inline-svg', 'icon or illustration system', `${svgCount} svg elements`, 1);
  }
  if (document.querySelector('linearGradient, radialGradient')) {
    addMotif('svg-gradient', 'gradient fills', 'linearGradient/radialGradient', 1);
  }

  function collectMotion() {
    const animations = [];
    const animationSeen = new Set();

    function summarizeFrames(frames) {
      return frames.slice(0, 12).map((frame) => {
        const out = { offset: frame.offset, easing: frame.easing };
        for (const key of [
          'opacity',
          'transform',
          'filter',
          'backgroundColor',
          'color',
          'width',
          'height',
          'clipPath',
        ]) {
          if (frame[key] != null) out[key] = String(frame[key]).slice(0, 140);
        }
        return out;
      });
    }

    let liveAnimations = [];
    try {
      liveAnimations = document.getAnimations ? document.getAnimations() : [];
    } catch {
      liveAnimations = [];
    }

    for (const animation of liveAnimations.slice(0, 100)) {
      const effect = animation.effect;
      if (!effect || typeof effect.getKeyframes !== 'function') continue;

      let timing;
      let frames;
      try {
        timing = effect.getTiming();
        frames = summarizeFrames(effect.getKeyframes());
      } catch {
        continue;
      }

      const properties = Array.from(
        new Set(
          frames.flatMap((frame) =>
            Object.keys(frame).filter((key) => key !== 'offset' && key !== 'easing'),
          ),
        ),
      );
      const name = String(
        animation.animationName || animation.transitionProperty || animation.id || 'animation',
      ).slice(0, 80);
      const key = `${name}|${timing.duration}|${timing.easing}|${JSON.stringify(frames)}`;
      if (animationSeen.has(key)) continue;
      animationSeen.add(key);

      const text = JSON.stringify(frames).toLowerCase();
      let type = 'animation';
      if (animation.constructor && animation.constructor.name === 'CSSTransition') type = 'transition';
      else if (/translate/.test(text)) type = 'slide';
      else if (/scale/.test(text)) type = 'scale';
      else if (/blur/.test(text)) type = 'blur';
      else if (/rotate/.test(text)) type = 'rotate';
      else if (/opacity/.test(text)) type = 'fade';
      if (timing.iterations === Infinity) type += '-loop';

      animations.push({
        type,
        name,
        duration: typeof timing.duration === 'number' ? Math.round(timing.duration) : timing.duration,
        delay: typeof timing.delay === 'number' ? Math.round(timing.delay) : timing.delay,
        easing: timing.easing,
        iterations: timing.iterations === Infinity ? 'infinite' : timing.iterations,
        properties,
        keyframes: frames,
      });
    }

    const keyframes = [];
    let reducedMotionSupport = false;
    function walkKeyframes(rules, depth = 0) {
      if (!rules || depth > 4) return;
      for (const rule of rules) {
        try {
          if (
            rule.type === CSSRule.MEDIA_RULE &&
            /prefers-reduced-motion/i.test(rule.conditionText || rule.media?.mediaText || '')
          ) {
            reducedMotionSupport = true;
          }
          if (rule.type === CSSRule.KEYFRAMES_RULE) {
            keyframes.push({
              name: rule.name,
              frames: Array.from(rule.cssRules).slice(0, 8).map((frame) => ({
                offset: frame.keyText,
                css: frame.style.cssText.slice(0, 180),
              })),
            });
          }
          if (rule.cssRules) walkKeyframes(rule.cssRules, depth + 1);
        } catch {
          // Ignore inaccessible rules.
        }
      }
    }
    for (const sheet of document.styleSheets) {
      try {
        walkKeyframes(sheet.cssRules);
      } catch {
        // Cross-origin or restricted stylesheet.
      }
    }

    const transitions = new Map();
    for (const element of allElements.slice(0, 1200)) {
      const style = getComputedStyle(element);
      if (!style.transitionDuration || style.transitionDuration === '0s') continue;
      const key = `${style.transitionProperty}|${style.transitionDuration}|${style.transitionTimingFunction}`;
      transitions.set(key, (transitions.get(key) || 0) + 1);
    }

    const libraries = new Set();
    const sources = Array.from(document.scripts)
      .map((script) => script.src)
      .join(' ')
      .toLowerCase();
    for (const [name, pattern] of [
      ['gsap', /gsap|scrolltrigger/],
      ['framer-motion', /framer-motion|framer\.com/],
      ['motion', /motion-one|@motion/],
      ['anime.js', /animejs|anime\.min/],
      ['lenis', /lenis/],
      ['swiper', /swiper/],
    ]) {
      if (pattern.test(sources)) libraries.add(name);
    }
    if (window.gsap || window.ScrollTrigger) libraries.add('gsap');
    if (window.anime) libraries.add('anime.js');
    if (window.Lenis) libraries.add('lenis');

    const scrollDriven = allElements.filter((element) => {
      try {
        const timeline = getComputedStyle(element).animationTimeline;
        return timeline && timeline !== 'auto' && timeline !== 'none';
      } catch {
        return false;
      }
    }).length;

    return {
      animations: animations.slice(0, 12),
      keyframes: keyframes.slice(0, 16),
      transitions: Array.from(transitions.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([key, count]) => {
          const [property, duration, easing] = key.split('|');
          return { property, duration, easing, count };
        }),
      libraries: Array.from(libraries),
      scrollDriven,
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      reducedMotionSupport,
    };
  }

  function detectLayouts() {
    const results = [];
    const seen = new Set();
    const candidates = Array.from(
      document.querySelectorAll(
        'main, header, section, article, [class*="hero"], [class*="grid"], [class*="bento"], [class*="feature"]',
      ),
    )
      .filter((element) => element instanceof HTMLElement && isVisible(element))
      .slice(0, 120);

    function addLayout(type, element, rect, details) {
      const key = `${type}|${Math.round(rect.width / 50)}|${Math.round(rect.height / 50)}|${details.childCount}`;
      if (seen.has(key)) return;
      seen.add(key);
      const className =
        typeof element.className === 'string' ? element.className.trim().slice(0, 60) : '';
      results.push({
        type,
        selector: `${element.tagName.toLowerCase()}${className ? `.${className.split(/\s+/)[0]}` : ''}`,
        rect: {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        ...details,
      });
    }

    for (const element of candidates) {
      const rect = element.getBoundingClientRect();
      if (rect.width < 280 || rect.height < 140) continue;

      const style = getComputedStyle(element);
      const className = typeof element.className === 'string' ? element.className : '';
      const isFirstMainChild =
        element.parentElement?.tagName === 'MAIN' &&
        element.parentElement.firstElementChild === element;
      const isHeroLike = /hero/i.test(className) || isFirstMainChild;
      const isGridLike = style.display === 'grid' || style.display === 'flex';
      const children = Array.from(element.children)
        .filter(isVisible)
        .map((child) => {
          const childRect = child.getBoundingClientRect();
          const childStyle = getComputedStyle(child);
          return {
            x: childRect.x,
            y: childRect.y,
            width: childRect.width,
            height: childRect.height,
            position: childStyle.position,
          };
        });

      const details = {
        childCount: children.length,
        rows: 0,
        columns: 0,
        ratio: 1,
        gap: style.gap,
      };

      if (children.length < 2) {
        if (rect.width < vw * 0.62) addLayout('narrow-measure', element, rect, details);
        continue;
      }

      const overlapY = (a, b) =>
        Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y) >
        Math.min(a.height, b.height) * 0.55;

      let sideBySide = false;
      let minWidth = Infinity;
      let maxWidth = 0;
      for (let i = 0; i < children.length; i += 1) {
        const a = children[i];
        minWidth = Math.min(minWidth, a.width);
        maxWidth = Math.max(maxWidth, a.width);
        for (let j = i + 1; j < children.length; j += 1) {
          const b = children[j];
          if (overlapY(a, b) && Math.abs(a.x - b.x) > 20) sideBySide = true;
        }
      }

      const columns = new Set(children.map((child) => Math.round(child.x / 40))).size;
      const rows = new Set(children.map((child) => Math.round(child.y / 40))).size;
      const widthRatio = minWidth > 0 ? maxWidth / minWidth : 1;
      const areas = children.map((child) => child.width * child.height);
      const areaRatio = Math.max(...areas) / Math.max(Math.min(...areas), 1);

      details.rows = rows;
      details.columns = columns;
      details.ratio = Math.round(widthRatio * 100) / 100;

      if (sideBySide) {
        addLayout(widthRatio > 1.5 ? 'asymmetric-split' : 'split', element, rect, details);
      }
      if (isGridLike && children.length >= 3 && (columns > 1 || rows > 1)) {
        addLayout('grid', element, rect, details);
      }
      if (isGridLike && children.length >= 3 && areaRatio > 2.5) {
        addLayout('bento', element, rect, details);
      }
      if (isGridLike && children.length >= 3 && rows === 1 && maxWidth < 260) {
        addLayout('steps', element, rect, details);
      }
      if (rect.width < vw * 0.62) {
        addLayout('narrow-measure', element, rect, details);
      }
      if (isHeroLike && rect.height > vh * 0.45 && rect.top < vh * 0.3) {
        addLayout('hero', element, rect, details);
      }
      if (style.position === 'sticky') {
        addLayout('sticky', element, rect, details);
      }
      if (element.scrollWidth > element.clientWidth + 4) {
        addLayout('horizontal-scroll', element, rect, details);
      }
      if (
        (rect.width < vw * 0.8 || style.textAlign === 'center') &&
        children.every(
          (child) => Math.abs(child.x + child.width / 2 - (rect.x + rect.width / 2)) < 24,
        )
      ) {
        addLayout('centered', element, rect, details);
      }
    }

    return results.slice(0, 12);
  }

  // Sample the page corners to approximate the real canvas color, including
  // layouts where the background lives on a wrapper instead of <body>.
  function canvasColorAt(x, y) {
    let element = document.elementFromPoint(x, y);
    while (element) {
      const color = normalizeColor(getComputedStyle(element).backgroundColor);
      if (color && color.a > 0.5) return color;
      element = element.parentElement;
    }
    return normalizeColor(getComputedStyle(document.body).backgroundColor);
  }

  const cornerColors = new Map();
  for (const [x, y] of [
    [8, 8],
    [vw - 8, 8],
    [8, vh - 8],
    [vw - 8, vh - 8],
    [vw / 2, vh / 2],
  ]) {
    const color = canvasColorAt(x, y);
    if (color && color.a > 0.5) addToMap(cornerColors, color.hex, 1);
  }

  function sortedEntries(map, limit = 20) {
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([value, weight]) => ({ value, weight: Math.round(weight * 100) / 100 }));
  }

  function collectRootVars() {
    const vars = new Map();
    function walk(rules, depth = 0) {
      if (!rules || depth > 4) return;
      for (const rule of rules) {
        try {
          if (rule.type === CSSRule.STYLE_RULE && /(^|,)\s*(:root|html)\b/.test(rule.selectorText)) {
            for (const prop of rule.style) {
              if (prop.startsWith('--')) {
                vars.set(prop, rule.style.getPropertyValue(prop).trim().slice(0, 240));
              }
            }
          }
          if (rule.cssRules) walk(rule.cssRules, depth + 1);
        } catch {
          // Ignore inaccessible rules.
        }
      }
    }

    for (const sheet of document.styleSheets) {
      try {
        walk(sheet.cssRules);
      } catch {
        // Cross-origin or restricted stylesheet.
      }
    }

    return Object.fromEntries(Array.from(vars.entries()).slice(0, 300));
  }

  const bodyStyle = getComputedStyle(document.body);
  const mainElement = document.querySelector('main') || document.body;
  const mainRect = mainElement.getBoundingClientRect();
  const headings = samples.h1;
  const bodySamples = samples.p;
  const codeSamples = samples.code.concat(samples.pre);

  const paragraphWidths = bodySamples
    .map((sample) => sample.rect?.width)
    .filter((width) => width > 0)
    .sort((a, b) => a - b);
  const textMeasure =
    paragraphWidths.length > 0
      ? Math.round(paragraphWidths[Math.floor(paragraphWidths.length / 2)])
      : Math.round(mainRect.width);

  const textLength = (document.body.innerText || '').trim().length;
  const viewportCount = Math.max(document.documentElement.scrollHeight / vh, 1);
  const charsPerViewport = Math.round(textLength / viewportCount);

  const metaDescription = document.querySelector('meta[name="description"]')?.content ?? '';
  const themeColor = document.querySelector('meta[name="theme-color"]')?.content ?? '';

  const rootVars = collectRootVars();
  const rootColorVars = Object.fromEntries(
    Object.entries(rootVars)
      .filter(([name, value]) => /accent|brand|primary|link|cta/i.test(name) && value)
      .map(([name, value]) => [name, normalizeColor(value)?.hex])
      .filter(([, value]) => Boolean(value)),
  );

  const motifList = Array.from(motifs.values())
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 16)
    .map((motif) => ({
      type: motif.type,
      signature: motif.signature,
      sample: motif.sample,
      count: motif.count,
      weight: Math.round(motif.weight * 100) / 100,
    }));

  return {
    meta: {
      url: location.href,
      title: document.title,
      description: metaDescription,
      siteName: document.querySelector('meta[property="og:site_name"]')?.content ?? '',
      themeColor,
      themeColorNormalized: normalizeColor(themeColor),
      viewport: { width: vw, height: vh },
      capturedAt: new Date().toISOString(),
      colorScheme: bodyStyle.colorScheme || getComputedStyle(document.documentElement).colorScheme || '',
      prefersDark: matchMedia('(prefers-color-scheme: dark)').matches,
      scrollHeight: document.documentElement.scrollHeight,
      textLength,
    },
    canvas: {
      color: normalizeColor(bodyStyle.backgroundColor),
      backgroundImage:
        bodyStyle.backgroundImage && bodyStyle.backgroundImage !== 'none'
          ? bodyStyle.backgroundImage.slice(0, 220)
          : null,
      cornerColors: sortedEntries(cornerColors, 5),
    },
    palette: sortedEntries(palette, 24),
    accentCandidates: sortedEntries(accentCandidates, 20),
    motifs: motifList,
    motion: collectMotion(),
    layouts: detectLayouts(),
    typography: {
      bodyFamily: bodySamples[0]?.fontFamily ?? bodyStyle.fontFamily,
      displayFamily: headings[0]?.fontFamily ?? bodySamples[0]?.fontFamily ?? bodyStyle.fontFamily,
      monoFamily:
        codeSamples[0]?.fontFamily ??
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      loadedFonts: Array.from(document.fonts || [])
        .map((font) => font.family)
        .filter(Boolean),
      bodySize: bodySamples[0]?.fontSize ?? null,
      bodyLineHeight: bodySamples[0]?.lineHeight ?? null,
      headingSize: headings[0]?.fontSize ?? null,
      headingWeight: headings[0]?.fontWeight ?? null,
      headingStyle: headings[0]?.fontStyle ?? null,
      headingTracking: headings[0]?.letterSpacing ?? null,
      sizes: {
        h1: headings[0]?.fontSize ?? null,
        h2: samples.h2[0]?.fontSize ?? null,
        h3: samples.h3[0]?.fontSize ?? null,
        body: bodySamples[0]?.fontSize ?? null,
        small: samples.p[1]?.fontSize ?? null,
      },
    },
    layout: {
      contentWidth: textMeasure,
      mainWidth: Math.round(mainRect.width),
      maxWidths: firstVisible(
        'main, article, [class*="container"], [class*="Container"], [class*="wrapper"]',
        5,
      )
        .map((item) => item.maxWidth)
        .filter((value) => value && value !== 'none'),
      textAlign: bodySamples[0]?.textAlign ?? bodyStyle.textAlign,
      gridCount,
      flexCount,
      monoCount,
      borderCount,
      shadowCount,
      radiusCount,
      glassCount,
      uppercaseCount,
      imageCount,
      charsPerViewport,
      density:
        charsPerViewport > 3500 ? 'compact' : charsPerViewport < 1200 ? 'airy' : 'balanced',
    },
    surfaces: {
      radii: sortedEntries(radii, 8),
      shadows: sortedEntries(shadows, 8),
      spacings: sortedEntries(spacings, 12),
      cardBg: samples.card[0]?.backgroundColor ?? null,
      cardBorder: samples.card[0]?.borderTopColor ?? null,
      cardRadius: samples.card[0]?.borderRadius ?? null,
      cardShadow: samples.card[0]?.boxShadow ?? null,
      cardBackdropFilter: samples.card[0]?.backdropFilter ?? null,
    },
    samples,
    rootVars,
    rootColorVars,
  };
}

// ─── Color utilities ──────────────────────────────────────────────────────

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  const full =
    value.length === 3
      ? value
          .split('')
          .map((char) => char + char)
          .join('')
      : value;
  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
  return (
    '#' +
    [r, g, b]
      .map((value) => clamp(value).toString(16).padStart(2, '0'))
      .join('')
  );
}

function rgbToHsl({ r, g, b }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = ((gn - bn) / delta) % 6;
        break;
      case gn:
        h = (bn - rn) / delta + 2;
        break;
      default:
        h = (rn - gn) / delta + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h, s, l };
}

function hslToRgb({ h, s, l }) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rp = 0;
  let gp = 0;
  let bp = 0;

  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];

  return {
    r: (rp + m) * 255,
    g: (gp + m) * 255,
    b: (bp + m) * 255,
  };
}

function mix(a, b, amount) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return rgbToHex({
    r: ca.r + (cb.r - ca.r) * amount,
    g: ca.g + (cb.g - ca.g) * amount,
    b: ca.b + (cb.b - ca.b) * amount,
  });
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const channel = (value) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function ensureContrast(color, background, minimum = 4.5) {
  if (contrast(color, background) >= minimum) return color;
  const hsl = rgbToHsl(hexToRgb(color));
  const bgLum = luminance(background);
  const direction = bgLum > 0.5 ? -1 : 1;
  let best = color;

  for (let step = 0; step < 40; step += 1) {
    hsl.l = Math.max(0, Math.min(1, hsl.l + direction * 0.025));
    best = rgbToHex(hslToRgb(hsl));
    if (contrast(best, background) >= minimum) return best;
  }

  return direction > 0 ? '#f5f2f8' : '#16141c';
}

function saturate(hex) {
  const hsl = rgbToHsl(hexToRgb(hex));
  return hsl.s;
}

function normalizeFontStack(stack, generic) {
  if (!stack) return generic;
  const lower = stack.toLowerCase();
  const hasGeneric = /(?:sans-serif|serif|monospace|cursive|fantasy|system-ui|ui-)/.test(lower);
  return hasGeneric ? stack : `${stack}, ${generic}`;
}

const GOOGLE_FONTS = new Set([
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Source Sans 3',
  'Source Sans Pro',
  'IBM Plex Sans',
  'IBM Plex Mono',
  'JetBrains Mono',
  'Space Grotesk',
  'DM Sans',
  'Manrope',
  'Work Sans',
  'Fira Sans',
  'Fira Code',
  'Noto Sans',
  'Playfair Display',
  'DM Serif Display',
  'Merriweather',
  'Libre Baskerville',
  'Lora',
  'Poppins',
  'Nunito',
  'Rubik',
  'Outfit',
]);

function fontFamilies(stack) {
  return String(stack || '')
    .split(',')
    .map((family) => family.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
}

function googleFontImport(...stacks) {
  const families = Array.from(
    new Set(stacks.flatMap((stack) => fontFamilies(stack)).filter((family) => GOOGLE_FONTS.has(family))),
  );
  if (families.length === 0) return null;

  const query = families
    .map((family) => `family=${family.replace(/ /g, '+')}:wght@300;400;500;600;700`)
    .join('&');
  return `@import url('https://fonts.googleapis.com/css2?${query}&display=swap');`;
}

function pickCanvas(data, isDark) {
  const candidates = [
    data.canvas?.color,
    ...(data.canvas?.cornerColors ?? []).map((entry) => ({ hex: entry.value, a: 1 })),
  ].filter((entry) => entry && entry.a > 0.5);

  if (candidates.length > 0) {
    const counts = new Map();
    for (const candidate of candidates) {
      counts.set(candidate.hex, (counts.get(candidate.hex) ?? 0) + (candidate.a ?? 1));
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0][0];
  }

  return isDark ? '#141218' : '#fbfaf8';
}

function pickForeground(data, canvas) {
  const bodyColor = data.samples?.body?.[0]?.color?.hex;
  const paragraphColor = data.samples?.p?.[0]?.color?.hex;
  const candidates = [bodyColor, paragraphColor].filter(Boolean);
  const valid = candidates.filter((color) => contrast(color, canvas) >= 4.5);
  if (valid.length > 0) return valid[0];

  const palette = (data.palette ?? [])
    .map((entry) => entry.value)
    .filter((color) => contrast(color, canvas) >= 4.5)
    .sort((a, b) => contrast(b, canvas) - contrast(a, canvas));

  return palette[0] ?? ensureContrast(canvas, canvas, 4.5);
}

function pickAccent(data, canvas, foreground) {
  const seeds = [];

  const themeColor = data.meta?.themeColorNormalized?.hex;
  if (themeColor) seeds.push({ value: themeColor, source: 'theme-color', weight: 1000 });

  for (const [name, value] of Object.entries(data.rootColorVars ?? {})) {
    if (/accent|brand|primary|link|cta/i.test(name)) {
      seeds.push({ value, source: name, weight: 200 });
    }
  }

  for (const entry of data.accentCandidates ?? []) {
    seeds.push({ value: entry.value, source: 'accent-candidate', weight: entry.weight + 50 });
  }

  for (const entry of data.palette ?? []) {
    seeds.push({ value: entry.value, source: 'palette', weight: entry.weight });
  }

  const scored = seeds
    .map((entry) => ({ ...entry, saturation: saturate(entry.value), contrast: contrast(entry.value, canvas) }))
    .filter(
      (entry) =>
        entry.value.toLowerCase() !== foreground.toLowerCase() &&
        entry.saturation > 0.18 &&
        entry.contrast > 2.2,
    )
    .sort((a, b) => {
      const sourceBonus = (source) =>
        source === 'theme-color'
          ? 3
          : source === 'accent-candidate'
            ? 1
            : source === 'palette'
              ? 0
              : 2;
      const score = (entry) =>
        sourceBonus(entry.source) +
        entry.saturation * 1.8 +
        Math.min(entry.contrast, 8) * 0.2 +
        Math.log10(entry.weight + 1);
      return score(b) - score(a);
    });

  if (scored.length > 0) return ensureContrast(scored[0].value, canvas, 3);

  const linkColor = data.samples?.a?.[0]?.color?.hex;
  if (linkColor && contrast(linkColor, canvas) >= 3) return linkColor;

  return ensureContrast(foreground, canvas, 3);
}

function pickRadius(data) {
  const cardRadius = Number.parseFloat(data.surfaces?.cardRadius) || 0;
  if (cardRadius > 0) return Math.min(cardRadius, 24);

  const radii = (data.surfaces?.radii ?? [])
    .map((entry) => ({ ...entry, px: Number.parseFloat(entry.value) || 0 }))
    .filter((entry) => entry.px > 0)
    .sort((a, b) => b.weight - a.weight);
  const radius = radii[0]?.px ?? 0;
  return Math.min(radius, 16);
}

// ─── Style card + theme generation ────────────────────────────────────────

function summarizeMotion(data) {
  const raw = data.motion ?? {};
  const animations = raw.animations ?? [];
  const labels = new Set();

  for (const animation of animations) {
    const type = String(animation.type || '');
    if (type.includes('slide')) labels.add('slide-in reveals');
    if (type.includes('fade')) labels.add('fade-in reveals');
    if (type.includes('scale')) labels.add('scale-in reveals');
    if (type.includes('blur')) labels.add('blur-in reveals');
    if (type.includes('rotate')) labels.add('rotating accents');
    if (type.includes('loop')) labels.add('ambient loops');
    if (type.includes('transition')) labels.add('hover transitions');
  }
  if (raw.scrollDriven > 0) labels.add('scroll-driven motion');
  if ((raw.libraries ?? []).length > 0) labels.add(`JS motion (${raw.libraries.join(', ')})`);

  return {
    animations: animations.slice(0, 8).map((animation) => ({
      type: animation.type,
      name: animation.name,
      duration: animation.duration,
      delay: animation.delay,
      easing: animation.easing,
      iterations: animation.iterations,
      properties: animation.properties,
    })),
    keyframes: (raw.keyframes ?? []).slice(0, 8),
    transitions: (raw.transitions ?? []).slice(0, 6),
    libraries: raw.libraries ?? [],
    scrollDriven: raw.scrollDriven ?? 0,
    reducedMotion: raw.reducedMotionSupport || raw.reducedMotion || false,
    reducedMotionSupport: raw.reducedMotionSupport ?? false,
    prefersReducedMotion: raw.reducedMotion ?? false,
    summary: Array.from(labels),
  };
}

function buildStyleCard(data) {
  const isDark = luminance(pickCanvas(data, false)) < 0.25;
  const canvas = pickCanvas(data, isDark);
  const foreground = pickForeground(data, canvas);
  const accent = pickAccent(data, canvas, foreground);
  const muted = ensureContrast(mix(foreground, canvas, 0.58), canvas, 4.5);
  const border = mix(canvas, foreground, 0.18);
  const radius = pickRadius(data);
  const glassBlur = data.surfaces?.cardBackdropFilter ?? null;
  const shadow = data.surfaces?.cardShadow ?? null;
  const motion = summarizeMotion(data);
  const motifList = data.motifs ?? [];
  const layouts = data.layouts ?? [];

  const signatureMoves = [];
  const baseSize = data.typography?.bodySize || 16;
  const headingSize = data.typography?.headingSize || baseSize * 2.5;

  if (headingSize / baseSize >= 2.6) signatureMoves.push('oversized display type');
  if (data.layout?.uppercaseCount > 3) signatureMoves.push('uppercase labels');
  if (data.layout?.glassCount > 1 || glassBlur) signatureMoves.push('translucent surfaces');
  if (radius >= 12 && data.layout?.radiusCount > 4) signatureMoves.push('rounded cards');
  if (data.layout?.borderCount > data.layout?.shadowCount * 1.5) signatureMoves.push('hairline rules');
  if (isDark) signatureMoves.push('dark canvas');
  if (data.layout?.imageCount > 5) signatureMoves.push('image-led');
  if (data.layout?.monoCount > 2) signatureMoves.push('mono accents');
  if (saturate(accent) > 0.55) signatureMoves.push('saturated accent');
  if (data.layout?.density === 'airy') signatureMoves.push('generous whitespace');
  if (data.layout?.density === 'compact') signatureMoves.push('dense information');
  if (data.layout?.contentWidth && data.layout.contentWidth < data.meta.viewport.width * 0.72) {
    signatureMoves.push('narrow measure');
  }

  const motifTypes = new Set(motifList.map((motif) => motif.type));
  if (motifTypes.has('gradient') || motifTypes.has('pseudo-gradient')) {
    signatureMoves.push('gradient fields');
  }
  if (motifTypes.has('glow') || motifTypes.has('pseudo-shadow')) {
    signatureMoves.push('soft glow');
  }
  if (motifTypes.has('pattern') || motifTypes.has('image-texture') || motifTypes.has('pseudo-image')) {
    signatureMoves.push('textured surfaces');
  }
  if (motifTypes.has('inline-svg') || motifTypes.has('svg-gradient')) {
    signatureMoves.push('illustrated accents');
  }
  if (motion.summary.length > 0) {
    signatureMoves.push('motion-led');
  }

  const layoutTypes = new Set(layouts.map((layout) => layout.type));
  if (layoutTypes.has('asymmetric-split') || layoutTypes.has('split')) {
    signatureMoves.push('split composition');
  }
  if (layoutTypes.has('grid') || layoutTypes.has('bento')) {
    signatureMoves.push('modular grid');
  }
  if (layoutTypes.has('centered')) {
    signatureMoves.push('centered statements');
  }

  return {
    version: 1,
    tool: `deckcraft-style@${VERSION}`,
    source: data.meta,
    mode: {
      theme: isDark ? 'dark' : 'light',
      density: data.layout?.density ?? 'balanced',
      surface: glassBlur
        ? 'glass'
        : radius >= 12 && data.layout?.radiusCount > 4
          ? 'rounded cards'
          : shadow && shadow !== 'none'
            ? 'soft elevation'
            : 'flat',
    },
    palette: {
      canvas,
      foreground,
      muted,
      border,
      accent,
      card:
        data.surfaces?.cardBg && data.surfaces.cardBg.a > 0.5
          ? data.surfaces.cardBg.hex
          : mix(canvas, foreground, 0.04),
      cardBorder:
        data.surfaces?.cardBorder && data.surfaces.cardBorder.a > 0.2
          ? data.surfaces.cardBorder.hex
          : border,
      codeBg: mix(canvas, foreground, 0.06),
      codeFg: foreground,
    },
    typography: {
      displayFamily: data.typography?.displayFamily ?? data.typography?.bodyFamily,
      bodyFamily: data.typography?.bodyFamily,
      monoFamily: data.typography?.monoFamily,
      loadedFonts: Array.from(new Set(data.typography?.loadedFonts ?? [])).slice(0, 20),
      sizes: data.typography?.sizes ?? {},
      headingWeight: data.typography?.headingWeight ?? '600',
      headingStyle: data.typography?.headingStyle ?? 'normal',
      headingTracking: data.typography?.headingTracking ?? 'normal',
    },
    composition: {
      contentWidth: data.layout?.contentWidth ?? null,
      textAlign: data.layout?.textAlign ?? 'start',
      gridCount: data.layout?.gridCount ?? 0,
      flexCount: data.layout?.flexCount ?? 0,
      monoCount: data.layout?.monoCount ?? 0,
      borderCount: data.layout?.borderCount ?? 0,
      shadowCount: data.layout?.shadowCount ?? 0,
      radiusCount: data.layout?.radiusCount ?? 0,
      glassCount: data.layout?.glassCount ?? 0,
      imageCount: data.layout?.imageCount ?? 0,
      charsPerViewport: data.layout?.charsPerViewport ?? 0,
    },
    surfaces: {
      radius,
      shadow: shadow ?? 'none',
      glassBlur: glassBlur ?? 'none',
      spacings: data.surfaces?.spacings ?? [],
    },
    motifs: motifList.slice(0, 12).map((motif) => ({
      type: motif.type,
      signature: motif.signature,
      sample: motif.sample,
      count: motif.count,
    })),
    motifTypes: Array.from(motifTypes),
    motion,
    layouts: layouts.slice(0, 8).map((layout) => ({
      type: layout.type,
      selector: layout.selector,
      rect: layout.rect,
      childCount: layout.childCount,
      rows: layout.rows,
      columns: layout.columns,
      ratio: layout.ratio,
      gap: layout.gap,
    })),
    layoutTypes: Array.from(layoutTypes),
    signatureMoves,
    caveats: [
      'Extracted from a single page at one viewport. Sample more pages for a fuller system.',
      'The generated theme uses the captured color mode. Run again with --dark or --light for another mode.',
      'Computed styles are a snapshot; JS, A/B tests, and responsive states may differ.',
      data.canvas?.backgroundImage
        ? 'The reference uses a background image or gradient; the canvas color is an approximation.'
        : null,
      'Fonts may be commercially licensed. Verify before redistributing or embedding.',
      'Logos, images, and illustrations are not copied.',
    ].filter(Boolean),
    raw: data,
  };
}

function buildBrief(card) {
  const { palette, typography, composition, mode } = card;
  const lines = [];

  lines.push(`# Style card — ${card.source.title || new URL(card.source.url).hostname}`);
  lines.push('');
  lines.push(`Source: ${card.source.url}`);
  lines.push(`Captured: ${card.source.capturedAt} at ${card.source.viewport.width}×${card.source.viewport.height}`);
  lines.push(`Mode: ${mode.theme} · ${mode.density} · ${mode.surface}`);
  lines.push('');

  lines.push('## Palette');
  lines.push('');
  lines.push(`- Canvas: \`${palette.canvas}\``);
  lines.push(`- Foreground: \`${palette.foreground}\``);
  lines.push(`- Muted: \`${palette.muted}\``);
  lines.push(`- Border: \`${palette.border}\``);
  lines.push(`- Accent: \`${palette.accent}\``);
  lines.push(`- Card: \`${palette.card}\``);
  lines.push('');

  lines.push('## Typography');
  lines.push('');
  lines.push(`- Display: ${typography.displayFamily}`);
  lines.push(`- Body: ${typography.bodyFamily}`);
  lines.push(`- Mono: ${typography.monoFamily}`);
  lines.push(
    `- Headings: ${typography.headingWeight}, ${typography.headingStyle}, tracking ${typography.headingTracking}`,
  );
  const sizes = typography.sizes || {};
  const sizeBits = ['h1', 'h2', 'h3', 'body'].filter((key) => sizes[key]).map((key) => `${key} ${sizes[key]}px`);
  if (sizeBits.length > 0) lines.push(`- Reference sizes: ${sizeBits.join(', ')}`);
  if (typography.loadedFonts.length > 0) {
    lines.push(`- Loaded fonts: ${typography.loadedFonts.join(', ')}`);
  }
  lines.push('');

  if (card.screenshots?.length) {
    lines.push('## Reference screenshots');
    lines.push('');
    for (const screenshot of card.screenshots) lines.push(`- \`${screenshot}\``);
    lines.push('');
  }

  lines.push('## Composition');
  lines.push('');
  lines.push(`- Content width: ${composition.contentWidth ?? 'unknown'}px`);
  lines.push(`- Density: ${mode.density} (${composition.charsPerViewport} chars/viewport)`);
  lines.push(`- Grid containers: ${composition.gridCount}; flex containers: ${composition.flexCount}`);
  lines.push(`- Borders: ${composition.borderCount}; shadows: ${composition.shadowCount}; rounded elements: ${composition.radiusCount}`);
  lines.push(`- Images/media: ${composition.imageCount}`);
  lines.push('');

  if (card.signatureMoves.length > 0) {
    lines.push('## Signature moves');
    lines.push('');
    for (const move of card.signatureMoves) lines.push(`- ${move}`);
    lines.push('');
  }

  if (card.motifs.length > 0) {
    lines.push('## Motifs');
    lines.push('');
    for (const motif of card.motifs) {
      const sample = motif.sample ? ` — ${motif.sample.replace(/\s+/g, ' ').slice(0, 120)}` : '';
      lines.push(`- **${motif.type}** ×${motif.count}${sample}`);
    }
    lines.push('');
  }

  if (card.motion.summary.length > 0 || card.motion.animations.length > 0) {
    lines.push('## Motion');
    lines.push('');
    for (const label of card.motion.summary) lines.push(`- ${label}`);
    if (card.motion.animations.length > 0) {
      lines.push('');
      for (const animation of card.motion.animations.slice(0, 5)) {
        lines.push(
          `- ${animation.type} — ${animation.duration}ms, ${animation.easing}, delay ${animation.delay}ms`,
        );
      }
    }
    if (card.motion.libraries.length > 0) {
      lines.push(`- Libraries detected: ${card.motion.libraries.join(', ')}`);
    }
    if (card.motion.scrollDriven > 0) {
      lines.push(`- Scroll-driven elements: ${card.motion.scrollDriven}`);
    }
    lines.push(`- Reduced-motion support: ${card.motion.reducedMotion ? 'yes' : 'not detected'}`);
    lines.push('');
  }

  if (card.layouts.length > 0) {
    lines.push('## Page layouts');
    lines.push('');
    for (const layout of card.layouts) {
      const shape = `${layout.columns || 1} col × ${layout.rows || 1} row`;
      const ratio = layout.ratio && layout.ratio !== 1 ? `, ratio ${layout.ratio}` : '';
      lines.push(
        `- **${layout.type}** — ${shape}, ${layout.childCount} children${ratio} (\`${layout.selector}\`)`,
      );
    }
    lines.push('');
  }

  lines.push('## Translation notes for slides');
  lines.push('');
  lines.push(`- Keep the canvas \`${palette.canvas}\` and ink \`${palette.foreground}\` relationship.`);
  lines.push(`- Use \`${palette.accent}\` as the only accent; don\u2019t introduce a second brand color.`);
  lines.push(
    `- Preserve the type pairing: ${typography.displayFamily} for display, ${typography.bodyFamily} for body.`,
  );
  lines.push(
    `- The reference is ${mode.density}; adapt density for projection rather than copying it literally.`,
  );
  lines.push('- Normalize contrast and minimum type sizes for a projector; the reference may not be legible at distance.');
  lines.push('- Use 2–3 motifs, not every motif. The rest are evidence, not instructions.');
  lines.push('- Translate scroll and hover choreography into slide entrances and reveals; do not copy website motion literally.');
  lines.push('- Map the layout archetypes to the shared cover, content, split, comparison, quote, and grid compositions.');
  lines.push('');

  lines.push('## Caveats');
  lines.push('');
  for (const caveat of card.caveats) lines.push(`- ${caveat}`);
  lines.push('');

  return lines.join('\n');
}

function buildThemeCss(card) {
  const { palette, typography, surfaces, mode } = card;
  const base = Math.max(16, Number.parseFloat(typography.sizes?.body) || 16);
  const h1 = Number.parseFloat(typography.sizes?.h1) || base * 2.5;
  const h2 = Number.parseFloat(typography.sizes?.h2) || base * 1.4;
  const h3 = Number.parseFloat(typography.sizes?.h3) || base * 1.15;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const bodyFamily = normalizeFontStack(typography.bodyFamily, 'system-ui, sans-serif');
  const displayFamily = normalizeFontStack(typography.displayFamily, 'system-ui, sans-serif');
  const monoFamily = normalizeFontStack(typography.monoFamily, 'ui-monospace, monospace');
  const headingWeight = Number.parseInt(String(typography.headingWeight), 10) || 600;
  const tracking = typography.headingTracking === 'normal' ? '0' : typography.headingTracking;

  const textBase = Math.round(clamp(base, 16, 19));
  const textSm = Math.round(clamp(base * 0.875, 13, 16));
  const textXs = Math.round(clamp(base * 0.75, 11, 14));
  const textLg = Math.round(clamp(base * 1.125, 17, 21));
  const textXl = Math.round(clamp(base * 1.25, 19, 24));
  const text2xl = Math.round(clamp(base * 1.5, 22, 28));

  const cover = Math.round(clamp(h1, 48, 84));
  const impact = Math.round(clamp(h1 * 1.15, 56, 96));
  const divider = Math.round(clamp(h1 * 0.7, 36, 52));
  const contentH1 = Math.round(clamp(h1 * 0.62, 32, 48));
  const contentH2 = Math.round(clamp(h2, 20, 30));
  const metricH1 = Math.round(clamp(h1 * 0.5, 28, 40));
  const metricValue = Math.round(clamp(h1 * 0.9, 40, 64));

  const padding =
    mode.density === 'compact'
      ? '56px 64px 64px 72px'
      : mode.density === 'airy'
        ? '72px 88px 88px 96px'
        : '64px 72px 72px 80px';

  const radius = Math.round(surfaces.radius || 0);
  const radiusSm = Math.round(clamp(radius * 0.45, 0, 8));
  const radiusMd = Math.round(clamp(radius, 0, 24));
  const radiusLg = Math.round(clamp(radius * 1.35, 0, 32));
  const glassBlur = surfaces.glassBlur && surfaces.glassBlur !== 'none' ? surfaces.glassBlur : null;

  const light = {
    canvas: palette.canvas,
    foreground: palette.foreground,
    muted: palette.muted,
    border: palette.border,
    accent: palette.accent,
    card: palette.card,
    cardBorder: palette.cardBorder,
    codeBg: palette.codeBg,
    codeFg: palette.codeFg,
  };

  function rootBlock(colors, indent = '') {
    const prop = (key, value) => `${indent}  ${key}: ${value};`;
    const comment = (text) => `${indent}  /* ${text} */`;
    return [
      `${indent}:root {`,
      comment('Tier 1: extracted'),
      prop('--c-canvas', colors.canvas),
      prop('--c-foreground', colors.foreground),
      prop('--c-muted', colors.muted),
      prop('--c-border', colors.border),
      prop('--c-accent', colors.accent),
      prop('--c-font', bodyFamily),
      prop('--c-mono', monoFamily),
      '',
      comment('Tier 2: typography'),
      prop('--c-display', displayFamily),
      prop('--c-heading', colors.foreground),
      prop('--c-heading-style', typography.headingStyle || 'normal'),
      prop('--c-heading-weight', headingWeight),
      prop('--c-heading-tracking', tracking),
      prop('--c-tertiary', bodyFamily),
      '',
      comment('Accent + surfaces'),
      prop('--c-highlight', colors.accent),
      prop('--c-highlight-dim', 'color-mix(in srgb, var(--c-accent) 12%, transparent)'),
      prop('--c-accent-dim', 'color-mix(in srgb, var(--c-accent) 8%, transparent)'),
      prop('--c-accent-glow', 'color-mix(in srgb, var(--c-accent) 18%, transparent)'),
      prop('--c-code-bg', colors.codeBg),
      prop('--c-code-fg', colors.codeFg),
      prop('--c-card-bg', colors.card),
      prop('--c-card-border', colors.cardBorder),
      prop('--c-glass-bg', colors.card),
      prop('--c-glass-blur', glassBlur ?? 'none'),
      prop('--c-glass-shadow', surfaces.shadow && surfaces.shadow !== 'none' ? surfaces.shadow : 'none'),
      prop('--c-glass-shadow-hover', surfaces.shadow && surfaces.shadow !== 'none' ? surfaces.shadow : 'none'),
      prop('--c-radius-sm', `${radiusSm}px`),
      prop('--c-radius-md', `${radiusMd}px`),
      prop('--c-radius-lg', `${radiusLg}px`),
      '',
      comment('Type scale: normalized for projection'),
      prop('--c-text-xs', `${textXs}px`),
      prop('--c-text-sm', `${textSm}px`),
      prop('--c-text-base', `${textBase}px`),
      prop('--c-text-lg', `${textLg}px`),
      prop('--c-text-xl', `${textXl}px`),
      prop('--c-text-2xl', `${text2xl}px`),
      prop('--c-text-cover', `${cover}px`),
      prop('--c-text-impact', `${impact}px`),
      prop('--c-text-divider', `${divider}px`),
      prop('--c-text-h1', `${contentH1}px`),
      prop('--c-text-h2', `${contentH2}px`),
      prop('--c-text-metric-h1', `${metricH1}px`),
      prop('--c-text-metric-value', `${metricValue}px`),
      '',
      comment('Spacing'),
      prop('--c-pad-slide', padding),
      prop('--c-pad-centered', mode.density === 'airy' ? '64px' : '48px'),
      '}',
    ].join('\n');
  }

  const fontImport = googleFontImport(bodyFamily, displayFamily, monoFamily);
  const lines = [
    `/* Deckcraft theme — generated from ${card.source.url}`,
    `   Captured ${card.source.capturedAt} · ${card.source.viewport.width}×${card.source.viewport.height}`,
    '   Verify font licenses before shipping. Logos and images are not copied. */',
    '',
  ];

  if (fontImport) {
    lines.push('/* Recognized open-source fonts are loaded from Google Fonts. */');
    lines.push(fontImport);
    lines.push('');
  }

  lines.push("@import './base.css';");
  lines.push('');
  lines.push(rootBlock(light));

  return lines.join('\n') + '\n';
}

function buildThemeReadme(card) {
  return `# Generated theme

Generated by \`deckcraft-style\` from ${card.source.url}.

## Use it

Copy this directory into your deck's \`theme/\` folder, alongside the shared Deckcraft theme files:

\`\`\`text
deck/theme/
├── styles.css   ← this generated file
├── base.css     ← copy from skills/deckcraft/themes/shared/base.css
├── layouts/     ← copy from skills/deckcraft/themes/shared/layouts/
└── global-bottom.vue
\`\`\`

Then set the theme in \`deck/slides.md\`:

\`\`\`yaml
theme: ./theme
\`\`\`

## What was extracted

- Canvas: ${card.palette.canvas}
- Ink: ${card.palette.foreground}
- Accent: ${card.palette.accent}
- Display font: ${card.typography.displayFamily}
- Body font: ${card.typography.bodyFamily}
- Density: ${card.mode.density}
- Surface: ${card.mode.surface}

Read \`../style-brief.md\` for the full style card and caveats.
`;
}

function buildSampleCss(card) {
  const types = new Set(card.motifTypes ?? []);
  const accent = card.palette?.accent ?? '#d3a4ff';
  const lines = ['', '/* Sample-only motif + motion styles. Not part of the reusable theme. */'];

  if (
    types.has('gradient') ||
    types.has('pseudo-gradient') ||
    types.has('glow') ||
    types.has('pseudo-shadow')
  ) {
    lines.push(
      '.dc-motif { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }',
      '.dc-motif::before { content: ""; position: absolute; width: 560px; height: 560px; right: -140px; top: -180px; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, ' +
        accent +
        ' 20%, transparent), transparent 70%); filter: blur(32px); }',
      '.dc-motif::after { content: ""; position: absolute; width: 340px; height: 340px; left: -120px; bottom: -160px; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, ' +
        accent +
        ' 10%, transparent), transparent 72%); filter: blur(36px); }',
    );
  }

  if (types.has('pattern') || types.has('image-texture') || types.has('pseudo-image')) {
    lines.push(
      '.dc-motif { background-image: radial-gradient(color-mix(in srgb, ' +
        accent +
        ' 22%, transparent) 1px, transparent 1px); background-size: 24px 24px; opacity: 0.22; }',
    );
  }

  if (types.has('hairline-rule') || types.has('dashed-rule')) {
    lines.push(
      '.dc-rule { width: 56px; height: 2px; background: var(--c-accent); margin: 1.25rem 0; }',
    );
  }

  const animation = (card.motion?.animations ?? []).find(
    (item) =>
      typeof item.duration === 'number' &&
      item.duration > 0 &&
      item.duration <= 1600 &&
      !String(item.type).includes('loop'),
  );
  const duration = animation?.duration ?? 600;
  const easing =
    animation?.easing && animation.easing !== 'linear'
      ? animation.easing
      : 'cubic-bezier(0.16, 1, 0.3, 1)';

  lines.push(
    ':root { --dc-motion-duration: ' + duration + 'ms; --dc-motion-ease: ' + easing + '; }',
    '@keyframes dc-reveal { from { opacity: 0; transform: translateY(16px); filter: blur(5px); } to { opacity: 1; transform: none; filter: blur(0); } }',
    '.dc-reveal { animation: dc-reveal var(--dc-motion-duration) var(--dc-motion-ease) both; }',
    '.dc-delay-1 { animation-delay: 90ms; }',
    '.dc-delay-2 { animation-delay: 180ms; }',
    '.dc-delay-3 { animation-delay: 270ms; }',
    '@media (prefers-reduced-motion: reduce) { .dc-reveal { animation: none; } }',
  );

  return lines.join('\n') + '\n';
}

const MOTIF_LABELS = {
  gradient: 'layered gradients',
  'pseudo-gradient': 'layered gradients',
  glow: 'soft radial glow',
  'pseudo-shadow': 'soft shadow',
  pattern: 'repeating texture',
  'image-texture': 'image texture',
  'pseudo-image': 'decorative image layer',
  'pseudo-shape': 'pseudo-element shapes',
  'pseudo-rule': 'pseudo-element rules',
  'inline-svg': 'illustrated accents',
  'svg-gradient': 'illustrated accents',
  'hairline-rule': 'hairline rules',
  'dashed-rule': 'dashed rules',
  'rounded-corner': 'rounded surfaces',
  pill: 'pill-shaped controls',
  blur: 'soft blur',
  glass: 'translucent layers',
  'clip-shape': 'clipped geometry',
  mask: 'masked geometry',
  blend: 'blend modes',
  'fixed-overlay': 'fixed atmosphere layer',
  'sticky-element': 'sticky layers',
  'horizontal-scroll': 'horizontal storytelling',
  'text-glow': 'text glow',
  'vertical-type': 'vertical type',
  rotated: 'rotated elements',
};

const MOTIF_PRIORITY = [
  'gradient',
  'pseudo-gradient',
  'glow',
  'pattern',
  'image-texture',
  'pseudo-image',
  'inline-svg',
  'svg-gradient',
  'clip-shape',
  'hairline-rule',
  'dashed-rule',
  'blur',
  'rounded-corner',
  'glass',
  'pill',
];

function sampleMotifs(card) {
  if (!card.motifs.length) {
    return [{ type: card.mode.surface, count: 1, label: card.mode.surface }];
  }

  const grouped = new Map();
  for (const motif of card.motifs) {
    const label = MOTIF_LABELS[motif.type] || String(motif.type).replace(/-/g, ' ');
    const existing = grouped.get(label);
    if (existing) {
      existing.count += motif.count;
    } else {
      grouped.set(label, { ...motif, label, count: motif.count });
    }
  }

  const motifs = Array.from(grouped.values());
  const preferred = motifs
    .filter((motif) => MOTIF_PRIORITY.includes(motif.type))
    .sort((a, b) => {
      const aIndex = MOTIF_PRIORITY.indexOf(a.type);
      const bIndex = MOTIF_PRIORITY.indexOf(b.type);
      if (aIndex !== bIndex) return aIndex - bIndex;
      return b.count - a.count;
    });
  const rest = motifs.filter((motif) => !MOTIF_PRIORITY.includes(motif.type));
  return [...preferred, ...rest].slice(0, 3);
}

function sampleSlides(card) {
  const host = new URL(card.source.url).hostname;
  const motifs = sampleMotifs(card);
  const motifCards = motifs
    .map(
      (motif, index) => `<div class="card dc-reveal dc-delay-${index + 1}">
  <div class="card-tag">motif 0${index + 1}</div>
  <div class="card-title">${motif.label}</div>
  <div class="card-desc">${motif.count === 1 ? 'Pulled from the reference.' : `Seen ${motif.count}× in the reference.`}</div>
</div>`,
    )
    .join('\n');

  return `---
theme: ./theme
highlighter: shiki
lineNumbers: true
title: Deckcraft style sample
layout: cover
colorSchema: ${card.mode.theme}
---

<div class="dc-motif" aria-hidden="true"></div>

<h1 class="dc-reveal">The shape of a good idea</h1>

<p class="dc-reveal dc-delay-1">A sample deck rendered with the extracted style from ${host}</p>

<p class="author dc-reveal dc-delay-2">Deckcraft · style import</p>

<!--
This deck exists to test the generated theme.
Replace it with your own content.
-->

---
layout: content
---

# One claim per slide

The best slides don't explain a topic. They make an argument.

- **Start with tension** — what breaks if the audience doesn't know this?
- **Show evidence** — code, data, a diagram, or a concrete example
- **Land the point** — one sentence they can repeat tomorrow

<!--
Content layout: check heading scale, body measure, and list rhythm.
-->

---
layout: content
---

# The smallest useful loop

<div class="split">
<div>

Write the claim first. Then choose the evidence that earns it.

~~~ts
type Slide = {
  claim: string
  evidence: Evidence[]
}

function render(slide: Slide) {
  return compose(
    slide.claim,
    slide.evidence,
  )
}
~~~

</div>
<div>

<div class="card">
  <strong>Design check</strong>
  <p>Code should sit next to the idea, not below it. If the code is the point, give it the whole slide.</p>
</div>

</div>
</div>

<!--
Split layout: code on one side, context on the other.
-->

---
layout: content
---

# The reference's visual grammar

<div class="grid-3">
${motifCards}
</div>

<!--
This slide pulls the top motifs from the style card.
If the reference is grid- or bento-heavy, this is the composition to study.
-->

---
layout: comparison
---

# Before and after

<div class="compare">
<div class="compare-col">
  <p class="compare-label">Before</p>
  <h2>Slides as documents</h2>
  <ul>
    <li>Every detail on one slide</li>
    <li>Text sized for a laptop</li>
    <li>Layout chosen after the fact</li>
  </ul>
</div>
<div class="compare-col">
  <p class="compare-label accent">After</p>
  <h2>Slides as sequence</h2>
  <ul>
    <li>One idea per slide</li>
    <li>Type sized for the back row</li>
    <li>Layout driven by the evidence</li>
  </ul>
</div>
<div class="compare-divider">→</div>
</div>

<!--
Comparison layout: check two-column balance and the divider.
-->

---
layout: quote
---

<div class="quote-mark">“</div>

<blockquote>
The audience doesn't remember the slide. They remember the sentence they could repeat afterward.
</blockquote>

<div class="attribution">
  <div class="attribution-line"></div>
  <div class="attribution-name">A useful constraint</div>
  <div class="attribution-role">Deckcraft sample</div>
</div>

<!--
Quote layout: check display type, measure, and attribution.
-->

---
layout: impact
---

# 1

Idea per slide

<span class="text-sm">The only rule that survives every theme</span>

<!--
Impact layout: check display size and the accent rule.
-->

---
layout: content
---

# Now make it yours

Paste a URL into Deckcraft, pick the direction that feels right, and replace this sample with your story.

~~~bash
npm run style -- https://example.com --out ./style --preview
~~~

<!--
End with an action. The sample deck is disposable; the theme is the artifact.
Source: ${card.source.url}
-->
`;
}

function sampleReadme(card) {
  return `# Sample deck

Generated from ${card.source.url} by \`deckcraft-style --preview\`.

This sample deck exercises the cover, content, split, comparison, quote, and impact layouts using the extracted theme, plus the top motifs and the detected motion language.

## Run it

\`\`\`bash
npx @slidev/cli slides.md
\`\`\`

Then open the local Slidev URL and flip through the slides.

## What to look for

- Does the canvas/ink relationship match the reference?
- Does the accent feel like the reference, or does it dominate?
- Does the type scale hold up at 1920×1080?
- Do the motifs feel like the reference, or like decoration added afterward?
- Does the motion feel similar without becoming distracting?
- Do the shared layouts fight the reference's composition?
- Are the fonts actually available, or is the deck falling back?

The generated theme is intentionally separate from Deckcraft's bundled themes. Edit \`theme/styles.css\` to tune it.
`;
}

async function writeSampleDeck(card, outDir, themeCss) {
  const skillDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const sharedDir = path.join(skillDir, 'themes', 'shared');
  const sampleDir = path.join(outDir, 'sample');
  const themeDir = path.join(sampleDir, 'theme');

  if (!fssync.existsSync(path.join(sharedDir, 'base.css'))) {
    throw new Error(`Could not find shared theme files at ${sharedDir}`);
  }

  await fs.mkdir(themeDir, { recursive: true });
  await fs.copyFile(path.join(sharedDir, 'base.css'), path.join(themeDir, 'base.css'));
  await fs.copyFile(
    path.join(sharedDir, 'global-bottom.vue'),
    path.join(themeDir, 'global-bottom.vue'),
  );
  await fs.cp(path.join(sharedDir, 'layouts'), path.join(themeDir, 'layouts'), {
    recursive: true,
  });
  await fs.writeFile(path.join(themeDir, 'styles.css'), themeCss + buildSampleCss(card));
  await fs.writeFile(path.join(sampleDir, 'slides.md'), sampleSlides(card));
  await fs.writeFile(path.join(sampleDir, 'README.md'), sampleReadme(card));

  return sampleDir;
}


// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  const executable = findChrome();
  if (!executable) {
    console.error(
      'No Chrome/Chromium found. Install Chrome or set CHROME_PATH to the browser executable.',
    );
    process.exit(1);
  }

  const port = await getFreePort();
  const profileDir = await fs.mkdtemp(path.join(os.tmpdir(), 'deckcraft-style-'));
  let chrome;

  try {
    console.log(`Reading ${targetUrl} at ${viewportWidth}×${viewportHeight}...`);
    chrome = await launchChrome(executable, port, profileDir);
    const page = await getPageTarget(port);
    const { ws, send } = await connectCdp(page.webSocketDebuggerUrl);

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: viewportWidth,
      height: viewportHeight,
      deviceScaleFactor: 1,
      mobile: false,
    });

    if (values.dark || values.light) {
      await send('Emulation.setEmulatedMedia', {
        features: [
          { name: 'prefers-color-scheme', value: values.dark ? 'dark' : 'light' },
        ],
      });
    }

    const navigation = await send('Page.navigate', { url: targetUrl });
    if (navigation.errorText) {
      throw new Error(`Navigation failed: ${navigation.errorText}`);
    }

    const loaded = await waitFor(
      send,
      "document.readyState === 'complete' && location.href !== 'about:blank'",
      timeoutMs,
    );
    if (!loaded) throw new Error(`Page did not finish loading within ${timeoutMs}ms.`);

    await send('Runtime.evaluate', {
      expression:
        'Promise.race([' +
        'document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(),' +
        'new Promise((resolve) => setTimeout(resolve, 3000))' +
        ']).then(() => true)',
      returnByValue: true,
      awaitPromise: true,
    });

    // Let client-rendered pages settle.
    if (waitMs > 0) await sleep(waitMs);

    let screenshotFiles = [];
    if (values.screenshots) {
      const referenceDir = path.join(outDir, 'reference');
      await fs.mkdir(referenceDir, { recursive: true });

      const viewportShot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
      });
      const viewportPath = path.join(referenceDir, 'viewport.png');
      await fs.writeFile(viewportPath, Buffer.from(viewportShot.data, 'base64'));
      screenshotFiles.push(viewportPath);

      try {
        const metrics = await send('Page.getLayoutMetrics');
        const content = metrics.cssContentSize ?? metrics.contentSize;
        const width = Math.max(viewportWidth, Math.min(Math.ceil(content.width), 1920));
        const height = Math.max(viewportHeight, Math.min(Math.ceil(content.height), 12000));
        const fullShot = await send('Page.captureScreenshot', {
          format: 'png',
          captureBeyondViewport: true,
          clip: { x: 0, y: 0, width, height, scale: 1 },
        });
        const fullPath = path.join(referenceDir, 'full-page.png');
        await fs.writeFile(fullPath, Buffer.from(fullShot.data, 'base64'));
        screenshotFiles.push(fullPath);
      } catch (error) {
        console.warn(`Warning: could not capture full-page screenshot: ${error.message}`);
      }
    }

    const result = await send('Runtime.evaluate', {
      expression: `(${extractPage.toString()})()`,
      returnByValue: true,
      awaitPromise: true,
      timeout: timeoutMs,
    });

    if (result.exceptionDetails) {
      throw new Error(`Extraction failed: ${result.exceptionDetails.text}`);
    }

    const data = result.result?.value;
    if (!data?.meta) throw new Error('Extraction returned no data.');

    if ((data.meta.textLength ?? 0) < 20) {
      console.warn('Warning: the page has very little visible text. It may be client-rendered or blocked.');
    }

    const card = buildStyleCard(data);
    if (screenshotFiles.length > 0) {
      card.screenshots = screenshotFiles.map((file) => path.relative(outDir, file));
    }
    const brief = buildBrief(card);
    const themeCss = buildThemeCss(card);
    const themeReadme = buildThemeReadme(card);

    const themeDir = path.join(outDir, 'theme');
    await fs.mkdir(themeDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'style.json'), JSON.stringify(card, null, 2) + '\n');
    await fs.writeFile(path.join(outDir, 'style-brief.md'), brief);
    await fs.writeFile(path.join(themeDir, 'styles.css'), themeCss);
    await fs.writeFile(path.join(themeDir, 'README.md'), themeReadme);

    let sampleDir = null;
    if (values.preview) {
      sampleDir = await writeSampleDeck(card, outDir, themeCss);
    }

    console.log('');
    console.log(`Theme: ${card.mode.theme} · ${card.mode.density} · ${card.mode.surface}`);
    console.log(`Canvas ${card.palette.canvas} · Ink ${card.palette.foreground} · Accent ${card.palette.accent}`);
    console.log(`Display: ${card.typography.displayFamily}`);
    console.log(`Body: ${card.typography.bodyFamily}`);
    console.log('');
    console.log('Wrote:');
    console.log(`  ${path.relative(process.cwd(), path.join(outDir, 'style.json'))}`);
    console.log(`  ${path.relative(process.cwd(), path.join(outDir, 'style-brief.md'))}`);
    console.log(`  ${path.relative(process.cwd(), path.join(themeDir, 'styles.css'))}`);
    console.log(`  ${path.relative(process.cwd(), path.join(themeDir, 'README.md'))}`);
    for (const screenshot of screenshotFiles) {
      console.log(`  ${path.relative(process.cwd(), screenshot)}`);
    }
    if (sampleDir) {
      console.log(`  ${path.relative(process.cwd(), path.join(sampleDir, 'slides.md'))}`);
      console.log('');
      console.log(`Preview: npx @slidev/cli ${path.relative(process.cwd(), path.join(sampleDir, 'slides.md'))}`);
    }
    console.log('');

    ws.close();
  } finally {
    if (chrome) chrome.kill('SIGKILL');
    await fs.rm(profileDir, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((error) => {
  console.error(`\nStyle import failed: ${error.message}`);
  process.exit(1);
});
