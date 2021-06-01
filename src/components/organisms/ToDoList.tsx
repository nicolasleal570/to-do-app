import React from 'react';
import Button from '../atoms/Button';
import ButtonColorVariants from '../../types/enums/ButtonColorVariants';
import EmptyTasksList from '../molecules/EmptyTasksList';
import Task from '../../types/Task';
import TaskCard from '../atoms/TaskCard';
import ToolsBar from '../atoms/ToolsBar';

interface ToDoListProps {
  tasks: Task[];
  tasksLoading: boolean;
  showEmptyState: boolean;
  updateTask: (task: Task) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<void>;
  deleteManyTasks: (taskIds: string[]) => Promise<void>;
  addManyTasksToFavorites: (
    taskIds: string[],
    addToFavorites?: boolean
  ) => Promise<void>;
  onCreateFirstTask: () => void;
}

export default function ToDoList({
  tasks,
  tasksLoading,
  showEmptyState,
  updateTask,
  deleteTask,
  deleteManyTasks,
  addManyTasksToFavorites,
  onCreateFirstTask,
}: ToDoListProps) {
  const [tasksSelected, setTasksSelected] = React.useState<boolean[]>([]);

  const onSelectAllTasks = () => {
    setTasksSelected((prev) => [...prev.map((_) => true)]);
  };

  const onDeselectAllTasks = () => {
    setTasksSelected((prev) => [...prev.map((_) => false)]);
  };

  React.useEffect(() => {
    if (tasks?.length !== tasksSelected?.length) {
      setTasksSelected(
        Array(tasks?.length)
          .fill('')
          .map(() => false)
      );
    }
  }, [tasks, tasksSelected]);

  const someTasksAreSelected = tasksSelected?.some((value) => value === true);

  return (
    <>
      {!showEmptyState ? (
        <>
          <ToolsBar
            tasksLoading={tasksLoading}
            someTasksAreSelected={someTasksAreSelected}
            tasks={tasks}
            tasksSelected={tasksSelected}
            deleteManyTasks={deleteManyTasks}
            addManyTasksToFavorites={addManyTasksToFavorites}
          />

          <div className="w-full md:w-card mx-auto mt-16 overflow-hidden">
            <div className="mb-5">
              {someTasksAreSelected ? (
                <Button
                  id="delete-selection-btn"
                  onClick={onDeselectAllTasks}
                  color={ButtonColorVariants.white}
                  disabled={tasksLoading}
                  linkButton
                >
                  Clear Selection
                </Button>
              ) : (
                tasks?.length > 0 && (
                  <Button
                    id="delete-selection-btn"
                    onClick={onSelectAllTasks}
                    color={ButtonColorVariants.white}
                    disabled={tasksLoading}
                    linkButton
                  >
                    Select All
                  </Button>
                )
              )}
            </div>

            {tasks?.map((task, idx) => (
              <div className="mb-10" key={task?.id}>
                <TaskCard
                  key={task?.id}
                  task={task}
                  selected={tasksSelected[idx]}
                  setSelected={(value) => {
                    const arr: boolean[] = [...tasksSelected];
                    arr[idx] = value;
                    setTasksSelected(arr);
                  }}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyTasksList onClick={onCreateFirstTask} />
      )}
    </>
  );
}
