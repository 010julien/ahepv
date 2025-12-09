import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useSchedule } from '../../contexts/ScheduleContext';
import { useUser } from '../../contexts/UserContext';
import { currentUser, courses as allCourses } from '../../data/mockData';
import { curriculum } from '../../data/curriculum';
import { getCourseHeroImage } from '../../data/courseImages';
import { getTodaySchedule, getNextClass, getCurrentClass } from '../../data/scheduleData';
import { Card, Badge, Avatar, ProgressBar } from '../../components';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const Home = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = useThemeColors();
  const { userProfile } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: '1', name: 'All', color: colors.gray600 },
    { id: '2', name: 'Maths', color: colors.pink },
    { id: '3', name: 'Sciences', color: colors.secondary },
    { id: '4', name: 'Langues', color: colors.primary },
    { id: '5', name: 'Histoire', color: colors.info },
  ];

  // Filter courses by user's grade/level
  const getFilteredCourses = () => {
    if (!userProfile || !userProfile.grade) {
      return allCourses; // Default: show all courses
    }

    // Filter courses matching user's grade or level
    return allCourses.filter(course => {
      if (course.grade === userProfile.grade) return true;
      if (course.level === userProfile.level) return true;
      return false;
    });
  };

  const filteredCourses = getFilteredCourses();

  // Use curriculum courses (already filtered or enhanced)
  const popularCourses = curriculum.courses.map((course, index) => ({
    ...course,
    rating: (4.0 + Math.random()).toFixed(1),
    students: `${Math.floor(Math.random() * 50 + 10)}k`,
    lessons: course.content?.course?.sections?.length || 0,
    progress: Math.floor(Math.random() * 100), // Mock progress
  }));

  const renderCourseCard = (course) => (
    <TouchableOpacity
      key={course.id}
      style={[styles.courseCard, isDark && styles.courseCardDark]}
      onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
    >
      <Image
        source={{ uri: getCourseHeroImage(course.subjectId) }}
        style={styles.courseHeroImage}
        resizeMode="cover"
      />
      
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <Badge text={course.grade} color={course.color || colors.primary} />
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.ratingText}>{course.rating}</Text>
          </View>
        </View>
        
        <Text style={[styles.courseTitle, isDark && styles.courseTitleDark]} numberOfLines={2}>
          {course.title}
        </Text>
        
        <Text style={[styles.courseSubtitle, isDark && styles.courseSubtitleDark]} numberOfLines={1}>
          {course.teacher}
        </Text>
        
        <View style={styles.courseFooter}>
          <View style={styles.courseInfo}>
            <Ionicons name="people-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.courseInfoText}>{course.students}</Text>
          </View>
          <View style={styles.courseInfo}>
            <Ionicons name="play-circle-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.courseInfoText}>{course.lessons} modules</Text>
          </View>
        </View>
        
        {course.progress !== undefined && (
          <View style={styles.progressSection}>
            <ProgressBar progress={course.progress} height={6} color={colors.primary} />
            <Text style={styles.progressText}>{course.progress}% Complete</Text>
          </View>
        )}
      </View>
      
      <TouchableOpacity style={styles.bookmarkButton}>
        <Ionicons name="bookmark-outline" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userSection}>
          <Avatar
            source={currentUser.avatar}
            size={48}
            name={currentUser.name}
          />
          <View style={styles.userInfo}>
            <Text style={[styles.greeting, isDark && styles.greetingDark]}>
              Salut, {currentUser.name.split(' ')[0]}! 👋
            </Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              Prêt à apprendre ?
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.notificationButton, isDark && styles.notificationButtonDark]}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={isDark ? colors.textDark : colors.text}
          />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, isDark && styles.searchContainerDark]}>
        <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, isDark && styles.searchInputDark]}
          placeholder="Rechercher un cours..."
          placeholderTextColor={colors.textSecondary}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        

        {/* Today's Classes */}
        {(() => {
          const { schedule } = useSchedule();
          const todayClasses = getTodaySchedule(schedule || {});
          const nextClass = getNextClass(todayClasses);
          const currentClass = getCurrentClass(todayClasses);
          
          if (todayClasses.length > 0) {
            return (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
                    Mes cours aujourd'hui
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
                    <Text style={styles.seeAllText}>Voir tout</Text>
                  </TouchableOpacity>
                </View>
                
                {currentClass && (
                  <Card style={[styles.currentClassCard, { backgroundColor: currentClass.color }]}>
                    <View style={styles.currentClassBadge}>
                      <Ionicons name="radio-button-on" size={12} color={colors.white} />
                      <Text style={styles.currentClassBadgeText}>En cours</Text>
                    </View>
                    <Text style={styles.currentClassName}>{currentClass.subject}</Text>
                    <Text style={styles.currentClassTime}>
                      {currentClass.startTime} - {currentClass.endTime}
                    </Text>
                    <View style={styles.currentClassInfo}>
                      <Text style={styles.currentClassDetail}>
                        <Ionicons name="person" size={12} /> {currentClass.teacher}
                      </Text>
                      <Text style={styles.currentClassDetail}>
                        <Ionicons name="location" size={12} /> {currentClass.room}
                      </Text>
                    </View>
                  </Card>
                )}
                
                {nextClass && !currentClass && (
                  <Card style={styles.nextClassCard}>
                    <View style={styles.nextClassHeader}>
                      <View>
                        <Text style={[styles.nextClassLabel, { color: colors.textSecondary }]}>
                          Prochain cours
                        </Text>
                        <Text style={[styles.nextClassName, { color: colors.text }]}>
                          {nextClass.subject}
                        </Text>
                      </View>
                      <View style={[styles.nextClassTime, { backgroundColor: nextClass.color + '20' }]}>
                        <Text style={[styles.nextClassTimeText, { color: nextClass.color }]}>
                          {nextClass.startTime}
                        </Text>
                      </View>
                    </View>
                  </Card>
                )}
              </View>
            );
          }
          return null;
        })()}

        {/* Exam Preparation Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.examCard, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('ExamResources')}
            activeOpacity={0.8}
          >
            <View style={styles.examCardContent}>
              <View style={styles.examCardLeft}>
                <Text style={styles.examCardTitle}>
                  Préparez vos examens
                </Text>
                <Text style={styles.examCardSubtitle}>
                  CEP • BEPC • BAC
                </Text>
                <Text style={styles.examCardDescription}>
                  Cours, exercices et annales corrigées
                </Text>
              </View>
              <View style={styles.examCardIcon}>
                <Ionicons name="school" size={48} color={colors.white} style={{ opacity: 0.9 }} />
              </View>
            </View>
            <View style={styles.examCardBadges}>
              <View style={[styles.examBadge, { backgroundColor: colors.white + '30' }]}>
                <Ionicons name="document-text-outline" size={14} color={colors.white} />
                <Text style={styles.examBadgeText}>Examens</Text>
              </View>
              <View style={[styles.examBadge, { backgroundColor: colors.white + '30' }]}>
                <Ionicons name="create-outline" size={14} color={colors.white} />
                <Text style={styles.examBadgeText}>Exercices</Text>
              </View>
              <View style={[styles.examBadge, { backgroundColor: colors.white + '30' }]}>
                <Ionicons name="checkmark-circle-outline" size={14} color={colors.white} />
                <Text style={styles.examBadgeText}>Corrigés</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>


        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark, {marginLeft: 12, marginBottom: 10}]}>
            Catégories
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.name)}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.name && styles.categoryChipActive,
                  selectedCategory === category.name && { backgroundColor: category.color },
                  isDark && styles.categoryChipDark,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.name && styles.categoryTextActive,
                    isDark && styles.categoryTextDark,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Orientation Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={[styles.orientationCard, isDark && styles.orientationCardDark]}
            onPress={() => navigation.navigate('Orientation')}
          >
            <View style={styles.orientationContent}>
              <Text style={[styles.orientationTitle, isDark && styles.textDark]}>Orientation Scolaire</Text>
              <Text style={[styles.orientationSubtitle, isDark && styles.textSecondaryDark]}>
                Découvre les universités et métiers
              </Text>
            </View>
            <Ionicons name="compass-outline" size={48} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Popular Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              Cours Populaires
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Library')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.coursesGrid}>
            {popularCourses.slice(0, 4).map(renderCourseCard)}
          </View>
        </View>

        {/* Continue Learning */}
        {popularCourses.some(c => c.progress) && (
          <View style={styles.section }>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark, {marginBottom: spacing.md}]}>
              Reprendre
            </Text>
            
            <View style={styles.coursesGrid}>
              {popularCourses.filter(c => c.progress).slice(0, 2).map(renderCourseCard)}
            </View>
          </View>
        )}

        <View style={{ height: spacing.xl }} />
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
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userInfo: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  greeting: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  greetingDark: {
    color: colors.textDark,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  subtitleDark: {
    color: colors.textSecondaryDark,
  },
  notificationButton: {
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
    position: 'relative',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationButtonDark: {
    backgroundColor: colors.gray800,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: colors.danger,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  searchContainerDark: {
    backgroundColor: colors.gray800,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  searchInputDark: {
    color: colors.textDark,
  },
  filterButton: {
    padding: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    paddingHorizontal: spacing.md,
  },
  sectionTitleDark: {
    color: colors.textDark,
  },
  seeAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  categoriesScroll: {
    paddingHorizontal: spacing.md,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    borderColor: 'transparent',
  },
  categoryChipDark: {
    backgroundColor: colors.gray800,
    borderColor: colors.gray700,
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  categoryTextDark: {
    color: colors.textSecondaryDark,
  },
  orientationCard: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  orientationCardDark: {
    backgroundColor: colors.gray800,
  },
  orientationContent: {
    flex: 1,
  },
  orientationTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 4,
  },
  orientationSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  coursesGrid: {
    paddingHorizontal: spacing.md,
  },
  courseCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  courseCardDark: {
    backgroundColor: colors.gray800,
  },
  courseImageContainer: {
    height: 140,
    justifyContent: 'center',
  },
  courseHeroImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
  },
  courseContent: {
    padding: spacing.md,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  courseTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  courseTitleDark: {
    color: colors.textDark,
  },
  courseSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  courseSubtitleDark: {
    color: colors.textSecondaryDark,
  },
  courseFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  courseInfoText: {
    marginLeft: 4,
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  progressSection: {
    marginTop: spacing.md,
  },
  progressText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  bookmarkButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: borderRadius.full,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  examCard: {
    marginHorizontal: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  examCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  examCardLeft: {
    flex: 1,
  },
  examCardTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  examCardSubtitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  examCardDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.white,
    opacity: 0.8,
  },
  examCardIcon: {
    marginLeft: spacing.md,
  },
  examCardBadges: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  examBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  examBadgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
  },
  currentClassCard: {
    marginHorizontal: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
  },
  currentClassBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  currentClassBadgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    textTransform: 'uppercase',
  },
  currentClassName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  currentClassTime: {
    fontSize: typography.fontSize.md,
    color: colors.white,
    opacity: 0.9,
    marginBottom: spacing.md,
  },
  currentClassInfo: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  currentClassDetail: {
    fontSize: typography.fontSize.sm,
    color: colors.white,
    opacity: 0.8,
  },
  nextClassCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  nextClassHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextClassLabel: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
  },
  nextClassName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  nextClassTime: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  nextClassTimeText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
});

export default Home;
