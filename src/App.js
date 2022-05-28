import './App.css';
import Input from './components/Input'
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [degrees, setDegrees] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [country, setCountry] = useState("");

  const [userLocation, setUserLocation] = useState("");
  const [dataFetched, setDataFetched] = useState(false);


  const fetchWeatherData = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      const data = await res.data;

      setDegrees(data.main.temp);
      setLocation(data.name);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setCountry(data.sys.country);


      console.log(data);

      setDataFetched(true);

    } catch (error) {
      console.log(error);
      alert("Please enter a valid city!");
    }


  }

  const defaultDataFetched = async () => {
    if (!dataFetched) {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=auckland&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      const data = await res.data;

      setDegrees(data.main.temp);
      setLocation(data.name);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setCountry(data.sys.country);

    }
  }

  useEffect(() => {
    defaultDataFetched();
  }, [])

  return (
    <div className="App">
      <div className="weather">
        <Input
          text={(e) => setUserLocation(e.target.value)}
          submit={fetchWeatherData}
          func={fetchWeatherData}
        />

        <div className="weather_display">
          <h3 className="weather_location">
            Weather in {location}
          </h3>

          <div>
            <h1 className="weather_degrees">{degrees}°C</h1>
          </div>

          <div className="weather_description">
            <div>
              <div className="weather_description_head">
                <span className="weather_icon">
                  <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
                </span>
                <h3 className="weather_text">{description}</h3>
              </div>
              <h3>Humidity: {humidity}%</h3>
              <h3>Wind speed: {windSpeed}m/s</h3>
            </div>

            <div className="weather_country">
              <h3>Country: {country}</h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
