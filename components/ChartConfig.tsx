import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { weights, averageLine } from '../tables/DogWeightData';

export const chartData = {
  labels: [], // Example labels as weeks: [Array.from({ length: weights.length }, (_, i) => (i + 1).toString())]
  datasets: [
    {
      data: weights,
      strokeWidth: 3,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      withDots: false,
    },
    {
      data: averageLine,
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      strokeWidth: 2,
      withDots: false,
    },
  ],
};

export const chartConfig = {
  backgroundColor: '#c1c5c9',
  backgroundGradientFrom: '#f0f0f0',
  backgroundGradientTo: '#c1c5c9',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  width: Dimensions.get('window').width - 32,
  height: 220,
};