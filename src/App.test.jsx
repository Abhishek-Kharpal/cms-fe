import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render successfully', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
