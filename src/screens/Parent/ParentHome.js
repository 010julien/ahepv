import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { parentData } from '../../data/mockData';
import { Card, Avatar } from '../../components';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const ParentHome = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeColors = useThemeColors();
  
  const { children } = parentData;

  const renderChildCard = (child) => {
    const unreadAlerts = child.alerts.filter(a => !a.read).length;
    
    return (
      <TouchableOpacity
        key={child.id}
        style={[styles.childCard, { backgroundColor: themeColors.card }]}
        onPress={() => navigation.navigate('ChildDetail', { childId: child.id })}
      >
        <Avatar name={child.name} size={60} source={child.avatar} />
        
        <View style={styles.childInfo}>
          <View style={styles.childHeader}>
            <Text style={[styles.childName, { color: themeColors.text }]}>{child.name}</Text>
            {unreadAlerts > 0 && (
              <View style={styles.alertBadge}>
                <Text style={styles.alertText}>{unreadAlerts}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.childGrade, { color: themeColors.textSecondary }]}>
            {child.grade} • {child.school}
          </Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{child.overallAverage}</Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Moyenne</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.success }]}>{child.attendance.present}%</Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Présence</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.secondary }]}>#{child.rank}</Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Rang</Text>
            </View>
          </View>
        </View>
        
        <Ionicons name="chevron-forward" size={24} color={colors.primary} />
      </TouchableOpacity>
    );
  };

  const renderAlertCard = (child, alert) => (
    <Card key={alert.id} style={[styles.alertCard, !alert.read && styles.unreadAlert]}>
      <View style={styles.alertHeader}>
        <View style={[
          styles.alertIcon,
          { backgroundColor: alert.type === 'grade' ? colors.success + '20' : colors.danger + '20' }
        ]}>
          <Ionicons
            name={alert.type === 'grade' ? 'trophy-outline' : 'alert-circle-outline'}
            size={20}
            color={alert.type === 'grade' ? colors.success : colors.danger}
          />
        </View>
        <View style={styles.alertContent}>
          <Text style={[styles.alertChild, { color: themeColors.textSecondary }]}>{child.name}</Text>
          <Text style={[styles.alertMessage, { color: themeColors.text }]}>{alert.message}</Text>
          <Text style={[styles.alertDate, { color: themeColors.textSecondary }]}>{alert.date}</Text>
        </View>
      </View>
    </Card>
  );

  const allAlerts = children.flatMap(child => 
    child.alerts.map(alert => ({ ...alert, childName: child.name, child }))
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: themeColors.text }]}>Bonjour,</Text>
            <Text style={[styles.parentName, { color: colors.primary }]}>{parentData.parent.name}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={themeColors.text} />
            {allAlerts.filter(a => !a.read).length > 0 && <View style={styles.notificationDot} />}
          </TouchableOpacity>
        </View>

        {/* Children Cards */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Mes Enfants</Text>
            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          {children.map(renderChildCard)}
        </View>

        {/* Recent Alerts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Alertes Récentes</Text>
          {allAlerts.slice(0, 5).map(alert => renderAlertCard(alert.child, alert))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParentHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['3xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  greeting: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  parentName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
  },
  notificationButton: {
    position: 'relative',
    padding: spacing.sm,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  childInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  childName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginRight: spacing.xs,
  },
  alertBadge: {
    backgroundColor: colors.danger,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    minWidth: 20,
    alignItems: 'center',
  },
  alertText: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  childGrade: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
  alertCard: {
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  unreadAlert: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  alertContent: {
    flex: 1,
  },
  alertChild: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  alertMessage: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  alertDate: {
    fontSize: typography.fontSize.xs,
  },
});
