import React from 'react';
import { render } from '@testing-library/react-native';
import CurrentWeather from '../CurrentWeather'; // Adjust the path as necessary

describe('CurrentWeather Component', () => {
  const mockSelectedLocation = {
    name: 'New York',
    country: 'USA',
  };

  const mockCurrentWeather = {
    current: {
      temperature_2m: 25.4,
    },
  };

  const mockGetImageUrl = jest.fn(() => 'https://example.com/weather-icon.png');

  it('renders the location name and country correctly', () => {
    const { getByText } = render(
      <CurrentWeather
        selectedLocation={mockSelectedLocation}
        currentWeather={mockCurrentWeather}
        getImageurl={mockGetImageUrl}
      />
    );

    expect(getByText('New York, USA')).toBeTruthy();
  });

  it('renders the temperature correctly', () => {
    const { getByText } = render(
      <CurrentWeather
        selectedLocation={mockSelectedLocation}
        currentWeather={mockCurrentWeather}
        getImageurl={mockGetImageUrl}
      />
    );

    expect(getByText('25°C')).toBeTruthy();
  });

  it('calls getImageUrl with the correct parameter', () => {
    render(
      <CurrentWeather
        selectedLocation={mockSelectedLocation}
        currentWeather={mockCurrentWeather}
        getImageurl={mockGetImageUrl}
      />
    );

    expect(mockGetImageUrl).toHaveBeenCalledWith(mockCurrentWeather);
  });
});
