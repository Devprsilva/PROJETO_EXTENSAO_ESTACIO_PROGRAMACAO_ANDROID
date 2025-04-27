// Validação de email
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validação de senha
export const validarSenha = (senha) => {
  // Mínimo 8 caracteres, pelo menos uma letra maiúscula, uma minúscula e um número
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(senha);
};

// Validação de nome
export const validarNome = (nome) => {
  return nome.length >= 3 && nome.length <= 50;
};

// Validação de data
export const validarData = (data) => {
  const dataAtual = new Date();
  const dataSelecionada = new Date(data);
  return dataSelecionada >= dataAtual;
};

// Validação de hora
export const validarHora = (hora) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regex.test(hora);
};

// Validação de descrição
export const validarDescricao = (descricao) => {
  return descricao.length >= 10 && descricao.length <= 500;
};

// Validação de título
export const validarTitulo = (titulo) => {
  return titulo.length >= 3 && titulo.length <= 50;
};

// Validação de local
export const validarLocal = (local) => {
  return local.length >= 3 && local.length <= 100;
};

// Validação de prioridade
export const validarPrioridade = (prioridade) => {
  const prioridadesValidas = ['baixa', 'media', 'alta'];
  return prioridadesValidas.includes(prioridade);
};

// Validação de status
export const validarStatus = (status) => {
  const statusValidos = ['agendado', 'concluido', 'cancelado'];
  return statusValidos.includes(status);
};

// Validação de categoria
export const validarCategoria = (categoria) => {
  const categoriasValidas = ['pessoal', 'trabalho', 'estudos', 'saude', 'outros'];
  return categoriasValidas.includes(categoria);
};

// Validação de evento completo
export const validarEvento = (evento) => {
  const erros = {};

  if (!validarTitulo(evento.titulo)) {
    erros.titulo = 'O título deve ter entre 3 e 50 caracteres';
  }

  if (!validarDescricao(evento.descricao)) {
    erros.descricao = 'A descrição deve ter entre 10 e 500 caracteres';
  }

  if (!validarData(evento.data)) {
    erros.data = 'A data deve ser maior ou igual à data atual';
  }

  if (!validarHora(evento.hora)) {
    erros.hora = 'A hora deve estar no formato HH:MM';
  }

  if (!validarLocal(evento.local)) {
    erros.local = 'O local deve ter entre 3 e 100 caracteres';
  }

  if (!validarPrioridade(evento.prioridade)) {
    erros.prioridade = 'Prioridade inválida';
  }

  if (!validarStatus(evento.status)) {
    erros.status = 'Status inválido';
  }

  if (!validarCategoria(evento.categoria)) {
    erros.categoria = 'Categoria inválida';
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros
  };
};

// Validação de usuário completo
export const validarUsuario = (usuario) => {
  const erros = {};

  if (!validarNome(usuario.nome)) {
    erros.nome = 'O nome deve ter entre 3 e 50 caracteres';
  }

  if (!validarEmail(usuario.email)) {
    erros.email = 'Email inválido';
  }

  if (!validarSenha(usuario.senha)) {
    erros.senha = 'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números';
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros
  };
}; 