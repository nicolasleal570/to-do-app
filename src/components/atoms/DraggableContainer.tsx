import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import TrashIcon from './icons/TrashIcon';
import HeartIcon from './icons/HeartIcon';

interface DraggableContainerProps {
  disabled: boolean;
  isFavoriteTask: boolean;
  children: React.ReactNode;
  onDragRight: () => Promise<void>;
  onDragLeft: () => Promise<void>;
}
export default function DraggableContainer({
  disabled,
  isFavoriteTask,
  children,
  onDragRight,
  onDragLeft,
}: DraggableContainerProps) {
  const dragConstraintsRef = React.useRef<HTMLDivElement>(null);
  const [finishedAnimation, setFinishedAnimation] = React.useState(false);
  const [direction, setDirection] = React.useState('');

  const handleDragEnd = (event, info) => {
    if (disabled) {
      setDirection('');
    }

    if (info?.offset?.x > 300) {
      setDirection('right');
    } else if (info?.offset?.x < -300) {
      setDirection('left');
    }
    setFinishedAnimation(true);
  };

  React.useEffect(() => {
    if (
      (direction === 'left' || direction === 'right') &&
      finishedAnimation &&
      !disabled
    ) {
      const handlePromise = async () => {
        if (direction === 'left') {
          await onDragLeft();
          setDirection('');
        }
        if (direction === 'right') {
          await onDragRight();
          setDirection('');
        }
      };

      handlePromise();
    }
  }, [setDirection, direction, finishedAnimation]);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <>
      <motion.div
        className="relative w-fill z-10"
        drag="x"
        dragElastic={0}
        dragConstraints={dragConstraintsRef}
        onAnimationStart={() => setFinishedAnimation(false)}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
      >
        {children}
      </motion.div>

      <div
        className={classNames(
          'flex items-center justify-between  absolute w-full h-full top-0 left-0 z-0 rounded'
        )}
      >
        <div className="flex-1 bg-danger text-white w-full h-full p-11 flex items-center justify-center rounded-l">
          <TrashIcon width="48" height="48" strokeWidth="1" />
        </div>

        <div
          ref={dragConstraintsRef}
          className="flex-2 bg-white text-white w-full h-full p-11"
        />

        <div className="flex-1 bg-info text-dark w-full h-full p-11 flex items-center justify-center rounded-r">
          <HeartIcon
            width="48"
            height="48"
            strokeWidth="1"
            filled={isFavoriteTask}
          />
        </div>
      </div>
    </>
  );
}
