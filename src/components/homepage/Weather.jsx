import './Weather.css'
import { useState,useEffect } from 'react';
const Weather = () => {
    const [latitude, setLatitude] = useState(null);  
    const [longitude, setLongitude] = useState(null); 
    const [weather, setWeather] = useState(null);     
    const [loading, setLoading] = useState(true);     
    const [value, setValue] = useState('')

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (latitude && longitude) { 
                try {
                    const response = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                    );
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                    const data = await response.json();
                    setWeather(data.current_weather);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false); 
                }
            }
        };

        fetchWeatherData();
    }, [latitude, longitude]); 

  
    const getCoordinates = async (city) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                console.log(`City: ${city}`);
                console.log(`Latitude: ${lat}, Longitude: ${lon}`);
                
                setLatitude(lat);  
                setLongitude(lon); 
            } else {
                console.log("Location not found.");
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
        }
    };
    
    const searchCity = (event) => {
        setValue(event.target.value)
    }

    const searchClick = () => {
            getCoordinates(value); 
    }
    
    return (
        
        <div>
            <div className="search-container">
                <input
                    onChange={searchCity}
                    value={value}
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                />
                <button onClick={searchClick} className="search-button">Search</button> {/* Button next to the input */}
            </div>

            asnjasxnasojxnaso

            {loading ? (
                <p>Pick the city</p>
            ) : weather ? (
                <div>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Wind Speed: {weather.windspeed} km/h</p>
                    
                </div>
            ) : (
                <p>No weather data available.</p>
            )}
        </div>
    );
};

export default Weather;