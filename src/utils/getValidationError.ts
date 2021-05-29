import ValidationError from '../types/ValidationError';

export default function getValidationError(
  errors: Array<ValidationError>,
  inputName: string
): string {
  const error = errors?.find((i) => i.inputName === inputName);
  return error?.message || '';
}
