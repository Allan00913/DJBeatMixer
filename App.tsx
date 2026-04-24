import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { MixerScreen } from './src/screens/MixerScreen';
import { BeatMakerScreen } from './src/screens/BeatMakerScreen';
import { SamplePadsScreen } from './src/screens/SamplePadsScreen';
import { EffectsScreen } from './src/screens/EffectsScreen';
import { AudioProvider } from './src/context/AudioContext';
import { colors, fontSize } from './src/theme';

const Tab = createBottomTabNavigator();

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Mixer: '🎧',
    Beats: '🎵',
    Pads: '🔊',
    FX: '⚡',
  };
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.iconText, focused && styles.iconTextFocused]}>
        {icons[name]}
      </Text>
    </View>
  );
}

function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIcon: ({ focused }) => (
              <TabIcon name={route.name} focused={focused} />
            ),
          })}
        >
          <Tab.Screen name="Mixer" component={MixerScreen} />
          <Tab.Screen name="Beats" component={BeatMakerScreen} />
          <Tab.Screen name="Pads" component={SamplePadsScreen} />
          <Tab.Screen name="FX" component={EffectsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.backgroundMedium,
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
    opacity: 0.6,
  },
  iconTextFocused: {
    opacity: 1,
  },
});

export default App;