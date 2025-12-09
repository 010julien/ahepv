import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { grades, performanceHistory, attendanceHistory } from '../../data/mockData';
import { Card, ProgressBar, Badge, Button } from '../../components';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';
import ReportCard from './ReportCard';

const { width } = Dimensions.get('window');

const Grades = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = useThemeColors();
  const [activeTab, setActiveTab] = useState('grades');
  const [modalVisible, setModalVisible] = useState(false);
  const [reportCardVisible, setReportCardVisible] = useState(false);
  const [newGrade, setNewGrade] = useState({ subject: '', score: '', coefficient: '' });
  const [gradesList, setGradesList] = useState(grades);

  const handleAddGrade = () => {
    if (newGrade.subject && newGrade.score) {
      const newItem = {
        id: Math.random().toString(),
        subject: newGrade.subject,
        grade: parseFloat(newGrade.score),
        coefficient: parseFloat(newGrade.coefficient) || 1,
        average: 12, // Mock average
        rank: 5, // Mock rank
        date: new Date().toISOString().split('T')[0],
      };
      setGradesList([newItem, ...gradesList]);
      setModalVisible(false);
      setNewGrade({ subject: '', score: '', coefficient: '' });
    }
  };

  const renderGradeCard = (item) => (
    <Card key={item.id} style={styles.gradeCard}>
      <View style={styles.gradeHeader}>
        <View style={styles.subjectInfo}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="book-outline" size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.subjectName, isDark && styles.textDark]}>{item.subject}</Text>
            <Text style={[styles.gradeDate, isDark && styles.textSecondaryDark]}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.gradeBadge}>
          <Text style={styles.gradeValue}>{item.grade}<Text style={styles.gradeMax}>/20</Text></Text>
        </View>
      </View>
      
      <View style={[styles.gradeDetails, isDark && {backgroundColor: colors.gray700}]}>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDark && styles.textSecondaryDark]}>Coef.</Text>
          <Text style={[styles.detailValue, isDark && styles.textDark]}>{item.coefficient}</Text>
        </View>
        <View style={[styles.detailDivider, isDark && {backgroundColor: colors.gray600}]} />
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDark && styles.textSecondaryDark]}>Moy. Classe</Text>
          <Text style={[styles.detailValue, isDark && styles.textDark]}>{item.average}</Text>
        </View>
        <View style={[styles.detailDivider, isDark && {backgroundColor: colors.gray600}]} />
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDark && styles.textSecondaryDark]}>Rang</Text>
          <Text style={[styles.detailValue, isDark && styles.textDark]}>{item.rank}ème</Text>
        </View>
      </View>

      {item.assignments && (
        <View style={[styles.assignmentsList, isDark && {borderTopColor: colors.gray600}]}>
          <Text style={[styles.assignmentsTitle, isDark && styles.textSecondaryDark]}>Derniers devoirs:</Text>
          {item.assignments.map((assignment, index) => (
            <View key={index} style={styles.assignmentItem}>
              <Text style={[styles.assignmentName, isDark && styles.textDark]}>{assignment.name}</Text>
              <Text style={[styles.assignmentGrade, isDark && styles.textDark]}>{assignment.grade}/20</Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );

  const renderAttendanceItem = (item) => {
    let statusColor = colors.success;
    let statusIcon = 'checkmark-circle';
    let statusText = 'Présent';

    if (item.status === 'absent') {
      statusColor = colors.danger;
      statusIcon = 'close-circle';
      statusText = 'Absent';
    } else if (item.status === 'late') {
      statusColor = colors.warning;
      statusIcon = 'time';
      statusText = 'Retard';
    }

    return (
      <Card key={item.id} style={styles.attendanceCard}>
        <View style={styles.attendanceRow}>
          <View style={styles.attendanceInfo}>
            <Text style={[styles.attendanceDate, isDark && styles.textSecondaryDark]}>{item.date} • {item.time}</Text>
            <Text style={[styles.attendanceSubject, isDark && styles.textDark]}>{item.subject}</Text>
            {item.note && <Text style={[styles.attendanceNote, isDark && styles.textSecondaryDark]}>{item.note}</Text>}
            {item.justified && <Badge text="Justifié" variant="success" style={{ marginTop: 4 }} />}
          </View>
          <View style={styles.attendanceStatus}>
            <Ionicons name={statusIcon} size={24} color={statusColor} />
            <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.heading, isDark && styles.textDark]}>Suivi Scolaire</Text>
        <View style={styles.headerButtons}>
          {activeTab === 'grades' && (
            <>
              <TouchableOpacity 
                style={[styles.iconButton, { marginRight: spacing.sm }]} 
                onPress={() => setReportCardVisible(true)}
              >
                <Ionicons name="document-text-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={24} color={colors.white} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, isDark && {borderBottomColor: colors.gray700}]}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'grades' && styles.activeTab, isDark && activeTab === 'grades' && {borderBottomColor: colors.primary}]} 
          onPress={() => setActiveTab('grades')}
        >
          <Text style={[styles.tabText, activeTab === 'grades' && styles.activeTabText, isDark && styles.textDark, isDark && activeTab === 'grades' && {color: colors.primary}]}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'attendance' && styles.activeTab, isDark && activeTab === 'attendance' && {borderBottomColor: colors.primary}]} 
          onPress={() => setActiveTab('attendance')}
        >
          <Text style={[styles.tabText, activeTab === 'attendance' && styles.activeTabText, isDark && styles.textDark, isDark && activeTab === 'attendance' && {color: colors.primary}]}>Présence</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'grades' ? (
          <>
            {/* Performance Chart Placeholder */}
            <Card style={styles.chartCard}>
              <Text style={[styles.chartTitle, isDark && styles.textDark]}>Moyenne Générale</Text>
              <View style={styles.chartContainer}>
                {performanceHistory.map((item, index) => (
                  <View key={index} style={styles.chartBarContainer}>
                    <View style={[styles.chartBar, { height: item.average * 5, backgroundColor: colors.primary }]} />
                    <Text style={[styles.chartLabel, isDark && styles.textSecondaryDark]}>{item.period}</Text>
                    <Text style={[styles.chartValue, isDark && styles.textDark]}>{item.average}</Text>
                  </View>
                ))}
              </View>
            </Card>

            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Détails par matière</Text>
            {gradesList.map(renderGradeCard)}
          </>
        ) : (
          <>
            {/* Attendance Summary */}
            <View style={styles.attendanceSummary}>
              <Card style={styles.summaryCard}>
                <Text style={[styles.summaryValue, { color: colors.success }]}>92%</Text>
                <Text style={[styles.summaryLabel, isDark && styles.textSecondaryDark]}>Présence</Text>
              </Card>
              <Card style={styles.summaryCard}>
                <Text style={[styles.summaryValue, { color: colors.warning }]}>3</Text>
                <Text style={[styles.summaryLabel, isDark && styles.textSecondaryDark]}>Retards</Text>
              </Card>
              <Card style={styles.summaryCard}>
                <Text style={[styles.summaryValue, { color: colors.danger }]}>1</Text>
                <Text style={[styles.summaryLabel, isDark && styles.textSecondaryDark]}>Absence</Text>
              </Card>
            </View>

            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Historique</Text>
            {attendanceHistory.map(renderAttendanceItem)}
          </>
        )}
      </ScrollView>

      {/* Add Grade Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDark && styles.modalContentDark]}>
            <Text style={[styles.modalTitle, isDark && styles.textDark]}>Ajouter une note</Text>
            
            <Text style={[styles.inputLabel, isDark && styles.textDark]}>Matière</Text>
            <TextInput 
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Ex: Mathématiques"
              placeholderTextColor={colors.gray400}
              value={newGrade.subject}
              onChangeText={(text) => setNewGrade({...newGrade, subject: text})}
            />

            <Text style={[styles.inputLabel, isDark && styles.textDark]}>Note (/20)</Text>
            <TextInput 
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Ex: 15"
              keyboardType="numeric"
              placeholderTextColor={colors.gray400}
              value={newGrade.score}
              onChangeText={(text) => setNewGrade({...newGrade, score: text})}
            />

            <Text style={[styles.inputLabel, isDark && styles.textDark]}>Coefficient</Text>
             <TextInput 
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Ex: 2"
              keyboardType="numeric"
              placeholderTextColor={colors.gray400}
              value={newGrade.coefficient}
              onChangeText={(text) => setNewGrade({...newGrade, coefficient: text})}
            />

            <View style={styles.modalButtons}>
              <Button title="Annuler" onPress={() => setModalVisible(false)} variant="outline" style={{ flex: 1, marginRight: 8 }} />
              <Button title="Ajouter" onPress={handleAddGrade} style={{ flex: 1, marginLeft: 8 }} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Report Card Modal */}
      <ReportCard visible={reportCardVisible} onClose={() => setReportCardVisible(false)} />
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
  heading: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: borderRadius.full,
  },
  iconButton: {
    padding: spacing.sm,
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
  chartCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  chartTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.lg,
    color: colors.text,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  chartBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 12,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  chartLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  chartValue: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    marginTop: 2,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
    color: colors.text,
  },
  gradeCard: {
    marginBottom: spacing.md,
  },
  gradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  subjectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  subjectName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  gradeDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  gradeBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
  },
  gradeValue: {
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.lg,
  },
  gradeMax: {
    fontSize: typography.fontSize.xs,
    opacity: 0.8,
  },
  gradeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundLight,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailDivider: {
    width: 1,
    backgroundColor: colors.border,
    height: '100%',
  },
  detailLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  assignmentsList: {
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  assignmentsTitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  assignmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  assignmentName: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },
  assignmentGrade: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  // Attendance Styles
  attendanceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    padding: spacing.sm,
  },
  summaryValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  attendanceCard: {
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  attendanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendanceInfo: {
    flex: 1,
  },
  attendanceDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  attendanceSubject: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  attendanceNote: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  attendanceStatus: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    marginTop: 2,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  modalContentDark: {
    backgroundColor: colors.gray800,
  },
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.lg,
    textAlign: 'center',
    color: colors.text,
  },
  inputLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.backgroundLight,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    color: colors.text,
  },
  inputDark: {
    backgroundColor: colors.gray900,
    color: colors.textDark,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  textDark: {
    color: colors.textDark,
  },
  textSecondaryDark: {
    color: colors.textSecondaryDark,
  },
});

export default Grades;
