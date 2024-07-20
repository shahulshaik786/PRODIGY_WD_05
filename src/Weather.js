import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const API_KEY = '66553c60211086d5830b6cbd3a6f3501'; // Replace this with your actual API key

    const fetchWeather = async (location) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: location,
                    appid: API_KEY,
                    units: 'metric'
                }
            });
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            setWeatherData(null);
            if (error.response) {
                if (error.response.status === 401) {
                    setError('Invalid API key.');
                } else if (error.response.status === 404) {
                    setError('Location not found.');
                } else {
                    setError(`Error: ${error.response.status} - ${error.response.data.message}`);
                }
            } else if (error.request) {
                setError('No response received from the server.');
            } else {
                setError('Error: ' + error.message);
            }
        }
    };

    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            console.log(`Fetching weather for coordinates: Latitude: ${lat}, Longitude: ${lon}`);
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: API_KEY,
                    units: 'metric'
                }
            });
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            setWeatherData(null);
            if (error.response) {
                if (error.response.status === 401) {
                    setError('Invalid API key.');
                } else if (error.response.status === 404) {
                    setError('Location not found.');
                } else {
                    setError(`Error: ${error.response.status} - ${error.response.data.message}`);
                }
            } else if (error.request) {
                setError('No response received from the server.');
            } else {
                setError('Error: ' + error.message);
            }
        }
    };

    const handleSearch = () => {
        if (location) {
            fetchWeather(location);
        }
    };

    const handleGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                console.log(`Geolocation coordinates: Latitude: ${latitude}, Longitude: ${longitude}`);
                fetchWeatherByCoords(latitude, longitude);
            }, (error) => {
                console.error('Geolocation error:', error);
                setError('Unable to retrieve your location.');
            });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="Enter location (e.g., Mumbai, IN or New York, US)"
                />
            </div>
            <div className="button-container">
                <button onClick={handleSearch}>Get Weather</button>
                <button onClick={handleGeolocation}>Use Current Location</button>
            </div>
            <div className="weather-display">
                {error && <p>{error}</p>}
                {weatherData && (
                    <>
                        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                        <p>Temperature: {weatherData.main.temp} °C</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                        <p>Humidity: {weatherData.main.humidity} %</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Weather;
