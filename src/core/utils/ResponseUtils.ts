const errorMessages: Record<string, string> = {
  'unauthorized-user': 'A sua sessão expirou. Por favor, entre novamente.',
  'user-not-found': 'Usuário não encontrado',
  'user-not-encountered': 'Não foi possível recuperar seus dados. Por favor, realize login novamente.',
  'service-not-encountered': 'Não foi possível encontrar o serviço especificado.',
  'attendance-not-encountered': 'Não foi possível encontrar o atendimento especificado.',
}

function findErrorMessage(error: string) {
  let message = errorMessages[error];

  if(!message.length) {
    message = 'Ocorreu um erro interno. Por favor, contate o suporte.';
  }

  return message;
}

function getApplicationDataDest() {
  return 'mock';
}

export {
  findErrorMessage,
  getApplicationDataDest
};
