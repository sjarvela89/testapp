import { ImageSourcePropType } from 'react-native';
import DogImage from '../resources/dog.jpg';
import PhotographyImage from '../resources/photography.jpg';
import ProfileImage from '../resources/profile.jpg'
import GuitarImage from '../assets/images/guitar.jpeg';
import { RootStackParamList } from '@/AppNavigator';

interface CardData {
  title: string;
  subtitle: string;
  imageSource: ImageSourcePropType;
  screen: keyof RootStackParamList;
}

const cardData: CardData[] = [
  {
    title: "Dog",
    subtitle: "Learn more about Mr. Tomi Junior Eki Balarda",
    imageSource: DogImage,
    screen: "Dog",
  },
  {
    title: "Photography",
    subtitle: "Hobby photographing with mobile phone camera",
    imageSource: PhotographyImage,
    screen: "Photography",
  },
  {
    title: "Author",
    subtitle: "Just a business card of the author.",
    imageSource: ProfileImage,
    screen: "Author",
  },
  {
    title: "Guitar",
    subtitle: "Some music.",
    imageSource: GuitarImage,
    screen: "Guitar",
  },
];

export default cardData;