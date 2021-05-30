import React from 'react';
import classNames from 'classnames';
import Task from '../../types/Task';
import Input from './Input';
import useForm from '../../lib/useForm';
import useClickOutside from '../../lib/useClickOutside';

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
  const [onSubmitUsed, setOnSubmitUsed] = React.useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = React.useState(false);
  const descriptionRef = React.useRef(null);

  useClickOutside(
    descriptionRef,
    () => {
      console.log('click outside');
    },
    onSubmitUsed
  );

  const onUpdateDescription = async () => {
    setLoading(true);
    await onUpdateTask({ ...task, description });
    setShowDescriptionInput(false);
    setLoading(false);
    setOnSubmitUsed(false);
  };

  const { values, onChange, onSubmit } = useForm<Task>({
    initialState: { ...task },
    onSubmitCallback: onUpdateDescription,
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setOnSubmitUsed(true);
    onSubmit(e);
  };

  const handleEnterDescription = () => setShowDescriptionInput(true);

  React.useEffect(() => {
    if (loading) {
      setShowDescriptionInput(false);
    }
  }, [loading]);

  const description = values?.description || '';

  return (
    <form onSubmit={handleOnSubmit} className="w-full">
      {showDescriptionInput ? (
        <Input
          id="description-field"
          name="description"
          className="bg-red-400"
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
