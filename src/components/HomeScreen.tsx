import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchWeather, fetchWeeklyForecast } from '../api/WeatherService';
import getWeatherImage, { findNearestTime, groupTimesByDate, WeatherCode } from '../helpers/getWeatherImage';
import WeeklyTemperature from './WeeklyTemperature';
import SearchComponent from './SearchComponent';
import CurrentWeather from './CurrentWeather';

const HomeScreen = () => {
  const [location, setLocation] = useState(''); // default location
  const [locations, setLocations] = useState([]);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<any[]>([]);
  const [averageTemp, setAverageTemp] = useState<number>();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (location) fetchCurrentWeather(location);
  }, [location]);
  useEffect(() => {
    selectLocation({
      latitude: 28.63576,
      longitude: 77.22445,
      name: 'New Delhi',
      country: 'India'
    });// Default location new Delhi
  }, []);

  const fetchCurrentWeather = async (location: string) => {
    try {
      const weather = await fetchWeather(location);
      if (weather?.results) setLocations(weather.results);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleSearch = () => {
    setLocation(search);
  };
  const selectLocation = async (weather: any) => {
    const forecast = await fetchWeeklyForecast(
      weather.latitude,
      weather.longitude
    );
    if (forecast) {
      setCurrentWeather(forecast);
      setSelectedLocation(weather);
      const { averageCurrentTemp, groupedByDateArr } = groupTimesByDate(forecast.hourly.time, forecast.hourly.temperature_2m, forecast.current.time);
      setWeeklyForecast(groupedByDateArr)
      setAverageTemp(averageCurrentTemp);
    }

  };

  const getImageurl = ({ hourly, current }: any) => {
    const index = findNearestTime(hourly.time, current.time);
    const code: WeatherCode = hourly.weather_code[index];
    return getWeatherImage(code);
  }

  return (
    <View style={styles.container}>
      <SearchComponent
        search={search}
        setSearch={setSearch}
        locations={locations}
        selectLocation={selectLocation}
        handleSearch={handleSearch}
      />

      {currentWeather && (
        <CurrentWeather
          selectedLocation={selectedLocation}
          currentWeather={currentWeather}
          getImageurl={getImageurl} />
      )}

      {weeklyForecast?.length > 0 &&
        <WeeklyTemperature
          weeklyForecast={weeklyForecast}
          currentWeather={currentWeather}
          getImageurl={getImageurl}
        />
      }

      {averageTemp && <Text style={styles.averageTemp}>
        Average Temperature: {Math.round(averageTemp)}°C
      </Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  averageTemp: {
    fontSize: 18,
    marginTop: 10
  }
});

export default HomeScreen;
