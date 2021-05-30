import React from 'react';
import classNames from 'classnames';
import Task from '../../types/Task';
import Input from './Input';
import useForm from '../../lib/useForm';

interface DescriptionEditableProps {
  task: Task;
  onUpdateTask: (newTask: Task) => Promise<Task>;
}

export default function DescriptionEditable({
  task,
  onUpdateTask,
}: DescriptionEditableProps) {
  const [showDescriptionInput, setShowDescriptionInput] = React.useState(false);

  const onUpdateDescription = async () => {
    await onUpdateTask({ ...task, description });
    setShowDescriptionInput(false);
  };

  const { values, onChange, onSubmit } = useForm<Task>({
    initialState: { ...task },
    onSubmitCallback: onUpdateDescription,
    validationFunction: () => {
      console.log('valid');
      return [];
    },
  });

  const handleEnterDescription =
    (onBlur = false) =>
    async () => {
      if (onBlur) {
        if (description?.trim()) {
          setShowDescriptionInput(false);
          // await onUpdateDescription();
        } else {
          setShowDescriptionInput(false);
        }
        return;
      }

      setShowDescriptionInput(true);
    };

  const description = values?.description || '';

  return (
    <form onSubmit={onSubmit} className="w-full">
      {showDescriptionInput ? (
        <Input
          id="description-field"
          name="description"
          className="bg-red-400"
          value={description}
          onChange={onChange}
          onBlur={handleEnterDescription(true)}
        />
      ) : (
        <button
          type="button"
          className={classNames(
            'block w-full text-left p-2 bg-transparent hover:bg-darkAccent hover:bg-opacity-10',
            {
              'text-lightSecondary text-sm underline': !task?.description,
            }
          )}
          onClick={handleEnterDescription()}
        >
          {task?.description ? task?.description : 'Enter a description'}
        </button>
      )}
    </form>
  );
}
