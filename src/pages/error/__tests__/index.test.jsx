import { render, screen } from '@testing-library/react';
import Error from '../index';

describe('When user gets an error', () => {
  it('should show error page', async () => {
    render(<Error />);
    expect(screen.getByText('Error from backend')).toBeTruthy();
  });
});
