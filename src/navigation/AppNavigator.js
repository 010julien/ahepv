import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { colors } from '../theme';

import {
  Home,
  Courses,
  Library,
  Grades,
  Forum,
  News,
  Profile,
  CourseDetail,
  Messages,
  Notifications,
  Login,
  Orientation,
  ExamResources,
  Schedule,
} from '../screens';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import OnboardingNavigator from './OnboardingNavigator';
import ParentTabNavigator from './ParentTabNavigator';
import UniversityTabNavigator from './UniversityTabNavigator';

import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator for Collège/Lycée students
const StudentTabNavigator = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: isDark ? colors.gray500 : colors.gray400,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Courses') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Forum') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Accueil' }} />
      <Tab.Screen name="Courses" component={Courses} options={{ title: 'Cours' }} />
      <Tab.Screen name="Library" component={Library} options={{ title: 'Biblio' }} />
      <Tab.Screen name="Forum" component={Forum} options={{ title: 'Forum' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { user } = useAuth();
  const { userProfile, isOnboardingComplete, loading } = useUser();

  // Wait for user profile to load
  if (loading) {
    return null; // Could add a loading screen here
  }

  // Determine which navigator to use based on role and level
  const getMainNavigator = () => {
    if (!userProfile) return StudentTabNavigator;
    
    const { role, level } = userProfile;
    
    // Parent interface
    if (role === 'parent') {
      return ParentTabNavigator;
    }
    
    // University student interface
    if (role === 'student' && level === 'university') {
      return UniversityTabNavigator;
    }
    
    // Default: Collège/Lycée student interface
    return StudentTabNavigator;
  };

  const MainNavigator = getMainNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={Login} />
      ) : !isOnboardingComplete() ? (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen name="CourseDetail" component={CourseDetail} options={{ headerShown: true, title: 'Détails du cours' }} />
          <Stack.Screen name="ExamResources" component={ExamResources} options={{ headerShown: false }} />
          <Stack.Screen name="Schedule" component={Schedule} options={{ headerShown: false }} />
          <Stack.Screen name="Grades" component={Grades} options={{ headerShown: false }} />
          <Stack.Screen name="News" component={News} options={{ headerShown: true, title: 'Actualités' }} />
          <Stack.Screen name="Messages" component={Messages} options={{ headerShown: true, title: 'Messages' }} />
          <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: true, title: 'Notifications' }} />
          <Stack.Screen name="Orientation" component={Orientation} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
