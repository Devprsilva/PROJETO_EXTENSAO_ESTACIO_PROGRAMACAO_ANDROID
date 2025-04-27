import { StyleSheet, Text, View, ScrollView, StatusBar as RNStatusBar, Platform, TouchableOpacity, Modal, TextInput, Image, AppState, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const LIGHT_COLORS = {
  primary: '#1E88E5',
  primaryLight: '#E3F2FD',
  white: '#FFFFFF',
  gray: '#F5F7FA',
  grayText: '#607D8B',
  darkText: '#2C3E50',
  background: '#FFFFFF',
  cardBackground: '#F5F7FA',
  separator: 'rgba(0, 0, 0, 0.1)',
};

const DARK_COLORS = {
  primary: '#1E88E5',
  primaryLight: '#E3F2FD',
  white: '#FFFFFF',
  gray: '#F5F7FA',
  grayText: '#607D8B',
  darkText: '#2C3E50',
  background: '#2C3E50',
  cardBackground: '#FFFFFF',
  separator: 'rgba(255, 255, 255, 0.15)',
};

const eventosDoAno = [
  {
    mes: 'Janeiro',
    data: [
      {
        id: '1',
        data: '01',
        diaSemana: 'SEG',
        descricao: 'Feriado Nacional - Confraternização Universal. Celebração do primeiro dia do ano com shows e fogos de artifício na Praia do Forte.',
        nome: 'Ano Novo'
      },
      {
        id: '2',
        data: '06',
        diaSemana: 'SAB',
        descricao: 'Festa de Reis - Tradição cultural com apresentações folclóricas, comidas típicas e danças tradicionais no Centro Cultural.',
        nome: 'Festa de Reis'
      },
      {
        id: '3',
        data: '20',
        diaSemana: 'SAB',
        descricao: 'Festa de São Sebastião - Padroeiro de Cabo Frio. Procissão pelas ruas da cidade e missa solene na Igreja Matriz.',
        nome: 'Festa de São Sebastião'
      },
      {
        id: '4',
        data: '25',
        diaSemana: 'QUI',
        descricao: 'Festival de Verão - Shows na Praia do Forte com artistas locais e nacionais, feira de artesanato e gastronomia.',
        nome: 'Festival de Verão'
      },
      {
        id: '5',
        data: '30',
        diaSemana: 'TER',
        descricao: 'Feira de Artesanato da Orla - Exposição e venda de artesanato local na orla da Praia do Forte.',
        nome: 'Feira de Artesanato da Orla'
      }
    ]
  },
  {
    mes: 'Fevereiro',
    data: [
      {
        id: '6',
        data: '12',
        diaSemana: 'SEG',
        descricao: 'Feriado Nacional - Carnaval. Desfiles de blocos carnavalescos e escolas de samba no Centro da cidade.',
        nome: 'Carnaval'
      },
      {
        id: '7',
        data: '13',
        diaSemana: 'TER',
        descricao: 'Feriado Nacional - Carnaval. Continuidade das festividades com shows e blocos de rua.',
        nome: 'Carnaval'
      },
      {
        id: '8',
        data: '14',
        diaSemana: 'QUA',
        descricao: 'Feriado Nacional - Quarta-feira de Cinzas. Encerramento do Carnaval com missa de cinzas.',
        nome: 'Quarta-feira de Cinzas'
      },
      {
        id: '9',
        data: '15',
        diaSemana: 'QUI',
        descricao: 'Carnaval Cultural - Blocos de Rua com temas regionais e apresentações culturais no Centro Histórico.',
        nome: 'Carnaval Cultural'
      },
      {
        id: '10',
        data: '22',
        diaSemana: 'QUI',
        descricao: 'Festival de Música Popular - Apresentações de artistas locais no Teatro Municipal.',
        nome: 'Festival de Música Popular'
      }
    ]
  },
  {
    mes: 'Março',
    data: [
      {
        id: '11',
        data: '08',
        diaSemana: 'SAB',
        descricao: 'Feira de Artesanato - Mulheres Artesãs. Exposição e venda de artesanato local na Praça Porto Rocha.',
        nome: 'Feira de Artesanato'
      },
      {
        id: '12',
        data: '15',
        diaSemana: 'SAB',
        descricao: 'Festival Gastronômico - Sabores da Região. Degustação de pratos típicos na Praça Porto Rocha.',
        nome: 'Festival Gastronômico'
      },
      {
        id: '13',
        data: '29',
        diaSemana: 'SEX',
        descricao: 'Feriado Nacional - Sexta-feira Santa. Encenação da Paixão de Cristo no Centro Histórico.',
        nome: 'Sexta-feira Santa'
      },
      {
        id: '14',
        data: '31',
        diaSemana: 'DOM',
        descricao: 'Feriado Nacional - Páscoa. Celebrações religiosas e eventos culturais nas praças da cidade.',
        nome: 'Páscoa'
      }
    ]
  },
  {
    mes: 'Abril',
    data: [
      {
        id: '15',
        data: '13',
        diaSemana: 'DOM',
        descricao: 'Feira Gastronômica - Sabores de Cabo Frio. Degustação de pratos típicos da região na Praça Porto Rocha.',
        nome: 'Feira Gastronômica'
      },
      {
        id: '16',
        data: '21',
        diaSemana: 'DOM',
        descricao: 'Feriado Nacional - Tiradentes. Eventos cívicos e culturais no Centro da cidade.',
        nome: 'Tiradentes'
      },
      {
        id: '17',
        data: '23',
        diaSemana: 'TER',
        descricao: 'Ostrascycle - O maior encontro de motociclistas do Brasil, acontecerá em Rio das Ostras de 23 a 27 de abril. O evento contará com mais de 40 shows de rock, incluindo bandas como Plebe Rude e Raimundos. O encontro também terá exposições de motos, cultura biker e uma atmosfera de amizade e liberdade.',
        nome: 'Ostrascycle'
      },
      {
        id: '18',
        data: '26',
        diaSemana: 'SEX',
        descricao: 'O trio Amazing Tenors traz aos palcos um espetáculo nunca visto no Brasil! Em "Amazing Tenors, Sings Bocelli", três jovens, e já renomados tenores, interpretam as músicas que marcaram a carreira de um dos maiores e mais populares tenores da história da música!',
        nome: 'AMAZING TENORS SINGS BOCELLI'
      },
      {
        id: '19',
        data: '27',
        diaSemana: 'SAB',
        descricao: 'Festival de Teatro - Centro Cultural. Apresentações de grupos teatrais locais e convidados.',
        nome: 'Festival de Teatro'
      },
      {
        id: '20',
        data: '30',
        diaSemana: 'TER',
        descricao: 'Feira de Artesanato - Praia do Forte. Exposição e venda de artesanato local com vista para o mar.',
        nome: 'Feira de Artesanato'
      }
    ]
  },
  {
    mes: 'Maio',
    data: [
      {
        id: '20',
        data: '01',
        diaSemana: 'QUA',
        descricao: 'Feriado Nacional - Dia do Trabalho. Shows e eventos culturais na Praia do Forte.',
        nome: 'Dia do Trabalho'
      },
      {
        id: '21',
        data: '10',
        diaSemana: 'SEX',
        descricao: 'AQUÁRIO - A festa Aquário surge com o objetivo de oferecer uma experiência única para o público jovem da cidade que deseja se divertir ao som de muito popfunk e músicas alternativas! Com um ambiente totalmente tropical, o evento acontecerá em Araruama.',
        nome: 'AQUÁRIO'
      },
      {
        id: '22',
        data: '13',
        diaSemana: 'SEG',
        descricao: 'Feriado Nacional - Abolição da Escravatura. Eventos culturais e exposições no Centro Cultural.',
        nome: 'Abolição da Escravatura'
      },
      {
        id: '23',
        data: '18',
        diaSemana: 'SAB',
        descricao: 'Feira de Livros - Praça Porto Rocha. Exposição e venda de livros, contação de histórias e encontros com autores.',
        nome: 'Feira do Livro'
      },
      {
        id: '24',
        data: '25',
        diaSemana: 'SAB',
        descricao: 'Festival de Dança - Centro Cultural. Apresentações de grupos de dança locais e convidados.',
        nome: 'Festival de Dança'
      },
      {
        id: '25',
        data: '30',
        diaSemana: 'QUI',
        descricao: 'Feriado Municipal - Aniversário de Cabo Frio. Desfile cívico, shows e eventos culturais em diversos pontos da cidade.',
        nome: 'Aniversário de Cabo Frio'
      }
    ]
  },
  {
    mes: 'Junho',
    data: [
      {
        id: '26',
        data: '07',
        diaSemana: 'SAB',
        descricao: 'A banda carioca A Noite Nunca Tem Fim, conhecida por reviver os maiores hits do rock pop dos anos 80 e 90, promete um show eletrizante que vai fazer você viajar no tempo!',
        nome: 'WE LOVE FLASH'
      },
      {
        id: '27',
        data: '13',
        diaSemana: 'QUI',
        descricao: 'Feriado Estadual - Santo Antônio. Festividades religiosas e culturais na Igreja de Santo Antônio.',
        nome: 'Dia de Santo Antônio'
      },
      {
        id: '28',
        data: '20',
        diaSemana: 'QUI',
        descricao: 'Feriado Estadual - São João. Tradicional festa junina com quadrilhas, comidas típicas e fogos.',
        nome: 'São João'
      },
      {
        id: '29',
        data: '24',
        diaSemana: 'TER',
        descricao: 'Arraiá Cultural - Centro da Cidade. Festa junina com apresentações folclóricas e gastronomia típica.',
        nome: 'Arraiá Cultural'
      },
      {
        id: '30',
        data: '29',
        diaSemana: 'SAB',
        descricao: 'Feriado Estadual - São Pedro. Celebrações religiosas e festividades culturais no Porto do Rio.',
        nome: 'São Pedro'
      }
    ]
  },
  {
    mes: 'Julho',
    data: [
      {
        id: '31',
        data: '16',
        diaSemana: 'TER',
        descricao: 'Feriado Estadual - Nossa Senhora do Carmo. Procissão marítima e celebrações religiosas.',
        nome: 'Nossa Senhora do Carmo'
      },
      {
        id: '32',
        data: '20',
        diaSemana: 'SAB',
        descricao: 'Festival de Inverno de Cabo Frio. Shows, exposições e eventos culturais em diversos pontos da cidade.',
        nome: 'Festival de Inverno'
      },
      {
        id: '33',
        data: '27',
        diaSemana: 'SAB',
        descricao: 'Feira de Artesanato - Praia do Forte. Exposição e venda de artesanato local com vista para o mar.',
        nome: 'Feira de Artesanato'
      }
    ]
  },
  {
    mes: 'Agosto',
    data: [
      {
        id: '34',
        data: '15',
        diaSemana: 'QUI',
        descricao: 'Feriado Estadual - Dia do Estado do Rio de Janeiro. Eventos cívicos e culturais no Centro da cidade.',
        nome: 'Dia do Estado do RJ'
      },
      {
        id: '35',
        data: '22',
        diaSemana: 'QUI',
        descricao: 'Feriado Municipal - Dia do Folclore. Apresentações de danças folclóricas e tradicionais no Centro Cultural.',
        nome: 'Dia do Folclore'
      },
      {
        id: '36',
        data: '24',
        diaSemana: 'SAB',
        descricao: 'Festival de Dança - Centro Cultural. Apresentações de grupos de dança locais e convidados.',
        nome: 'Festival de Dança'
      },
      {
        id: '37',
        data: '30',
        diaSemana: 'SAB',
        descricao: 'Feira Gastronômica - Sabores do Inverno. Degustação de pratos típicos da estação na Praça Porto Rocha.',
        nome: 'Feira Gastronômica'
      }
    ]
  },
  {
    mes: 'Setembro',
    data: [
      {
        id: '38',
        data: '07',
        diaSemana: 'SAB',
        descricao: 'Feriado Nacional - Independência do Brasil. Desfile cívico-militar e eventos culturais no Centro.',
        nome: 'Independência do Brasil'
      },
      {
        id: '39',
        data: '14',
        diaSemana: 'SAB',
        descricao: 'Feira de Gastronomia - Praça Porto Rocha. Degustação de pratos típicos e shows musicais.',
        nome: 'Feira Gastronômica'
      },
      {
        id: '40',
        data: '20',
        diaSemana: 'SEX',
        descricao: 'Feriado Municipal - Dia da Consciência Negra. Eventos culturais e exposições no Centro Cultural.',
        nome: 'Consciência Negra'
      },
      {
        id: '41',
        data: '28',
        diaSemana: 'SAB',
        descricao: 'Festival de Música - Praia do Forte. Shows com artistas locais e nacionais na orla.',
        nome: 'Festival de Música'
      }
    ]
  },
  {
    mes: 'Outubro',
    data: [
      {
        id: '42',
        data: '12',
        diaSemana: 'SAB',
        descricao: 'Feriado Nacional - Nossa Senhora Aparecida. Celebrações religiosas e eventos culturais.',
        nome: 'Nossa Senhora Aparecida'
      },
      {
        id: '43',
        data: '19',
        diaSemana: 'SAB',
        descricao: 'Feira de Artesanato - Centro Cultural. Exposição e venda de artesanato local com workshops.',
        nome: 'Feira de Artesanato'
      },
      {
        id: '44',
        data: '28',
        diaSemana: 'SEG',
        descricao: 'Feriado Municipal - Dia do Servidor Público. Eventos culturais e de lazer para servidores.',
        nome: 'Dia do Servidor'
      },
      {
        id: '45',
        data: '31',
        diaSemana: 'QUI',
        descricao: 'Halloween Cultural - Centro da Cidade. Evento temático com apresentações e atividades culturais.',
        nome: 'Halloween Cultural'
      }
    ]
  },
  {
    mes: 'Novembro',
    data: [
      {
        id: '46',
        data: '02',
        diaSemana: 'SAB',
        descricao: 'Feriado Nacional - Finados. Celebrações religiosas nos cemitérios da cidade.',
        nome: 'Finados'
      },
      {
        id: '47',
        data: '15',
        diaSemana: 'SEX',
        descricao: 'Feriado Nacional - Proclamação da República. Eventos cívicos e culturais no Centro.',
        nome: 'Proclamação da República'
      },
      {
        id: '48',
        data: '20',
        diaSemana: 'QUA',
        descricao: 'Feriado Nacional - Dia da Consciência Negra. Eventos culturais e exposições no Centro Cultural.',
        nome: 'Consciência Negra'
      },
      {
        id: '49',
        data: '23',
        diaSemana: 'SAB',
        descricao: 'Festival de Cultura Popular. Apresentações de grupos folclóricos e tradicionais.',
        nome: 'Festival Cultural'
      },
      {
        id: '50',
        data: '30',
        diaSemana: 'SAB',
        descricao: 'Feira de Artesanato de Natal - Centro Cultural. Exposição e venda de artesanato natalino.',
        nome: 'Feira de Artesanato de Natal'
      }
    ]
  },
  {
    mes: 'Dezembro',
    data: [
      {
        id: '51',
        data: '08',
        diaSemana: 'DOM',
        descricao: 'Feriado Municipal - Dia de Nossa Senhora da Conceição. Celebrações religiosas na Igreja Matriz.',
        nome: 'Nossa Senhora da Conceição'
      },
      {
        id: '52',
        data: '15',
        diaSemana: 'DOM',
        descricao: 'Feira de Natal - Centro da Cidade. Artesanato natalino, comidas típicas e shows musicais.',
        nome: 'Feira de Natal'
      },
      {
        id: '53',
        data: '25',
        diaSemana: 'QUA',
        descricao: 'Feriado Nacional - Natal. Celebrações religiosas e eventos culturais nas praças.',
        nome: 'Natal'
      },
      {
        id: '54',
        data: '31',
        diaSemana: 'TER',
        descricao: 'Feriado Municipal - Véspera de Ano Novo. Shows e queima de fogos na Praia do Forte.',
        nome: 'Véspera de Ano Novo'
      }
    ]
  }
];

const carrosselImagens = [
  {
    id: '1',
    imagem: require('./assets/evento_1.jpeg'),
    titulo: 'WE LOVE FLASH'
  },
  {
    id: '2',
    imagem: require('./assets/evento_2.jpeg'),
    titulo: 'AMAZING TENORS SINGS BOCELLI'
  },
  {
    id: '3',
    imagem: require('./assets/evento_4.jpeg'),
    titulo: 'AQUÁRIO'
  },
  {
    id: '4',
    imagem: require('./assets/eventos_3.jpeg'),
    titulo: 'Ostrascycle'
  }
];

const EventoItem = ({ data, diaSemana, descricao, nome, isDarkMode, COLORS }) => (
  <View style={[styles.eventoItem, { backgroundColor: COLORS.cardBackground }]} testID="event-item">
    <View style={[styles.dataContainer, { backgroundColor: COLORS.primary }]} testID="event-date-container">
      <Text style={styles.diaSemana} testID="event-weekday">{diaSemana}</Text>
      <Text style={styles.data} testID="event-date">{data}</Text>
    </View>
    <View style={styles.cardContent}>
      <View style={styles.infoContainer}>
        <Text style={[styles.nome, { color: COLORS.darkText }]} testID="event-name">{nome}</Text>
        <Text style={[styles.descricao, { color: COLORS.grayText }]} testID="event-description">{descricao}</Text>
      </View>
    </View>
  </View>
);

const MesVazioItem = ({ isDarkMode, COLORS }) => (
  <View style={[styles.mesVazio, { backgroundColor: COLORS.cardBackground }]} testID="empty-month">
    <Text style={[styles.mesVazioTexto, { color: COLORS.grayText }]} testID="empty-month-text">Nenhum evento cadastrado</Text>
  </View>
);

const validarInputs = (evento) => {
  const erros = [];
  
  if (!evento.data || !/^\d{2}$/.test(evento.data)) {
    erros.push('Data inválida. Use o formato DD');
  } else {
    const dia = parseInt(evento.data);
    if (dia < 1 || dia > 31) {
      erros.push('Dia inválido. Use um valor entre 01 e 31');
    }
  }

  if (!evento.mes || !/^\d{1,2}$/.test(evento.mes)) {
    erros.push('Mês inválido. Use um número entre 1 e 12');
  } else {
    const mes = parseInt(evento.mes);
    if (mes < 1 || mes > 12) {
      erros.push('Mês inválido. Use um número entre 1 e 12');
    }
  }

  if (!evento.nome || evento.nome.trim().length < 3) {
    erros.push('Nome do evento deve ter pelo menos 3 caracteres');
  }

  if (!evento.descricao || evento.descricao.trim().length < 10) {
    erros.push('Descrição deve ter pelo menos 10 caracteres');
  }

  return erros;
};

const sanitizarInput = (texto) => {
  return texto
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim();
};

const Carrossel = ({ isDarkMode, COLORS }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / 300);
    setActiveIndex(index);
  };

  return (
    <View style={styles.carrosselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carrossel}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        testID="carrossel"
      >
        {carrosselImagens.map((item) => (
          <View key={item.id} style={styles.carrosselItem}>
            <Image
              source={item.imagem}
              style={styles.carrosselImagem}
              resizeMode="cover"
              onError={(error) => console.log('Erro ao carregar imagem:', error)}
            />
            <View style={[styles.carrosselOverlay, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
              <Text style={[styles.carrosselTitulo, { color: COLORS.white }]}>
                {item.titulo}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {carrosselImagens.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: index === activeIndex ? COLORS.primary : COLORS.grayText,
                opacity: index === activeIndex ? 1 : 0.5,
              }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

async function scheduleNotification(evento, diasRestantes) {
  try {
    if (!evento || !evento.nome || !evento.descricao) {
      console.error('Dados do evento inválidos para notificação');
      return;
    }

    let mensagem = '';
    let horaNotificacao = new Date();

    if (diasRestantes === 0) {
      mensagem = `Hoje é o dia do evento: ${evento.nome}! ${evento.descricao}`;
      horaNotificacao.setHours(9, 0, 0);
    } else {
      mensagem = `Faltam ${diasRestantes} dias para o evento: ${evento.nome}! ${evento.descricao}`;
      horaNotificacao.setDate(horaNotificacao.getDate() + diasRestantes);
      horaNotificacao.setHours(18, 0, 0);
    }

    if (isNaN(horaNotificacao.getTime())) {
      console.error('Data de notificação inválida');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Evento Cultural de Cabo Frio',
        body: mensagem,
        data: { 
          evento: evento.nome,
          timestamp: new Date().getTime()
        },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        date: horaNotificacao,
      },
    });
  } catch (error) {
    console.error('Erro ao agendar notificação:', error);
  }
}

async function checkForUpcomingEvents() {
  try {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();

    await Notifications.cancelAllScheduledNotificationsAsync();

    for (const mes of eventosDoAno) {
      for (const evento of mes.data) {
        const dataEvento = new Date(anoAtual, parseInt(mes.mes) - 1, parseInt(evento.data));
        const diferencaDias = Math.floor((dataEvento - hoje) / (1000 * 60 * 60 * 24));

        if (diferencaDias >= 0 && diferencaDias <= 3) {
          if (diferencaDias === 0) {
            await scheduleNotification(evento, 0);
          }
          else if (diferencaDias === 3) {
            await scheduleNotification(evento, 3);
          }
        }
      }
    }
  } catch (error) {
    console.log('Erro ao verificar eventos próximos:', error);
  }
}

export { eventosDoAno, validarInputs, checkForUpcomingEvents };
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    data: '',
    mes: '',
    nome: '',
    descricao: ''
  });
  const COLORS = isDarkMode ? DARK_COLORS : LIGHT_COLORS;
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        await Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
          }),
        });

        await registerForPushNotificationsAsync();
        
        await checkForUpcomingEvents();

        const subscription = AppState.addEventListener('change', nextAppState => {
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            checkForUpcomingEvents();
          }
          appState.current = nextAppState;
        });

        return () => {
          subscription.remove();
        };
      } catch (error) {
        console.log('Erro ao configurar notificações:', error);
      }
    };

    setupNotifications();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
      return;
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Permissão para notificações não concedida');
        return;
      }
    } catch (error) {
      console.log('Erro ao registrar notificações:', error);
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleAddEvent = () => {
    const eventoSanitizado = {
      data: sanitizarInput(newEvent.data),
      mes: sanitizarInput(newEvent.mes),
      nome: sanitizarInput(newEvent.nome),
      descricao: sanitizarInput(newEvent.descricao)
    };

    const erros = validarInputs(eventoSanitizado);
    if (erros.length > 0) {
      Alert.alert(
        'Erro de Validação',
        erros.join('\n'),
        [{ text: 'OK' }]
      );
      return;
    }

    const mesNumero = parseInt(eventoSanitizado.mes);
    const mesIndex = mesNumero - 1;
    const diaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'][new Date(2025, mesIndex, parseInt(eventoSanitizado.data)).getDay()];
    
    const evento = {
      id: (eventosDoAno[mesIndex].data.length + 1).toString(),
      data: eventoSanitizado.data,
      diaSemana: diaSemana,
      descricao: eventoSanitizado.descricao,
      nome: eventoSanitizado.nome
    };

    eventosDoAno[mesIndex].data.push(evento);
    setShowAddEvent(false);
    setNewEvent({ data: '', mes: '', nome: '', descricao: '' });
  };

  const renderMes = (mes, eventos) => (
    <View key={mes} style={styles.mesContainer}>
      <View style={styles.mesHeader}>
        <View style={styles.mesHeaderContent}>
          <Text style={[styles.mesTitle, { color: isDarkMode ? COLORS.white : COLORS.darkText }]}>{mes}</Text>
          <View style={styles.eventosContainer}>
            <View style={[styles.contadorContainer, { 
              backgroundColor: isDarkMode ? 'rgba(30, 136, 229, 0.1)' : COLORS.primaryLight,
              borderColor: COLORS.primary 
            }]}>
              <Text style={[styles.eventosNumero, { color: isDarkMode ? COLORS.white : COLORS.primary }]}>{eventos.length}</Text>
              <View style={[styles.separadorVertical, { backgroundColor: COLORS.primary }]} />
              <Text style={[styles.eventosTexto, { color: isDarkMode ? COLORS.primaryLight : COLORS.primary }]}>
                {eventos.length === 1 ? 'evento' : 'eventos'}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.separadorHorizontal, { backgroundColor: COLORS.separator }]} />
      </View>
      {eventos.length > 0 ? (
        eventos.map(evento => (
          <EventoItem key={evento.id} {...evento} isDarkMode={isDarkMode} COLORS={COLORS} testID="event-item" />
        ))
      ) : (
        <MesVazioItem isDarkMode={isDarkMode} COLORS={COLORS} />
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.header, { backgroundColor: COLORS.background }]}>
          <View style={styles.headerTop}>
            <View style={styles.headerButtonsContainer}>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={toggleMenu}
                testID="menu-button"
              >
                <Ionicons name="settings" size={28} color={isDarkMode ? COLORS.white : COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => setShowAddEvent(true)}
                testID="add-button"
              >
                <Ionicons name="add-circle" size={28} color={isDarkMode ? COLORS.white : COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerContent}>
            <Image
              source={require('./assets/icone-app-calendario-cultural.png')}
              style={[styles.headerImage, { borderColor: COLORS.primary }]}
              resizeMode="cover"
            />
            <Text style={[styles.titulo, { color: isDarkMode ? COLORS.white : COLORS.darkText }]}>Agenda Cultural</Text>
            <Text style={[styles.subtitulo, { color: isDarkMode ? COLORS.primaryLight : COLORS.primary }]}>Cabo Frio • 2025</Text>
          </View>
          <View style={[styles.separadorHeader, { backgroundColor: COLORS.separator }]} />
        </View>
        
        <Carrossel isDarkMode={isDarkMode} COLORS={COLORS} />
        
        <View style={[styles.content, { backgroundColor: COLORS.background }]}>
          {eventosDoAno.map(section => renderMes(section.mes, section.data))}
        </View>
        <View style={[styles.footer, { backgroundColor: COLORS.background }]}>
          <View style={[styles.separadorFooter, { backgroundColor: COLORS.separator }]} />
          <View style={styles.footerContent}>
            <Text style={[styles.footerText, { color: isDarkMode ? COLORS.white : COLORS.darkText }]}>
              © 2025 Prefeitura de Cabo Frio
            </Text>
            <View style={styles.footerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="logo-facebook" size={24} color={isDarkMode ? COLORS.white : COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="logo-instagram" size={24} color={isDarkMode ? COLORS.white : COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="logo-twitter" size={24} color={isDarkMode ? COLORS.white : COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        visible={showAddEvent}
        animationType="slide"
        onRequestClose={() => setShowAddEvent(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={[styles.addEventContainer, { backgroundColor: COLORS.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: COLORS.darkText }]}>Adicionar Novo Evento</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: COLORS.background,
                color: COLORS.white,
                borderColor: COLORS.primary 
              }]}
              placeholder="Data (DD)"
              placeholderTextColor={COLORS.grayText}
              value={newEvent.data}
              onChangeText={(text) => setNewEvent({...newEvent, data: text})}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={[styles.input, { 
                backgroundColor: COLORS.background,
                color: COLORS.white,
                borderColor: COLORS.primary 
              }]}
              placeholder="Mês (1-12)"
              placeholderTextColor={COLORS.grayText}
              value={newEvent.mes}
              onChangeText={(text) => setNewEvent({...newEvent, mes: text})}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={[styles.input, { 
                backgroundColor: COLORS.background,
                color: COLORS.white,
                borderColor: COLORS.primary 
              }]}
              placeholder="Nome do Evento"
              placeholderTextColor={COLORS.grayText}
              value={newEvent.nome}
              onChangeText={(text) => setNewEvent({...newEvent, nome: text})}
            />
            <TextInput
              style={[styles.input, { 
                backgroundColor: COLORS.background,
                color: COLORS.white,
                borderColor: COLORS.primary,
                height: 100,
                textAlignVertical: 'top'
              }]}
              placeholder="Descrição do Evento"
              placeholderTextColor={COLORS.grayText}
              value={newEvent.descricao}
              onChangeText={(text) => setNewEvent({...newEvent, descricao: text})}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: COLORS.primary }]}
                onPress={handleAddEvent}
                testID="submit-button"
              >
                <Text style={[styles.buttonText, { color: COLORS.white }]}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: COLORS.gray }]}
                onPress={() => setShowAddEvent(false)}
              >
                <Text style={[styles.buttonText, { color: COLORS.darkText }]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={showMenu}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <View style={[styles.menuContainer, { backgroundColor: COLORS.cardBackground }]}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                toggleMenu();
                setShowAddEvent(true);
              }}
            >
              <Ionicons name="add-circle" size={24} color={COLORS.primary} />
              <Text style={[styles.menuItemText, { color: COLORS.darkText }]}>Novo Evento</Text>
            </TouchableOpacity>
            <View style={[styles.separadorMenu, { backgroundColor: COLORS.separator }]} />
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                toggleTheme();
                toggleMenu();
              }}
              testID="theme-button"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : RNStatusBar.currentHeight,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 15,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginRight: 2,
  },
  headerContent: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: '400',
  },
  separadorHeader: {
    height: 2,
    marginTop: 20,
    marginHorizontal: -20,
  },
  separadorHorizontal: {
    height: 2,
    marginTop: 15,
  },
  separadorVertical: {
    width: 1,
    height: 20,
    marginHorizontal: 10,
  },
  mesContainer: {
    marginBottom: 25,
  },
  mesHeader: {
    marginBottom: 15,
  },
  mesHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  mesTitle: {
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  eventosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  eventosNumero: {
    fontSize: 16,
    fontWeight: '600',
  },
  eventosTexto: {
    fontSize: 14,
    fontWeight: '400',
  },
  eventoItem: {
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  dataContainer: {
    width: 80,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  data: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  diaSemana: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
    marginBottom: 5,
    opacity: 0.9,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    padding: 15,
  },
  nome: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
    letterSpacing: 0.25,
  },
  descricao: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  mesVazio: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  mesVazioTexto: {
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  menuButton: {
    display: 'none',
  },
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
  separadorMenu: {
    height: 1,
    marginVertical: 10,
  },
  addEventContainer: {
    width: '90%',
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
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 50,
    borderWidth: 3,
  },
  footer: {
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  separadorFooter: {
    height: 2,
    marginBottom: 15,
  },
  footerContent: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 10,
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  iconButton: {
    padding: 5,
  },
  carrosselContainer: {
    height: 200,
    marginBottom: 20,
    position: 'relative',
  },
  carrossel: {
    flex: 1,
  },
  carrosselItem: {
    width: 280,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  carrosselImagem: {
    width: '100%',
    height: '100%',
  },
  carrosselOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  carrosselTitulo: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
}); 