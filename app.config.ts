import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: config.name ?? 'testapp',
  slug: config.slug ?? 'testapp',
  owner: 'sjarvela89',
  version: config.version ?? '1.0.0',
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          usesCleartextTraffic: false,
          networkSecurityConfig: "@xml/network_security_config"
        },
      },
    ]
  ],
  android: {
    ...config.android,
    permissions: ['INTERNET'],
    package: 'com.sjarvela89.testapp',
    
  },
  sdkVersion: config.sdkVersion ?? '51.0.0', // adjust to match your SDK
  extra: {
    API_URL: process.env.API_URL,
    eas: {
        projectId: '76a5c1b8-1a9c-415d-9d5b-29be346b1b2a'
    }
  },
});