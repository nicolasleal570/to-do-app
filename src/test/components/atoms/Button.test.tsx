/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../../components/atoms/Button';

describe('Button Component', () => {
  it('Should render children without crash', () => {
    const children = 'Create ToDo';

    render(<Button id="test-button">{children}</Button>);

    const buttonElement = screen.getByTestId('test-button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('Should call onClick function when user clicked the button', () => {
    const onClickCallback = jest.fn();

    render(
      <Button id="test-click" onClick={onClickCallback}>
        Testing on click
      </Button>
    );

    userEvent.click(screen.getByTestId('test-click'));
    expect(onClickCallback).toBeCalledTimes(1);
  });

  it('Should be disabled', () => {
    let count = 1;
    const onClickCallback = jest.fn(() => (count = +1));

    render(
      <Button id="test-disabled" onClick={onClickCallback} disabled>
        Testing disabled prop
      </Button>
    );

    const buttonElement = screen.getByTestId('test-disabled');

    expect(buttonElement).toBeDisabled();

    userEvent.click(buttonElement);
    expect(count).toBe(1);
    expect(onClickCallback).toBeCalledTimes(0);
  });

  it('Should be disabled and show "Loading..." when loading is true', () => {
    let count = 1;
    const onClickCallback = jest.fn(() => (count = +1));

    render(
      <Button id="test-loading" onClick={onClickCallback} loading>
        Testing loading prop
      </Button>
    );

    const buttonElement = screen.getByTestId('test-loading');

    expect(buttonElement).toBeDisabled();

    userEvent.click(buttonElement);
    expect(count).toBe(1);
    expect(onClickCallback).toBeCalledTimes(0);
    expect(buttonElement).toHaveTextContent('Loading..');
  });

  it('Should support type prop', () => {
    const children = 'Create ToDo';
    const onSubmit = jest.fn((e) => e.preventDefault());

    render(
      <form onSubmit={onSubmit}>
        <input />
        <Button id="test-type" type="submit">
          {children}
        </Button>
      </form>
    );

    const buttonElement = screen.getByTestId('test-type');

    userEvent.click(buttonElement);
    expect(buttonElement).toBeInTheDocument();
    expect(onSubmit).toBeCalled();
  });
});
