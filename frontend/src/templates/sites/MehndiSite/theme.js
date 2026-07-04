/**
 * Mehndi Bagh — shared theme constants.
 * All page components import colors and nav config from here.
 */

export const CREAM = '#fdf8f0'
export const DARK_TEXT = '#3d2c2a'
export const MAROON = '#6b2f2f'
export const GOLD = '#b58a2b'
export const GOLD_LIGHT = '#d4a843'
export const RED_BTN = '#c0392b'
export const MUTED = '#7a6a5e'
export const BORDER = '#e8ddd4'

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'family', label: 'Family' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Compute derived theme tokens from mode (light/dark).
 */
export function getThemeTokens(mode) {
  const dark = mode === 'dark'
  return {
    dark,
    bg: dark ? '#1a1410' : CREAM,
    textColor: dark ? '#f5efe8' : DARK_TEXT,
    mutedColor: dark ? '#b8a89a' : MUTED,
    cardBg: dark ? '#2a2018' : '#ffffff',
    borderColor: dark ? '#3d3028' : BORDER,
    navBg: dark ? 'rgba(26,20,16,0.95)' : 'rgba(253,248,240,0.95)',
  }
}
