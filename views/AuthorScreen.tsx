import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import authorInfo from '../tables/AuthorInfo';
import AuthorCard from '../components/AuthorCard';
import BackgroundImage from '../resources/background.jpg'; // Import your background image

type AuthorScreenProps = NativeStackScreenProps<RootStackParamList, 'Author'>;

const AuthorScreen: React.FC<AuthorScreenProps> = () => {
  const handlePress = async () => {
    const url = authorInfo.linkedInUrl;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.container}>
        <AuthorCard
          name={authorInfo.name}
          title={authorInfo.title}
          subtitle1={authorInfo.subtitle1}
          subtitle2={authorInfo.subtitle2}
          email={authorInfo.email}
          skills={authorInfo.skills}
          profileImage={authorInfo.profileImage}
          onPress={handlePress}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)', // Semi-transparent gray
  },
});

export default AuthorScreen;