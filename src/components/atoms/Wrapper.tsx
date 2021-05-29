import React from 'react';
import classNames from 'classnames';

interface WrapperProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

export default function Wrapper({
  children,
  as = 'div',
  className = '',
  ...rest
}: WrapperProps) {
  const Component = as;

  return (
    <Component
      className={classNames('container mx-auto px-4 md:px-0', className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
