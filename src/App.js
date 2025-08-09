import React from 'react';
import VisualWeather from './components/VisualWeather'; // ✅ Import your weather component

function App() {
  return (
    <div className="App">
      <h1>Weather + Grid App</h1>
      <VisualWeather /> {/* ✅ Use the component here */}
    </div>
  );
}

export default App;
