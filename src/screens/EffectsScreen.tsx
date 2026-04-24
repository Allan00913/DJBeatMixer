import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { EffectSlider } from '../components/EffectSlider';
import { PlayButton } from '../components/PlayButton';
import { colors, fontSize, spacing, borderRadius } from '../theme';

const effects = [
  { name: 'Reverb', color: colors.primary },
  { name: 'Delay', color: colors.secondary },
  { name: 'Filter', color: colors.accent1 },
  { name: 'Distortion', color: colors.accent2 },
  { name: 'Echo', color: colors.accent3 },
  { name: 'Chorus', color: colors.primary },
];

export function EffectsScreen() {
  const [effectValues, setEffectValues] = useState<Record<string, number>>({
    Reverb: 0.3,
    Delay: 0.2,
    Filter: 0.5,
    Distortion: 0,
    Echo: 0.2,
    Chorus: 0.3,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const updateEffect = (effectName: string, value: number) => {
    setEffectValues((prev) => ({
      ...prev,
      [effectName]: value,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>EFFECTS</Text>

      <View style={styles.playSection}>
        <PlayButton isPlaying={isPlaying} onPress={() => setIsPlaying(!isPlaying)} />
        <Text style={styles.playLabel}>{isPlaying ? 'ON' : 'OFF'}</Text>
      </View>

      <View style={styles.effectsContainer}>
        <View style={styles.effectsRow}>
          {effects.slice(0, 3).map((effect) => (
            <EffectSlider
              key={effect.name}
              name={effect.name}
              value={effectValues[effect.name]}
              onValueChange={(v) => updateEffect(effect.name, v)}
              color={effect.color}
            />
          ))}
        </View>
        <View style={styles.effectsRow}>
          {effects.slice(3, 6).map((effect) => (
            <EffectSlider
              key={effect.name}
              name={effect.name}
              value={effectValues[effect.name]}
              onValueChange={(v) => updateEffect(effect.name, v)}
              color={effect.color}
            />
          ))}
        </View>
      </View>

      <View style={styles.presetSection}>
        <Text style={styles.sectionTitle}>PRESETS</Text>
        <View style={styles.presets}>
          {['Club', 'Studio', 'Outdoor', 'Bass'].map((preset) => (
            <View
              key={preset}
              style={[styles.presetButton, { backgroundColor: colors.surface }]}
            >
              <Text style={styles.presetText}>{preset}</Text>
            </View>
          ))}
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
  playSection: {
    alignItems: 'center',
    padding: spacing.md,
  },
  playLabel: {
    color: colors.success,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginTop: spacing.sm,
  },
  effectsContainer: {
    padding: spacing.md,
  },
  effectsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  presetSection: {
    backgroundColor: colors.backgroundMedium,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
  },
  presets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  presetButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  presetText: {
    color: colors.white,
    fontWeight: '600',
  },
});