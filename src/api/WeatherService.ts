export const fetchWeather = async (location: string) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${location}`;
  const response = await fetch(url).then(resp=>resp.json());
  return response;
};

export const fetchWeeklyForecast = async (lat: number, lon: number) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&hourly=temperature_2m,weather_code`;
  const response = await fetch(url).then(resp=>resp.json());
  return response;
};
