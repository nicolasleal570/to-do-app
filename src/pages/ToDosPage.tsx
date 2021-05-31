import React from 'react';
import Wrapper from '../components/atoms/Wrapper';
import Navbar from '../components/molecules/Navbar';
import EmptyTasksList from '../components/molecules/EmptyTasksList';
import useForm from '../lib/useForm';
import createTaskValidation from '../utils/createTaskValidation';
import Task from '../types/Task';
import useTask from '../lib/useTask';
import CreateTaskForm from '../components/organisms/CreateTaskForm';
import Loader from '../components/atoms/Loader';
import TaskCard from '../components/atoms/TaskCard';

export default function ToDosPage() {
  const {
    tasks: _tasks,
    loading: tasksLoading,
    createTask,
    updateTask,
    deleteTask,
    deleteManyTasks,
  } = useTask();
  const [tasksSelected, setTasksSelected] = React.useState<boolean[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const handleSubmit = async (data: Task) => {
    await createTask(data);
    onClear();
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
  const [hideCreateTaskForm, setHideCreateTaskForm] = React.useState(false);

  const onCreateFirstTask = () => setHideCreateTaskForm(false);

  const onDeleteSelectedTasks = async () => {
    const ids = [];
    tasksSelected.forEach((selected, idx) => {
      if (selected) {
        const task = tasks[idx];
        console.log(task);
        ids.push(task.id);
      }
    });
    await deleteManyTasks(ids);
  };
  React.useEffect(() => {
    const sortedArr = [].concat(_tasks).sort((a, b) => {
      if (a?.completed === b?.completed) {
        return 0;
      }

      return a?.completed ? 1 : -1;
    });

    setTasks(sortedArr);

    if (_tasks?.length !== tasksSelected?.length) {
      setTasksSelected(
        Array(_tasks?.length)
          .fill('')
          .map(() => false)
      );
    }
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
        {!hideCreateTaskForm ? (
          <>
            <CreateTaskForm
              disabled={errors?.length > 0 || tasksLoading}
              loading={tasksLoading}
              values={values}
              errors={errors}
              handleSubmit={onSubmit}
              handleChange={onChange}
            />

            <div className="w-full md:w-card mx-auto mt-16 overflow-hidden">
              <button
                type="button"
                className="text-white mb-10"
                onClick={onDeleteSelectedTasks}
              >
                Delete All
              </button>

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
      </Wrapper>
    </>
  );
}
