import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  Button,
  ImageBackground,
} from 'react-native';
import { images } from '../tables/ImageData';
import BackgroundImage from '../resources/background.jpg'; // Import background image

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const PhotographyScreen: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [rotation, setRotation] = useState<number>(0);

  const handleRotateClockwise = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const handleRotateCounterclockwise = () => {
    setRotation((prevRotation) => prevRotation - 90);
  };

  const renderItem = ({ item }: { item: { id: string; source: any } }) => (
    <TouchableOpacity onPress={() => {
      setSelectedImage(item.source);
      setRotation(0); // Reset rotation when a new image is selected
    }}>
      <Image source={item.source} style={styles.imageThumbnail} />
    </TouchableOpacity>
  );

  const getImageStyle = () => {
    const isRotated = Math.abs(rotation % 180) === 90;
    const imageWidth = isRotated ? windowHeight * 0.7 : windowWidth * 0.9;
    const imageHeight = isRotated ? windowWidth * 0.9 : windowHeight * 0.7;

    return {
      width: imageWidth,
      height: imageHeight,
      transform: [{ rotate: `${rotation}deg` }],
    };
  };

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.title}>Photography Gallery</Text>
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
          />
          <Modal visible={selectedImage !== null} transparent={true}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedImage(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              {selectedImage && (
                <Image
                  source={selectedImage}
                  style={[styles.fullScreenImage, getImageStyle()]}
                />
              )}
              <View style={styles.rotationButtonsContainer}>
                <View style={styles.rotationButton}>
                  <Button title="Rotate Left" onPress={handleRotateCounterclockwise} />
                </View>
                <View style={styles.rotationButton}>
                  <Button title="Rotate Right" onPress={handleRotateClockwise} />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#fff',
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 16, // Add padding at the bottom for better spacing
  },
  row: {
    justifyContent: 'space-between',
  },
  imageThumbnail: {
    width: (Dimensions.get('window').width - 48) / 2, // Adjust width calculation to consider padding
    height: (Dimensions.get('window').width - 48) / 2,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#d3d3d3', // Add a background color to ensure visibility while loading
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullScreenImage: {
    resizeMode: 'contain',
  },
  rotationButtonsContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Align buttons horizontally
  },
  rotationButton: {
    marginHorizontal: 20, // Add space between buttons
  },
});

export default PhotographyScreen;