import { useState, ChangeEvent } from 'react';
import ValidationError from '../types/ValidationError';

interface UseFormProps<T> {
  initialState: T;
  onSubmitCallback: (data: T) => void;
  validationFunction?: (data: T) => Array<ValidationError>;
}

interface UseFormReturnType<T> {
  values: T;
  errors: Array<ValidationError>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
}

export default function useForm<T>({
  initialState,
  onSubmitCallback,
  validationFunction,
}: UseFormProps<T>): UseFormReturnType<T> {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [values, setValues] = useState<T>(initialState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name: field, value } = e.target;
    setErrors((prev) => prev.filter((i) => i.inputName !== field));
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidation = (): boolean => {
    if (validationFunction) {
      const _errors = validationFunction({ ...values });
      if (_errors?.length > 0) {
        setErrors(_errors);
      } else {
        setErrors([]);
      }

      return !(_errors?.length > 0);
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = handleValidation();

    if (!isValid) return;

    onSubmitCallback(values);
  };

  const handleClear = () => setValues({ ...initialState });

  return {
    values,
    errors,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onClear: handleClear,
  };
}
