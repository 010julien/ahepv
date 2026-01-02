import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { gradesList } from '../../data/mockData';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const GradeSelection = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeColors = useThemeColors();
  const { userProfile, setUserProfile } = useUser();

  const grades = userProfile?.level === 'college' 
    ? gradesList.college 
    : gradesList.lycee;

  const handleGradeSelect = async (grade) => {
    const updatedProfile = { 
      ...userProfile, 
      grade: grade.name,
      gradeId: grade.id,
      series: grade.series || null,
    };
    
    await setUserProfile(updatedProfile);
    // Navigation will automatically go to main app since onboarding is complete
  };

  const getGradeIcon = (gradeId) => {
    if (gradeId.includes('6eme') || gradeId.includes('5eme')) return 'book-outline';
    if (gradeId.includes('4eme') || gradeId.includes('3eme')) return 'bookmarks-outline';
    if (gradeId.includes('seconde')) return 'school-outline';
    if (gradeId.includes('1ere')) return 'library-outline';
    return 'trophy-outline'; // Terminale
  };

  const getGradeColor = (gradeId) => {
    if (gradeId.includes('6eme') || gradeId.includes('5eme')) return colors.info;
    if (gradeId.includes('4eme') || gradeId.includes('3eme')) return colors.success;
    if (gradeId.includes('seconde')) return colors.warning;
    if (gradeId.includes('1ere')) return colors.secondary;
    return colors.primary; // Terminale
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={themeColors.text} />
          </TouchableOpacity>
          
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="ribbon-outline" size={40} color={colors.primary} />
          </View>
          
          <Text style={[styles.title, { color: themeColors.text }]}>
            Votre classe
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Sélectionnez votre classe actuelle
          </Text>
        </View>

        {/* Grade Cards */}
        <View style={styles.gradesContainer}>
          {grades.map((grade) => {
            const icon = getGradeIcon(grade.id);
            const gradeColor = getGradeColor(grade.id);
            
            return (
              <TouchableOpacity
                key={grade.id}
                style={[
                  styles.gradeCard,
                  { backgroundColor: themeColors.card },
                ]}
                onPress={() => handleGradeSelect(grade)}
                activeOpacity={0.7}
              >
                <View style={[styles.gradeIconContainer, { backgroundColor: gradeColor + '20' }]}>
                  <Ionicons name={icon} size={28} color={gradeColor} />
                </View>
                
                <View style={styles.gradeContent}>
                  <Text style={[styles.gradeTitle, { color: themeColors.text }]}>
                    {grade.name}
                  </Text>
                  {grade.series && (
                    <View style={[styles.seriesBadge, { backgroundColor: gradeColor + '20' }]}>
                      <Text style={[styles.seriesText, { color: gradeColor }]}>
                        Série {grade.series}
                      </Text>
                    </View>
                  )}
                </View>
                
                <Ionicons name="chevron-forward" size={24} color={gradeColor} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GradeSelection;

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
    marginTop: spacing.md,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: spacing.sm,
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
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
  gradesContainer: {
    gap: spacing.sm,
  },
  gradeCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gradeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  gradeContent: {
    flex: 1,
  },
  gradeTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  seriesBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  seriesText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
});
