import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
  Text,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import BackgroundImage from '../resources/background.jpg';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

interface RegisterPayload {
  username: string;
  password: string;
  deviceId: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const deviceId = await DeviceInfo.getAndroidId();
    const payload: RegisterPayload = {
      username,
      password,
      deviceId,
    };

    try {
      const response = await axios.post(
        'https://317b-91-159-46-121.ngrok-free.app/register',
        payload
      );

      console.log('Registration response:', response.data);
      Alert.alert('Success', 'Account created. You can now log in.');
      navigation.navigate('Login', {name: 'Login'});
    } catch (error: any) {
      console.error('Registration error:', error.message);
      console.error('RESPONSE WAS:', error.response?.data);
      Alert.alert('Registration Failed', error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor="#ccc"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />
          <Button title="Register" onPress={handleRegister} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    borderRadius: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
    paddingHorizontal: 10,
    color: '#fff',
    borderRadius: 6,
  },
});

export default RegisterScreen;