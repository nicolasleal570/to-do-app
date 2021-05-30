import React from 'react';
import classNames from 'classnames';
import InputColorVariants from '../../types/enums/InputColorVariants';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  color?: InputColorVariants;
  errorMessage?: string;
}

export default function Input({
  id,
  color = InputColorVariants.dark,
  errorMessage = '',
  ...rest
}: InputProps) {
  return (
    <div className="block w-full">
      <input
        {...rest}
        type="text"
        id={id}
        data-testid={id}
        className={classNames(
          'block w-full py-2 px-3 md:py-3 md:px-5 rounded text-sm md:text-base',
          {
            'border-0 bg-darkAccent text-white placeholder-lightSecondary':
              color === 'dark',
            'bg-danger bg-opacity-50 placeholder-danger border border-danger':
              !!errorMessage,
          }
        )}
      />

      {errorMessage && (
        <p data-testid={`${id}-error`} className="text-danger mt-3 text-sm">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
