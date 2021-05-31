import React from 'react';
import { motion } from 'framer-motion';
import Button from '../atoms/Button';

interface CreateUserFormProps {
  children: React.ReactNode;
  disabled: boolean;
  loading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CreateUserForm({
  children,
  disabled,
  loading,
  handleSubmit,
}: CreateUserFormProps) {
  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.7, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: 100 }}
      onSubmit={handleSubmit}
      className="w-11/12 md:w-7/12 lg:w-4/12 bg-white rounded-md p-4"
    >
      <p className="lg:text-xl text-center text-dark">
        Enter a name and continue
        <br />
        to enjoy the app.
      </p>
      <div className="my-5">{children}</div>

      <div className="w-full flex justify-center">
        <Button
          id="create-user"
          type="submit"
          disabled={disabled}
          loading={loading}
        >
          Create
        </Button>
      </div>
    </motion.form>
  );
}
