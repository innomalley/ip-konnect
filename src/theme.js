// Design tokens shared across the app. Kept framework-agnostic so they can be
// reused if the styling layer ever changes.
export const theme = {
  colors: {
    bg: '#f5f7fb',
    surface: '#ffffff',
    surfaceMuted: '#eef1f8',
    border: '#e2e6f0',
    text: '#1c2430',
    textMuted: '#5b6675',
    primary: '#3b5bdb',
    primaryHover: '#2f49b8',
    primarySoft: '#e7ecfd',
    accent: '#0ca678',
    danger: '#e03131',
    warning: '#f08c00',
    white: '#ffffff',
  },
  font: {
    heading: "'Sora', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '18px',
    pill: '999px',
  },
  shadow: {
    sm: '0 1px 2px rgba(20, 30, 50, 0.06)',
    md: '0 8px 24px rgba(20, 30, 50, 0.10)',
    lg: '0 20px 45px rgba(20, 30, 50, 0.16)',
  },
  space: (n) => `${n * 4}px`,
};
