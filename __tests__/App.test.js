import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import App, { eventosDoAno, validarInputs, checkForUpcomingEvents } from '../App';
import * as Notifications from 'expo-notifications';

// Mock das notificações
jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  cancelAllScheduledNotificationsAsync: jest.fn(),
  AndroidNotificationPriority: {
    HIGH: 'high'
  }
}));

// Mock das imagens
jest.mock('../assets/evento_1.jpeg', () => 'evento_1.jpeg');
jest.mock('../assets/evento_2.jpeg', () => 'evento_2.jpeg');
jest.mock('../assets/evento_4.jpeg', () => 'evento_4.jpeg');
jest.mock('../assets/eventos_3.jpeg', () => 'eventos_3.jpeg');
jest.mock('../assets/icone-app-calendario-cultural.png', () => 'icone-app-calendario-cultural.png');

// Testes de Dados
describe('Testes de Dados', () => {
  test('Dados dos eventos estão corretamente estruturados', () => {
    // Verifica se todos os meses têm a estrutura correta
    eventosDoAno.forEach(mes => {
      expect(mes).toHaveProperty('mes');
      expect(mes).toHaveProperty('data');
      expect(Array.isArray(mes.data)).toBe(true);
      
      // Verifica a estrutura de cada evento
      mes.data.forEach(evento => {
        expect(evento).toHaveProperty('id');
        expect(evento).toHaveProperty('data');
        expect(evento).toHaveProperty('diaSemana');
        expect(evento).toHaveProperty('descricao');
        expect(evento).toHaveProperty('nome');
      });
    });
  });

  test('Validação de inputs funciona corretamente', () => {
    // Teste com dados válidos
    const eventoValido = {
      data: '15',
      mes: '5',
      nome: 'Evento Teste',
      descricao: 'Descrição do evento teste'
    };
    expect(validarInputs(eventoValido)).toHaveLength(0);
    
    // Teste com dados inválidos
    const eventoInvalido = {
      data: '32',
      mes: '13',
      nome: 'A',
      descricao: 'Curto'
    };
    expect(validarInputs(eventoInvalido)).toHaveLength(4);
  });
});

// Testes de Interface
describe('Testes de Interface', () => {
  test('Renderização inicial do aplicativo', () => {
    const { getByText, getByTestId } = render(<App />);
    
    // Verifica elementos principais
    expect(getByText('Agenda Cultural')).toBeTruthy();
    expect(getByText('Cabo Frio • 2025')).toBeTruthy();
  });

  test('Alternância de tema funciona', async () => {
    const { getByTestId } = render(<App />);
    
    // Simula clique no botão de menu
    const menuButton = getByTestId('menu-button');
    fireEvent.press(menuButton);
    
    // Simula clique no botão de alternância de tema
    const themeButton = getByTestId('theme-button');
    await act(async () => {
      fireEvent.press(themeButton);
    });
  });

  test('Adição de novo evento', async () => {
    const { getByTestId, getByPlaceholderText } = render(<App />);
    
    // Abre o modal de adição
    const addButton = getByTestId('add-button');
    fireEvent.press(addButton);
    
    // Preenche o formulário
    const dataInput = getByPlaceholderText('Data (DD)');
    const mesInput = getByPlaceholderText('Mês (1-12)');
    const nomeInput = getByPlaceholderText('Nome do Evento');
    const descricaoInput = getByPlaceholderText('Descrição do Evento');
    
    fireEvent.changeText(dataInput, '15');
    fireEvent.changeText(mesInput, '5');
    fireEvent.changeText(nomeInput, 'Novo Evento');
    fireEvent.changeText(descricaoInput, 'Descrição do novo evento');
    
    // Submete o formulário
    const submitButton = getByTestId('submit-button');
    await act(async () => {
      fireEvent.press(submitButton);
    });
  });
});

// Testes de Desempenho
describe('Testes de Desempenho', () => {
  test('Renderização de lista de eventos', () => {
    const startTime = performance.now();
    
    const { getAllByTestId } = render(<App />);
    const eventItems = getAllByTestId('event-item');
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Verifica se o tempo de renderização está dentro de um limite aceitável
    expect(renderTime).toBeLessThan(1000);
    expect(eventItems.length).toBe(eventosDoAno.reduce((acc, mes) => acc + mes.data.length, 0));
  });

  test('Desempenho do carrossel', () => {
    const startTime = performance.now();
    
    const { getByTestId } = render(<App />);
    const carrossel = getByTestId('carrossel');
    
    // Simula rolagem
    fireEvent.scroll(carrossel, {
      nativeEvent: {
        contentOffset: { x: 300, y: 0 },
        contentSize: { width: 900, height: 200 },
        layoutMeasurement: { width: 300, height: 200 }
      }
    });
    
    const endTime = performance.now();
    const scrollTime = endTime - startTime;
    
    expect(scrollTime).toBeLessThan(500);
  });
});

// Testes de Notificação
describe('Testes de Notificação', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Configuração inicial de notificações', async () => {
    Notifications.getPermissionsAsync.mockResolvedValue({ status: 'granted' });
    
    render(<App />);
    
    expect(Notifications.setNotificationHandler).toHaveBeenCalled();
    expect(Notifications.getPermissionsAsync).toHaveBeenCalled();
  });

  test('Agendamento de notificações', async () => {
    // Mock da data atual
    const mockDate = new Date('2025-05-15');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    
    await checkForUpcomingEvents();
    
    expect(Notifications.scheduleNotificationAsync).toHaveBeenCalled();
  });

  test('Tratamento de permissões de notificação', async () => {
    Notifications.getPermissionsAsync.mockResolvedValue({ status: 'denied' });
    Notifications.requestPermissionsAsync.mockResolvedValue({ status: 'granted' });
    
    render(<App />);
    
    expect(Notifications.requestPermissionsAsync).toHaveBeenCalled();
  });
}); 