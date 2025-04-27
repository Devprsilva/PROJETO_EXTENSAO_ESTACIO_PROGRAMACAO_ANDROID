import { NativeModules } from 'react-native';

// Mock do NativeModules
NativeModules.StatusBarManager = { 
  getHeight: jest.fn(),
  HEIGHT: 44,
  currentHeight: 44
};

// Mock do Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
  select: jest.fn(),
}));

// Mock do AppState
jest.mock('react-native/Libraries/AppState/AppState', () => ({
  currentState: 'active',
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock do StatusBar
jest.mock('expo-status-bar', () => ({
  StatusBar: jest.fn(),
}));

// Mock do Device
jest.mock('expo-device', () => ({
  isDevice: true,
}));

// Mock do StatusBar do React Native
jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => ({
  currentHeight: 44,
})); 