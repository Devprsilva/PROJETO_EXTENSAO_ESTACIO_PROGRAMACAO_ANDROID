import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const Button = ({ title, onPress, style, textStyle, disabled = false }) => {
  const { COLORS } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: COLORS.primary },
        disabled && { opacity: 0.5 },
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: COLORS.white }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button; 