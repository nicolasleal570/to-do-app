import React from 'react';
import { motion } from 'framer-motion';

interface DraggableContainerProps {
  disabled: boolean;
  children: React.ReactNode;
  onDragStart: (event: any, info: any) => void;
  onDragEnd: () => void;
}
export default function DraggableContainer({
  disabled,
  children,
  onDragStart,
  onDragEnd,
}: DraggableContainerProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <motion.div
      className="relative w-full z-10"
      drag="x"
      dragDirectionLock
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={onDragStart}
      onDragEnd={onDragEnd}
      dragElastic={0.4}
      dragMomentum={false}
    >
      {children}
    </motion.div>
  );
}
