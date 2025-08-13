import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function WeatherFinder({ onSearch }) {
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (location.trim() !== "") {
      onSearch(location);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <TextField
        label="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        variant="outlined"
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ marginLeft: "10px" }}
      >
        Search
      </Button>
    </div>
  );
}
