import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import DraggableContainer from './DraggableContainer';
import Button from './Button';
import ButtonColorVariants from '../../types/enums/ButtonColorVariants';
import HeartIcon from './icons/HeartIcon';
import CheckIcon from './icons/CheckIcon';
import CheckSquareIcon from './icons/CheckSquareIcon';
import DotsHorizontalIcon from './icons/DotsHorizontalIcon';
import Task from '../../types/Task';
import DescriptionEditable from './DescriptionEditable';
import TitleEditable from './TitleEditable';

interface TaskCardProps {
  task: Task;
  selected: boolean;
  setSelected: (selected: boolean) => void;
  onUpdateTask: (newTask: Task) => Promise<Task>;
  onDeleteTask: (taskId: string) => Promise<void>;
}

const TaskCard = ({
  task,
  selected,
  setSelected,
  onUpdateTask,
  onDeleteTask,
}: TaskCardProps) => {
  const [editDescription, setEditDescription] = React.useState<boolean>(false);
  const [editTitle, setEditTitle] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);

  const disabledCard = selected || loading || task?.completed;

  const handleUpdate = async (updatedTask: Task) => {
    setLoading(true);
    await onUpdateTask({ ...updatedTask });
    setLoading(false);
  };

  const handleFavorite = async () =>
    handleUpdate({ ...task, isFavorite: !task?.isFavorite });

  const moreOptions = () => console.log('click more options', task);

  const markAsDone = () => {
    handleUpdate({ ...task, completed: !task?.completed });
  };

  const onDoubleClick = () => {
    if (!loading && !task?.completed) {
      setSelected(!selected);
    }
  };

  const onDragLeft = async (): Promise<void> => {
    try {
      return await handleFavorite();
    } catch (err) {
      console.log(err);
    }
  };

  const onDragRigth = async (): Promise<void> => {
    try {
      setLoading(true);
      return await onDeleteTask(task?.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={classNames(
        'block w-full relative rounded outline-none focus:outline-none',
        {
          'border-2 border-white p-1': selected && task?.isFavorite,
          'border-2 border-secondary p-1': selected && !task?.isFavorite,
        }
      )}
      onDoubleClick={onDoubleClick}
    >
      <DraggableContainer
        disabled={disabledCard || editDescription}
        isFavoriteTask={task?.isFavorite}
        onDragRight={onDragRigth}
        onDragLeft={onDragLeft}
      >
        <div
          className={classNames('w-full rounded-t p-4', {
            'bg-white text-dark': !task?.isFavorite,
            'bg-primary text-white': task?.isFavorite,
          })}
        >
          {selected && (
            <div
              className={classNames(
                'flex justify-center items-center absolute top-0 left-0 z-20 w-8 h-8 rounded-t-l',
                {
                  'bg-white text-dark': task?.isFavorite,
                  'bg-secondary text-dark': !task?.isFavorite,
                }
              )}
            >
              <CheckIcon />
            </div>
          )}

          <div className="flex flex-col-reverse md:flex-row items-center lg:justify-between mb-5">
            <TitleEditable
              task={task}
              onUpdateTask={onUpdateTask}
              editing={editTitle}
              loading={loading}
              disabled={disabledCard}
              setLoading={setLoading}
              setEditing={setEditTitle}
            />

            <div className="flex ml-auto">
              <Button
                id="dots-task"
                onClick={moreOptions}
                color={
                  !task?.isFavorite
                    ? ButtonColorVariants.white
                    : ButtonColorVariants.primary
                }
                disabled={disabledCard}
                icon
              >
                <DotsHorizontalIcon />
              </Button>
              <Button
                id="check-task"
                onClick={markAsDone}
                color={
                  !task?.isFavorite
                    ? ButtonColorVariants.white
                    : ButtonColorVariants.primary
                }
                disabled={selected || loading}
                icon
              >
                <CheckSquareIcon checked={task?.completed} />
              </Button>
            </div>
          </div>
          <DescriptionEditable
            task={task}
            onUpdateTask={onUpdateTask}
            editing={editDescription}
            loading={loading}
            disabled={disabledCard}
            setLoading={setLoading}
            setEditing={setEditDescription}
          />
        </div>

        <div
          className={classNames(
            'w-full flex justify-between items-center p-4 rounded-b',
            {
              'bg-white text-dark': !task?.isFavorite,
              'bg-primary text-white': task?.isFavorite,
            }
          )}
        >
          <p>
            {task?.createdAt === task?.updatedAt ? (
              <span>Creado {dayjs(task?.createdAt).format('DD/MM/YYYY')}</span>
            ) : (
              <span>
                Actualizado {dayjs(task?.createdAt).format('DD/MM/YYYY')}
              </span>
            )}
          </p>
          <Button
            id="heart-task"
            onClick={handleFavorite}
            color={
              !task?.isFavorite
                ? ButtonColorVariants.white
                : ButtonColorVariants.primary
            }
            disabled={disabledCard}
            icon
          >
            <HeartIcon filled={task?.isFavorite} />
          </Button>
        </div>
      </DraggableContainer>
    </div>
  );
};

export default TaskCard;
