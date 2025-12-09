import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

const USER_PROFILE_KEY = '@togoschool_user_profile';

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfileState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load profile from AsyncStorage on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem(USER_PROFILE_KEY);
      if (stored) {
        setUserProfileState(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const setUserProfile = async (profile) => {
    try {
      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
      setUserProfileState(profile);
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const clearProfile = async () => {
    try {
      await AsyncStorage.removeItem(USER_PROFILE_KEY);
      setUserProfileState(null);
    } catch (error) {
      console.error('Error clearing user profile:', error);
    }
  };

  const isOnboardingComplete = () => {
    if (!userProfile) return false;
    
    // Must have role and level
    if (!userProfile.role || !userProfile.level) return false;
    
    // If student at collège or lycée level, must have grade/class
    if (userProfile.role === 'student' && (userProfile.level === 'college' || userProfile.level === 'lycee')) {
      return !!userProfile.grade;
    }
    
    // If student at university level, must have university info
    if (userProfile.role === 'student' && userProfile.level === 'university') {
      return !!userProfile.university;
    }
    
    // If parent, must have completed parent setup
    if (userProfile.role === 'parent') {
      return !!userProfile.setupComplete;
    }
    
    return true;
  };

  const value = {
    userProfile,
    setUserProfile,
    clearProfile,
    isOnboardingComplete,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
