import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { spacing, borderRadius, useThemeColors } from '../theme';

const Card = ({ children, style }) => {
  const colors = useThemeColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }, style]}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
  },
});
