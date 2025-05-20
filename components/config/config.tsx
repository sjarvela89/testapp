import Constants from 'expo-constants';
export const config = {
    serverAddress: Constants.expoConfig?.extra?.API_URL || 'http://localhost:3000'
}