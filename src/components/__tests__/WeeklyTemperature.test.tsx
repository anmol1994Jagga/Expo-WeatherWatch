import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WeeklyTemperature from '../WeeklyTemperature';

describe('WeeklyTemperature', () => {
  const mockWeeklyForecast = [
    { time: '2023-09-06T12:00:00', temp: 25 },
    { time: '2023-09-07T12:00:00', temp: 26 },
    { time: '2023-09-08T12:00:00', temp: 24 },
  ];

  const mockCurrentWeather = {
    current: { time: '2023-09-06T12:00:00' },
    hourly: {
      time: ['2023-09-06T12:00:00'],
      temperature_2m: [25],
      weather_code: [0]
    }
  };

  const mockGetImageUrl = jest.fn().mockReturnValue('http://example.com/weather-icon.png');

  it('renders correctly', () => {
    const { getByText, getAllByRole } = render(
      <WeeklyTemperature
        weeklyForecast={mockWeeklyForecast}
        currentWeather={mockCurrentWeather}
        getImageurl={mockGetImageUrl}
      />
    );

    // Check if the title is rendered
    expect(getByText('Weekly Forecast')).toBeTruthy();

    // Check if all forecast items are rendered
    expect(getAllByRole('text')).toHaveLength(7); // Title + 3 dates + 3 temperatures
  });

  it('displays correct date format', () => {
    const { getByText } = render(
      <WeeklyTemperature
        weeklyForecast={mockWeeklyForecast}
        currentWeather={mockCurrentWeather}
        getImageurl={mockGetImageUrl}
      />
    );

    expect(getByText('Sep 6, 2023')).toBeTruthy();
  });

  it('displays rounded temperatures', () => {
    const { getByText } = render(
      <WeeklyTemperature
        weeklyForecast={mockWeeklyForecast}
        currentWeather={mockCurrentWeather}
        getImageurl={mockGetImageUrl}
      />
    );

    expect(getByText('25°C')).toBeTruthy();
  });

  it('calls getImageurl with currentWeather', () => {
    render(
      <WeeklyTemperature
        weeklyForecast={mockWeeklyForecast}
        currentWeather={mockCurrentWeather}
        getImageurl={mockGetImageUrl}
      />
    );

    expect(mockGetImageUrl).toHaveBeenCalledWith(mockCurrentWeather);
  });

});