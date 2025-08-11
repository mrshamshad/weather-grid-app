import React, { useState } from 'react';
import VisualWeather from './components/VisualWeather';

const locations = [
  { name: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
];

function App() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <div className="App">
      <h1>Weather + Grid App</h1>

      {/* Dropdown to select location */}
      <select
        value={selectedLocation.name}
        onChange={(e) => {
          const loc = locations.find((loc) => loc.name === e.target.value);
          setSelectedLocation(loc);
        }}
        style={{ padding: '8px 12px', fontSize: '16px', marginBottom: '20px' }}
      >
        {locations.map((loc) => (
          <option key={loc.name} value={loc.name}>
            {loc.name}
          </option>
        ))}
      </select>

      {/* Pass lat and lon as props to VisualWeather */}
      <VisualWeather lat={selectedLocation.lat} lon={selectedLocation.lon} />
    </div>
  );
}

export default App;
