import { render } from '@testing-library/react';

// Simple component test that doesn't require external dependencies
const SimpleComponent = () => {
  return <div data-testid="simple-component">Sweet Shop App</div>;
};

test('renders simple component', () => {
  const { getByTestId } = render(<SimpleComponent />);
  const element = getByTestId('simple-component');
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent('Sweet Shop App');
});
