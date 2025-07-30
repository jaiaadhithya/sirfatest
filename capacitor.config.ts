import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.sirfatest',
  appName: 'sirfatest',
  webDir: 'dist',
  server: {
    // For development, use the local server
    // Comment this out for production builds
    androidScheme: 'http',
    cleartext: true
  }
};

export default config;