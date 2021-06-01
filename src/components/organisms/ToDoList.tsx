import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyContainer, Sticky } from 'react-sticky';
import Button from '../atoms/Button';
import ButtonColorVariants from '../../types/enums/ButtonColorVariants';
import EmptyTasksList from '../molecules/EmptyTasksList';
import Task from '../../types/Task';
import TaskCard from '../atoms/TaskCard';
import ToolsBar from '../atoms/ToolsBar';
import ArrowUpIcon from '../atoms/icons/ArrowUpIcon';
import ArrowDownIcon from '../atoms/icons/ArrowDownIcon';

interface ToDoListProps {
  tasks: Task[];
  completedTasks: Task[];
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
  completedTasks,
  tasksLoading,
  showEmptyState,
  updateTask,
  deleteTask,
  deleteManyTasks,
  addManyTasksToFavorites,
  onCreateFirstTask,
}: ToDoListProps) {
  const [tasksSelected, setTasksSelected] = React.useState<boolean[]>([]);
  const [showCompletedTasks, setShowCompletedTasks] =
    React.useState<boolean>(false);

  const toggleCompletedTaskList = () => setShowCompletedTasks((prev) => !prev);

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
  const totalItems = tasks?.length + completedTasks?.length;

  return (
    <>
      <StickyContainer>
        <Sticky topOffset={80}>
          {({ style, isSticky }) => (
            <div style={style} className="w-full md:w-card mx-auto z-40">
              {!showEmptyState && (
                <ToolsBar
                  tasksLoading={tasksLoading}
                  someTasksAreSelected={someTasksAreSelected}
                  isSticky={isSticky}
                  tasks={tasks}
                  tasksSelected={tasksSelected}
                  deleteManyTasks={deleteManyTasks}
                  addManyTasksToFavorites={addManyTasksToFavorites}
                />
              )}
            </div>
          )}
        </Sticky>

        {!showEmptyState ? (
          <>
            <div className="w-full md:w-card mx-auto mt-16 overflow-hidden pb-12">
              <div className="mb-5">
                {someTasksAreSelected ? (
                  <Button
                    id="delete-selection-btn"
                    onClick={onDeselectAllTasks}
                    color={ButtonColorVariants.white}
                    disabled={tasksLoading}
                    linkButton
                  >
                    Clear Selection ({totalItems})
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
                      Select All ({totalItems})
                    </Button>
                  )
                )}
              </div>

              <AnimatePresence initial={false}>
                {tasks?.map((task, idx) => (
                  <motion.div
                    className="mb-10"
                    key={task?.id}
                    initial={{
                      opacity: 0,
                      scale: 0.6,
                      y: -100,
                    }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      y: 50,
                      transition: { duration: 0.4 },
                    }}
                  >
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
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex items-center justify-center">
                <div className="flex-1" />
                <button
                  type="button"
                  className="text-secondary flex items-center outline-none focus:outline-none"
                  onClick={toggleCompletedTaskList}
                >
                  <span className="mr-2">
                    {showCompletedTasks ? 'Hide' : 'Show'} completed tasks (
                    {completedTasks?.length})
                  </span>
                  {showCompletedTasks ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </button>
                <div className="flex-1" />
              </div>

              {showCompletedTasks &&
                completedTasks?.map((task, idx) => (
                  <motion.div
                    className="mt-10"
                    key={`completed-${task?.id}`}
                    initial={{
                      opacity: 0,
                      scale: 0.6,
                      y: -100,
                    }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      y: 50,
                      transition: { duration: 0.4 },
                    }}
                  >
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
                  </motion.div>
                ))}
            </div>
          </>
        ) : (
          <EmptyTasksList onClick={onCreateFirstTask} />
        )}
      </StickyContainer>
    </>
  );
}
