import React, { useState } from "react";
import WeatherFinder from "./WeatherFinder";
import WeatherDetails from "./WeatherDetails";
import WeatherSettings from "./WeatherSettings";

export default function WeatherView() {
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (location) => {
    const res = await fetch(`YOUR_API_URL/${location}`);
    const data = await res.json();
    setWeatherData({
      location: data.name,
      temp: data.main.temp,
      condition: data.weather[0].description
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <WeatherFinder onSearch={handleSearch} />
      <WeatherDetails weatherData={weatherData} />
      <WeatherSettings />
    </div>
  );
}
