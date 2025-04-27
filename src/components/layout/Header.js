import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const Header = ({ onMenuPress, onAddPress }) => {
  const { COLORS, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
          <Ionicons name="menu" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onAddPress}>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={[styles.logo, { borderColor: COLORS.primary }]}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: COLORS.darkText }]}>
          Agenda Cultural
        </Text>
        <Text style={[styles.subtitle, { color: COLORS.primary }]}>
          Cabo Frio • 2025
        </Text>
      </View>

      <View style={[styles.separator, { backgroundColor: COLORS.separator }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconButton: {
    padding: 8,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40,
    borderWidth: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    marginTop: 20,
  },
});

export default Header; 