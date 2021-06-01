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
  } = useTask();
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const [hideCreateTaskForm, setHideCreateTaskForm] = React.useState(false);

  const onCreateFirstTask = () => {
    history.push({
      pathname: '/to-do',
      search: '?action=create-task-from-favorites',
    });
  };

  React.useEffect(() => {
    const sortedArr = []
      .concat(_tasks)
      .sort((a, b) => {
        if (a?.completed === b?.completed) {
          return 0;
        }

        return a?.completed ? 1 : -1;
      })
      .filter((items) => items?.isFavorite);

    setTasks(sortedArr);
  }, [_tasks]);

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
          completedTasks={[]}
          tasksLoading={hideCreateTaskForm}
          showEmptyState={!tasks?.length}
          updateTask={updateTask}
          deleteTask={deleteTask}
          deleteManyTasks={deleteManyTasks}
          addManyTasksToFavorites={addManyTasksToFavorites}
          onCreateFirstTask={onCreateFirstTask}
        />
      </Wrapper>
    </>
  );
}
