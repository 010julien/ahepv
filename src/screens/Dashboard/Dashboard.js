import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { currentUser, courses, notifications } from '../../data/mockData';
import { Card } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../theme';

const Dashboard = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const activeCoursesCount = courses.length;
  const averageGrade = 14.5;
  const hasUnreadNotifications = notifications.some(n => !n.read);

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, isDark && styles.greetingDark]}>
              Bonjour, {currentUser.name.split(' ')[0]} 👋
            </Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              Prêt pour apprendre ?
            </Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, isDark && styles.notificationButtonDark]}>
            <Ionicons name="notifications-outline" size={24} color={isDark ? colors.textDark : colors.text} />
            {hasUnreadNotifications && <View style={styles.notificationBadge} />}
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardBlue]}>
            <Text style={styles.statValue}>{activeCoursesCount}</Text>
            <Text style={styles.statLabel}>Cours actifs</Text>
          </View>
          <View style={[styles.statCard, styles.statCardPurple]}>
            <Text style={styles.statValue}>{averageGrade}</Text>
            <Text style={styles.statLabel}>Moyenne Générale</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          Activité Récente
        </Text>
        <Card>
          <View style={styles.activityItem}>
            <Ionicons name="book-outline" size={20} color={colors.primary} />
            <Text style={[styles.activityText, isDark && styles.activityTextDark]}>
              Nouveau cours de Math ajouté
            </Text>
            <Text style={styles.activityTime}>2h</Text>
          </View>
          <View style={[styles.activityItem, styles.activityItemLast]}>
            <Ionicons name="checkmark-circle-outline" size={20} color={colors.success} />
            <Text style={[styles.activityText, isDark && styles.activityTextDark]}>
              Devoir de Physique terminé
            </Text>
            <Text style={styles.activityTime}>5h</Text>
          </View>
        </Card>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          Accès Rapide
        </Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.quickAction, isDark && styles.quickActionDark]}
            onPress={() => navigation.navigate('Courses')}
          >
            <Ionicons name="school-outline" size={32} color={colors.primary} />
            <Text style={[styles.quickActionText, isDark && styles.quickActionTextDark]}>
              Mes Cours
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAction, isDark && styles.quickActionDark]}
            onPress={() => navigation.navigate('Library')}
          >
            <Ionicons name="library-outline" size={32} color={colors.secondary} />
            <Text style={[styles.quickActionText, isDark && styles.quickActionTextDark]}>
              Bibliothèque
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerDark: {
    backgroundColor: colors.backgroundDark,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greeting: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  greetingDark: {
    color: colors.textDark,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  subtitleDark: {
    color: colors.textSecondaryDark,
  },
  notificationButton: {
    backgroundColor: colors.gray200,
    padding: spacing.sm,
    borderRadius: borderRadius.full,
    position: 'relative',
  },
  notificationButtonDark: {
    backgroundColor: colors.gray700,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    backgroundColor: colors.danger,
    borderRadius: borderRadius.full,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginHorizontal: spacing.xs,
  },
  statCardBlue: {
    backgroundColor: colors.primary,
  },
  statCardPurple: {
    backgroundColor: colors.secondary,
  },
  statValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.surface,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  sectionTitleDark: {
    color: colors.textDark,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  activityItemLast: {
    marginBottom: 0,
  },
  activityText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  activityTextDark: {
    color: colors.textDark,
  },
  activityTime: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionDark: {
    backgroundColor: colors.surfaceDark,
  },
  quickActionText: {
    marginTop: spacing.sm,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  quickActionTextDark: {
    color: colors.textDark,
  },
});

export default Dashboard;
