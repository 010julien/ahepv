import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

const ProgressBar = ({ progress, color = colors.primary, showPercentage = true, style }) => {
  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      {showPercentage && (
        <Text style={styles.percentage}>{percentage}%</Text>
      )}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  percentage: {
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    minWidth: 40,
    textAlign: 'right',
  },
});
