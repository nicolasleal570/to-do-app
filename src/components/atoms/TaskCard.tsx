import React from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import Button from './Button';
import ButtonColorVariants from '../../types/enums/ButtonColorVariants';
import HeartIcon from './icons/HeartIcon';
import DotsHorizontalIcon from './icons/DotsHorizontalIcon';
import Task from '../../types/Task';
import DescriptionEditable from './DescriptionEditable';
import TitleEditable from './TitleEditable';

interface TaskCardProps {
  task: Task;
  onUpdateTask: (newTask: Task) => Promise<Task>;
}

export default function TaskCard({ task, onUpdateTask }: TaskCardProps) {
  const [swipeDirection, setSwipeDirection] = React.useState('');
  const handleOnClick = () => console.log('click', task);

  const onDrag = (event, info) => {
    if (info.delta.x > 0) {
      setSwipeDirection('right');
      return;
    }
    if (info.delta.x < 0) {
      setSwipeDirection('left');
      return;
    }

    setSwipeDirection('');
  };

  return (
    <>
      <div className="relative bg-red-400">
        <motion.div
          className="relative w-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={onDrag}
          onDragEnd={() => setSwipeDirection('')}
        >
          <div className="w-full bg-white rounded-t p-4">
            <div className="flex flex-col-reverse md:flex-row items-center lg:justify-between mb-5">
              <TitleEditable task={task} onUpdateTask={onUpdateTask} />

              <div className="flex ml-auto">
                <Button
                  id="dots-task"
                  onClick={handleOnClick}
                  color={ButtonColorVariants.white}
                  icon
                >
                  <DotsHorizontalIcon />
                </Button>
                <Button
                  id="check-task"
                  onClick={handleOnClick}
                  color={ButtonColorVariants.white}
                  icon
                >
                  <HeartIcon />
                </Button>
              </div>
            </div>
            <DescriptionEditable task={task} onUpdateTask={onUpdateTask} />
          </div>

          <div className="w-full flex justify-between items-center bg-secondary p-4 rounded-b">
            <p>
              {task?.createdAt === task?.updatedAt ? (
                <span>
                  Creado {dayjs(task?.createdAt).format('DD/MM/YYYY')}
                </span>
              ) : (
                <span>
                  Actualizado {dayjs(task?.createdAt).format('DD/MM/YYYY')}
                </span>
              )}
            </p>
            <Button
              id="heart-task"
              onClick={handleOnClick}
              color={ButtonColorVariants.secondary}
              icon
            >
              <HeartIcon />
            </Button>
          </div>
        </motion.div>

        {swipeDirection === 'left' && (
          <div className="bg-indigo-400">Swipe Left</div>
        )}
        {swipeDirection === 'right' && (
          <div className="bg-yellow-400">Swipe Right</div>
        )}
      </div>
    </>
  );
}
