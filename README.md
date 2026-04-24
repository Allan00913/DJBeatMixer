# DJ Music Mixer & Beat Maker - Mobile App

A fully-featured DJ music mixer and beat maker app built with React Native (Expo).

## Features

### 1. DJ Mixer
- Dual deck system (Deck A & Deck B)
- Play/Pause/Stop controls
- Volume sliders for each deck
- Crossfader
- BPM control (60-180)

### 2. Beat Maker
- 16-step sequencer
- Multiple instrument tracks (Kick, Snare, Hi-Hat, Clap)
- BPM control (60-180)
- Pattern selector (4 patterns)
- Visual beat indicator

### 3. Sample Pads
- 4x4 grid (16 interactive pads)
- Multiple sound categories (Drums, Percussion, FX)
- Master volume control
- Visual feedback on tap

### 4. Effects
- Reverb, Delay, Filter, Distortion, Echo, Chorus
- Individual effect sliders
- Preset buttons (Club, Studio, Outdoor, Bass)

## Color Theme (Modern Colorful)
- Primary: Purple (#6C5CE7)
- Secondary: Cyan (#00CEC9)
- Accent: Pink, Yellow, Green
- Background: Dark Navy (#1A1A2E)

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Install Dependencies
```bash
cd DJBeatMixer
npm install
```

### Run Development
```bash
npx expo start
```

### Run on Android Emulator
```bash
npx expo run:android
```

### Run on iOS (Mac only)
```bash
npx expo run:ios
```

## Build APK

### Option 1: Use Expo EAS Build (Recommended)
```bash
npx expo install expo-dev-client
npx eas build -p android --profile preview
```

### Option 2: Local Build
```bash
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Project Structure
```
DJBeatMixer/
├── App.tsx                 # Main app entry with navigation
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Deck.tsx
│   │   ├── EffectSlider.tsx
│   │   ├── PlayButton.tsx
│   │   ├── SamplePad.tsx
│   │   ├── SequencerGrid.tsx
│   │   └── Slider.tsx
│   ├── screens/           # Tab screens
│   │   ├── MixerScreen.tsx
│   │   ├── BeatMakerScreen.tsx
│   │   ├── SamplePadsScreen.tsx
│   │   └── EffectsScreen.tsx
│   ├── context/          # State management
│   │   └── AudioContext.tsx
│   └── theme/            # Colors, spacing, typography
│       └── index.ts
└── SPEC.md              # Full specification
```

## Technology Stack
- React Native (Expo SDK 52)
- TypeScript
- React Navigation (Bottom Tabs)
- expo-av (Audio playback)

## Notes
- This app requires audio playback permissions
- Sounds are loaded from online URLs for demo purposes
- For production, bundle audio files locally
- The app uses a loud colorful theme as requested