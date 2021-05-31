import React from 'react';

interface LongPressContainerProps {
  children: React.ReactNode;
  disabled: boolean;
}
export default function LongPressContainer({
  disabled,
  children,
}: LongPressContainerProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return <div className="">{children}</div>;
}
