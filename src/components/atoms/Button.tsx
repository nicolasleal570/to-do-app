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
  id: string;
  size?: ButtonSizeVariants;
  color?: ButtonColorVariants;
  loading?: boolean;
}

export default function Button({
  type = 'button',
  id,
  size = ButtonSizeVariants.normal,
  color = ButtonColorVariants.primary,
  children,
  disabled = false,
  loading = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      id={id}
      disabled={disabled || loading}
      data-testid={id}
      className={classNames({
        'opacity-100 cursor-pointer': !disabled,
        'opacity-50 cursor-not-allowed': disabled,
        'px-6 py-2.5 rounded text-base': size === 'normal',
        'px-5 py-2 rounded-sm text-sm': size === 'small',
        'bg-primary text-white': color === 'primary',
        'bg-dark text-white': color === 'dark',
        'bg-danger text-white': color === 'danger',
      })}
      {...rest}
    >
      {loading ? <span>Loading...</span> : children}
    </button>
  );
}
