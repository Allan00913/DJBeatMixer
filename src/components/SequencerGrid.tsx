import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import { colors, borderRadius, fontSize, spacing } from '../theme';

interface SequencerGridProps {
  bpm: number;
  isPlaying: boolean;
  onStepChange: (step: number, instrument: string, active: boolean) => void;
}

const instruments = ['Kick', 'Snare', 'HiHat', 'Clap'];

const instrumentColors: Record<string, string> = {
  Kick: colors.primary,
  Snare: colors.accent1,
  HiHat: colors.secondary,
  Clap: colors.accent2,
};

export function SequencerGrid({ bpm, isPlaying, onStepChange }: SequencerGridProps) {
  const [activeStep, setActiveStep] = useState(-1);
  const [grid, setGrid] = useState<Record<string, boolean[]>>({
    Kick: Array(16).fill(false),
    Snare: Array(16).fill(false),
    HiHat: Array(16).fill(false),
    Clap: Array(16).fill(false),
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const stepTime = (60 / bpm) * 1000 / 4;
      intervalRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 16);
      }, stepTime);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setActiveStep(-1);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, bpm]);

  useEffect(() => {
    if (activeStep >= 0 && activeStep < 16) {
      instruments.forEach((instrument) => {
        if (grid[instrument][activeStep]) {
          onStepChange(activeStep, instrument, true);
        }
      });
    }
  }, [activeStep]);

  const toggleStep = (step: number, instrument: string) => {
    setGrid((prev) => {
      const newGrid = { ...prev };
      newGrid[instrument] = [...newGrid[instrument]];
      newGrid[instrument][step] = !newGrid[instrument][step];
      return newGrid;
    });
  };

  return (
    <View style={styles.container}>
      {instruments.map((instrument) => (
        <View key={instrument} style={styles.row}>
          <Text style={[styles.instrumentLabel, { color: instrumentColors[instrument] }]}>
            {instrument}
          </Text>
          {Array(16).fill(0).map((_, step) => (
            <TouchableOpacity
              key={step}
              style={[
                styles.step,
                grid[instrument][step] && { backgroundColor: instrumentColors[instrument] },
                step % 4 === 0 && { borderRightWidth: 1, borderRightColor: colors.surface },
                activeStep === step && styles.activeStep,
              ]}
              onPress={() => toggleStep(step, instrument)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  instrumentLabel: {
    width: 50,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  step: {
    width: 18,
    height: 18,
    marginHorizontal: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
  },
  activeStep: {
    borderWidth: 2,
    borderColor: colors.white,
  },
});