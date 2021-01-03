export function validateEmail(value: string) {
  if (!value.includes('@') || (
    !value.includes('.com') && !value.includes('.com.br') &&
    !value.includes('.br') && !value.includes('.edu.br')
  )) {
    return false;
  }

  return true;
}

export function generalValidate(value: string) {
  if (!value.length || value.length < 6) {
    return false;
  }

  return true;
}