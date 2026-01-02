import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { reportCard } from '../../data/mockData';
import { Card } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../theme';

const ReportCard = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleDownload = async () => {
    try {
      // Format report card as text for sharing
      let reportText = `BULLETIN SCOLAIRE - ${reportCard.period}\n`;
      reportText += `${reportCard.academicYear}\n`;
      reportText += `========================================\n\n`;
      reportText += `Élève: ${reportCard.student.name}\n`;
      reportText += `Classe: ${reportCard.student.grade}\n`;
      reportText += `Établissement: ${reportCard.student.school}\n\n`;
      reportText += `========================================\n`;
      reportText += `NOTES ET APPRÉCIATIONS\n`;
      reportText += `========================================\n\n`;

      reportCard.grades.forEach((grade) => {
        reportText += `${grade.subject} (Coef. ${grade.coefficient})\n`;
        reportText += `  Moyenne: ${grade.average}/20\n`;
        reportText += `  Rang: ${grade.rank}/${grade.total}\n`;
        reportText += `  Appréciation: ${grade.appreciation}\n\n`;
      });

      reportText += `========================================\n`;
      reportText += `MOYENNE GÉNÉRALE: ${reportCard.overallAverage}/20\n`;
      reportText += `Rang: ${reportCard.overallRank}/${reportCard.totalStudents}\n\n`;
      reportText += `========================================\n`;
      reportText += `ASSIDUITÉ\n`;
      reportText += `  Présences: ${reportCard.attendance.present}%\n`;
      reportText += `  Absences: ${reportCard.attendance.absent}\n`;
      reportText += `  Retards: ${reportCard.attendance.late}\n\n`;
      reportText += `========================================\n`;
      reportText += `APPRÉCIATION GÉNÉRALE\n`;
      reportText += `${reportCard.generalAppreciation}\n\n`;
      reportText += `${reportCard.directorComment}\n`;

      await Share.share({
        message: reportText,
        title: 'Bulletin Scolaire',
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager le bulletin');
    }
  };

  const renderGradeRow = (grade, index) => (
    <View key={index} style={[styles.gradeRow, isDark && styles.gradeRowDark]}>
      <View style={styles.subjectColumn}>
        <Text style={[styles.subjectText, isDark && styles.textDark]}>{grade.subject}</Text>
        <Text style={[styles.coeffText, isDark && styles.textSecondaryDark]}>Coef. {grade.coefficient}</Text>
      </View>
      <View style={styles.scoreColumn}>
        <Text style={[styles.averageText, isDark && styles.textDark]}>{grade.average}</Text>
        <Text style={[styles.maxText, isDark && styles.textSecondaryDark]}>/20</Text>
      </View>
      <View style={styles.rankColumn}>
        <Text style={[styles.rankText, isDark && styles.textDark]}>{grade.rank}</Text>
        <Text style={[styles.maxText, isDark && styles.textSecondaryDark]}>/{grade.total}</Text>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.container, isDark && styles.containerDark]}>
        {/* Header */}
        <View style={[styles.header, isDark && styles.headerDark]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color={isDark ? colors.textDark : colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDark && styles.textDark]}>Bulletin Scolaire</Text>
          <TouchableOpacity onPress={handleDownload} style={styles.downloadButton}>
            <Ionicons name="share-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* School Info */}
          <Card style={styles.infoCard}>
            <Text style={[styles.schoolName, isDark && styles.textDark]}>{reportCard.student.school}</Text>
            <Text style={[styles.periodText, isDark && styles.textSecondaryDark]}>
              {reportCard.period} • {reportCard.academicYear}
            </Text>
            <View style={[styles.divider, isDark && styles.dividerDark]} />
            <View style={styles.studentInfo}>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, isDark && styles.textSecondaryDark]}>Élève:</Text>
                <Text style={[styles.infoValue, isDark && styles.textDark]}>{reportCard.student.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, isDark && styles.textSecondaryDark]}>Classe:</Text>
                <Text style={[styles.infoValue, isDark && styles.textDark]}>{reportCard.student.grade}</Text>
              </View>
            </View>
          </Card>

          {/* Overall Average */}
          <Card style={styles.averageCard}>
            <View style={styles.averageContainer}>
              <View style={styles.averageMain}>
                <Text style={[styles.averageLabel, isDark && styles.textSecondaryDark]}>Moyenne Générale</Text>
                <Text style={[styles.averageValue, { color: colors.primary }]}>{reportCard.overallAverage}</Text>
                <Text style={[styles.maxText, isDark && styles.textSecondaryDark]}>/20</Text>
              </View>
              <View style={[styles.averageDivider, isDark && styles.dividerDark]} />
              <View style={styles.averageDetail}>
                <Text style={[styles.detailLabel, isDark && styles.textSecondaryDark]}>Rang</Text>
                <Text style={[styles.detailValue, isDark && styles.textDark]}>
                  {reportCard.overallRank}/{reportCard.totalStudents}
                </Text>
              </View>
              <View style={[styles.averageDivider, isDark && styles.dividerDark]} />
              <View style={styles.averageDetail}>
                <Text style={[styles.detailLabel, isDark && styles.textSecondaryDark]}>Moy. Classe</Text>
                <Text style={[styles.detailValue, isDark && styles.textDark]}>{reportCard.classOverallAverage}</Text>
              </View>
            </View>
          </Card>

          {/* Grades Table */}
          <Card style={styles.gradesCard}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Notes par matière</Text>
            
            {/* Table Header */}
            <View style={[styles.tableHeader, isDark && styles.tableHeaderDark]}>
              <Text style={[styles.headerCell, styles.subjectColumn, isDark && styles.textDark]}>Matière</Text>
              <Text style={[styles.headerCell, styles.scoreColumn, isDark && styles.textDark]}>Moyenne</Text>
              <Text style={[styles.headerCell, styles.rankColumn, isDark && styles.textDark]}>Rang</Text>
            </View>

            {/* Table Rows */}
            {reportCard.grades.map(renderGradeRow)}
          </Card>

          {/* Attendance */}
          <Card style={styles.attendanceCard}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Assiduité</Text>
            <View style={styles.attendanceGrid}>
              <View style={styles.attendanceItem}>
                <Ionicons name="checkmark-circle" size={32} color={colors.success} />
                <Text style={[styles.attendanceValue, isDark && styles.textDark]}>{reportCard.attendance.present}%</Text>
                <Text style={[styles.attendanceLabel, isDark && styles.textSecondaryDark]}>Présent</Text>
              </View>
              <View style={styles.attendanceItem}>
                <Ionicons name="close-circle" size={32} color={colors.danger} />
                <Text style={[styles.attendanceValue, isDark && styles.textDark]}>{reportCard.attendance.absent}</Text>
                <Text style={[styles.attendanceLabel, isDark && styles.textSecondaryDark]}>Absences</Text>
              </View>
              <View style={styles.attendanceItem}>
                <Ionicons name="time" size={32} color={colors.warning} />
                <Text style={[styles.attendanceValue, isDark && styles.textDark]}>{reportCard.attendance.late}</Text>
                <Text style={[styles.attendanceLabel, isDark && styles.textSecondaryDark]}>Retards</Text>
              </View>
            </View>
          </Card>

          {/* Appreciations */}
          <Card style={styles.appreciationCard}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Appréciations</Text>
            
            {reportCard.grades.map((grade, index) => (
              <View key={index} style={styles.appreciationItem}>
                <Text style={[styles.appreciationSubject, isDark && styles.textDark]}>{grade.subject}</Text>
                <Text style={[styles.appreciationText, isDark && styles.textSecondaryDark]}>{grade.appreciation}</Text>
              </View>
            ))}

            <View style={[styles.divider, isDark && styles.dividerDark, styles.generalDivider]} />
            
            <View style={styles.generalAppreciation}>
              <Text style={[styles.generalLabel, isDark && styles.textDark]}>Appréciation Générale</Text>
              <Text style={[styles.generalText, isDark && styles.textDark]}>{reportCard.generalAppreciation}</Text>
            </View>

            <View style={styles.directorComment}>
              <Text style={[styles.directorLabel, isDark && styles.textDark]}>Décision du Conseil</Text>
              <Text style={[styles.directorText, { color: colors.primary }, isDark && { color: colors.primary }]}>
                {reportCard.directorComment}
              </Text>
            </View>
          </Card>
        </ScrollView>
      </View>
    </Modal>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  headerDark: {
    backgroundColor: colors.gray800,
    borderBottomColor: colors.gray700,
  },
  closeButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  downloadButton: {
    padding: spacing.xs,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing['3xl'],
  },
  infoCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  schoolName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  periodText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  dividerDark: {
    backgroundColor: colors.gray700,
  },
  studentInfo: {
    gap: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  infoValue: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    fontWeight: typography.fontWeight.semibold,
  },
  averageCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  averageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  averageMain: {
    alignItems: 'center',
  },
  averageLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  averageValue: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
  },
  averageDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  averageDetail: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  gradesCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
  },
  tableHeaderDark: {
    backgroundColor: colors.gray700,
  },
  headerCell: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    textTransform: 'uppercase',
  },
  gradeRow: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  gradeRowDark: {
    borderBottomColor: colors.gray700,
  },
  subjectColumn: {
    flex: 2,
  },
  scoreColumn: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rankColumn: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subjectText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  coeffText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  averageText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  rankText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  maxText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 2,
  },
  attendanceCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  attendanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attendanceItem: {
    alignItems: 'center',
  },
  attendanceValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: spacing.xs,
  },
  attendanceLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  appreciationCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  appreciationItem: {
    marginBottom: spacing.md,
  },
  appreciationSubject: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  appreciationText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  generalDivider: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  generalAppreciation: {
    marginBottom: spacing.lg,
  },
  generalLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  generalText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    lineHeight: 22,
  },
  directorComment: {
    backgroundColor: colors.primary + '10',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  directorLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  directorText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: 20,
  },
  textDark: {
    color: colors.textDark,
  },
  textSecondaryDark: {
    color: colors.textSecondaryDark,
  },
});

export default ReportCard;
