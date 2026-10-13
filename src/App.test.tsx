import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('updates the displayed receipt from the edit form', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText('Store name'), {
    target: { value: 'Manual Store' },
  });
  fireEvent.change(screen.getByLabelText('Item 1 name'), {
    target: { value: 'Manual item' },
  });

  expect(screen.getByRole('heading', { name: 'Manual Store' })).toBeTruthy();
  expect(screen.getByText('Manual item')).toBeTruthy();
});
