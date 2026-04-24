import React from 'react';
import { TouchableOpacity, StyleSheet, Animated, View, Text } from 'react-native';
import { colors, borderRadius, fontSize, spacing } from '../theme';

interface PlayButtonProps {
  isPlaying: boolean;
  onPress: () => void;
  label?: string;
}

export function PlayButton({ isPlaying, onPress, label }: PlayButtonProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
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
          styles.button,
          isPlaying ? styles.playing : styles.stopped,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={[styles.icon, isPlaying ? styles.pauseIcon : styles.playIcon]} />
      </Animated.View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playing: {
    backgroundColor: colors.error,
  },
  stopped: {
    backgroundColor: colors.success,
  },
  icon: {
    width: 20,
    height: 20,
  },
  playIcon: {
    borderLeftWidth: 12,
    borderLeftColor: colors.white,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
    marginLeft: 4,
  },
  pauseIcon: {
    flexDirection: 'row',
    gap: 4,
  },
  label: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});