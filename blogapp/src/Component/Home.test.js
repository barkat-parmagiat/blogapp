import React from 'react';
import { render, getByTestId, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home Functionality test', () => {
  test('Click', () => {
    const { container } = render(<Home />);
    const button = getByTestId(container, 'btn btn-primary signup');
    fireEvent.click(button);
  });
  test('Click d', () => {
    const { container } = render(<Home />);
    const button = getByTestId(container, 'btn btn-primary signin');
    fireEvent.click(button);
  });
});
