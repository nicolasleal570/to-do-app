import { useState, useReducer, ChangeEvent } from 'react';
import ValidationError from '../types/ValidationError';

interface UseFormProps<T> {
  initialState: T;
  onSubmitCallback: (data: any) => void;
  validationFunction?: (data) => Array<ValidationError>;
}

interface UseFormReturnType<T> {
  values: T;
  errors: Array<ValidationError>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function useForm<T>({
  initialState,
  onSubmitCallback,
  validationFunction,
}: UseFormProps<T>): UseFormReturnType<T> {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const reducer = (state: T, payload: { field: string; value: string }): T => ({
    ...state,
    [payload.field]: payload.value,
  });

  const [state, dispatch] = useReducer(reducer, initialState, () => ({
    ...initialState,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = e.target;
    setErrors((prev) => prev.filter((i) => i.inputName !== field));
    dispatch({ field, value });
  };

  const handleValidation = (): boolean => {
    const _errors = validationFunction({ ...state });
    if (_errors?.length > 0) {
      setErrors(_errors);
    } else {
      setErrors([]);
    }

    return !(_errors?.length > 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = handleValidation();

    if (!isValid) return;

    onSubmitCallback(state);
  };

  return {
    values: state,
    errors,
    onChange: handleChange,
    onSubmit: handleSubmit,
  };
}
