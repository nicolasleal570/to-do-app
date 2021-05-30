import React from 'react';
import classNames from 'classnames';
import Task from '../../types/Task';
import Input from './Input';
import useForm from '../../lib/useForm';
import updateTaskValidation from '../../utils/updateTaskValidation';
import getValidationError from '../../utils/getValidationError';

interface TitleEditableProps {
  task: Task;
  onUpdateTask: (newTask: Task) => Promise<Task>;
}

export default function TitleEditable({
  task,
  onUpdateTask,
}: TitleEditableProps) {
  const [showTitleInput, setShowTitleInput] = React.useState(false);

  const onUpdateDescription = async (updatedTask: Task) => {
    await onUpdateTask({ ...updatedTask });
    setShowTitleInput(false);
  };

  const { values, onChange, onSubmit, errors } = useForm<Task>({
    initialState: { ...task },
    onSubmitCallback: onUpdateDescription,
    validationFunction: updateTaskValidation,
  });

  const showInput = () => setShowTitleInput(true);

  const title = values?.title || '';

  return (
    <form onSubmit={onSubmit} className="w-full">
      {showTitleInput ? (
        <Input
          id="title-field"
          name="title"
          value={title}
          errorMessage={getValidationError(errors, 'title')}
          onChange={onChange}
        />
      ) : (
        <button
          type="button"
          className={classNames(
            'block w-full text-left p-2 bg-transparent hover:bg-darkAccent hover:bg-opacity-10',
            {
              'text-lightSecondary text-sm underline': !task?.title,
            }
          )}
          onClick={showInput}
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
