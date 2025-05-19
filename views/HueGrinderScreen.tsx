import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
  ImageBackground,
  Button,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundImage from '../resources/background.jpg';
import { config } from '@/components/config/config';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width - 40;

const GradientSlider = ({
  label,
  value,
  onChange,
  gradientColors,
  max = 100,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  gradientColors: string[];
  max?: number;
}) => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const x = evt.nativeEvent.locationX;
      const val = Math.min(max, Math.max(0, (x / SLIDER_WIDTH) * max));
      onChange(val);
    },
    onPanResponderMove: (evt, gestureState) => {
      const x = gestureState.moveX - 20;
      const val = Math.min(max, Math.max(0, (x / SLIDER_WIDTH) * max));
      onChange(val);
    },
  });

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.label}>
        {label}: {Math.round(value)}
      </Text>
      <View {...panResponder.panHandlers} style={styles.gradientTrack}>
        <LinearGradient
          colors={gradientColors}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.gradient}
        />
        <View
          style={[styles.thumb, { left: (value / max) * SLIDER_WIDTH - 10 }]}
        />
      </View>
    </View>
  );
};

const HueGrinderScreen = ({ navigation }: any) => {
  const [minHue, setMinHue] = useState(0);
  const [maxHue, setMaxHue] = useState(360);
  const [intervalMs, setIntervalMs] = useState(500);
  const [step, setStep] = useState(10);
  const [durationMs, setDurationMs] = useState(30000);

  const sendGrindRequest = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const payload = {
        minHue: Math.round(minHue),
        maxHue: Math.round(maxHue),
        intervalMs: Math.round(intervalMs),
        step: Math.round(step),
        durationMs: Math.round(durationMs),
      };

      const response = await fetch(config.serverAddress + 'hue-grinder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (response.ok) {
        Alert.alert('Success', json.status || 'Hue grinder started.');
      } else {
        throw new Error(json.message || 'Server error');
      }
    } catch (err: any) {
      console.error('Hue grinder error:', err);
      Alert.alert('Error', err.message);
    }
  };

  const hueGradient = Array.from({ length: 7 }, (_, i) =>
    `hsl(${i * 60}, 100%, 50%)`
  );

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.container}>
        <GradientSlider
          label="Min Hue"
          value={minHue}
          onChange={setMinHue}
          gradientColors={hueGradient}
          max={360}
        />
        <GradientSlider
          label="Max Hue"
          value={maxHue}
          onChange={setMaxHue}
          gradientColors={hueGradient}
          max={360}
        />
        <GradientSlider
          label="Interval (ms)"
          value={intervalMs}
          onChange={setIntervalMs}
          gradientColors={['#444', '#ccc']}
          max={2000}
        />
        <GradientSlider
          label="Step"
          value={step}
          onChange={setStep}
          gradientColors={['#111', '#999']}
          max={100}
        />
        <GradientSlider
          label="Duration (ms)"
          value={durationMs}
          onChange={setDurationMs}
          gradientColors={['#333', '#eee']}
          max={600000}
        />
        <View style={styles.buttonContainer}>
          <Button title="Start Hue Grinder" onPress={sendGrindRequest} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Back to Messages" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  sliderContainer: {
    marginBottom: 24,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
  },
  gradientTrack: {
    width: SLIDER_WIDTH,
    height: 30,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  thumb: {
    position: 'absolute',
    top: -5,
    width: 20,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default HueGrinderScreen;