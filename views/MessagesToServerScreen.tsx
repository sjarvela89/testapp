import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
  Text,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import BackgroundImage from '../resources/background.jpg';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '@/components/config/config';

type MessagesToServerScreenProps = NativeStackScreenProps<RootStackParamList, 'MessagesToServer'>;

interface MessagePayload {
  username: string;
  ciphertext: string;
  toUser: string;
}

interface StoredMessage {
  id: string;
  message: string;
  timestamp: string;
}

const MessagesToServerScreen: React.FC<MessagesToServerScreenProps> = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const id = await DeviceInfo.getAndroidId();
      setDeviceId(id);
      await fetchMessages(id);
    };
    fetchData();
  }, []);

  const fetchMessages = async (id: string) => {
  try {
    const token = await AsyncStorage.getItem('authToken')
    const username = await AsyncStorage.getItem('username') ?? '';
    const response = await axios.get(
      config.serverAddress+`messages/${username}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );

    const mapped = response.data.map((item: any, index: number) => ({
      id: `${index}`, // Generate a key since server doesn't provide one
      message: item.CipherText,
      timestamp: item.Timestamp,
    }));

    setMessages(mapped);
  } catch (error: any) {
    console.error('Fetch messages failed:', error.message);
    Alert.alert('Error', 'Could not load previous messages');
  }
};
  const handleSendMessage = async () => {
    if (!message.trim()) {
      Alert.alert('Validation Error', 'Message cannot be empty.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');
      const username = await AsyncStorage.getItem('username') ?? '';
      const toUser = 'admin';
      const ciphertext = message;
      const payload: MessagePayload = { ciphertext, username, toUser };

      const response = await axios.post(
        config.serverAddress+'messages',
        payload,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );

      console.log('Message sent:', response.data);
      setMessage('');
      await fetchMessages(deviceId);
      Alert.alert('Success', 'Message sent.');
    } catch (error: any) {
      console.error('Send error:', error.message);
      Alert.alert('Error', 'Message not sent.');
    }
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.overlay} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Your Message to Admin</Text>
          <TextInput
            style={styles.textArea}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message here..."
            placeholderTextColor="#ccc"
            multiline
            numberOfLines={6}
          />
          <Button title="Send Message" onPress={handleSendMessage} />
        </View>

        <View style={styles.messagesContainer}>
          <Text style={styles.label}>Previous Messages</Text>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.messageItem}>
                <Text style={styles.messageText}>{item.message}</Text>
                <Text style={styles.timestamp}>
                    {item.timestamp
                    ? new Date(item.timestamp).toLocaleDateString()
                    : 'No timestamp'}
                </Text>
            </View>
            )}
            ListEmptyComponent={
                <Text style={styles.emptyMessage}>No messages yet.</Text>
            }
        />
        </View>
      </KeyboardAvoidingView>
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
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    borderRadius: 10,
    marginBottom: 24,
  },
  label: {
    color: '#fff',
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#fff',
    borderRadius: 6,
    textAlignVertical: 'top',
  },
  messagesContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 10,
  },
  messageItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  messageText: {
    color: '#fff',
    fontSize: 15,
  },
  timestamp: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  emptyMessage: {
    color: '#ccc',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default MessagesToServerScreen;