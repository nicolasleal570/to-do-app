export default interface Task {
  id?: string;
  title: string;
  description: string;
  isFavorite: boolean;
  completed: boolean;
  selected?: boolean;
  createdAt: string;
  updatedAt: string;
}
