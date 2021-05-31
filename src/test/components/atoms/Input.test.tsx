/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../../../components/atoms/Input';

describe('Input Component', () => {
  it('Should render without crash', () => {
    const testId = 'test-input';
    render(<Input id={testId} />);

    const inputElement = screen.getByTestId(testId);
    expect(inputElement).toBeInTheDocument();
  });

  it('Should type a value', () => {
    const value = 'Nicolas';
    const onChange = jest.fn();
    const testId = 'test-on-change';
    render(<Input id={testId} onChange={onChange} />);

    const inputElement = screen.getByTestId(testId);
    const arr = value.split('');

    arr.forEach((val) => userEvent.type(inputElement, val));
    expect(onChange).toBeCalledTimes(arr.length);

    fireEvent.change(inputElement, { target: { value } });
    expect(inputElement).toHaveValue(value);
  });

  it('Should show an error', () => {
    const testId = 'test-input-error';
    const errorMessage = 'You have to enter a name';
    render(<Input id={testId} errorMessage={errorMessage} />);

    const inputElement = screen.getByTestId(testId);
    const errorMessageElement = screen.getByText(errorMessage);
    expect(inputElement).toBeInTheDocument();
    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveTextContent(errorMessage);
  });
});
