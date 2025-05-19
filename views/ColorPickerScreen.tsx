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
import convert from 'color-convert';
import BackgroundImage from '../resources/background.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
          style={[
            styles.thumb,
            { left: (value / max) * SLIDER_WIDTH - 10 },
          ]}
        />
      </View>
    </View>
  );
};

const ColorPickerScreen = ({ navigation }: any) => {
  const [hue, setHue] = useState(195);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);

  interface ColorPayload {
  username: string;
  hue: number;
  saturation: number;
  brightness: number;
}

  const handleSendColor = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const username = await AsyncStorage.getItem('username') ?? '';

      const payload: ColorPayload = {
      username,
      hue: Math.round(hue),
      saturation: Math.round(saturation),
      brightness: Math.round(brightness),
      };

      const response = await axios.post(
        config.serverAddress + 'colors',
        payload,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );

      console.log('Color sent:', response.data);
      Alert.alert('Success', 'Color sent.');
    } catch (error: any) {
      console.error('Send color error:', error.response?.data?.message);
      Alert.alert('Error', 'Failed to send color.');
    }
};

  const rgb = convert.hsv.rgb([hue, saturation, brightness]);
  const hex = convert.hsv.hex([hue, saturation, brightness]);
  const colorPreview = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

  const hueGradient = Array.from({ length: 7 }, (_, i) =>
    `hsl(${i * 60}, 100%, 50%)`
  );

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={[styles.colorPreview, { backgroundColor: colorPreview }]} />
        <Text style={styles.hexText}>#{hex}</Text>

        <GradientSlider
          label="Hue"
          value={hue}
          onChange={setHue}
          gradientColors={hueGradient}
          max={360}
        />

        <GradientSlider
          label="Saturation"
          value={saturation}
          onChange={setSaturation}
          gradientColors={['#888', `hsl(${hue}, 100%, 50%)`]}
        />

        <GradientSlider
          label="Brightness"
          value={brightness}
          onChange={setBrightness}
          gradientColors={['#000', `hsl(${hue}, ${saturation}%, 50%)`]}
        />
        <View style={styles.buttonContainer}>
          <Button title="Change color" onPress={handleSendColor} />
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
  colorPreview: {
    height: 150,
    borderRadius: 12,
    marginBottom: 16,
  },
  hexText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
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

export default ColorPickerScreen;