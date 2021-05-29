import React from 'react';
import Input from '../components/atoms/Input';
import CreateUserForm from '../components/organisms/CreateUserForm';
import createUserValidation from '../lib/createUserValidation';
import ValidationError from '../types/ValidationError';
import getValidationError from '../utils/getValidationError';

export default function WelcomePage() {
  const [errors, setErrors] = React.useState<ValidationError[]>([]);
  const [name, setName] = React.useState('');

  const handleOnChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name: inputName, value } = e.target;
      setErrors((prev) => prev.filter((i) => i.inputName !== inputName));
      setter(value);
    };

  const handleValidation = (): boolean => {
    const _errors = createUserValidation({ name });
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

    console.log('Creating an user...', name);
  };

  console.log(errors);

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl text-white w-10/12 text-center font-bold mb-14">
        Welcome {name ? <span>, {name}!</span> : '!'}
      </h1>

      <CreateUserForm handleSubmit={handleSubmit} disabled={errors?.length > 0}>
        <Input
          name="name"
          value={name}
          onChange={handleOnChange(setName)}
          placeholder="Enter your name"
          autoComplete="off"
          id="name-input"
          errorMessage={getValidationError(errors, 'name')}
        />
      </CreateUserForm>
    </div>
  );
}
