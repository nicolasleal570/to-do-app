import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import useUser from './useUser';
import Task from '../types/Task';

interface UseTaskReturnType {
  loading: boolean;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  getTasks: () => Promise<Task[]>;
  createTask: (newTask: Task) => Promise<Task>;
  updateTask: (task: Task) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<void>;
  deleteManyTasks: (taskIds: string[]) => Promise<void>;
  addManyTasksToFavorites: (
    taskIds: string[],
    addToFavorites?: boolean
  ) => Promise<void>;
}

export default function useTask(): UseTaskReturnType {
  const { user, loading: userLoading, updateUser } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(userLoading);

  console.log({ tasks, loading, userLoading });

  const updateTasksOnUser = async (_tasks: Task[]) => {
    if (userLoading) return;

    const updatedUser = await updateUser({ ...user, tasks: _tasks });
    setTasks(updatedUser?.tasks || []);
    setLoading(false);
  };

  const getTasks = (): Promise<Task[]> =>
    new Promise<Task[]>((resolve) => {
      if (loading && tasks?.length > 0) return;

      setLoading(true);
      const _tasks = user?.tasks;

      setTimeout(() => {
        setLoading(false);
        resolve(_tasks);
      }, 1000);
    });

  const createTask = async (newTask: Task): Promise<Task> => {
    if (loading) return;

    setLoading(true);

    const task = { ...newTask, id: uuid() };
    await updateTasksOnUser([task, ...tasks]);

    return new Promise<Task>((resolve) => {
      setTimeout(() => {
        resolve(task);
      }, 1000);
    });
  };
  const updateTask = async (newTaskData: Task): Promise<Task> => {
    if (loading) return;

    setLoading(true);

    const taskToUpdateIndex = tasks?.findIndex((t) => t.id === newTaskData?.id);

    if (taskToUpdateIndex < 0) {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject();
          setLoading(false);
        }, 1000);
      });
    }

    const updatedTask: Task = {
      ...tasks[taskToUpdateIndex],
      ...newTaskData,
      updatedAt: new Date().toISOString(),
    };

    const newArr = [].concat(tasks);
    newArr[taskToUpdateIndex] = updatedTask;

    await updateTasksOnUser(newArr);

    return new Promise<Task>((resolve) => {
      setTimeout(() => {
        resolve(updatedTask);
      }, 1000);
    });
  };

  const deleteTask = async (taskId: string): Promise<void> => {
    if (loading) return;

    setLoading(true);

    const taskToDelete = tasks?.find((t) => t.id === taskId) || null;

    if (!taskToDelete) {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject();
          setLoading(false);
        }, 1000);
      });
    }

    await updateTasksOnUser([
      ...tasks.filter((t) => t?.id !== taskToDelete?.id),
    ]);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const deleteManyTasks = async (taskIds: string[]): Promise<void> => {
    if (loading) return;

    setLoading(true);

    if (!taskIds?.length) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          setLoading(false);
        }, 1000);
      });
    }

    const arr = tasks?.filter((task) => taskIds.indexOf(task?.id) === -1);

    await updateTasksOnUser(arr);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const addManyTasksToFavorites = async (
    taskIds: string[],
    addToFavorites = true
  ): Promise<void> => {
    if (loading) return;

    setLoading(true);

    if (!taskIds?.length) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          setLoading(false);
        }, 1000);
      });
    }

    const arr = tasks?.map((task) => {
      if (taskIds.indexOf(task?.id) === -1) {
        return task;
      }
      return { ...task, isFavorite: addToFavorites };
    });

    await updateTasksOnUser(arr);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const _tasks = await getTasks();
      setTasks(_tasks);
    };

    fetchTasks();
  }, []);

  return {
    loading,
    tasks,
    setTasks,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    deleteManyTasks,
    addManyTasksToFavorites,
  };
}
