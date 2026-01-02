import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { Button } from '../../components';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const PrivateUniversityInput = ({ navigation }) => {
  const { theme } = useTheme();
  const themeColors = useThemeColors();
  const { userProfile, setUserProfile } = useUser();
  const [universityName, setUniversityName] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSubmit = async () => {
    if (!universityName.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer le nom de votre université');
      return;
    }

    const updatedProfile = {
      ...userProfile,
      university: {
        name: universityName.trim(),
        studentId: studentId.trim() || null,
        type: 'private',
      },
    };
    
    await setUserProfile(updatedProfile);
    // Navigation will automatically redirect to main app
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
              <Ionicons name="pencil-outline" size={40} color={colors.secondary} />
            </View>
            
            <Text style={[styles.title, { color: themeColors.text }]}>
              Votre université privée
            </Text>
            <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
              Entrez les informations de votre établissement
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Nom de l'université *
              </Text>
              <View style={[styles.inputContainer, { backgroundColor: themeColors.card }]}>
                <Ionicons name="school-outline" size={20} color={themeColors.textSecondary} />
                <TextInput
                  style={[styles.input, { color: themeColors.text }]}
                  placeholder="Ex: Institut Supérieur de Technologie"
                  placeholderTextColor={themeColors.textSecondary}
                  value={universityName}
                  onChangeText={setUniversityName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Numéro d'étudiant (optionnel)
              </Text>
              <View style={[styles.inputContainer, { backgroundColor: themeColors.card }]}>
                <Ionicons name="card-outline" size={20} color={themeColors.textSecondary} />
                <TextInput
                  style={[styles.input, { color: themeColors.text }]}
                  placeholder="Ex: 2024-UL-123456"
                  placeholderTextColor={themeColors.textSecondary}
                  value={studentId}
                  onChangeText={setStudentId}
                />
              </View>
            </View>

            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={20} color={colors.info} />
              <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
                Ces informations nous aideront à personnaliser votre  expérience sur TogoSchool
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View style={[styles.footer, { backgroundColor: themeColors.background }]}>
          <Button
            title="Continuer"
            onPress={handleSubmit}
            disabled={!universityName.trim()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PrivateUniversityInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.md,
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
    paddingHorizontal: spacing.md,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.md,
    paddingVertical: spacing.xs,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.info + '10',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  infoText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    marginLeft: spacing.sm,
    lineHeight: 20,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
});
