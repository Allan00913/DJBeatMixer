import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Slider } from './Slider';
import { colors, fontSize, spacing, borderRadius } from '../theme';

interface EffectSliderProps {
  name: string;
  value: number;
  onValueChange: (value: number) => void;
  color: string;
}

export function EffectSlider({ name, value, onValueChange, color }: EffectSliderProps) {
  return (
    <View style={styles.container}>
      <Slider
        value={value}
        onValueChange={onValueChange}
        label={name}
        color={color}
        height={120}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    margin: spacing.xs,
  },
});