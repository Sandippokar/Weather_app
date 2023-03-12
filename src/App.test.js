import React from 'react';
import { render, fireEvent, screen, getByTestId } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render a title, label, and button', () => {
    render(<App />);

    const linkElement = screen.getByText(/Weather App/i);
    expect(linkElement).toBeInTheDocument();

    const searchText = screen.getByText('Search City :');
    expect(searchText).toBeDefined();

    const submitText = screen.getByText('Submit'); 
    expect(submitText).toBeDefined();
  });

  it('should enable the submit button only when the input is not empty', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search City');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(searchInput, {
      target: { value: '' },
    });
    expect(submitButton).toBeDisabled();

    fireEvent.change(searchInput, {
      target: { value: 'Bangalore' },
    });
    expect(submitButton).not.toBeDisabled();
  });
});
