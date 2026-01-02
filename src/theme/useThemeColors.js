import { useTheme } from '../contexts/ThemeContext';
import { colors as baseColors } from './colors';

export const useThemeColors = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return {
    // Background colors
    background: isDark ? baseColors.backgroundDark : baseColors.backgroundLight,
    surface: isDark ? baseColors.surfaceDark : baseColors.surface,
    card: isDark ? baseColors.gray800 : baseColors.white,
    
    // Text colors
    text: isDark ? baseColors.textDark : baseColors.text,
    textSecondary: isDark ? baseColors.textSecondaryDark : baseColors.textSecondary,
    
    // Border colors
    border: isDark ? baseColors.borderDark : baseColors.border,
    
    // Input colors
    input: isDark ? baseColors.gray800 : baseColors.white,
    inputText: isDark ? baseColors.textDark : baseColors.text,
    inputPlaceholder: isDark ? baseColors.gray400 : baseColors.gray500,
    
    // Icon colors
    icon: isDark ? baseColors.textDark : baseColors.text,
    iconSecondary: isDark ? baseColors.textSecondaryDark : baseColors.textSecondary,
    
    // Keep brand colors the same
    primary: baseColors.primary,
    primaryDark: baseColors.primaryDark,
    primaryLight: baseColors.primaryLight,
    secondary: baseColors.secondary,
    success: baseColors.success,
    warning: baseColors.warning,
    danger: baseColors.danger,
    info: baseColors.info,
    
    // Utility colors
    white: baseColors.white,
    black: baseColors.black,
    transparent: baseColors.transparent,
    
    // Gray scale (useful for specific cases)
    gray50: baseColors.gray50,
    gray100: baseColors.gray100,
    gray200: baseColors.gray200,
    gray300: baseColors.gray300,
    gray400: baseColors.gray400,
    gray500: baseColors.gray500,
    gray600: baseColors.gray600,
    gray700: baseColors.gray700,
    gray800: baseColors.gray800,
    gray900: baseColors.gray900,
    
    // Shadow (adjust for dark mode)
    shadow: isDark ? 'rgba(0, 0, 0, 0.4)' : baseColors.shadow,
    
    // Helper to check if dark mode
    isDark,
  };
};
