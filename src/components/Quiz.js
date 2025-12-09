import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { colors, typography, spacing, borderRadius } from '../theme';
import Button from './Button';

const Quiz = ({ questions, onComplete }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
      if (onComplete) {
        onComplete(score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0));
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <View style={[styles.container, isDark && styles.containerDark]}>
        <View style={styles.resultContainer}>
          <Ionicons 
            name={score > questions.length / 2 ? "trophy" : "alert-circle"} 
            size={64} 
            color={score > questions.length / 2 ? colors.warning : colors.error} 
          />
          <Text style={[styles.resultTitle, isDark && styles.textDark]}>
            Quiz Terminé !
          </Text>
          <Text style={[styles.resultScore, isDark && styles.textSecondaryDark]}>
            Votre score : {score} / {questions.length}
          </Text>
          <Button title="Réessayer" onPress={handleRetry} style={styles.retryButton} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.progressContainer}>
        <Text style={[styles.progressText, isDark && styles.textSecondaryDark]}>
          Question {currentQuestionIndex + 1} / {questions.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.questionText, isDark && styles.textDark]}>
          {currentQuestion.question}
        </Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isDark && styles.optionButtonDark,
                selectedOption === index && styles.optionButtonSelected,
              ]}
              onPress={() => handleOptionSelect(index)}
            >
              <View style={[
                styles.optionCircle,
                selectedOption === index && styles.optionCircleSelected
              ]}>
                {selectedOption === index && <View style={styles.optionCircleInner} />}
              </View>
              <Text style={[
                styles.optionText,
                isDark && styles.textDark,
                selectedOption === index && styles.optionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title={currentQuestionIndex === questions.length - 1 ? "Terminer" : "Suivant"} 
          onPress={handleNext}
          disabled={selectedOption === null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  containerDark: {
    backgroundColor: colors.gray800,
  },
  progressContainer: {
    marginBottom: spacing.lg,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.gray200,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  content: {
    flexGrow: 1,
  },
  questionText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  optionsContainer: {
    gap: spacing.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundLight,
  },
  optionButtonDark: {
    borderColor: colors.gray700,
    backgroundColor: colors.gray900,
  },
  optionButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '20', // 20% opacity
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray400,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCircleSelected: {
    borderColor: colors.primary,
  },
  optionCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    flex: 1,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  footer: {
    marginTop: spacing.xl,
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  resultTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  resultScore: {
    fontSize: typography.fontSize.xl,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  retryButton: {
    minWidth: 150,
  },
  textDark: {
    color: colors.textDark,
  },
  textSecondaryDark: {
    color: colors.textSecondaryDark,
  },
});

export default Quiz;
