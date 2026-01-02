import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleTemplates } from '../data/scheduleData';
import { useUser } from './UserContext';

const ScheduleContext = createContext();

const SCHEDULE_KEY = '@togoschool_schedule';

export const ScheduleProvider = ({ children }) => {
  const { userProfile } = useUser();
  const [schedule, setSchedule] = useState(null);
  const [customEvents, setCustomEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchedule();
  }, [userProfile]);

  const loadSchedule = async () => {
    try {
      const stored = await AsyncStorage.getItem(SCHEDULE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setSchedule(data.schedule);
        setCustomEvents(data.customEvents || []);
      } else {
        // Load template based on user level
        loadTemplateSchedule();
      }
    } catch (error) {
      console.error('Error loading schedule:', error);
      loadTemplateSchedule();
    } finally {
      setLoading(false);
    }
  };

  const loadTemplateSchedule = () => {
    if (!userProfile?.level) {
      setSchedule({});
      return;
    }

    // Load template based on level
    const template = userProfile.level === 'college' 
      ? scheduleTemplates.college 
      : scheduleTemplates.lycee;
    
    setSchedule(template);
  };

  const saveSchedule = async (newSchedule, newCustomEvents) => {
    try {
      const data = {
        schedule: newSchedule,
        customEvents: newCustomEvents || customEvents,
      };
      await AsyncStorage.setItem(SCHEDULE_KEY, JSON.stringify(data));
      setSchedule(newSchedule);
      if (newCustomEvents) {
        setCustomEvents(newCustomEvents);
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  const addCustomEvent = async (event) => {
    const newEvents = [...customEvents, { ...event, id: Date.now().toString() }];
    await saveSchedule(schedule, newEvents);
  };

  const removeCustomEvent = async (eventId) => {
    const newEvents = customEvents.filter(e => e.id !== eventId);
    await saveSchedule(schedule, newEvents);
  };

  const resetToTemplate = async () => {
    await AsyncStorage.removeItem(SCHEDULE_KEY);
    loadTemplateSchedule();
  };

  const value = {
    schedule: schedule || {},
    customEvents,
    loading,
    saveSchedule,
    addCustomEvent,
    removeCustomEvent,
    resetToTemplate,
  };

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};
