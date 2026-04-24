import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View, Text } from 'react-native';
import { colors, borderRadius, fontSize, spacing } from '../theme';

interface SamplePadProps {
  label: string;
  color: string;
  onPress: () => void;
}

export function SamplePad({ label, color, onPress }: SamplePadProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.3,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.pad,
          {
            backgroundColor: color,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim.interpolate({
              inputRange: [0.3, 0.8],
              outputRange: [1, 1],
            }),
          },
        ]}
      >
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pad: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing.xs,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
});