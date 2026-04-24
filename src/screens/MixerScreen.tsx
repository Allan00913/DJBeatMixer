import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Deck } from '../components/Deck';
import { Slider } from '../components/Slider';
import { colors, fontSize, spacing, borderRadius } from '../theme';
import { useAudio } from '../context/AudioContext';

export function MixerScreen() {
  const [deckAPlaying, setDeckAPlaying] = useState(false);
  const [deckBPlaying, setDeckBPlaying] = useState(false);
  const [volumeA, setVolumeA] = useState(0.8);
  const [volumeB, setVolumeB] = useState(0.8);
  const [crossfader, setCrossfader] = useState(0.5);
  const [bpm, setBpm] = useState(128);

  const { playSound } = useAudio();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>DJ MIXER</Text>
      
      <View style={styles.decksContainer}>
        <Deck
          label="DECK A"
          isPlaying={deckAPlaying}
          onPlayPause={() => {
            setDeckAPlaying(!deckAPlaying);
            if (!deckAPlaying) playSound('kick');
          }}
          bpm={bpm}
          color={colors.primary}
        />
        <Deck
          label="DECK B"
          isPlaying={deckBPlaying}
          onPlayPause={() => {
            setDeckBPlaying(!deckBPlaying);
            if (!deckBPlaying) playSound('snare');
          }}
          bpm={bpm}
          color={colors.secondary}
        />
      </View>

      <View style={styles.mixerControls}>
        <View style={styles.volumeSection}>
          <Slider
            value={volumeA}
            onValueChange={setVolumeA}
            label="VOL A"
            color={colors.primary}
          />
          <Slider
            value={volumeB}
            onValueChange={setVolumeB}
            label="VOL B"
            color={colors.secondary}
          />
        </View>
        
        <View style={styles.crossfaderSection}>
          <Text style={styles.sectionTitle}>CROSSFADER</Text>
          <Slider
            value={crossfader}
            onValueChange={setCrossfader}
            label=""
            color={colors.accent1}
            height={60}
            vertical={false}
          />
        </View>

        <View style={styles.bpmSection}>
          <Text style={styles.sectionTitle}>BPM</Text>
          <View style={styles.bpmControls}>
            <Text style={styles.bpmValue}>{bpm}</Text>
            <View style={styles.bpmButtons}>
              <Text 
                style={[styles.bpmButton, { backgroundColor: colors.primary }]}
                onPress={() => setBpm(Math.max(60, bpm - 1))}
              >
                -1
              </Text>
              <Text 
                style={[styles.bpmButton, { backgroundColor: colors.primary }]}
                onPress={() => setBpm(Math.min(180, bpm + 1))}
              >
                +1
              </Text>
            </View>
          </View>
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
  decksContainer: {
    flexDirection: 'row',
    padding: spacing.sm,
  },
  mixerControls: {
    backgroundColor: colors.backgroundMedium,
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  volumeSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  crossfaderSection: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  bpmSection: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  bpmControls: {
    alignItems: 'center',
  },
  bpmValue: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.primary,
  },
  bpmButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  bpmButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    color: colors.white,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
});