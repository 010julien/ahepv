import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const RoleSelection = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeColors = useThemeColors();
  const { setUserProfile } = useUser();

  const handleRoleSelect = async (role) => {
    await setUserProfile({ role });
    navigation.navigate('LevelSelection');
  };

  const roles = [
    {
      id: 'student',
      title: 'Élève',
      subtitle: 'Je suis étudiant(e) et je veux apprendre',
      icon: 'school-outline',
      color: colors.primary,
      gradient: [colors.primary, colors.secondary],
    },
    {
      id: 'parent',
      title: 'Parent',
      subtitle: 'Je veux suivre les progrès de mon enfant',
      icon: 'people-outline',
      color: colors.secondary,
      gradient: [colors.secondary, colors.info],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="person-outline" size={40} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: themeColors.text }]}>
            Bienvenue sur TogoSchool
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Qui êtes-vous ?
          </Text>
        </View>

        {/* Role Cards */}
        <View style={styles.rolesContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                { backgroundColor: themeColors.card },
              ]}
              onPress={() => handleRoleSelect(role.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.roleIconContainer, { backgroundColor: role.color + '20' }]}>
                <Ionicons name={role.icon} size={48} color={role.color} />
              </View>
              <Text style={[styles.roleTitle, { color: themeColors.text }]}>
                {role.title}
              </Text>
              <Text style={[styles.roleSubtitle, { color: themeColors.textSecondary }]}>
                {role.subtitle}
              </Text>
              <View style={styles.arrow}>
                <Ionicons name="arrow-forward" size={24} color={role.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    textAlign: 'center',
  },
  rolesContainer: {
    gap: spacing.md,
  },
  roleCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  roleIconContainer: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  roleTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  roleSubtitle: {
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  arrow: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
  },
});
