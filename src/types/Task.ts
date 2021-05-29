export default interface Task {
  title: string;
  description: string;
  isFavorite: boolean;
  completed: boolean;
  createdAt: Date;
}
