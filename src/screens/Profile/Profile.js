import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { currentUser, badges } from '../../data/mockData';
import { Card, Avatar, Button, Badge } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../theme';

const Profile = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const renderBadge = (badge) => (
    <View key={badge.id} style={[styles.badgeItem, !badge.earned && styles.badgeLocked]}>
      <View style={[styles.badgeIcon, { backgroundColor: badge.earned ? badge.color : colors.gray300 }]}>
        <Ionicons name={badge.icon} size={24} color={colors.white} />
      </View>
      <Text style={[styles.badgeName, isDark && styles.textDark]} numberOfLines={1}>{badge.name}</Text>
    </View>
  );

  const renderSettingItem = (icon, title, onPress, value = null) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, isDark && styles.settingIconDark]}>
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
        <Text style={[styles.settingLabel, isDark && styles.textDark]}>{title}</Text>
      </View>
      {value !== null ? (
        value
      ) : (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Avatar name={currentUser.name} size={100} source={currentUser.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.name, isDark && styles.textDark]}>{currentUser.name}</Text>
          <Text style={[styles.school, isDark && styles.textSecondaryDark]}>
            {currentUser.school} • {currentUser.grade}
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, isDark && styles.textDark]}>{currentUser.points}</Text>
              <Text style={[styles.statLabel, isDark && styles.textSecondaryDark]}>Points</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, isDark && styles.textDark]}>#{currentUser.rank}</Text>
              <Text style={[styles.statLabel, isDark && styles.textSecondaryDark, {color: colors.textSecondaryDark}]}>Rang</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, isDark && styles.textDark]}>{currentUser.badges.length}</Text>
              <Text style={[styles.statLabel, isDark && styles.textSecondaryDark]}>Badges</Text>
            </View>
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Badges & Trophées</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesScroll}>
            {badges.map(renderBadge)}
          </ScrollView>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Préférences</Text>
          <Card style={styles.settingsCard}>
            {renderSettingItem('moon-outline', 'Mode Sombre', () => toggleTheme(), (
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.gray300, true: colors.primary }}
                thumbColor={colors.white}
              />
            ))}
            <View style={[styles.separator, isDark && styles.separatorDark]} />
            {renderSettingItem('notifications-outline', 'Notifications', () => {})}
            <View style={[styles.separator, isDark && styles.separatorDark]} />
            {renderSettingItem('language-outline', 'Langue', () => {})}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Compte</Text>
          <Card style={styles.settingsCard}>
            {renderSettingItem('person-outline', 'Modifier le profil', () => {})}
            <View style={[styles.separator, isDark && styles.separatorDark]} />
            {renderSettingItem('stats-chart-outline', 'Mes Notes', () => navigation.navigate('Grades'))}
            <View style={[styles.separator, isDark && styles.separatorDark]} />
            {renderSettingItem('lock-closed-outline', 'Sécurité', () => {})}
            <View style={[styles.separator, isDark && styles.separatorDark]} />
            {renderSettingItem('help-circle-outline', 'Aide & Support', () => {})}
          </Card>
        </View>

        <Button
          title="Se déconnecter"
          onPress={logout}
          variant="danger"
          style={styles.logoutButton}
          icon={<Ionicons name="log-out-outline" size={20} color={colors.white} />}
        />
        
        <Text style={[styles.versionText, isDark && styles.textSecondaryDark]}>Version 1.0.0</Text>
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
    paddingBottom: spacing['2xl'],
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.backgroundLight,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.white,
  },
  name: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 4,
  },
  school: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    width: '90%',
    justifyContent: 'space-around',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.border,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  seeAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  badgesScroll: {
    marginHorizontal: -spacing.md,
    paddingHorizontal: spacing.md,
  },
  badgeItem: {
    alignItems: 'center',
    marginRight: spacing.lg,
    width: 80,
  },
  badgeLocked: {
    opacity: 0.5,
  },
  badgeIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeName: {
    fontSize: typography.fontSize.xs,
    color: colors.text,
    textAlign: 'center',
    fontWeight: typography.fontWeight.medium,
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary + '15', // 15% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingIconDark: {
    backgroundColor: colors.gray700,
  },
  settingLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    fontWeight: typography.fontWeight.medium,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 68, // Align with text
  },
  separatorDark: {
    backgroundColor: colors.gray700,
  },
  logoutButton: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xl,
  },
  versionText: {
    textAlign: 'center',
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
  },
  textDark: {
    color: colors.textDark,
  },
  textSecondaryDark: {
    color: colors.textSecondaryDark,
  },
});

export default Profile;

