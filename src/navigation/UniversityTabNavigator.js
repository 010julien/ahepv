import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { colors } from '../theme';
import CustomTabBar from '../components/CustomTabBar';

// University Student Screens - we'll create a simple version for now
import Home from '../screens/Home/Home';
import Courses from '../screens/Courses/Courses';
import Library from '../screens/Library/Library';
import Profile from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator();

const UniversityTabNavigator = () => {
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
          } else if (route.name === 'Projects') {
            iconName = focused ? 'folder' : 'folder-outline';
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
      <Tab.Screen name="Projects" component={Home} options={{ title: 'Projets' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
};

export default UniversityTabNavigator;
