import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { examResources, filterExamResources, getAvailableYears, getExamTypes } from '../../data/examResources';
import { Card, Badge } from '../../components';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const ExamResources = ({ navigation }) => {
  const { theme } = useTheme();
  const themeColors = useThemeColors();
  const [activeTab, setActiveTab] = useState('exams'); // exams, exercises, courses
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    level: null,
    subject: null,
    year: null,
    examType: null,
    grade: null,
  });

  const tabs = [
    { id: 'exams', label: 'Examens', icon: 'document-text-outline' },
    { id: 'exercises', label: 'Exercices', icon: 'create-outline' },
    { id: 'courses', label: 'Cours', icon: 'book-outline' },
  ];

  const getResourcesByTab = () => {
    switch (activeTab) {
      case 'exams':
        return filterExamResources(examResources.pastExams, filters);
      case 'exercises':
        return filterExamResources(examResources.exercises, filters);
      case 'courses':
        return filterExamResources(examResources.courses, filters);
      default:
        return [];
    }
  };

  const resources = getResourcesByTab().filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (resource) => {
    // TODO: Implement PDF download/view
    console.log('Download:', resource.title);
  };

  const renderResourceCard = (resource) => {
    const isExam = resource.type === 'exam';
    const isExercise = resource.type === 'exercise';
    
    return (
      <Card key={resource.id} style={styles.resourceCard}>
        <View style={styles.resourceHeader}>
          <View style={styles.resourceTitleContainer}>
            {isExam && (
              <Badge
                text={resource.examType}
                color={colors.danger}
                style={styles.examBadge}
              />
            )}
            <Text style={[styles.resourceTitle, { color: themeColors.text }]}>
              {resource.title}
            </Text>
          </View>
          
          <TouchableOpacity
            style={[styles.downloadButton, { backgroundColor: colors.primary }]}
            onPress={() => handleDownload(resource)}
          >
            <Ionicons name="download-outline" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.resourceMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={16} color={themeColors.textSecondary} />
            <Text style={[styles.metaText, { color: themeColors.textSecondary }]}>
              {resource.year || 'N/A'}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={themeColors.textSecondary} />
            <Text style={[styles.metaText, { color: themeColors.textSecondary }]}>
              {resource.duration || 'N/A'}
            </Text>
          </View>
          
          {resource.grade && (
            <View style={styles.metaItem}>
              <Ionicons name="school-outline" size={16} color={themeColors.textSecondary} />
              <Text style={[styles.metaText, { color: themeColors.textSecondary }]}>
                {resource.grade}
              </Text>
            </View>
          )}
        </View>

        {resource.topics && (
          <View style={styles.topicsContainer}>
            {resource.topics.slice(0, 3).map((topic, index) => (
              <View
                key={index}
                style={[styles.topicChip, { backgroundColor: colors.primary + '20' }]}
              >
                <Text style={[styles.topicText, { color: colors.primary }]}>
                  {topic}
                </Text>
              </View>
            ))}
            {resource.topics.length > 3 && (
              <Text style={[styles.moreTopics, { color: themeColors.textSecondary }]}>
                +{resource.topics.length - 3}
              </Text>
            )}
          </View>
        )}

        {resource.hasCorrection && (
          <TouchableOpacity
            style={styles.correctionButton}
            onPress={() => handleDownload({ ...resource, pdfUrl: resource.correctionUrl })}
          >
            <Ionicons name="checkmark-circle-outline" size={16} color={colors.success} />
            <Text style={[styles.correctionText, { color: colors.success }]}>
              Voir la correction
            </Text>
          </TouchableOpacity>
        )}
      </Card>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Préparation aux Examens
        </Text>
        <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filterButton}>
          <Ionicons name="filter-outline" size={24} color={themeColors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: themeColors.card }]}>
        <Ionicons name="search-outline" size={20} color={themeColors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: themeColors.text }]}
          placeholder="Rechercher..."
          placeholderTextColor={themeColors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && [styles.tabActive, { backgroundColor: colors.primary }],
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={activeTab === tab.id ? colors.white : themeColors.textSecondary}
            />
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab.id ? colors.white : themeColors.textSecondary },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Resources List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {resources.length > 0 ? (
          resources.map(renderResourceCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={64} color={themeColors.textSecondary} />
            <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
              Aucune ressource trouvée
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExamResources;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    flex: 1,
    textAlign: 'center',
  },
  filterButton: {
    padding: spacing.xs,
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  tabActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  resourceCard: {
    marginBottom: spacing.md,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  resourceTitleContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  examBadge: {
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  resourceTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  downloadButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  resourceMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.fontSize.sm,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  topicChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  topicText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  moreTopics: {
    fontSize: typography.fontSize.xs,
    alignSelf: 'center',
  },
  correctionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.sm,
  },
  correctionText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
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
