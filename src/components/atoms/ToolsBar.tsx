import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import ButtonColorVariants from '../../types/enums/ButtonColorVariants';
import Task from '../../types/Task';
import TrashIcon from './icons/TrashIcon';
import HeartIcon from './icons/HeartIcon';
import useViewport, { UseViewportSizeVariants } from '../../lib/useViewport';
import ButtonSizeVariants from '../../types/enums/ButtonSizeVariants';

interface ToolsBarProps {
  tasksLoading: boolean;
  someTasksAreSelected: boolean;
  isSticky: boolean;
  tasks: Task[];
  tasksSelected: boolean[];
  deleteManyTasks: (taskIds: string[]) => Promise<void>;
  addManyTasksToFavorites: (
    taskIds: string[],
    addToFavorites?: boolean
  ) => Promise<void>;
}

export default function ToolsBar({
  tasksLoading,
  someTasksAreSelected,
  isSticky,
  tasks,
  tasksSelected,
  deleteManyTasks,
  addManyTasksToFavorites,
}: ToolsBarProps) {
  const { viewport } = useViewport();

  const onDeleteSelectedTasks = async () => {
    const ids = [];
    tasksSelected.forEach((selected, idx) => {
      if (selected) {
        const task = tasks[idx];
        ids.push(task.id);
      }
    });
    await deleteManyTasks(ids);
  };

  const onAddSelectedTasksToFavorites =
    (addToFavorites = true) =>
    async () => {
      const ids = [];
      tasksSelected.forEach((selected, idx) => {
        if (selected) {
          const task = tasks[idx];
          ids.push(task.id);
        }
      });
      await addManyTasksToFavorites(ids, addToFavorites);
    };

  return someTasksAreSelected ? (
    <div
      className={classNames(
        'grid grid-cols-2 md:grid-cols-8 gap-2 md:gap-4 w-full md:w-card mx-auto p-2 md:p-4 mt-4 mb-5 overflow-hidden  rounded',
        {
          'bg-white': !isSticky,
          'bg-darkNavbar': isSticky,
        }
      )}
    >
      <Button
        id="delete-selection-btn"
        onClick={onDeleteSelectedTasks}
        color={ButtonColorVariants.danger}
        disabled={tasksLoading}
        size={
          viewport !== UseViewportSizeVariants.sm
            ? ButtonSizeVariants.normal
            : ButtonSizeVariants.small
        }
        icon
      >
        <TrashIcon />
      </Button>
      <div className="block md:hidden p-1" />
      <Button
        id="remove-selection-favorites-btn"
        onClick={onAddSelectedTasksToFavorites(false)}
        color={ButtonColorVariants.white}
        disabled={tasksLoading}
        icon
        borders
      >
        <HeartIcon />
      </Button>

      <Button
        id="add-selection-favorites-btn"
        onClick={onAddSelectedTasksToFavorites(true)}
        color={ButtonColorVariants.white}
        disabled={tasksLoading}
        icon
        borders
      >
        <HeartIcon filled />
      </Button>
    </div>
  ) : null;
}
