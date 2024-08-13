export const COLORS = {
  DARK_BACKGROUND: '#1F1F1F', // Very Dark Gray
  PRIMARY_ACCENT: '#FF6F61', // Cinematic Coral
  SECONDARY_ACCENT: '#FFD700', // Gold
  TEXT_PRIMARY: '#FFFFFF', // White
  TEXT_SECONDARY: '#B3B3B3', // Light Gray
  TITLE_TEXT: '#FFD700', // Gold (for titles)
  NEUTRAL: '#E5E5E5', // Light Gray (neutral elements)
  ERROR: '#FF4C4C', // Red (error messages)
} as const;

export const poster500 = (path: string | null | undefined): string =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : '';

export const poster185 = (path: string | null | undefined): string =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : '';

export const GlobalStyles = {
  container: {flex: 1, backgroundColor: COLORS.DARK_BACKGROUND},
};
