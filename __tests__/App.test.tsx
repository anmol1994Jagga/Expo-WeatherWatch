import 'react-native';
import App from '../App';

import {render, screen} from '@testing-library/react-native';
jest.mock('../src/api/WeatherService');
it('should render the App', () => {
  render(<App />);

  expect(
    screen.getByText('Search'),
  ).toBeTruthy();
});
