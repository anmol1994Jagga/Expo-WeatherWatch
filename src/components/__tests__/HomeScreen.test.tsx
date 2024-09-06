import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { fetchWeather, fetchWeeklyForecast } from '../../api/WeatherService';

// Mock the API calls
jest.mock('../../api/WeatherService');

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<HomeScreen />);
    expect(getByPlaceholderText('Search location')).toBeTruthy();
  });

  it('fetches weather for default location on mount', async () => {
    const mockFetchWeeklyForecast = fetchWeeklyForecast as jest.MockedFunction<typeof fetchWeeklyForecast>;
    mockFetchWeeklyForecast.mockResolvedValue({
      current: { time: '2023-09-06T12:00:00' },
      hourly: {
        time: ['2023-09-06T12:00:00'],
        temperature_2m: [25],
        weather_code: [0]
      }
    });

    let component = render(<HomeScreen />);
    await waitFor(() => {
      expect(mockFetchWeeklyForecast).toHaveBeenCalledWith(28.63576, 77.22445);
    });

    component.unmount();
  });

  it('handles search correctly', async () => {
    const mockFetchWeather = fetchWeather as jest.MockedFunction<typeof fetchWeather>;
    mockFetchWeather.mockResolvedValue({
      results: [{ name: 'London', country: 'UK', latitude: 51.5074, longitude: -0.1278 }]
    });

    let component = render(<HomeScreen />);
    const input = component.getByPlaceholderText('Search location');
    fireEvent.changeText(input, 'London');
    fireEvent.press(component.getByText('Search'));

    await waitFor(() => {
      expect(mockFetchWeather).toHaveBeenCalledWith('London');
    });

    component.unmount();
  });

  it('fetches weekly forecast', async () => {
    const mockFetchWeeklyForecast = fetchWeeklyForecast as jest.MockedFunction<typeof fetchWeeklyForecast>;
    mockFetchWeeklyForecast.mockResolvedValue({
      current: { time: '2023-09-06T12:00:00' },
      hourly: {
        time: ['2023-09-06T12:00:00', '2023-09-07T12:00:00'],
        temperature_2m: [25, 26],
        weather_code: [0, 1]
      }
    });

    let component = render(<HomeScreen />);
    const input = component.getByPlaceholderText('Search location');
    fireEvent.changeText(input, 'London');
    fireEvent.press(component.getByText('Search'));

    await waitFor(() => {
      expect(component.getByText('Average Temperature: 25°C')).toBeTruthy();
    });

    component.unmount();
  });

});