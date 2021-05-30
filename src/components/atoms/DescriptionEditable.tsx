import React from 'react';
import classNames from 'classnames';
import Task from '../../types/Task';
import Input from './Input';
import useForm from '../../lib/useForm';

interface DescriptionEditableProps {
  task: Task;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateTask: (newTask: Task) => Promise<Task>;
}

export default function DescriptionEditable({
  task,
  loading,
  setLoading,
  onUpdateTask,
}: DescriptionEditableProps) {
  const [showDescriptionInput, setShowDescriptionInput] = React.useState(false);

  const onUpdateDescription = async () => {
    setLoading(true);
    await onUpdateTask({ ...task, description });
    setShowDescriptionInput(false);
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
          className="bg-red-400"
          value={description}
          onChange={onChange}
          disabled={loading}
        />
      ) : (
        <button
          type="button"
          className={classNames(
            'block w-full text-left p-2 bg-transparent hover:bg-darkAccent hover:bg-opacity-10',
            {
              'text-lightSecondary text-sm underline':
                !task?.description && !task?.isFavorite,
              'text-white text-sm underline':
                !task?.description && task?.isFavorite,
            }
          )}
          onClick={handleEnterDescription}
          disabled={loading}
        >
          {task?.description ? task?.description : 'Enter a description'}
        </button>
      )}
    </form>
  );
}
