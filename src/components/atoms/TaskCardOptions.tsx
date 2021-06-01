import React from 'react';
import Task from '../../types/Task';
import Button from './Button';
import ButtonColorVariants from '../../types/enums/ButtonColorVariants';
import ButtonSizeVariants from '../../types/enums/ButtonSizeVariants';
import CheckSquareIcon from './icons/CheckSquareIcon';
import AddIcon from './icons/AddIcon';

interface TaskCardOptionsProps {
  task: Task;
  selected: boolean;
  loading: boolean;
  onSelect: () => void;
  handleUpdate: (updatedTask: Task) => void;
}

export default function TaskCardOptions({
  task,
  selected,
  loading,
  onSelect,
  handleUpdate,
}: TaskCardOptionsProps) {
  const markAsDone = () => {
    handleUpdate({ ...task, completed: !task?.completed });
  };

  return (
    <div className="flex items-center ml-auto md:ml-4">
      {!selected && (
        <Button
          id="add-task"
          onClick={onSelect}
          color={
            !task?.isFavorite
              ? ButtonColorVariants.white
              : ButtonColorVariants.primary
          }
          size={ButtonSizeVariants.small}
          disabled={loading || task?.completed}
          icon
          borders
        >
          <AddIcon />
        </Button>
      )}
      <Button
        id="check-task"
        onClick={markAsDone}
        color={
          !task?.isFavorite
            ? ButtonColorVariants.white
            : ButtonColorVariants.primary
        }
        disabled={selected || loading}
        icon
      >
        <CheckSquareIcon checked={task?.completed} />
      </Button>
    </div>
  );
}
