import React from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../components/atoms/Input';
import Loader from '../components/atoms/Loader';
import CreateUserForm from '../components/organisms/CreateUserForm';
import createUserValidation from '../utils/createUserValidation';
import getValidationError from '../utils/getValidationError';
import useForm from '../lib/useForm';
import useUser from '../lib/useUser';

export default function WelcomePage({ history, location }) {
  const { registerUser, user, loading } = useUser();

  const onSubmitCallback = async (data: any) => {
    const _user = await registerUser(data);
    if (_user) {
      history.push('/to-do');
    }
  };

  const { values, errors, onChange, onSubmit } = useForm<{ name: string }>({
    initialState: { name: '' },
    onSubmitCallback,
    validationFunction: createUserValidation,
  });

  const name = values?.name || '';

  if (loading && !name) {
    return <Loader centeredOnScreen />;
  }

  if (!loading && user) {
    return (
      <Redirect
        to={{
          pathname: '/to-do',
          state: { from: location },
        }}
      />
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl text-white w-10/12 text-center font-bold mb-14">
        Welcome {name ? <span>, {name}!</span> : '!'}
      </h1>

      <CreateUserForm
        handleSubmit={onSubmit}
        disabled={errors?.length > 0 || loading}
        loading={loading}
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
