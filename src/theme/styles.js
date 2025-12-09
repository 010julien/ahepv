import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';

export const commonStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerDark: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  
  // Cards
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  cardDark: {
    backgroundColor: colors.surfaceDark,
  },
  
  // Text
  heading1: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  heading1Dark: {
    color: colors.textDark,
  },
  heading2: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  heading2Dark: {
    color: colors.textDark,
  },
  heading3: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  heading3Dark: {
    color: colors.textDark,
  },
  body: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  bodyDark: {
    color: colors.textDark,
  },
  bodySecondary: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  bodySecondaryDark: {
    color: colors.textSecondaryDark,
  },
  
  // Buttons
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.surface,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  
  // Flex utils
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Spacing
  mb1: { marginBottom: spacing.xs },
  mb2: { marginBottom: spacing.sm },
  mb3: { marginBottom: spacing.md },
  mb4: { marginBottom: spacing.lg },
  mt1: { marginTop: spacing.xs },
  mt2: { marginTop: spacing.sm },
  mt3: { marginTop: spacing.md },
  mt4: { marginTop: spacing.lg },
  p1: { padding: spacing.xs },
  p2: { padding: spacing.sm },
  p3: { padding: spacing.md },
  p4: { padding: spacing.lg },
});
