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
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import BackgroundImage from '../resources/background.jpg';
import axios, { AxiosResponse } from 'axios';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '@/components/config/config';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

interface Login {
  username: string;
  password: string;
  deviceId: string;
}

interface ServerResponse {
  status: string;
  token?: string;
  [key: string]: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


const sendData = async () => {
  if (loading) return;

  setLoading(true);

  try {
    const deviceId = await DeviceInfo.getAndroidId();
    const data: Login = { username, password, deviceId };

    const response: AxiosResponse<ServerResponse> = await axios.post(
      config.serverAddress + 'login',
      data
    );

    console.log('Login response:', response.data);

    const { token } = response.data;

    if (token) {
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('username', username);
      Alert.alert('Login Success', 'Token saved!');
      navigation.navigate('MessagesToServer', { name: 'MessagesToServer' });
    } else {
      Alert.alert('Login Failed', 'No token received.');
    }
  } catch (error: any) {
    if (!error.response) {
      Alert.alert('Network Error', 'Cannot reach server. Please check your internet connection.');
    } else {
      Alert.alert('Login Error', error.response.data.message || 'Unknown error');
    }
    console.error('Login failed:', error);
  } finally {
    setLoading(false);
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
          <Button title="Login" onPress={sendData} />

          <TouchableOpacity onPress={() => navigation.navigate('Register', {name: 'Register'})}>
            <Text style={styles.registerLink}>Don’t have an account? Register</Text>
          </TouchableOpacity>
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
  registerLink: {
    color: '#00afff',
    marginTop: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;