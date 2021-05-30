import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import DraggableContainer from './DraggableContainer';
import Button from './Button';
import ButtonColorVariants from '../../types/enums/ButtonColorVariants';
import HeartIcon from './icons/HeartIcon';
import CheckIcon from './icons/CheckIcon';
import TrashIcon from './icons/TrashIcon';
import DotsHorizontalIcon from './icons/DotsHorizontalIcon';
import Task from '../../types/Task';
import DescriptionEditable from './DescriptionEditable';
import TitleEditable from './TitleEditable';

interface TaskCardProps {
  task: Task;
  onUpdateTask: (newTask: Task) => Promise<Task>;
  onDeleteTask: (taskId: string) => Promise<void>;
}

export default function TaskCard({
  task,
  onUpdateTask,
  onDeleteTask,
}: TaskCardProps) {
  const [selected, setSelected] = React.useState<boolean>(
    task?.selected || false
  );
  const [dragging, setDragging] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [swipeDirection, setSwipeDirection] = React.useState('');

  const handleFavorite = async () => {
    setLoading(true);
    await onUpdateTask({ ...task, isFavorite: !task?.isFavorite });
    setSwipeDirection('');
    setLoading(false);
  };

  const handleOnClick = () => console.log('click', task);

  const onDragLeft = async () => {
    try {
      handleFavorite();
    } catch (err) {
      console.log(err);
    }
  };

  const onDragRigth = async () => {
    try {
      setLoading(true);
      await onDeleteTask(task?.id);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = () => setDragging(false);

  const onDragStart = (event, info) => {
    if (loading) return;

    setDragging(true);
    if (info.delta.x > 0) {
      setSwipeDirection('right');
    } else if (info.delta.x < 0) {
      setSwipeDirection('left');
    }
  };

  React.useEffect(() => {
    if (!dragging && !loading) {
      if (swipeDirection === 'left') {
        onDragLeft();
      } else if (swipeDirection === 'right') {
        onDragRigth();
      }
      setSwipeDirection('');
    }
  }, [dragging, loading, swipeDirection]);

  return (
    <div
      className={classNames(
        'block w-full relative rounded outline-none focus:outline-none',
        {
          'border-2 border-danger p-1': selected,
        }
      )}
      onDoubleClick={() => setSelected((prev) => !prev)}
    >
      <DraggableContainer
        disabled={selected || loading}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div
          className={classNames('w-full rounded-t p-4', {
            'bg-white text-dark': !task?.isFavorite,
            'bg-primary text-white': task?.isFavorite,
          })}
        >
          <div className="flex flex-col-reverse md:flex-row items-center lg:justify-between mb-5">
            <TitleEditable
              task={task}
              onUpdateTask={onUpdateTask}
              loading={loading}
              setLoading={setLoading}
            />

            <div className="flex ml-auto">
              <Button
                id="dots-task"
                onClick={handleOnClick}
                color={
                  !task?.isFavorite
                    ? ButtonColorVariants.white
                    : ButtonColorVariants.primary
                }
                disabled={loading}
                icon
              >
                <DotsHorizontalIcon />
              </Button>
              <Button
                id="check-task"
                onClick={handleOnClick}
                color={
                  !task?.isFavorite
                    ? ButtonColorVariants.white
                    : ButtonColorVariants.primary
                }
                disabled={loading}
                icon
              >
                <CheckIcon checked={task?.completed} />
              </Button>
            </div>
          </div>
          <DescriptionEditable
            task={task}
            onUpdateTask={onUpdateTask}
            loading={loading}
            setLoading={setLoading}
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
            disabled={loading}
            icon
          >
            <HeartIcon filled={task?.isFavorite} />
          </Button>
        </div>
      </DraggableContainer>

      {!selected && !loading && (
        <div
          className={classNames(
            'flex items-center justify-between  absolute w-full h-full top-0 left-0 z-0 rounded'
          )}
        >
          <div className="flex-1 bg-danger text-white w-full h-full p-11 flex items-center justify-start rounded-l">
            <TrashIcon width="48" height="48" strokeWidth="1" />
          </div>

          <div className="flex-1 bg-info text-dark w-full h-full p-11 flex items-center justify-end rounded-r">
            <HeartIcon
              width="48"
              height="48"
              strokeWidth="1"
              filled={task?.isFavorite}
            />
          </div>
        </div>
      )}
    </div>
  );
}
