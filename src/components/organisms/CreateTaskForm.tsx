import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import ButtonSizeVariants from '../../types/enums/ButtonSizeVariants';
import getValidationError from '../../utils/getValidationError';
import useViewport from '../../lib/useViewport';
import ValidationError from '../../types/ValidationError';
import Task from '../../types/Task';
import useQuery from '../../lib/useQuery';

interface CreateTaskFormProps {
  disabled: boolean;
  loading: boolean;
  values: Task;
  errors: ValidationError[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateTaskForm({
  disabled,
  loading,
  values,
  errors,
  handleSubmit,
  handleChange,
}: CreateTaskFormProps) {
  const query = useQuery();
  const { viewport } = useViewport();

  return (
    <form
      className="flex items-center flex-col md:flex-row bg-white rounded p-2 md:p-4 w-full md:w-card mx-auto"
      onSubmit={handleSubmit}
    >
      <Input
        id="create-new-task"
        name="title"
        placeholder="Enter a task title"
        onChange={handleChange}
        errorMessage={getValidationError(errors, 'title')}
        value={values?.title}
        autoComplete="off"
        disabled={loading}
        autoFocus={!!query?.get('action')}
      />

      <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-28">
        <Button
          type="submit"
          id="create-task-btn"
          size={
            viewport !== 'sm'
              ? ButtonSizeVariants.normal
              : ButtonSizeVariants.small
          }
          disabled={disabled}
          loading={loading}
          full
        >
          Add
        </Button>
      </div>
    </form>
  );
}
