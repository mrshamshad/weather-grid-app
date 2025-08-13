import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function WeatherDetails({ weatherData }) {
  if (!weatherData) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{weatherData.location}</Typography>
        <Typography variant="h6">{weatherData.temp}°C</Typography>d
        <Typography variant="body1">{weatherData.condition}</Typography>
      </CardContent>
    </Card>
  );
}
