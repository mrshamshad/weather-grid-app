import React, { useEffect, useState } from 'react';

const VisualWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace "Athirampuzha" with any other location if needed
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Athirampuzha?unitGroup=us&key=2NTRTWQJUANFGFLZW7FNC2HDZ&contentType=json")
      .then(res => res.json())
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching weather:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (!weatherData) {
    return <div>Weather data not available.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Weather in {weatherData.resolvedAddress}</h2>
      <p><strong>Timezone:</strong> {weatherData.timezone}</p>
      <p><strong>Current Conditions:</strong> {weatherData.currentConditions.conditions}</p>
      <p><strong>Temperature:</strong> {weatherData.currentConditions.temp} °F</p>
      <p><strong>Humidity:</strong> {weatherData.currentConditions.humidity} %</p>
      <p><strong>Wind Speed:</strong> {weatherData.currentConditions.windspeed} mph</p>

      <h3>Forecast (Next 5 Days)</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
        {weatherData.days.slice(0, 5).map((day, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
            <p><strong>Date:</strong> {day.datetime}</p>
            <p><strong>Max Temp:</strong> {day.tempmax} °F</p>
            <p><strong>Min Temp:</strong> {day.tempmin} °F</p>
            <p><strong>Condition:</strong> {day.conditions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualWeather;
