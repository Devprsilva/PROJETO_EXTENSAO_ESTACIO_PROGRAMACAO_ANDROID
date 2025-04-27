// Dados para o carrossel
export const CARROSSEL_IMAGENS = [
  {
    id: '1',
    imagem: require('../assets/images/evento_1.jpeg'),
    titulo: 'WE LOVE FLASH'
  },
  {
    id: '2',
    imagem: require('../assets/images/evento_2.jpeg'),
    titulo: 'AMAZING TENORS SINGS BOCELLI'
  },
  {
    id: '3',
    imagem: require('../assets/images/evento_4.jpeg'),
    titulo: 'AQUÁRIO'
  },
  {
    id: '4',
    imagem: require('../assets/images/eventos_3.jpeg'),
    titulo: 'Ostrascycle'
  }
];

// URL da API
export const API_URL = 'http://localhost:3000/api';

// Meses do ano
export const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

// Dias da semana
export const DIAS_DA_SEMANA = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado'
];

// Cores para os eventos
export const CORES_EVENTOS = {
  PESSOAL: '#FF6B6B',
  TRABALHO: '#4ECDC4',
  ESTUDOS: '#45B7D1',
  SAUDE: '#96CEB4',
  OUTROS: '#FFEEAD'
};

// Status dos eventos
export const STATUS_EVENTO = {
  AGENDADO: 'agendado',
  CONCLUIDO: 'concluido',
  CANCELADO: 'cancelado'
};

// Prioridades dos eventos
export const PRIORIDADE_EVENTO = {
  BAIXA: 'baixa',
  MEDIA: 'media',
  ALTA: 'alta'
};

// Configurações de notificação
export const NOTIFICATION_CONFIG = {
  content: {
    title: 'Evento Cultural de Cabo Frio',
    sound: true,
    priority: 'high',
  },
  trigger: {
    hour: 9,
    minute: 0,
    repeats: false,
  },
};

// Mensagens de erro
export const MENSAGENS_ERRO = {
  ERRO_GENERICO: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
  ERRO_AUTENTICACAO: 'Erro de autenticação. Por favor, faça login novamente.',
  ERRO_PERMISSAO: 'Você não tem permissão para realizar esta ação.',
  ERRO_RECURSO_NAO_ENCONTRADO: 'O recurso solicitado não foi encontrado.',
  ERRO_SERVIDOR: 'Erro no servidor. Por favor, tente novamente mais tarde.'
};

// Mensagens de sucesso
export const MENSAGENS_SUCESSO = {
  EVENTO_CRIADO: 'Evento criado com sucesso!',
  EVENTO_ATUALIZADO: 'Evento atualizado com sucesso!',
  EVENTO_DELETADO: 'Evento deletado com sucesso!',
  LOGIN_SUCESSO: 'Login realizado com sucesso!',
  LOGOUT_SUCESSO: 'Logout realizado com sucesso!'
}; 