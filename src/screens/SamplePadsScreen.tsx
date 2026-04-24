import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SamplePad } from '../components/SamplePad';
import { useAudio } from '../context/AudioContext';
import { colors, fontSize, spacing, borderRadius } from '../theme';

interface SoundCategory {
  name: string;
  sound: string;
  color: string;
}

const soundCategories: SoundCategory[][] = [
  [
    { name: 'Kick', sound: 'kick', color: colors.primary },
    { name: 'Snare', sound: 'snare', color: colors.accent1 },
    { name: 'HiHat', sound: 'hihat', color: colors.secondary },
    { name: 'Clap', sound: 'clap', color: colors.accent2 },
  ],
  [
    { name: 'Tom', sound: 'tom', color: colors.primary },
    { name: 'Ride', sound: 'ride', color: colors.accent1 },
    { name: 'Crash', sound: 'crash', color: colors.secondary },
    { name: 'OpenHat', sound: 'openhat', color: colors.accent2 },
  ],
  [
    { name: 'Conga', sound: 'conga', color: colors.accent3 },
    { name: 'Bongo', sound: 'bongo', color: colors.primary },
    { name: 'Timbale', sound: 'timbale', color: colors.accent1 },
    { name: 'Shaker', sound: 'shaker', color: colors.secondary },
  ],
  [
    { name: 'FX 1', sound: 'fx', color: colors.accent2 },
    { name: 'FX 2', sound: 'fx', color: colors.accent3 },
    { name: 'FX 3', sound: 'fx', color: colors.primary },
    { name: 'FX 4', sound: 'fx', color: colors.accent1 },
  ],
];

type SoundType = 'kick' | 'snare' | 'hihat' | 'clap' | 'tom' | 'ride' | 'crash' | 'openhat' | 'conga' | 'bongo' | 'timbale' | 'shaker' | 'fx';

export function SamplePadsScreen() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const { playSound, state, setVolume: setAudioVolume } = useAudio();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>SAMPLE PADS</Text>

      <View style={styles.padGrid}>
        {soundCategories.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.padRow}>
            {row.map((pad) => (
              <SamplePad
                key={pad.name}
                label={pad.name}
                color={pad.color}
                onPress={() => playSound(pad.sound as SoundType)}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.volumeControl}>
        <Text style={styles.label}>MASTER VOLUME</Text>
        <View style={styles.volumeSlider}>
          <View 
            style={[
              styles.volumeFill, 
              { width: `${volume * 100}%`, backgroundColor: colors.primary }
            ]} 
          />
          <TouchableOpacity
            style={styles.volumeButtons}
            onPress={() => {
              setVolume(Math.max(0, volume - 0.1));
              setAudioVolume(Math.max(0, volume - 0.1));
            }}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.volumeValue}>{Math.round(volume * 100)}%</Text>
          <TouchableOpacity
            style={styles.volumeButtons}
            onPress={() => {
              setVolume(Math.min(1, volume + 0.1));
              setAudioVolume(Math.min(1, volume + 0.1));
            }}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    padding: spacing.md,
  },
  padGrid: {
    alignItems: 'center',
    padding: spacing.md,
  },
  padRow: {
    flexDirection: 'row',
  },
  volumeControl: {
    backgroundColor: colors.backgroundMedium,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  volumeSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  volumeFill: {
    position: 'absolute',
    height: 20,
    borderRadius: borderRadius.md,
    left: 0,
  },
  volumeButtons: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
  },
  volumeValue: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginHorizontal: spacing.md,
  },
});