import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { universityNews } from '../../data/mockData';
import { Badge } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../theme';

const News = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const renderNewsItem = (item) => (
    <TouchableOpacity key={item.id} style={[styles.newsCard, isDark && styles.newsCardDark]}>
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <View style={styles.newsHeader}>
          <Badge text={item.category} color={colors.primary} size="sm" />
          <Text style={[styles.newsDate, isDark && styles.textSecondaryDark]}>{item.date}</Text>
        </View>
        
        <Text style={[styles.newsTitle, isDark && styles.textDark]}>{item.title}</Text>
        
        <View style={styles.universityRow}>
          <Ionicons name="school-outline" size={14} color={colors.textSecondary} />
          <Text style={[styles.universityName, isDark && styles.textSecondaryDark]}>
            {item.university}
          </Text>
        </View>
        
        <Text style={[styles.newsExcerpt, isDark && styles.textSecondaryDark]} numberOfLines={2}>
          {item.content}
        </Text>
        
        <View style={styles.newsFooter}>
          <TouchableOpacity style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>Lire la suite</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.primary} />
          </TouchableOpacity>
          
          <View style={styles.viewsContainer}>
            <Ionicons name="eye-outline" size={14} color={colors.textSecondary} />
            <Text style={[styles.viewsText, isDark && styles.textSecondaryDark]}>{item.views}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.heading, isDark && styles.textDark]}>Actualités Universitaires</Text>
        <TouchableOpacity style={[styles.iconButton, isDark && styles.iconButtonDark]}>
          <Ionicons name="notifications-outline" size={24} color={isDark ? colors.textDark : colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {universityNews.map(renderNewsItem)}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  heading: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  iconButton: {
    padding: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconButtonDark: {
    backgroundColor: colors.gray800,
  },
  scrollContent: {
    padding: spacing.md,
  },
  newsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  newsCardDark: {
    backgroundColor: colors.gray800,
  },
  newsImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  newsContent: {
    padding: spacing.md,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  newsDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  newsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  universityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  universityName: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  newsExcerpt: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginRight: 4,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  textDark: {
    color: colors.textDark,
  },
  textSecondaryDark: {
    color: colors.textSecondaryDark,
  },
});

export default News;
