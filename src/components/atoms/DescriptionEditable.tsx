import React from 'react';
import classNames from 'classnames';
import Task from '../../types/Task';
import Textarea from './Textarea';
import useForm from '../../lib/useForm';

interface DescriptionEditableProps {
  task: Task;
  loading: boolean;
  disabled: boolean;
  editing: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateTask: (newTask: Task) => Promise<Task>;
}

export default function DescriptionEditable({
  task,
  loading,
  disabled,
  editing,
  setLoading,
  setEditing,
  onUpdateTask,
}: DescriptionEditableProps) {
  const onUpdateDescription = async () => {
    setLoading(true);
    await onUpdateTask({ ...task, description: values?.description });
    setLoading(false);
  };

  const { values, onChange, onSubmit } = useForm<Task>({
    initialState: { ...task },
    onSubmitCallback: onUpdateDescription,
  });

  const handleEnterDescription = () => setEditing(true);

  const onBlurInput = async () => {
    if (task?.description !== values?.description && !loading) {
      onUpdateDescription();
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

  const description = values?.description || '';

  return (
    <form onSubmit={onSubmit} className="w-full">
      {editing ? (
        <Textarea
          id="description-field"
          name="description"
          rows={7}
          value={description}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlurInput}
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
