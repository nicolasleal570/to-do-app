import { useState, useReducer, ChangeEvent } from 'react';
import ValidationError from '../types/ValidationError';

interface UseFormProps {
  initialState: any;
  onSubmitCallback: (data: any) => void;
  validationFunction?: (data) => Array<ValidationError>;
}

interface UseFormReturnType {
  values: any;
  errors: Array<ValidationError>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function useForm({
  initialState,
  onSubmitCallback,
  validationFunction,
}: UseFormProps): UseFormReturnType {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const reducer = (
    state: typeof initialState,
    payload: { field: string; value: string }
  ) => ({
    ...state,
    [payload.field]: payload.value,
  });

  const [state, dispatch] = useReducer(reducer, initialState);

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
