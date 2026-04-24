import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SequencerGrid } from '../components/SequencerGrid';
import { useAudio } from '../context/AudioContext';
import { colors, fontSize, spacing, borderRadius } from '../theme';

type SoundType = 'kick' | 'snare' | 'hihat' | 'clap';

const instrumentToSound: Record<string, SoundType> = {
  Kick: 'kick',
  Snare: 'snare',
  HiHat: 'hihat',
  Clap: 'clap',
};

export function BeatMakerScreen() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pattern, setPattern] = useState(1);

  const { playSound } = useAudio();

  const handleStepChange = (step: number, instrument: string, active: boolean) => {
    if (active) {
      playSound(instrumentToSound[instrument] as SoundType);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>BEAT MAKER</Text>

      <View style={styles.header}>
        <View style={styles.patternSelector}>
          <Text style={styles.label}>PATTERN</Text>
          <View style={styles.patternButtons}>
            {[1, 2, 3, 4].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.patternButton,
                  pattern === p && styles.patternButtonActive,
                ]}
                onPress={() => setPattern(p)}
              >
                <Text style={styles.patternButtonText}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bpmControl}>
          <Text style={styles.label}>BPM: {bpm}</Text>
          <View style={styles.bpmButtons}>
            <TouchableOpacity
              style={[styles.bpmButton, { backgroundColor: colors.primary }]}
              onPress={() => setBpm(Math.max(60, bpm - 5))}
            >
              <Text style={styles.buttonText}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bpmButton, { backgroundColor: colors.accent1 }]}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Text style={styles.buttonText}>{isPlaying ? 'STOP' : 'PLAY'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bpmButton, { backgroundColor: colors.primary }]}
              onPress={() => setBpm(Math.min(180, bpm + 5))}
            >
              <Text style={styles.buttonText}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.gridContainer}>
        <SequencerGrid
          bpm={bpm}
          isPlaying={isPlaying}
          onStepChange={handleStepChange}
        />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.secondary }]}
          onPress={() => setIsPlaying(false)}
        >
          <Text style={styles.controlButtonText}>STOP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.accent3 }]}
        >
          <Text style={styles.controlButtonText}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.accent2 }]}
        >
          <Text style={styles.controlButtonText}>CLEAR</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  patternSelector: {
    alignItems: 'center',
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  patternButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  patternButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternButtonActive: {
    backgroundColor: colors.primary,
  },
  patternButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  bpmControl: {
    alignItems: 'center',
  },
  bpmButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  bpmButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.sm,
  },
  gridContainer: {
    backgroundColor: colors.backgroundMedium,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  controlButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  controlButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});