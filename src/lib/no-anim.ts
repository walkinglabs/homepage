/**
 * True when the page is loaded with ?noanim — renders everything in its final
 * visual state immediately (QA, screenshots, CI). No effect for normal users.
 */
export const NO_ANIM =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('noanim')
