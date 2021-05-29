import React from 'react';
import classNames from 'classnames';
import ButtonSizeVariants from '../../types/enums/ButtonSizeVariants';
import ButtonColorVariants from '../../types/enums/ButtonColorVariants';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  size?: ButtonSizeVariants;
  color?: ButtonColorVariants;
}

export default function Button({
  type = 'button',
  size = ButtonSizeVariants.normal,
  color = ButtonColorVariants.primary,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classNames({
        'px-6 py-2.5 rounded text-base': size === 'normal',
        'px-5 py-2 rounded-sm text-sm': size === 'small',
        'bg-primary text-white': color === 'primary',
        'bg-dark text-white': color === 'dark',
        'bg-danger text-white': color === 'danger',
      })}
      {...rest}
    >
      {children}
    </button>
  );
}
