import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const LevelSelection = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeColors = useThemeColors();
  const { userProfile, setUserProfile } = useUser();

  const handleLevelSelect = async (level) => {
    const updatedProfile = { ...userProfile, level };
    await setUserProfile(updatedProfile);
    
    if (level === 'university') {
      // Navigate to university type selection
      navigation.navigate('UniversityTypeSelection');
    } else if (level === 'college' || level === 'lycee') {
      // Navigate to grade/class selection for collège and lycée
      navigation.navigate('GradeSelection');
    }
  };

  const levels = [
    {
      id: 'college',
      title: 'Collège',
      subtitle: '6ème - 3ème',
      description: 'Programme du collège (CEP, BEPC)',
      icon: 'book-outline',
      color: colors.info,
    },
    {
      id: 'lycee',
      title: 'Lycée',
      subtitle: '2nde - Terminale',
      description: 'Préparation au BAC (A, C, D)',
      icon: 'school-outline',
      color: colors.primary,
    },
    {
      id: 'university',
      title: 'Étudiant',
      subtitle: 'Université',
      description: 'Enseignement supérieur',
      icon: 'library-outline',
      color: colors.secondary,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={themeColors.text} />
          </TouchableOpacity>
          
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="school-outline" size={40} color={colors.primary} />
          </View>
          
          <Text style={[styles.title, { color: themeColors.text }]}>
            Votre niveau d'études
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Sélectionnez votre niveau actuel
          </Text>
        </View>

        {/* Level Cards */}
        <View style={styles.levelsContainer}>
          {levels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelCard,
                { backgroundColor: themeColors.card },
              ]}
              onPress={() => handleLevelSelect(level.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.levelIconContainer, { backgroundColor: level.color + '20' }]}>
                <Ionicons name={level.icon} size={32} color={level.color} />
              </View>
              
              <View style={styles.levelContent}>
                <Text style={[styles.levelTitle, { color: themeColors.text }]}>
                  {level.title}
                </Text>
                <Text style={[styles.levelSubtitle, { color: level.color }]}>
                  {level.subtitle}
                </Text>
                <Text style={[styles.levelDescription, { color: themeColors.textSecondary }]}>
                  {level.description}
                </Text>
              </View>
              
              <Ionicons name="chevron-forward" size={24} color={level.color} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LevelSelection;

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
  levelsContainer: {
    gap: spacing.md,
  },
  levelCard: {
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
  levelIconContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  levelContent: {
    flex: 1,
  },
  levelTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  levelSubtitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  levelDescription: {
    fontSize: typography.fontSize.sm,
  },
});
