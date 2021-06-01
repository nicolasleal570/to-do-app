import React from 'react';
import classNames from 'classnames';
import Task from '../../types/Task';
import Input from './Input';
import useForm from '../../lib/useForm';
import updateTaskValidation from '../../utils/updateTaskValidation';
import getValidationError from '../../utils/getValidationError';

interface TitleEditableProps {
  task: Task;
  loading: boolean;
  disabled: boolean;
  editing: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateTask: (newTask: Task) => Promise<Task>;
}

export default function TitleEditable({
  task,
  loading,
  disabled,
  editing,
  setLoading,
  setEditing,
  onUpdateTask,
}: TitleEditableProps) {
  const onUpdateTitle = async () => {
    setLoading(true);
    await onUpdateTask({ ...task, title: values?.title });
    setLoading(false);
  };

  const { values, onChange, onSubmit, errors } = useForm<Task>({
    initialState: { ...task },
    onSubmitCallback: onUpdateTitle,
    validationFunction: updateTaskValidation,
  });

  const handleEnterTitle = () => setEditing(true);

  const onBlurInput = async () => {
    if (task?.title !== values?.title && !loading) {
      onUpdateTitle();
    } else {
      setEditing(false);
    }
  };

  React.useEffect(() => {
    if (loading) {
      setEditing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const title = values?.title || '';

  return (
    <form onSubmit={onSubmit} className="w-full">
      {editing ? (
        <Input
          id="title-field"
          name="title"
          value={title}
          disabled={disabled}
          errorMessage={getValidationError(errors, 'title')}
          onChange={onChange}
          onBlur={onBlurInput}
          autoFocus
        />
      ) : (
        <button
          type="button"
          className={classNames('block w-full text-left p-2 bg-transparent ', {
            'text-lightSecondary text-sm underline': !task?.title,
            'hover:bg-darkAccent hover:bg-opacity-10': !disabled,
            'cursor-not-allowed': disabled,
          })}
          onClick={handleEnterTitle}
          disabled={loading || disabled}
        >
          {task?.title ? (
            <p className="font-bold flex-1 mr-4">{task?.title}</p>
          ) : (
            'Enter a title'
          )}
        </button>
      )}
    </form>
  );
}
