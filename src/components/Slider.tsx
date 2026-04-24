import React from 'react';
import { View, StyleSheet, PanResponder, Animated, Text } from 'react-native';
import { colors, borderRadius, fontSize, spacing } from '../theme';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  label?: string;
  color?: string;
  height?: number;
  vertical?: boolean;
}

export function Slider({ 
  value, 
  onValueChange, 
  label, 
  color = colors.primary,
  height = 150,
  vertical = true 
}: SliderProps) {
  const position = new Animated.Value(value * height);
  
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        const newValue = vertical 
          ? Math.max(0, Math.min(1, 1 - (gestureState.y0 - gestureState.moveY) / height))
          : Math.max(0, Math.min(1, gestureState.moveX / 200));
        onValueChange(newValue);
      },
      onPanResponderMove: (_, gestureState) => {
        const newValue = vertical 
          ? Math.max(0, Math.min(1, 1 - gestureState.dy / height))
          : Math.max(0, Math.min(1, (gestureState.dx + 100) / 200));
        onValueChange(Math.max(0, Math.min(1, newValue)));
      },
    })
  ).current;

  const thumbPosition = value * height;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.track, { height: height, width: 8 }]}>
        <View 
          style={[
            styles.fill, 
            { 
              height: `${value * 100}%`, 
              backgroundColor: color 
            }
          ]} 
        />
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: color,
              bottom: vertical ? thumbPosition - 15 : undefined,
              left: vertical ? undefined : value * 180,
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
      <Text style={styles.value}>{Math.round(value * 100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    marginBottom: spacing.xs,
  },
  track: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.round,
    width: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  fill: {
    width: '100%',
    borderRadius: borderRadius.round,
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: borderRadius.round,
    backgroundColor: colors.white,
    left: -8,
  },
  value: {
    color: colors.textPrimary,
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
});