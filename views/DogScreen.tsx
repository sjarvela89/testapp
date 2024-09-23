import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import { chartData, chartConfig } from '../components/ChartConfig'; // Adjust the import path if needed
import BackgroundImage from '../resources/background.jpg'; // Import background image

type DogScreenProps = NativeStackScreenProps<RootStackParamList, 'Dog'>;

const DogScreen: React.FC<DogScreenProps> = ({ route }) => {
  const { name } = route.params;

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.title}>Weight Development of Tomi</Text>
          <LineChart
            data={chartData}
            withHorizontalLines={false}
            withVerticalLines={false}
            withShadow={false}
            width={chartConfig.width}
            height={chartConfig.height}
            chartConfig={chartConfig}
            style={styles.chart}
          />
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
    padding: 16,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff', // Ensure the text is readable over the background
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default DogScreen;