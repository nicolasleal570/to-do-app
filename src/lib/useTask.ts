import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import useUser from './useUser';
import Task from '../types/Task';

interface UseTaskReturnType {
  loading: boolean;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  getTasks: () => Promise<Task[]>;
  getTask: (taskId: string) => Promise<Task>;
  createTask: (newTask: Task) => Promise<Task>;
  updateTask: (task: Task) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<void>;
}

export default function useTask(): UseTaskReturnType {
  const { user, loading: userLoading, updateUser } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const getTasks = (): Promise<Task[]> =>
    new Promise<Task[]>((resolve) => {
      if (loading) return;

      setLoading(true);
      const _tasks = user?.tasks;

      setTimeout(() => {
        resolve(_tasks);
      }, 1000);
    });

  const getTask = (taskId: string): Promise<Task> =>
    new Promise<Task>((resolve) => {
      if (loading) return;

      setLoading(true);

      const task = tasks?.find((t) => t.id === taskId) || null;
      setTimeout(() => {
        setLoading(false);
        resolve(task);
      }, 1000);
    });

  const createTask = (newTask: Task): Promise<Task> =>
    new Promise<Task>((resolve) => {
      if (loading) return;

      setLoading(true);

      const task = { ...newTask, id: uuid() };

      setTimeout(() => {
        setTasks((prev) => [task, ...prev]);
        setLoading(false);
        resolve(task);
      }, 1000);
    });

  const updateTask = (newTaskData: Task): Promise<Task> =>
    new Promise<Task>((resolve, reject) => {
      if (loading) return;

      setLoading(true);

      const taskToUpdateIndex = tasks?.findIndex(
        (t) => t.id === newTaskData?.id
      );

      if (taskToUpdateIndex < 0) {
        setTimeout(() => {
          reject();
          setLoading(false);
        }, 1000);

        return null;
      }

      const updatedTask: Task = {
        ...tasks[taskToUpdateIndex],
        ...newTaskData,
        updatedAt: new Date().toISOString(),
      };

      const newArr = [].concat(tasks);
      newArr[taskToUpdateIndex] = updatedTask;

      setTimeout(() => {
        setTasks(newArr);
        setLoading(false);
        resolve(updatedTask);
      }, 1000);
    });

  const deleteTask = (taskId: string): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      if (loading) return;

      setLoading(true);

      const taskToDelete = tasks?.find((t) => t.id === taskId) || null;

      if (!taskToDelete) {
        setTimeout(() => {
          reject();
          setLoading(false);
        }, 1000);

        return;
      }

      setTimeout(() => {
        setTasks((prev) => [...prev.filter((t) => t?.id !== taskToDelete?.id)]);
        setLoading(false);
        resolve();
      }, 1000);
    });

  useEffect(() => {
    if (!userLoading) {
      setTasks(user?.tasks || []);
      setLoading(false);
    }
  }, [userLoading]);

  useEffect(() => {
    if (user) {
      updateUser({ ...user, tasks });
    }
  }, [tasks]);

  return {
    loading,
    tasks,
    setTasks,
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
  };
}
