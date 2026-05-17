import { defineShortcutsSetup } from '@slidev/types'

export default defineShortcutsSetup((nav) => {
  return [
    {
      key: 'g',
      fn: () => nav.toggleOverview(),
      autoRepeat: false,
    },
    {
      key: 's',
      fn: () => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))
      },
      autoRepeat: false,
    },
    {
      key: 'f',
      fn: () => {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          document.documentElement.requestFullscreen()
        }
      },
      autoRepeat: false,
    },
  ]
})
