/**
 * Design Tokens for Premium SaaS UI
 * 
 * Centralized design token definitions for consistent styling
 */

export const designTokens = {
  // Colors (HSL values for CSS variables)
  colors: {
    background: { h: 0, s: 0, l: 100 },
    foreground: { h: 222, s: 84, l: 5 },
    primary: { h: 221, s: 83, l: 53 },
    primaryForeground: { h: 210, s: 40, l: 98 },
    muted: { h: 210, s: 40, l: 96 },
    accent: { h: 210, s: 40, l: 96 },
    border: { h: 214, s: 32, l: 91 },
    success: { h: 142, s: 76, l: 36 },
    destructive: { h: 0, s: 84, l: 60 },
    warning: { h: 38, s: 92, l: 50 },
  },

  // Spacing (4px grid system)
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    '4xl': '2.5rem',  // 40px
    '5xl': '3rem',    // 48px
    '6xl': '4rem',    // 64px
  },

  // Shadow depths
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },

  // Border radius
  radius: {
    sm: '0.25rem',    // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px',   // Pills
  },

  // Animation durations
  animation: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },

  // Breakpoints
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    large: '1280px',
  },
} as const;

export type DesignTokens = typeof designTokens;
