import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/nom/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders without crashing', () => {
  render(<App />);
})
