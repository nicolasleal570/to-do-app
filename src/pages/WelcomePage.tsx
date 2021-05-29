import React from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/atoms/Input';
import CreateUserForm from '../components/organisms/CreateUserForm';
import createUserValidation from '../lib/createUserValidation';
import getValidationError from '../utils/getValidationError';
import useForm from '../lib/useForm';
import useCreateUser from '../lib/api/useCreateUser';

export default function WelcomePage() {
  const history = useHistory();
  const { createUser, loading } = useCreateUser();

  const onSubmitCallback = async (data: any) => {
    const user = await createUser(data);
    if (user) {
      history.push('/to-do');
    }
  };

  const { values, errors, onChange, onSubmit } = useForm({
    initialState: { name: '' },
    onSubmitCallback,
    validationFunction: createUserValidation,
  });

  const name = values?.name || '';

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl text-white w-10/12 text-center font-bold mb-14">
        Welcome {name ? <span>, {name}!</span> : '!'}
      </h1>

      <CreateUserForm
        handleSubmit={onSubmit}
        disabled={errors?.length > 0 || loading}
      >
        <Input
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Enter your name"
          autoComplete="off"
          id="name-input"
          errorMessage={getValidationError(errors, 'name')}
          disabled={loading}
        />
      </CreateUserForm>
    </div>
  );
}
