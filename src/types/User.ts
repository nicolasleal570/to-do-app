import Task from './Task';

export default interface User {
  id: string;
  name: string;
  username: string;
  tasks: Task[];
}
