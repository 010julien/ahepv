import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { curriculum } from '../../data/curriculum';
import { Card, ProgressBar, Quiz, Button, Badge } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../theme';

const CourseDetail = ({ route, navigation }) => {
  const { courseId } = route.params || {};
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const course = curriculum.courses.find(c => c.id === courseId);
  const [activeTab, setActiveTab] = useState('course'); // 'course', 'exercises', 'quiz'
  const [revealedAnswers, setRevealedAnswers] = useState({});

  if (!course) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
        <View style={styles.center}>
          <Text style={[styles.errorText, isDark && styles.errorTextDark]}>Cours introuvable</Text>
          <Button title="Retour" onPress={() => navigation.goBack()} style={{ marginTop: spacing.md }} />
        </View>
      </SafeAreaView>
    );
  }

  const toggleAnswer = (exerciseIndex, questionIndex) => {
    const key = `${exerciseIndex}-${questionIndex}`;
    setRevealedAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderCourseContent = () => (
    <ScrollView contentContainerStyle={styles.tabContent}>
      {course.content.course.sections.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <Text style={[styles.sectionHeader, isDark && styles.textDark]}>{section.title}</Text>
          <Card style={[styles.sectionCard, isDark && styles.sectionCardDark]}>
            <Text style={[styles.sectionBody, isDark && styles.textSecondaryDark]}>{section.content}</Text>
          </Card>
        </View>
      ))}
    </ScrollView>
  );

  const renderExercisesContent = () => (
    <ScrollView contentContainerStyle={styles.tabContent}>
      {course.content.exercises.map((level, lvlIndex) => (
        <View key={lvlIndex} style={styles.sectionContainer}>
          <Badge text={level.level} color={colors.primary} style={{ alignSelf: 'flex-start', marginBottom: spacing.sm }} />
          {level.questions.map((q, qIndex) => (
            <Card key={qIndex} style={[styles.exerciseCard, isDark && styles.sectionCardDark]}>
              <Text style={[styles.questionText, isDark && styles.textDark]}>{q.q}</Text>
              
              {revealedAnswers[`${lvlIndex}-${qIndex}`] ? (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerLabel}>Réponse :</Text>
                  <Text style={[styles.answerText, isDark && styles.textDark]}>{q.a}</Text>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.showAnswerButton}
                  onPress={() => toggleAnswer(lvlIndex, qIndex)}
                >
                  <Text style={styles.showAnswerText}>Voir la réponse</Text>
                  <Ionicons name="eye-outline" size={16} color={colors.primary} />
                </TouchableOpacity>
              )}
            </Card>
          ))}
        </View>
      ))}
    </ScrollView>
  );

  const renderQuizContent = () => (
    <View style={styles.tabContent}>
      <Quiz 
        questions={course.content.quiz}
        onComplete={(score) => console.log('Quiz completed:', score)}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDark ? colors.white : colors.black} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textDark]} numberOfLines={1}>
          {course.title}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Hero Section (Small) */}
      <View style={styles.miniHero}>
        <View style={styles.heroInfo}>
          <Text style={[styles.heroGrade, { color: course.color }]}>{course.grade} • {course.series ? `Série ${course.series}` : course.subjectId.split('_')[0].toUpperCase()}</Text>
          <Text style={[styles.heroTeacher, isDark && styles.textSecondaryDark]}>Prof. {course.teacher}</Text>
        </View>
        <View style={[styles.iconContainer, { backgroundColor: course.color + '20' }]}>
           <Ionicons name={course.icon} size={32} color={course.color} />
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, isDark && { borderBottomColor: colors.gray700 }]}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'course' && styles.activeTab]} 
          onPress={() => setActiveTab('course')}
        >
          <Text style={[styles.tabText, activeTab === 'course' && styles.activeTabText, isDark && styles.textDark]}>Cours</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'exercises' && styles.activeTab]} 
          onPress={() => setActiveTab('exercises')}
        >
          <Text style={[styles.tabText, activeTab === 'exercises' && styles.activeTabText, isDark && styles.textDark]}>Exercices</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'quiz' && styles.activeTab]} 
          onPress={() => setActiveTab('quiz')}
        >
          <Text style={[styles.tabText, activeTab === 'quiz' && styles.activeTabText, isDark && styles.textDark]}>Quiz</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {activeTab === 'course' && renderCourseContent()}
        {activeTab === 'exercises' && renderExercisesContent()}
        {activeTab === 'quiz' && renderQuizContent()}
      </View>
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  errorTextDark: {
    color: colors.textSecondaryDark,
  },
  hero: {
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: 'rgba(0,0,0,0.6)', // Fallback for gradient
  },
  heroTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    fontSize: typography.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    padding: spacing.md,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 24,
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
  resource: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceIcon: {
    backgroundColor: colors.primaryLight + '20',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginRight: spacing.md,
  },
  resourceIconDark: {
    backgroundColor: colors.gray700,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: 2,
  },
  resourceTitleDark: {
    color: colors.textDark,
  },
  resourceMeta: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  resourceMetaDark: {
    color: colors.textSecondaryDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.backgroundLight,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: spacing.xs,
  },
  miniHero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  heroInfo: {
    flex: 1,
  },
  heroGrade: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    marginBottom: 2,
  },
  heroTeacher: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.backgroundLight,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  tabContent: {
    padding: spacing.md,
    paddingBottom: spacing['3xl'],
  },
  sectionContainer: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionCard: {
    padding: spacing.md,
  },
  sectionCardDark: {
    backgroundColor: colors.gray800,
  },
  sectionBody: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    lineHeight: 24,
  },
  exerciseCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  questionText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.md,
  },
  showAnswerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    backgroundColor: colors.primary + '10',
    borderRadius: borderRadius.md,
  },
  showAnswerText: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
    marginRight: spacing.sm,
  },
  answerContainer: {
    marginTop: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.success + '10',
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  answerLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.success,
    marginBottom: 2,
  },
  answerText: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    fontWeight: typography.fontWeight.medium,
  },
  textDark: {
    color: colors.textDark,
  },
  textSecondaryDark: {
    color: colors.textSecondaryDark,
  },
});

export default CourseDetail;
