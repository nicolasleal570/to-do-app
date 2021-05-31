import React from 'react';
import classNames from 'classnames';
import Task from '../../types/Task';
import Input from './Input';
import useForm from '../../lib/useForm';

interface DescriptionEditableProps {
  task: Task;
  loading: boolean;
  disabled: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateTask: (newTask: Task) => Promise<Task>;
}

export default function DescriptionEditable({
  task,
  loading,
  disabled,
  setLoading,
  onUpdateTask,
}: DescriptionEditableProps) {
  const [showDescriptionInput, setShowDescriptionInput] = React.useState(false);

  const onUpdateDescription = async () => {
    setLoading(true);
    await onUpdateTask({ ...task, description });
    setLoading(false);
  };

  const { values, onChange, onSubmit } = useForm<Task>({
    initialState: { ...task },
    onSubmitCallback: onUpdateDescription,
  });

  const handleEnterDescription = () => setShowDescriptionInput(true);

  React.useEffect(() => {
    if (loading) {
      setShowDescriptionInput(false);
    }
  }, [loading]);

  const description = values?.description || '';

  return (
    <form onSubmit={onSubmit} className="w-full">
      {showDescriptionInput ? (
        <Input
          id="description-field"
          name="description"
          value={description}
          onChange={onChange}
          disabled={disabled}
          autoFocus
        />
      ) : (
        <button
          type="button"
          className={classNames('block w-full text-left p-2 bg-transparent', {
            'text-lightSecondary text-sm underline':
              !task?.description && !task?.isFavorite,
            'text-white text-sm underline':
              !task?.description && task?.isFavorite,

            'hover:bg-darkAccent hover:bg-opacity-10': !disabled,
            'cursor-not-allowed': disabled,
          })}
          onClick={handleEnterDescription}
          disabled={disabled}
        >
          {task?.description ? task?.description : 'Enter a description'}
        </button>
      )}
    </form>
  );
}
