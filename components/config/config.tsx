import Constants from 'expo-constants';
export const config = {
    serverAddress: Constants.expoConfig?.extra?.API_URL || process.env?.API_URL ||  'https://localhost:3000'
}