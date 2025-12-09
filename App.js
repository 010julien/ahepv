import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserProvider } from './src/contexts/UserContext';
import { ScheduleProvider } from './src/contexts/ScheduleContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <ScheduleProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </ScheduleProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
