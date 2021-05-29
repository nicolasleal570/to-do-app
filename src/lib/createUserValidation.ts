import ValidationError from '../types/ValidationError';
import validateString from '../utils/validateString';

interface UserData {
  name: string;
}

export default function createUserValidation({ name }: UserData) {
  const errors: ValidationError[] = [];

  if (!validateString(name)) {
    errors.push({
      inputName: 'name',
      message: 'Sorry! You have to enter a valid name before continue',
    });
  }

  return errors;
}
