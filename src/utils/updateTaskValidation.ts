import ValidationError from '../types/ValidationError';

interface UserData {
  title: string;
}

export default function updateTaskValidation({ title }: UserData) {
  const errors: ValidationError[] = [];

  if (!title?.trim()) {
    errors.push({
      inputName: 'title',
      message: 'Sorry! You have to enter a valid title',
    });
  }

  return errors;
}
