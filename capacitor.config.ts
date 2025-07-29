import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.sirfatest',
  appName: 'sirfatest',
  webDir: 'dist',
  server: {
    url: 'https://6b31f322-514d-43ee-b88c-0cf427b828b7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;