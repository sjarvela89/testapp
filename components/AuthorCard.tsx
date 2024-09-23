import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';

interface AuthorCardProps {
  name: string;
  title: string;
  subtitle1: string;
  subtitle2: string;
  email: string;
  skills: string;
  profileImage: ImageSourcePropType;
  onPress: () => void;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ name, title, subtitle1, subtitle2, email, skills, profileImage, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={profileImage} style={styles.profileImage} resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle1}</Text>
        <Text style={styles.subtitleText}>{subtitle2}</Text>
        <Text style={styles.emailText}>{email}</Text>
        <View style={styles.skillsContainer}>
          <Text style={styles.skillsTitle}>Skills:</Text>
          <Text style={styles.skillsText}>{skills}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Connect via LinkedIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    maxWidth: 400,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#4A5568', // border-gray-700
  },
  textContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748', // text-gray-800
    marginBottom: 8,
  },
  titleText: {
    fontSize: 18,
    color: '#4A5568', // text-gray-600
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: '#4A5568', // text-gray-600
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    color: '#4A5568', // text-gray-600
    marginBottom: 16,
  },
  skillsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  skillsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748', // text-gray-800
    marginBottom: 8,
  },
  skillsText: {
    fontSize: 16,
    color: '#4A5568', // text-gray-600
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3182ce', // Blue color
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AuthorCard;