import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors, colors } from '../theme';

const { width } = Dimensions.get('window');
const TAB_HEIGHT = 70;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const themeColors = useThemeColors();
  const TAB_WIDTH = (width - 32) / state.routes.length; // 32 is horizontal padding
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(state.index * TAB_WIDTH, {
      damping: 20,
      stiffness: 150,
    });
  }, [state.index, TAB_WIDTH]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={[
      styles.container, 
      { 
        paddingBottom: insets.bottom,
        backgroundColor: themeColors.card,
        borderTopColor: themeColors.border,
      }
    ]}>
      <View style={styles.contentContainer}>
        {/* Sliding Indicator */}
        <Animated.View 
          style={[
            styles.indicator, 
            { 
              width: TAB_WIDTH,
              backgroundColor: colors.primary + '15', // Light primary background
            },
            animatedIndicatorStyle
          ]}
        />

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.tabButton}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.iconContainer,
                  isFocused && { backgroundColor: colors.primary }
                ]}>
                  {options.tabBarIcon({ 
                    focused: isFocused, 
                    color: isFocused ? colors.white : themeColors.textSecondary, 
                    size: 24 
                  })}
                </View>
                {isFocused && (
                  <Animated.Text 
                    entering={Platform.OS === 'ios' ? undefined : undefined} // Simple fade could be added
                    style={[styles.label, { color: colors.primary }]}
                  >
                    {options.title || route.name}
                  </Animated.Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    marginHorizontal: 16,
    height: TAB_HEIGHT,
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  indicator: {
    position: 'absolute',
    height: 48,
    top: 11, // Center vertically (70 - 48) / 2
    borderRadius: 24,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default CustomTabBar;
