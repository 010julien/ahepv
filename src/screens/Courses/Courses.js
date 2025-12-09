import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { curriculum } from '../../data/curriculum';
import { Card, Badge } from '../../components';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const Courses = ({ navigation }) => {
  const { theme } = useTheme();
  const themeColors = useThemeColors();
  const { userProfile } = useUser();
  const [selectedProgram, setSelectedProgram] = useState('national');
  const [searchQuery, setSearchQuery] = useState('');

  const programs = [
    { 
      id: 'national', 
      label: 'Programme Togolais', 
      icon: 'flag-outline',
      description: 'Cours + Exercices pratiques'
    },
    { 
      id: 'international', 
      label: 'Programme International', 
      icon: 'globe-outline',
      description: 'Cambridge, IB, Français...'
    },
  ];

  // Filter courses based on user level and selected program
  const filteredCourses = curriculum.courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.subject?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Si l'utilisateur a un profil, filtrer par niveau
    if (userProfile?.level) {
      return matchesSearch && course.levelId === userProfile.level;
    }
    
    return matchesSearch;
  });

  const renderCourseCard = (course) => (
    <TouchableOpacity
      key={course.id}
      style={[styles.courseCard, { backgroundColor: themeColors.card }]}
      onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
    >
      <View style={[styles.courseIconContainer, { backgroundColor: course.color + '20' }]}>
        <Ionicons name={course.icon || 'book-outline'} size={32} color={course.color || colors.primary} />
      </View>
      
      <View style={styles.courseInfo}>
        <View style={styles.courseHeader}>
          <Badge text={course.grade} color={course.color || colors.primary} />
          {selectedProgram === 'national' && (
            <View style={[styles.exerciseBadge, { backgroundColor: colors.success + '20' }]}>
              <Ionicons name="fitness-outline" size={12} color={colors.success} />
              <Text style={[styles.exerciseBadgeText, { color: colors.success }]}>
                Exercices
              </Text>
            </View>
          )}
          {selectedProgram === 'international' && (
            <Badge text="INT" color={colors.info} style={{ marginLeft: spacing.xs }} />
          )}
        </View>
        
        <Text style={[styles.courseTitle, { color: themeColors.text }]} numberOfLines={2}>
          {course.title}
        </Text>
        
        <Text style={[styles.courseTeacher, { color: themeColors.textSecondary }]}>
          {course.teacher}
        </Text>
        
        <View style={styles.courseMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={themeColors.textSecondary} />
            <Text style={[styles.metaText, { color: themeColors.textSecondary }]}>
              {course.duration}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="book-outline" size={14} color={themeColors.textSecondary} />
            <Text style={[styles.metaText, { color: themeColors.textSecondary }]}>
              {course.content?.course?.sections?.length || 0} modules
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Mes Cours
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: themeColors.card }]}>
        <Ionicons name="search-outline" size={20} color={themeColors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: themeColors.text }]}
          placeholder="Rechercher un cours..."
          placeholderTextColor={themeColors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Program Selector */}
      <View style={styles.programSelector}>
        {programs.map((program) => (
          <TouchableOpacity
            key={program.id}
            style={[
              styles.programButton,
              selectedProgram === program.id && [
                styles.programButtonActive,
                { backgroundColor: colors.primary }
              ],
            ]}
            onPress={() => setSelectedProgram(program.id)}
          >
            <Ionicons
              name={program.icon}
              size={20}
              color={selectedProgram === program.id ? colors.white : themeColors.textSecondary}
            />
            <Text
              style={[
                styles.programText,
                {
                  color: selectedProgram === program.id ? colors.white : themeColors.textSecondary
                }
              ]}
            >
              {program.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Info Banner */}
      {selectedProgram === 'national' && (
        <Card style={[styles.infoBanner, { backgroundColor: colors.success + '10' }]}>
          <View style={styles.infoBannerContent}>
            <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.infoBannerText, { color: themeColors.text, fontWeight: '600' }]}>
                Programme Togolais
              </Text>
              <Text style={[styles.infoBannerSubtext, { color: themeColors.textSecondary }]}>
                Chaque cours inclut des exercices pratiques pour mieux assimiler
              </Text>
            </View>
          </View>
        </Card>
      )}
      
      {selectedProgram === 'international' && (
        <Card style={[styles.infoBanner, { backgroundColor: colors.info + '10' }]}>
          <View style={styles.infoBannerContent}>
            <Ionicons name="information-circle" size={24} color={colors.info} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.infoBannerText, { color: themeColors.text, fontWeight: '600' }]}>
                Programme International
              </Text>
              <Text style={[styles.infoBannerSubtext, { color: themeColors.textSecondary }]}>
                Cambridge IGCSE, Baccalauréat International (IB), Bac Français
              </Text>
            </View>
          </View>
        </Card>
      )}

      {/* Courses List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredCourses.length > 0 ? (
          filteredCourses.map(renderCourseCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={64} color={themeColors.textSecondary} />
            <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
              Aucun cours trouvé
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.md,
  },
  programSelector: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  programButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  programButtonActive: {
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  programText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  infoBanner: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  infoBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoBannerText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
  },
  infoBannerSubtext: {
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  },
  exerciseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.xs,
  },
  exerciseBadgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  courseCard: {
    flexDirection: 'row',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  courseIconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  courseInfo: {
    flex: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  courseTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  courseTeacher: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.sm,
  },
  courseMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.fontSize.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    marginTop: spacing.md,
  },
});
