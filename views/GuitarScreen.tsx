import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Sound from 'react-native-sound';
import BackgroundImage from '../resources/background.jpg';

// Preload guitar sound files
const sounds = {
  guitar1: new Sound(require('../assets/sounds/guitar1.mp3'), Sound.MAIN_BUNDLE),
};


const GuitarScreen: React.FC = () => {
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const stopSound = () => {
    if (currentSound) {
      currentSound.stop(() => setCurrentSound(null));
      console.log('Sound stopped');
    }
  };
  const playSound = (sound: Sound) => {
    // Stop the current sound if already playing
    if (currentSound) {
      currentSound.stop(() => setCurrentSound(null));
    }
    
    sound.play(success => {
      if (success) {
        console.log('Sound played successfully');
      } else {
        console.log('Sound playback failed');
      }
      setCurrentSound(null); // Reset sound after playback
    });

    setCurrentSound(sound); // Keep track of the current sound
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover">
        <Text style={styles.title}>Guitar Soundboard</Text>
        <TouchableOpacity style={styles.button} onPress={() => playSound(sounds.guitar1)}>
          <Text style={styles.buttonText}>Play Guitar Solo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopSound}>
          <Text style={styles.buttonText}>Stop Playing</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#ff4d4d', // Red color for the stop button
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default GuitarScreen;