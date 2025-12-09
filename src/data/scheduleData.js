// Schedule Template Data

export const scheduleTemplates = {
  // Collège Schedule Template
  college: {
    monday: [
      { id: 'mon_08_math', startTime: '08:00', endTime: '09:30', subject: 'Mathématiques', teacher: 'M. Kofi', room: 'Salle 12', color: '#3b82f6' },
      { id: 'mon_10_fr', startTime: '10:00', endTime: '11:30', subject: 'Français', teacher: 'Mme. Lawson', room: 'Salle 8', color: '#8b5cf6' },
      { id: 'mon_14_phys', startTime: '14:00', endTime: '15:30', subject: 'Physique-Chimie', teacher: 'M. Mensah', room: 'Labo 1', color: '#06b6d4' },
      { id: 'mon_16_ang', startTime: '16:00', endTime: '17:00', subject: 'Anglais', teacher: 'M. Johnson', room: 'Salle 5', color: '#10b981' },
    ],
    tuesday: [
      { id: 'tue_08_svt', startTime: '08:00', endTime: '09:30', subject: 'SVT', teacher: 'Mme. Akossi', room: 'Labo 2', color: '#22c55e' },
      { id: 'tue_10_hg', startTime: '10:00', endTime: '11:30', subject: 'Histoire-Géo', teacher: 'M. Agbodji', room: 'Salle 15', color: '#f59e0b' },
      { id: 'tue_14_math', startTime: '14:00', endTime: '15:30', subject: 'Mathématiques', teacher: 'M. Kofi', room: 'Salle 12', color: '#3b82f6' },
      { id: 'tue_16_sport', startTime: '16:00', endTime: '17:30', subject: 'EPS', teacher: 'M. Atakpah', room: 'Stade', color: '#ef4444' },
    ],
    wednesday: [
      { id: 'wed_08_fr', startTime: '08:00', endTime: '09:30', subject: 'Français', teacher: 'Mme. Lawson', room: 'Salle 8', color: '#8b5cf6' },
      { id: 'wed_10_math', startTime: '10:00', endTime: '11:30', subject: 'Mathématiques', teacher: 'M. Kofi', room: 'Salle 12', color: '#3b82f6' },
    ],
    thursday: [
      { id: 'thu_08_ang', startTime: '08:00', endTime: '09:30', subject: 'Anglais', teacher: 'M. Johnson', room: 'Salle 5', color: '#10b981' },
      { id: 'thu_10_phys', startTime: '10:00', endTime: '11:30', subject: 'Physique-Chimie', teacher: 'M. Mensah', room: 'Labo 1', color: '#06b6d4' },
      { id: 'thu_14_hg', startTime: '14:00', endTime: '15:30', subject: 'Histoire-Géo', teacher: 'M. Agbodji', room: 'Salle 15', color: '#f59e0b' },
      { id: 'thu_16_svt', startTime: '16:00', endTime: '17:00', subject: 'SVT', teacher: 'Mme. Akossi', room: 'Labo 2', color: '#22c55e' },
    ],
    friday: [
      { id: 'fri_08_math', startTime: '08:00', endTime: '09:30', subject: 'Mathématiques', teacher: 'M. Kofi', room: 'Salle 12', color: '#3b82f6' },
      { id: 'fri_10_fr', startTime: '10:00', endTime: '11:30', subject: 'Français', teacher: 'Mme. Lawson', room: 'Salle 8', color: '#8b5cf6' },
      { id: 'fri_14_ang', startTime: '14:00', endTime: '15:00', subject: 'Anglais', teacher: 'M. Johnson', room: 'Salle 5', color: '#10b981' },
    ],
  },
  
  // Lycée Schedule Template
  lycee: {
    monday: [
      { id: 'mon_08_math', startTime: '08:00', endTime: '10:00', subject: 'Mathématiques', teacher: 'M. Amouzou', room: 'Salle 21', color: '#3b82f6' },
      { id: 'mon_10_philo', startTime: '10:15', endTime: '12:15', subject: 'Philosophie', teacher: 'Mme. Koffi', room: 'Salle 18', color: '#a855f7' },
      { id: 'mon_14_phys', startTime: '14:00', endTime: '16:00', subject: 'Physique-Chimie', teacher: 'M. Adjovi', room: 'Labo 3', color: '#06b6d4' },
    ],
    tuesday: [
      { id: 'tue_08_fr', startTime: '08:00', endTime: '10:00', subject: 'Français', teacher: 'Mme. Assih', room: 'Salle 16', color: '#8b5cf6' },
      { id: 'tue_10_ang', startTime: '10:15', endTime: '12:15', subject: 'Anglais', teacher: 'M. Brown', room: 'Salle 9', color: '#10b981' },
      { id: 'tue_14_svt', startTime: '14:00', endTime: '16:00', subject: 'SVT', teacher: 'Mme. Dogbey', room: 'Labo 4', color: '#22c55e' },
    ],
    wednesday: [
      { id: 'wed_08_math', startTime: '08:00', endTime: '10:00', subject: 'Mathématiques', teacher: 'M. Amouzou', room: 'Salle 21', color: '#3b82f6' },
      { id: 'wed_10_hg', startTime: '10:15', endTime: '12:15', subject: 'Histoire-Géo', teacher: 'M. Soenou', room: 'Salle 20', color: '#f59e0b' },
    ],
    thursday: [
      { id: 'thu_08_phys', startTime: '08:00', endTime: '10:00', subject: 'Physique-Chimie', teacher: 'M. Adjovi', room: 'Labo 3', color: '#06b6d4' },
      { id: 'thu_10_fr', startTime: '10:15', endTime: '12:15', subject: 'Français', teacher: 'Mme. Assih', room: 'Salle 16', color: '#8b5cf6' },
      { id: 'thu_14_philo', startTime: '14:00', endTime: '16:00', subject: 'Philosophie', teacher: 'Mme. Koffi', room: 'Salle 18', color: '#a855f7' },
    ],
    friday: [
      { id: 'fri_08_math', startTime: '08:00', endTime: '10:00', subject: 'Mathématiques', teacher: 'M. Amouzou', room: 'Salle 21', color: '#3b82f6' },
      { id: 'fri_10_sport', startTime: '10:15', endTime: '12:15', subject: 'EPS', teacher: 'M. Atakpah', room: 'Stade', color: '#ef4444' },
    ],
  },
};

export const getDayName = (dayKey) => {
  const days = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche',
  };
  return days[dayKey] || dayKey;
};

export const getDayKey = (date = new Date()) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getDay()];
};

export const getTodaySchedule = (scheduleData) => {
  const todayKey = getDayKey();
  return scheduleData[todayKey] || [];
};

export const getNextClass = (todaySchedule) => {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  return todaySchedule.find(cls => cls.startTime > currentTime);
};

export const getCurrentClass = (todaySchedule) => {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  return todaySchedule.find(cls => cls.startTime <= currentTime && cls.endTime > currentTime);
};
