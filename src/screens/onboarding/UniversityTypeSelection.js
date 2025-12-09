import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const UniversityTypeSelection = ({ navigation }) => {
  const { theme } = useTheme();
  const themeColors = useThemeColors();
  const { userProfile, setUserProfile } = useUser();

  const handleTypeSelect = async (type) => {
    const updatedProfile = { ...userProfile, universityType: type };
    await setUserProfile(updatedProfile);
    
    if (type === 'public') {
      navigation.navigate('UniversitySelection');
    } else {
      navigation.navigate('PrivateUniversityInput');
    }
  };

  const types = [
    {
      id: 'public',
      title: 'Université Publique',
      subtitle: 'Établissement public togolais',
      description: 'Sélectionnez votre université dans la liste',
      icon: 'business-outline',
      color: colors.primary,
    },
    {
      id: 'private',
      title: 'Université Privée',
      subtitle: 'Établissement privé',
      description: 'Saisissez le nom de votre établissement',
      icon: 'school-outline',
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
            <Ionicons name="briefcase-outline" size={40} color={colors.primary} />
          </View>
          
          <Text style={[styles.title, { color: themeColors.text }]}>
            Type d'université
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Publique ou privée ?
          </Text>
        </View>

        {/* Type Cards */}
        <View style={styles.typesContainer}>
          {types.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                { backgroundColor: themeColors.card },
              ]}
              onPress={() => handleTypeSelect(type.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.typeIconContainer, { backgroundColor: type.color + '20' }]}>
                <Ionicons name={type.icon} size={40} color={type.color} />
              </View>
              
              <Text style={[styles.typeTitle, { color: themeColors.text }]}>
                {type.title}
              </Text>
              <Text style={[styles.typeSubtitle, { color: type.color }]}>
                {type.subtitle}
              </Text>
              <Text style={[styles.typeDescription, { color: themeColors.textSecondary }]}>
                {type.description}
              </Text>
              
              <View style={styles.arrow}>
                <Ionicons name="arrow-forward" size={24} color={type.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UniversityTypeSelection;

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
  typesContainer: {
    gap: spacing.md,
  },
  typeCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
    minHeight: 200,
    justifyContent: 'center',
  },
  typeIconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  typeTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  typeSubtitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  typeDescription: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
  },
});
