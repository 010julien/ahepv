import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { publicUniversities } from '../../data/mockData';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const UniversitySelection = ({ navigation }) => {
  const { theme } = useTheme();
  const themeColors = useThemeColors();
  const { userProfile, setUserProfile } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  const handleUniversitySelect = async (university) => {
    const updatedProfile = {
      ...userProfile,
      university: {
        name: university.name,
        location: university.location,
        type: 'public',
      },
    };
    await setUserProfile(updatedProfile);
    // Navigation will automatically redirect to main app
  };

  const filteredUniversities = publicUniversities.filter((uni) =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        
        <Text style={[styles.title, { color: themeColors.text }]}>
          Sélectionnez votre université
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: themeColors.card }]}>
        <Ionicons name="search-outline" size={20} color={themeColors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: themeColors.text }]}
          placeholder="Rechercher une université..."
          placeholderTextColor={themeColors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredUniversities.map((university) => (
          <TouchableOpacity
            key={university.id}
            style={[styles.universityCard, { backgroundColor: themeColors.card }]}
            onPress={() => handleUniversitySelect(university)}
            activeOpacity={0.7}
          >
            <View style={[styles.universityIcon, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="school" size={28} color={colors.primary} />
            </View>
            
            <View style={styles.universityInfo}>
              <Text style={[styles.universityName, { color: themeColors.text }]}>
                {university.name}
              </Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={14} color={themeColors.textSecondary} />
                <Text style={[styles.universityLocation, { color: themeColors.textSecondary }]}>
                  {university.location}
                </Text>
              </View>
              {university.faculties && (
                <Text style={[styles.facultiesText, { color: themeColors.textSecondary }]}>
                  {university.faculties.length} facultés
                </Text>
              )}
            </View>
            
            <Ionicons name="chevron-forward" size={24} color={colors.primary} />
          </TouchableOpacity>
        ))}
        
        {filteredUniversities.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color={themeColors.textSecondary} />
            <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
              Aucune université trouvée
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UniversitySelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  backButton: {
    marginRight: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
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
    paddingVertical: spacing.xs,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  universityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  universityIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  universityInfo: {
    flex: 1,
  },
  universityName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  universityLocation: {
    fontSize: typography.fontSize.sm,
    marginLeft: spacing.xs,
  },
  facultiesText: {
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
