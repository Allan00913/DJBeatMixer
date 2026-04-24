import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PlayButton } from './PlayButton';
import { colors, fontSize, spacing, borderRadius } from '../theme';

interface DeckProps {
  label: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  bpm?: number;
  color: string;
}

export function Deck({ label, isPlaying, onPlayPause, bpm, color }: DeckProps) {
  return (
    <View style={[styles.deck, { borderColor: color }]}>
      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.title}>{label}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.waveformContainer}>
          {Array(20).fill(0).map((_, i) => (
            <View
              key={i}
              style={[
                styles.wave,
                {
                  height: isPlaying ? Math.random() * 60 + 20 : 30,
                  backgroundColor: color,
                },
              ]}
            />
          ))}
        </View>
        <View style={styles.controls}>
          <PlayButton isPlaying={isPlaying} onPress={onPlayPause} />
        </View>
        {bpm && (
          <View style={styles.bpmContainer}>
            <Text style={styles.bpmLabel}>BPM</Text>
            <Text style={[styles.bpmValue, { color }]}>{bpm}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    backgroundColor: colors.backgroundMedium,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    overflow: 'hidden',
    margin: spacing.sm,
  },
  header: {
    padding: spacing.sm,
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingHorizontal: spacing.sm,
  },
  wave: {
    width: 3,
    borderRadius: borderRadius.round,
  },
  controls: {
    alignItems: 'center',
  },
  bpmContainer: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  bpmLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
  },
  bpmValue: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
  },
});