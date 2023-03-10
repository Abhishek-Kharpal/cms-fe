import { render, screen } from '@testing-library/react';
import PageNotFound from '../index';

describe('When user try to visit any page that does not exist', () => {
  it('should display Page Not Found', () => {
    render(<PageNotFound />);
    expect(screen.getByText('Page Not Found')).toBeTruthy();
  });
});
