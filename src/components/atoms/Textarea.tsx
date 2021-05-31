import React from 'react';
import classNames from 'classnames';
import InputColorVariants from '../../types/enums/InputColorVariants';

interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  id: string;
  color?: InputColorVariants;
  errorMessage?: string;
  disabled?: boolean;
  useTextArea?: boolean;
}

export default function Textarea({
  id,
  color = InputColorVariants.dark,
  errorMessage = '',
  disabled = false,
  ...rest
}: TextareaProps) {
  return (
    <div className="block w-full">
      <textarea
        {...rest}
        id={id}
        data-testid={id}
        className={classNames(
          'block min-w-full max-w-full py-2 px-3 md:py-3 md:px-5 rounded text-sm md:text-base',
          {
            'border-0 bg-darkAccent text-white placeholder-lightSecondary':
              color === 'dark',
            'bg-danger bg-opacity-50 placeholder-danger border border-danger':
              !!errorMessage,
            'cursor-not-allowed': disabled,
          }
        )}
        disabled={disabled}
      />

      {errorMessage && (
        <p data-testid={`${id}-error`} className="text-danger mt-3 text-sm">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
