import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { COLORS } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <View style={[styles.separator, { backgroundColor: COLORS.separator }]} />
      <View style={styles.content}>
        <Text style={[styles.copyright, { color: COLORS.darkText }]}>
          © 2025 Prefeitura de Cabo Frio
        </Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="logo-facebook" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="logo-instagram" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="logo-twitter" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 30,
  },
  separator: {
    height: 1,
    marginBottom: 15,
  },
  content: {
    alignItems: 'center',
  },
  copyright: {
    fontSize: 14,
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  iconButton: {
    padding: 5,
  },
});

export default Footer; 