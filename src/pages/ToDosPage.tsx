import React from 'react';
import Button from '../components/atoms/Button';
import ButtonColorVariants from '../types/enums/ButtonColorVariants';
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
import ToolsBar from '../components/atoms/ToolsBar';

export default function ToDosPage() {
  const {
    tasks: _tasks,
    loading: tasksLoading,
    createTask,
    updateTask,
    deleteTask,
    deleteManyTasks,
    addManyTasksToFavorites,
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

  const onSelectAllTasks = () => {
    setTasksSelected((prev) => [...prev.map((_) => true)]);
  };

  const onDeselectAllTasks = () => {
    setTasksSelected((prev) => [...prev.map((_) => false)]);
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

  const someTasksAreSelected = tasksSelected?.some((value) => value === true);

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
                  <Button
                    id="delete-selection-btn"
                    onClick={onSelectAllTasks}
                    color={ButtonColorVariants.white}
                    disabled={tasksLoading}
                    linkButton
                  >
                    Select All
                  </Button>
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
      </Wrapper>
    </>
  );
}
