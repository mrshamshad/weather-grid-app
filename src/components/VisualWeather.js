import React, { useEffect, useState } from 'react';

const weatherIcons = {
  Clear: '☀️',
  Rain: '🌧️',
  Clouds: '☁️',
  Snow: '❄️',
  Thunderstorm: '⛈️',
  Drizzle: '🌦️',
  Mist: '🌫️',
  Fog: '🌫️',
};

const VisualWeather = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lon) return;

    setLoading(true);
    
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=us&key=2NTRTWQJUANFGFLZW7FNC2HDZ&contentType=json`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching weather:', err);
        setLoading(false);
      });
  }, [lat, lon]);

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (!weatherData) {
    return <div>Weather data not available.</div>;
  }

  
  const currentCondition = weatherData.currentConditions.conditions;
  
  let icon = '🌈'; 
  for (const key of Object.keys(weatherIcons)) {
    if (currentCondition.toLowerCase().includes(key.toLowerCase())) {
      icon = weatherIcons[key];
      break;
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '900px', width: '100%' }}>
      <h2>
        Weather in {weatherData.resolvedAddress} {icon}
      </h2>
      <p>
        <strong>Timezone:</strong> {weatherData.timezone}
      </p>
      <p>
        <strong>Current Conditions:</strong> {currentCondition}
      </p>
      <p>
        <strong>Temperature:</strong> {weatherData.currentConditions.temp} °F
      </p>
      <p>
        <strong>Humidity:</strong> {weatherData.currentConditions.humidity} %
      </p>
      <p>
        <strong>Wind Speed:</strong> {weatherData.currentConditions.windspeed} mph
      </p>

      <h3>Forecast (Next 5 Days)</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
        }}
      >
        {weatherData.days.slice(0, 5).map((day, index) => {
          
          let forecastIcon = '🌈';
          for (const key of Object.keys(weatherIcons)) {
            if (day.conditions.toLowerCase().includes(key.toLowerCase())) {
              forecastIcon = weatherIcons[key];
              break;
            }
          }

          return (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                textAlign: 'center',
              }}
            >
              <p>
                <strong>{day.datetime}</strong>
              </p>
              <div style={{ fontSize: '30px' }}>{forecastIcon}</div>
              <p>
                Max: {day.tempmax} °F
                <br />
                Min: {day.tempmin} °F
              </p>
              <p>{day.conditions}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisualWeather;