import React, { useState } from 'react';
import VisualWeather from './components/VisualWeather';

import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';



const locations = [
  { name: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
];

function App() {
  
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  
  const [tempUnit, setTempUnit] = useState('F'); 
  const [windUnit, setWindUnit] = useState('mph'); 
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Weather + Grid App
      </Typography>

      {}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Select
          value={selectedLocation.name}
          onChange={(e) => {
            const loc = locations.find((loc) => loc.name === e.target.value);
            setSelectedLocation(loc);
          }}
          size="small"
        >
          {locations.map((loc) => (
            <MenuItem key={loc.name} value={loc.name}>
              {loc.name}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="outlined"
          startIcon={<SettingsIcon />}
          onClick={() => setSettingsOpen(true)}
        >
          Settings
        </Button>
      </Box>

      {}
      <VisualWeather
        lat={selectedLocation.lat}
        lon={selectedLocation.lon}
        tempUnit={tempUnit}
        windUnit={windUnit}
      />

      {}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Settings
          <IconButton
            aria-label="close"
            onClick={() => setSettingsOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {}
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend">Temperature Unit</FormLabel>
            <RadioGroup
              row
              value={tempUnit}
              onChange={(e) => setTempUnit(e.target.value)}
            >
              <FormControlLabel value="F" control={<Radio />} label="Fahrenheit (°F)" />
              <FormControlLabel value="C" control={<Radio />} label="Celsius (°C)" />
            </RadioGroup>
          </FormControl>

          {}
          <FormControl component="fieldset">
            <FormLabel component="legend">Wind Speed Unit</FormLabel>
            <RadioGroup
              row
              value={windUnit}
              onChange={(e) => setWindUnit(e.target.value)}
            >
              <FormControlLabel value="mph" control={<Radio />} label="mph" />
              <FormControlLabel value="km/h" control={<Radio />} label="km/h" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default App;
