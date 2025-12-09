import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { orientationData } from '../../data/mockData';
import { Card, Badge, Button } from '../../components';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const Orientation = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = useThemeColors();
  const [activeTab, setActiveTab] = useState('universities');

  const renderUniversityCard = (item) => (
    <Card key={item.id} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, isDark && styles.textDark]}>{item.name}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.locationText, isDark && styles.textSecondaryDark]}>{item.location}</Text>
        </View>
        <Text style={[styles.cardDescription, isDark && styles.textSecondaryDark]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.tagsContainer}>
          {item.faculties.slice(0, 3).map((faculty, index) => (
            <Badge key={index} text={faculty} variant="secondary" style={styles.tag} />
          ))}
          {item.faculties.length > 3 && (
            <Badge text={`+${item.faculties.length - 3}`} variant="secondary" style={styles.tag} />
          )}
        </View>
        <Button title="Voir détails" variant="outline" style={styles.cardButton} onPress={() => {}} />
      </View>
    </Card>
  );

  const renderMajorCard = (item) => (
    <Card key={item.id} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.majorHeader}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="school-outline" size={24} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, isDark && styles.textDark]}>{item.title}</Text>
            <Text style={[styles.categoryText, { color: colors.primary }]}>{item.category}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.infoText, isDark && styles.textSecondaryDark]}>Durée: {item.duration}</Text>
        </View>

        <Text style={[styles.sectionLabel, isDark && styles.textDark]}>Débouchés:</Text>
        <View style={styles.tagsContainer}>
          {item.careers.map((career, index) => (
            <Badge key={index} text={career} variant="success" style={styles.tag} />
          ))}
        </View>
      </View>
    </Card>
  );

  const renderCareerCard = (item) => (
    <Card key={item.id} style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, isDark && styles.textDark]}>{item.title}</Text>
        <Text style={[styles.categoryText, { color: colors.secondary }]}>{item.sector}</Text>
        
        <Text style={[styles.cardDescription, isDark && styles.textSecondaryDark]}>{item.description}</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={16} color={colors.success} />
          <Text style={[styles.infoText, isDark && styles.textSecondaryDark]}>Salaire: {item.salary}</Text>
        </View>

        <Text style={[styles.sectionLabel, isDark && styles.textDark]}>Études requises:</Text>
        {item.requiredStudies.map((study, index) => (
          <View key={index} style={styles.studyItem}>
            <Ionicons name="checkmark-circle-outline" size={16} color={colors.primary} />
            <Text style={[styles.studyText, isDark && styles.textSecondaryDark]}>{study}</Text>
          </View>
        ))}
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDark ? colors.white : colors.black} />
        </TouchableOpacity>
        <Text style={[styles.heading, isDark && styles.textDark]}>Orientation</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'universities' && styles.activeTab]} 
            onPress={() => setActiveTab('universities')}
          >
            <Text style={[styles.tabText, activeTab === 'universities' && styles.activeTabText]}>Universités</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'majors' && styles.activeTab]} 
            onPress={() => setActiveTab('majors')}
          >
            <Text style={[styles.tabText, activeTab === 'majors' && styles.activeTabText]}>Filières</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'careers' && styles.activeTab]} 
            onPress={() => setActiveTab('careers')}
          >
            <Text style={[styles.tabText, activeTab === 'careers' && styles.activeTabText]}>Métiers</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'universities' && orientationData.universities.map(renderUniversityCard)}
        {activeTab === 'majors' && orientationData.majors.map(renderMajorCard)}
        {activeTab === 'careers' && orientationData.careers.map(renderCareerCard)}
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
  backButton: {
    padding: spacing.xs,
  },
  heading: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingVertical: spacing.sm,
    marginRight: spacing.lg,
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
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing['3xl'],
  },
  card: {
    marginBottom: spacing.lg,
    overflow: 'hidden',
    padding: 0,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: spacing.md,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  locationText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  cardDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  tag: {
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  cardButton: {
    marginTop: spacing.xs,
  },
  majorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  sectionLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  studyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  studyText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  textDark: {
    color: colors.textDark,
  },
  textSecondaryDark: {
    color: colors.textSecondaryDark,
  },
});

export default Orientation;
