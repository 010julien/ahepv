import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { useTheme } from '../../contexts/ThemeContext';

const Login = () => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = () => {
    login({ name: 'Jean Dupont', role: 'student', email });
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Decorative Background */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={[colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logo}
          >
            <Ionicons name="school-outline" size={48} color={colors.white} />
          </LinearGradient>
          <Text style={[styles.title, isDark && styles.titleDark]}>Content de vous voir!</Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark, {justifyContent: 'center', alignItems: 'center', textAlign: 'center'}]}>
            Connectez-vous pour continuer votre apprentissage
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>Email</Text>
            <View style={[
              styles.inputWrapper,
              isDark && styles.inputWrapperDark,
              isEmailFocused && styles.inputWrapperFocused
            ]}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="Entrez votre email"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>Mot de passe</Text>
            <View style={[
              styles.inputWrapper,
              isDark && styles.inputWrapperDark,
              isPasswordFocused && styles.inputWrapperFocused
            ]}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="Entrez votre mot de passe"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={[styles.forgotPassword, isDark && styles.forgotPasswordDark]}>
              Mot de passe oublié?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            title="Sign In"
            onPress={handleLogin}
            fullWidth
            style={styles.loginButton}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={[styles.dividerLine, isDark && styles.dividerLineDark]} />
            <Text style={[styles.dividerText, isDark && styles.dividerTextDark]}>
              Ou continuez avec
            </Text>
            <View style={[styles.dividerLine, isDark && styles.dividerLineDark]} />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={[styles.socialButton, isDark && styles.socialButtonDark]}>
              <Ionicons name="logo-google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, isDark && styles.socialButtonDark]}>
              <Ionicons name="logo-facebook" size={24} color="#4267B2" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, isDark && styles.socialButtonDark]}>
              <Ionicons name="logo-apple" size={24} color={isDark ? colors.white : colors.black} />
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={[styles.signupText, isDark && styles.signupTextDark]}>
              Vous n'avez pas de compte?{' '}
            </Text>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Inscrivez-vous</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  containerDark: {
    backgroundColor: colors.backgroundDark,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['2xl'],
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: `${colors.primary}15`,
    top: -50,
    right: -50,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: `${colors.secondary}15`,
    bottom: 100,
    left: -30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  titleDark: {
    color: colors.textDark,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  subtitleDark: {
    color: colors.textSecondaryDark,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  labelDark: {
    color: colors.textDark,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  inputWrapperDark: {
    backgroundColor: colors.gray800,
    borderColor: colors.gray700,
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
    shadowOpacity: 0.15,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  inputDark: {
    color: colors.textDark,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPassword: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  forgotPasswordDark: {
    color: colors.primaryLight,
  },
  loginButton: {
    marginBottom: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerLineDark: {
    backgroundColor: colors.gray700,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  dividerTextDark: {
    color: colors.textSecondaryDark,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  socialButtonDark: {
    backgroundColor: colors.gray800,
    borderColor: colors.gray700,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  signupText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  signupTextDark: {
    color: colors.textSecondaryDark,
  },
  signupLink: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
});

export default Login;

