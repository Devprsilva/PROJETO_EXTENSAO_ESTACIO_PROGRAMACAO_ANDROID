import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const EventItem = ({ event, onPress }) => {
  const { COLORS } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: COLORS.cardBackground }]}
      onPress={onPress}
    >
      <View style={[styles.dateContainer, { backgroundColor: COLORS.primary }]}>
        <Text style={styles.dayOfWeek}>{event.diaSemana}</Text>
        <Text style={styles.date}>{event.data}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: COLORS.darkText }]}>
          {event.nome}
        </Text>
        <Text style={[styles.description, { color: COLORS.grayText }]}>
          {event.descricao}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dateContainer: {
    width: 80,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayOfWeek: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  date: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default EventItem; 