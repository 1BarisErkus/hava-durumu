import "./App.css";
import { usePosition } from "use-position";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const { latitude, longitude, speed, timestamp, accuracy, heading, error } =
    usePosition();

  const [weather, setWeather] = useState();

  const getWeatherData = async (lat, lon) => {
    const key = process.env.REACT_APP_WEATHER_DATA;
    const lang = navigator.language;
    // console.log(key);

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}`
      );
      console.log(data);
      setWeather(data);
    } catch (error) {
      alert("Veriler çekilemedi");
    }
  };

  useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
  }, [latitude, longitude]);

  // console.log(latitude, longitude, speed, timestamp, accuracy, heading, error);

  return (
    <div className="App">
      <h2>Hava Durumu</h2>
      <h3>Enlem Koordinat: {latitude}</h3>
      <h3>Boylam Koordinat: {longitude}</h3>
      <h3>Koordinat Bölgesi: {weather.name}</h3>
      <h3>Hava Sıcaklığı: {Math.ceil(weather.main.temp - 273.15)}</h3>
      <h3>Durumu: {weather.weather.map((data) => data.main)}</h3>
      <h3>Özelliği: {weather.weather.map((data) => data.description)}</h3>
    </div>
  );
}

export default App;
