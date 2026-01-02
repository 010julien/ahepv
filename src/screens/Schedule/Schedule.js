import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useSchedule } from '../../contexts/ScheduleContext';
import { getDayName, getDayKey, getTodaySchedule } from '../../data/scheduleData';
import { Card } from '../../components';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const Schedule = ({ navigation }) => {
  const { theme } = useTheme();
  const themeColors = useThemeColors();
  const { schedule, loading } = useSchedule();
  const [viewMode, setViewMode] = useState('week'); // week or day
  const [selectedDay, setSelectedDay] = useState(getDayKey());

  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  const renderClassCard = (classItem) => (
    <Card key={classItem.id} style={[styles.classCard, { borderLeftColor: classItem.color }]}>
      <View style={styles.classTime}>
        <Text style={[styles.timeText, { color: classItem.color }]}>
          {classItem.startTime}
        </Text>
        <View style={[styles.timeDivider, { backgroundColor: classItem.color }]} />
        <Text style={[styles.timeText, { color: classItem.color }]}>
          {classItem.endTime}
        </Text>
      </View>
      
      <View style={styles.classInfo}>
        <Text style={[styles.className, { color: themeColors.text }]}>
          {classItem.subject}
        </Text>
        
        <View style={styles.classDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="person-outline" size={14} color={themeColors.textSecondary} />
            <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
              {classItem.teacher}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={14} color={themeColors.textSecondary} />
            <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
              {classItem.room}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderDaySchedule = (dayKey) => {
    const daySchedule = schedule[dayKey] || [];
    
    if (daySchedule.length === 0) {
      return (
        <View style={styles.emptyDay}>
          <Ionicons name="calendar-outline" size={32} color={themeColors.textSecondary} />
          <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
            Pas de cours
          </Text>
        </View>
      );
    }

    return daySchedule.map(renderClassCard);
  };

  const renderWeekView = () => (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.weekScroll}
    >
      {weekDays.map((day) => (
        <View key={day} style={styles.dayColumn}>
          <View style={styles.dayHeader}>
            <Text style={[styles.dayName, { color: themeColors.text }]}>
              {getDayName(day)}
            </Text>
          </View>
          <ScrollView
            style={styles.dayContent}
            contentContainerStyle={styles.dayContentContainer}
            showsVerticalScrollIndicator={false}
          >
            {renderDaySchedule(day)}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );

  const renderDayView = () => (
    <View style={styles.dayViewContainer}>
      {/* Day Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daySelector}
        contentContainerStyle={styles.daySelectorContent}
      >
        {weekDays.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.daySelectorItem,
              selectedDay === day && [styles.daySelectorItemActive, { backgroundColor: colors.primary }],
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.daySelectorText,
                { color: selectedDay === day ? colors.white : themeColors.textSecondary },
              ]}
            >
              {getDayName(day).substring(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Selected Day Schedule */}
      <ScrollView
        style={styles.dayContent}
        contentContainerStyle={styles.dayContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.selectedDayTitle, { color: themeColors.text }]}>
          {getDayName(selectedDay)}
        </Text>
        {renderDaySchedule(selectedDay)}
      </ScrollView>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.loadingText, { color: themeColors.text }]}>Chargement...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Emploi du temps
        </Text>
        
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'week' && [styles.toggleButtonActive, { backgroundColor: colors.primary }],
            ]}
            onPress={() => setViewMode('week')}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color={viewMode === 'week' ? colors.white : themeColors.textSecondary}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'day' && [styles.toggleButtonActive, { backgroundColor: colors.primary }],
            ]}
            onPress={() => setViewMode('day')}
          >
            <Ionicons
              name="today-outline"
              size={20}
              color={viewMode === 'day' ? colors.white : themeColors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {viewMode === 'week' ? renderWeekView() : renderDayView()}
    </SafeAreaView>
  );
};

export default Schedule;

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
  viewToggle: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  toggleButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  toggleButtonActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  weekScroll: {
    flex: 1,
  },
  dayColumn: {
    width: 320,
    paddingHorizontal: spacing.sm,
  },
  dayHeader: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  dayName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  dayContent: {
    flex: 1,
  },
  dayContentContainer: {
    padding: spacing.md,
  },
  classCard: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  classTime: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  timeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  timeDivider: {
    width: 20,
    height: 2,
    marginVertical: spacing.xs,
  },
  classInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  className: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  classDetails: {
    gap: spacing.xs,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    fontSize: typography.fontSize.sm,
  },
  emptyDay: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    marginTop: spacing.md,
  },
  dayViewContainer: {
    flex: 1,
  },
  daySelector: {
    maxHeight: 60,
  },
  daySelectorContent: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  daySelectorItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    minWidth: 60,
    alignItems: 'center',
  },
  daySelectorItemActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  daySelectorText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  selectedDayTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: spacing.xl,
    fontSize: typography.fontSize.lg,
  },
});
