import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RoleSelection from '../screens/onboarding/RoleSelection';
import LevelSelection from '../screens/onboarding/LevelSelection';
import GradeSelection from '../screens/onboarding/GradeSelection';
import UniversityTypeSelection from '../screens/onboarding/UniversityTypeSelection';
import UniversitySelection from '../screens/onboarding/UniversitySelection';
import PrivateUniversityInput from '../screens/onboarding/PrivateUniversityInput';

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}
    >
      <Stack.Screen name="RoleSelection" component={RoleSelection} />
      <Stack.Screen name="LevelSelection" component={LevelSelection} />
      <Stack.Screen name="GradeSelection" component={GradeSelection} />
      <Stack.Screen name="UniversityTypeSelection" component={UniversityTypeSelection} />
      <Stack.Screen name="UniversitySelection" component={UniversitySelection} />
      <Stack.Screen name="PrivateUniversityInput" component={PrivateUniversityInput} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
