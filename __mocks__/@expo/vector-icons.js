import React from 'react';
import { Text } from 'react-native';

export const Ionicons = ({ name, size, color }) => {
  return <Text testID={`icon-${name}`}>{name}</Text>;
}; 