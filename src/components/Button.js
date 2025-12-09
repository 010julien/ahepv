import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius } from '../theme';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  style 
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.buttonSecondary;
      case 'danger':
        return styles.buttonDanger;
      case 'outline':
        return styles.buttonOutline;
      case 'gradient':
        return null; // Handled separately
      default:
        return styles.buttonPrimary;
    }
  };

  const getTextStyle = () => {
    if (variant === 'outline') {
      return styles.textOutline;
    }
    return styles.buttonText;
  };

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.white} />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.buttonText, getTextStyle()]}>{title}</Text>
        </View>
      )}
    </>
  );

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[fullWidth && styles.fullWidth, style]}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.button,
            disabled && styles.buttonDisabled,
          ]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.buttonDisabled,
        fullWidth && styles.fullWidth,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  textOutline: {
    color: colors.primary,
  },
});

