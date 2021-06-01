import React from 'react';
import { useHistory } from 'react-router-dom';
import Wrapper from '../components/atoms/Wrapper';
import Navbar from '../components/molecules/Navbar';
import useForm from '../lib/useForm';
import useQuery from '../lib/useQuery';
import createTaskValidation from '../utils/createTaskValidation';
import Task from '../types/Task';
import useTask from '../lib/useTask';
import CreateTaskForm from '../components/organisms/CreateTaskForm';
import ToDoList from '../components/organisms/ToDoList';
import Loader from '../components/atoms/Loader';

export default function ToDosPage() {
  const history = useHistory();
  const query = useQuery();
  const {
    tasks: _tasks,
    loading: tasksLoading,
    createTask,
    updateTask,
    deleteTask,
    deleteManyTasks,
    addManyTasksToFavorites,
  } = useTask();
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = React.useState<Task[]>([]);

  const handleSubmit = async (data: Task) => {
    if (query?.get('action')) {
      history.push('/to-do');
    }

    onClear();
    await createTask(data);
  };

  const date = new Date().toISOString();
  const { values, onChange, onSubmit, onClear, errors } = useForm<Task>({
    initialState: {
      title: '',
      description: '',
      isFavorite: false,
      completed: false,
      createdAt: date,
      updatedAt: date,
    },
    onSubmitCallback: handleSubmit,
    validationFunction: createTaskValidation,
  });
  const [hideCreateTaskForm, setHideCreateTaskForm] = React.useState<boolean>(
    !query?.get('action')
  );

  const onCreateFirstTask = () => setHideCreateTaskForm(false);

  React.useEffect(() => {
    if (!tasksLoading) {
      const completed = [];
      const notCompleted = [];
      [].concat(_tasks).forEach((task) => {
        if (task?.completed) {
          completed.push(task);
        } else {
          notCompleted.push(task);
        }
      });

      setTasks(notCompleted);
      setCompletedTasks(completed);
    }
  }, [_tasks, tasksLoading]);

  React.useEffect(() => {
    if (!tasksLoading && !query?.get('action')) {
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
        {!hideCreateTaskForm ? (
          <CreateTaskForm
            disabled={errors?.length > 0 || tasksLoading}
            loading={tasksLoading}
            values={values}
            errors={errors}
            handleSubmit={onSubmit}
            handleChange={onChange}
          />
        ) : null}

        <ToDoList
          tasks={tasks}
          completedTasks={completedTasks}
          tasksLoading={tasksLoading}
          showEmptyState={hideCreateTaskForm}
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
