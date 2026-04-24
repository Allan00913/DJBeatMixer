import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Audio } from 'expo-av';

type SoundType = 'kick' | 'snare' | 'hihat' | 'clap' | 'tom' | 'ride' | 'crash' | 'openhat' | 'conga' | 'bongo' | 'timbale' | 'shaker' | 'fx';

interface AudioState {
  sounds: Record<SoundType, Audio.Sound | null>;
  volume: number;
  isPlaying: boolean;
}

type AudioAction =
  | { type: 'SET_SOUND'; payload: { key: SoundType; sound: Audio.Sound } }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'UNLOAD_ALL' };

const initialState: AudioState = {
  sounds: {} as Record<SoundType, Audio.Sound | null>,
  volume: 1.0,
  isPlaying: false,
};

function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case 'SET_SOUND':
      return {
        ...state,
        sounds: { ...state.sounds, [action.payload.key]: action.payload.sound },
      };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'UNLOAD_ALL':
      return { ...state, sounds: {} as Record<SoundType, Audio.Sound | null> };
    default:
      return state;
  }
}

interface AudioContextType {
  state: AudioState;
  playSound: (soundType: SoundType) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const soundUrls: Record<SoundType, string> = {
  kick: 'https://www.soundjay.com/misc/sounds/drum-kick-1.mp3',
  snare: 'https://www.soundjay.com/misc/sounds/drum-snare-1.mp3',
  hihat: 'https://www.soundjay.com/misc/sounds/drum-hihat-1.mp3',
  clap: 'https://www.soundJay.com/misc/sounds/drum-clap-1.mp3',
  tom: 'https://www.soundjay.com/misc/sounds/drum-tom-1.mp3',
  ride: 'https://www.soundjay.com/misc/sounds/drum-ride-1.mp3',
  crash: 'https://www.soundjay.com/misc/sounds/drum-crash-1.mp3',
  openhat: 'https://www.soundjay.com/misc/sounds/drum-hihat-open-1.mp3',
  conga: 'https://www.soundjay.com/misc/sounds/drum-tom-2.mp3',
  bongo: 'https://www.soundjay.com/misc/sounds/drum-tom-3.mp3',
  timbale: 'https://www.soundjay.com/misc/sounds/drum-conga-1.mp3',
  shaker: 'https://www.soundjay.com/misc/sounds/drum-shaker-1.mp3',
  fx: 'https://www.soundjay.com/misc/sounds/whoosh-1.mp3',
};

export function AudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);

  useEffect(() => {
    return () => {
      Object.values(state.sounds).forEach(async (sound) => {
        if (sound) {
          await sound.unloadAsync();
        }
      });
    };
  }, []);

  const playSound = async (soundType: SoundType) => {
    try {
      let sound = state.sounds[soundType];
      
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: soundUrls[soundType] },
          { shouldPlay: true, volume: state.volume }
        );
        dispatch({ type: 'SET_SOUND', payload: { key: soundType, sound: newSound } });
      } else {
        await sound.setPositionAsync(0);
        await sound.setVolumeAsync(state.volume);
        await sound.playAsync();
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const setVolume = async (volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
    Object.values(state.sounds).forEach(async (sound) => {
      if (sound) {
        await sound.setVolumeAsync(volume);
      }
    });
  };

  return (
    <AudioContext.Provider value={{ state, playSound, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}