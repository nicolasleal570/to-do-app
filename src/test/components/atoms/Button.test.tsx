/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Button Components', () => {
  it('Render children without crash', () => {
    const children = 'Create ToDo';

    render(<Button id="test-button">{children}</Button>);

    const linkElement = screen.getByTestId('test-button');
    expect(linkElement).toBeInTheDocument();
  });
});
