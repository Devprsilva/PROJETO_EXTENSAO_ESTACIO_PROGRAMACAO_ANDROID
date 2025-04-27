import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateEvent } from '../../utils/validators';

const EventForm = ({ onSubmit, initialData = null }) => {
  const { COLORS } = useTheme();
  const [formData, setFormData] = useState({
    data: initialData?.data || '',
    mes: initialData?.mes || '',
    nome: initialData?.nome || '',
    descricao: initialData?.descricao || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpar erro quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateEvent(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Input
        label="Data (DD)"
        value={formData.data}
        onChangeText={(text) => handleChange('data', text)}
        placeholder="Digite o dia do evento"
        keyboardType="numeric"
        maxLength={2}
        error={errors.data}
      />

      <Input
        label="Mês (1-12)"
        value={formData.mes}
        onChangeText={(text) => handleChange('mes', text)}
        placeholder="Digite o mês do evento"
        keyboardType="numeric"
        maxLength={2}
        error={errors.mes}
      />

      <Input
        label="Nome do Evento"
        value={formData.nome}
        onChangeText={(text) => handleChange('nome', text)}
        placeholder="Digite o nome do evento"
        error={errors.nome}
      />

      <Input
        label="Descrição"
        value={formData.descricao}
        onChangeText={(text) => handleChange('descricao', text)}
        placeholder="Digite a descrição do evento"
        multiline
        numberOfLines={4}
        error={errors.descricao}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={initialData ? "Atualizar" : "Adicionar"}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default EventForm; 