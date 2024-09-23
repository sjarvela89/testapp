import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './views/HomeScreen'; // Ensure the path is correct
import DogScreen from './views/DogScreen';
import PhotographyScreen from './views/PhotographyScreen';
import { SafeAreaView, StatusBar } from 'react-native';
import AuthorScreen from './views/AuthorScreen';
import GuitarScreen from './views/GuitarScreen';

export type RootStackParamList = {
    Home: undefined;
    Author: { name: string };
    Dog: { name: string };
    Photography: { name: string };
    Guitar:  {name: string };
  };

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Author" component={AuthorScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Dog" component={DogScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Photography" component={PhotographyScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Guitar" component={GuitarScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;