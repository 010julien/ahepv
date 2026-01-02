import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { notifications } from '../../data/mockData';
import { Card } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../theme';

const Notifications = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <Card style={!item.read && styles.unreadCard}>
        <View style={styles.item}>
          <View style={[
            styles.iconContainer,
            isDark && styles.iconContainerDark,
            !item.read && styles.iconContainerUnread
          ]}>
            <Ionicons 
              name="notifications" 
              size={20} 
              color={item.read ? colors.textSecondary : colors.primary} 
            />
          </View>
          <View style={styles.content}>
            <Text style={[
              styles.title,
              isDark && styles.titleDark,
              !item.read && styles.titleUnread
            ]}>
              {item.title}
            </Text>
            <Text style={[styles.message, isDark && styles.messageDark]}>{item.message}</Text>
            <Text style={[styles.date, isDark && styles.dateDark]}>{item.date}</Text>
          </View>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.wrapper}>
        <Text style={[styles.heading, isDark && styles.headingDark]}>Notifications</Text>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  wrapper: {
    flex: 1,
    padding: spacing.md,
  },
  heading: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  headingDark: {
    color: colors.textDark,
  },
  unreadCard: {
    backgroundColor: colors.primaryLight + '10',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    backgroundColor: colors.gray100,
    padding: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  iconContainerDark: {
    backgroundColor: colors.gray700,
  },
  iconContainerUnread: {
    backgroundColor: colors.primaryLight + '30',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  titleDark: {
    color: colors.textDark,
  },
  titleUnread: {
    fontWeight: typography.fontWeight.bold,
  },
  message: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  messageDark: {
    color: colors.textSecondaryDark,
  },
  date: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  dateDark: {
    color: colors.textSecondaryDark,
  },
  unreadDot: {
    width: 12,
    height: 12,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
    marginTop: spacing.xs,
  },
});

export default Notifications;
