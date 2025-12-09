import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { colors } from '../theme';
import CustomTabBar from '../components/CustomTabBar';

// Parent Screens
import ParentHome from '../screens/Parent/ParentHome';
import Profile from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator();

const ParentTabNavigator = () => {
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

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Children') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'mail' : 'mail-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={ParentHome} options={{ title: 'Accueil' }} />
      <Tab.Screen name="Children" component={ParentHome} options={{ title: 'Enfants' }} />
      <Tab.Screen name="Messages" component={ParentHome} options={{ title: 'Messages' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
};

export default ParentTabNavigator;
