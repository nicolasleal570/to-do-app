import React from 'react';
import Button from '../atoms/Button';

interface CreateUserFormProps {
  children: React.ReactNode;
  disabled: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CreateUserForm({
  children,
  disabled,
  handleSubmit,
}: CreateUserFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-11/12 md:w-7/12 xl:w-5/12 bg-white rounded-md p-4"
    >
      <p className="lg:text-xl text-center text-dark">
        Enter a name and continue
        <br />
        to enjoy the app.
      </p>
      <div className="my-5">{children}</div>

      <div className="w-full flex justify-center">
        <Button id="create-user" type="submit" disabled={disabled}>
          Create
        </Button>
      </div>
    </form>
  );
}
