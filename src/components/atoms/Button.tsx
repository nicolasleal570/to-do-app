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
  icon?: boolean;
  full?: boolean;
  linkButton?: boolean;
  borders?: boolean;
}

export default function Button({
  type = 'button',
  id,
  size = ButtonSizeVariants.normal,
  color = ButtonColorVariants.primary,
  children,
  disabled = false,
  loading = false,
  icon = false,
  full = false,
  linkButton = false,
  borders = false,
  ...rest
}: ButtonProps) {
  if (linkButton) {
    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        id={id}
        disabled={disabled || loading}
        data-testid={id}
        className={classNames('underline outline-none focus:outline-none', {
          'opacity-100 cursor-pointer': !disabled,
          'opacity-50 cursor-not-allowed': disabled,
          'text-base': size === ButtonSizeVariants.normal,
          'text-sm': size === ButtonSizeVariants.small,
          'text-primary': color === ButtonColorVariants.primary,
          'text-dark': color === ButtonColorVariants.dark,
          'text-white': color === ButtonColorVariants.white,
          'text-danger': color === ButtonColorVariants.danger,
          'text-info': color === ButtonColorVariants.info,
          'text-info-dark': color === ButtonColorVariants.infoDark,
          'w-full': full,
        })}
        {...rest}
      >
        {loading ? <span>Loading...</span> : children}
      </button>
    );
  }

  if (icon) {
    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        id={id}
        disabled={disabled || loading}
        data-testid={id}
        className={classNames(
          'flex items-center justify-center focus:outline-none',
          {
            'opacity-100 cursor-pointer': !disabled,
            'opacity-50 cursor-not-allowed': disabled,
            'p-2.5 rounded text-base': size === ButtonSizeVariants.normal,
            'p-1 rounded': size === ButtonSizeVariants.small,
            'bg-primary text-white': color === ButtonColorVariants.primary,
            'bg-secondary text-dark': color === ButtonColorVariants.secondary,
            'bg-dark text-white': color === ButtonColorVariants.dark,
            'bg-white text-dark': color === ButtonColorVariants.white,
            'bg-danger text-white': color === ButtonColorVariants.danger,
            'bg-info text-white': color === ButtonColorVariants.info,
            'bg-info-dark text-white': color === ButtonColorVariants.infoDark,
            'w-full': full,
            'border border-dark': borders,
          }
        )}
        {...rest}
      >
        {loading ? <span>Loading...</span> : children}
      </button>
    );
  }

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      id={id}
      disabled={disabled || loading}
      data-testid={id}
      className={classNames('focus:outline-none', {
        'opacity-100 cursor-pointer': !disabled,
        'opacity-50 cursor-not-allowed': disabled,
        'px-6 py-2.5 rounded text-base': size === ButtonSizeVariants.normal,
        'px-5 py-2 rounded-sm text-sm': size === ButtonSizeVariants.small,
        'bg-primary text-white': color === ButtonColorVariants.primary,
        'bg-dark text-white': color === ButtonColorVariants.dark,
        'bg-white text-dark border border-grey-100':
          color === ButtonColorVariants.white,
        'bg-danger text-white': color === ButtonColorVariants.danger,
        'tbg-info text-white': color === ButtonColorVariants.info,
        'bg-info-dark text-white': color === ButtonColorVariants.infoDark,
        'w-full': full,
      })}
      {...rest}
    >
      {loading ? <span>Loading...</span> : children}
    </button>
  );
}
