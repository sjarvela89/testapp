import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator'; // Adjust the import path if needed
import cardData from '../tables/Card'; // Import the card data
import CardComponent from '../components/CardComponent'; // Import the CardComponent
import BackgroundImage from '../resources/background.jpg'; // Import background image

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.container}>
          {cardData.map((card, index) => (
            <CardComponent
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              imageSource={card.imageSource}
              onPress={() => navigation.navigate(card.screen, { name: card.title } as any)}
            />
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    position: 'relative',
  },
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
    alignContent: 'space-evenly',
    justifyContent: 'space-evenly',
    padding: 16,
  },
});

export default HomeScreen;