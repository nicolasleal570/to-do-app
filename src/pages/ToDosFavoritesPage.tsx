import React from 'react';
import { useHistory } from 'react-router-dom';
import Wrapper from '../components/atoms/Wrapper';
import Navbar from '../components/molecules/Navbar';
import Task from '../types/Task';
import useTask from '../lib/useTask';
import ToDoList from '../components/organisms/ToDoList';
import Loader from '../components/atoms/Loader';

export default function ToDosFavoritesPage() {
  const history = useHistory();
  const {
    tasks: _tasks,
    loading: tasksLoading,
    updateTask,
    deleteTask,
    deleteManyTasks,
    addManyTasksToFavorites,
    markManyTasksAsDone,
  } = useTask();
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = React.useState<Task[]>([]);

  const [hideCreateTaskForm, setHideCreateTaskForm] = React.useState(false);

  const onCreateFirstTask = () => {
    history.push({
      pathname: '/to-do',
      search: '?action=create-task-from-favorites',
    });
  };

  React.useEffect(() => {
    const completed = [];
    const notCompleted = [];
    [].concat(_tasks).forEach((task) => {
      if (task?.isFavorite) {
        if (task?.completed) {
          completed?.push(task);
        } else {
          notCompleted.push(task);
        }
      }
    });

    setTasks(notCompleted);
    setCompletedTasks(completed);
  }, [_tasks, tasksLoading]);

  React.useEffect(() => {
    if (!tasksLoading) {
      setHideCreateTaskForm(!tasks?.length);
    }
  }, [tasks, tasksLoading]);

  if (tasksLoading && !tasks?.length) {
    return <Loader centeredOnScreen />;
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        <ToDoList
          tasks={tasks}
          completedTasks={completedTasks}
          tasksLoading={hideCreateTaskForm}
          showEmptyState={!tasks?.length && !completedTasks?.length}
          updateTask={updateTask}
          deleteTask={deleteTask}
          deleteManyTasks={deleteManyTasks}
          addManyTasksToFavorites={addManyTasksToFavorites}
          markManyTasksAsDone={markManyTasksAsDone}
          onCreateFirstTask={onCreateFirstTask}
        />
      </Wrapper>
    </>
  );
}
