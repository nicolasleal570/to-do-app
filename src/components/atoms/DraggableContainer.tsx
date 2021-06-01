import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import TrashIcon from './icons/TrashIcon';
import HeartIcon from './icons/HeartIcon';
import useViewport, { UseViewportSizeVariants } from '../../lib/useViewport';

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
  const { viewport } = useViewport();
  const [finishedAnimation, setFinishedAnimation] = React.useState(false);
  const [direction, setDirection] = React.useState('');

  const handleDragEnd = (event, info) => {
    if (disabled) {
      setDirection('');
    }

    const offset =
      viewport === UseViewportSizeVariants.lg ||
      viewport === UseViewportSizeVariants.xl
        ? 100
        : 200;

    if (info?.offset?.x > offset) {
      setDirection('right');
    } else if (info?.offset?.x < offset * -1) {
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
        dragElastic={
          viewport === UseViewportSizeVariants.sm ||
          viewport === UseViewportSizeVariants.md
            ? 0.35
            : 0.5
        }
        dragConstraints={{ left: 0, right: 0 }}
        onAnimationStart={() => setFinishedAnimation(false)}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
        dragMomentum
      >
        {children}
      </motion.div>

      <div
        className={classNames(
          'flex items-center justify-between  absolute w-full h-full top-0 left-0 z-0 rounded'
        )}
      >
        <div className="flex-1 bg-danger text-white w-full h-full px-4 lg:px-11 flex items-center justify-start rounded-l">
          <TrashIcon width="48" height="48" strokeWidth="1" />
        </div>

        <div className="flex-1 bg-info text-dark w-full h-full px-4 lg:px-11 flex items-center justify-end rounded-r">
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
