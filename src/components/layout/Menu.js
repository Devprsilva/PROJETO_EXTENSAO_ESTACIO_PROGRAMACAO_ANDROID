import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const Menu = ({ visible, onClose, onAddEvent, onToggleTheme, isDarkMode }) => {
  const { COLORS } = useTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={[styles.menuContainer, { backgroundColor: COLORS.cardBackground }]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onClose();
              onAddEvent();
            }}
          >
            <Ionicons name="add-circle" size={24} color={COLORS.primary} />
            <Text style={[styles.menuItemText, { color: COLORS.darkText }]}>
              Novo Evento
            </Text>
          </TouchableOpacity>

          <View style={[styles.separator, { backgroundColor: COLORS.separator }]} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onToggleTheme();
              onClose();
            }}
          >
            <Ionicons
              name={isDarkMode ? "sunny" : "moon"}
              size={24}
              color={COLORS.primary}
            />
            <Text style={[styles.menuItemText, { color: COLORS.darkText }]}>
              {isDarkMode ? "Modo Claro" : "Modo Escuro"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menuContainer: {
    width: '80%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    marginVertical: 10,
  },
});

export default Menu; 