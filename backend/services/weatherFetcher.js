const axios = require('axios');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const DATA_FILE = path.join(__dirname, '../data/weather.json');
const API_KEY = process.env.OPENWEATHER_API_KEY;
const API_URL = process.env.OPENWEATHER_API_URL || 'https://api.openweathermap.org';
const DEFAULT_LAT = process.env.DEFAULT_LATITUDE || -41.2865;
const DEFAULT_LON = process.env.DEFAULT_LONGITUDE || 172.8860;

const weatherFetcher = {
  fetch: async () => {
    try {
      // If API key is configured, fetch real data
      if (API_KEY) {
        const response = await axios.get(
          `${API_URL}/data/2.5/weather?lat=${DEFAULT_LAT}&lon=${DEFAULT_LON}&appid=${API_KEY}&units=metric`
        );
        
        const data = {
          lastUpdated: new Date().toISOString(),
          current: {
            temperature: response.data.main.temp,
            feelsLike: response.data.main.feels_like,
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure,
            windSpeed: response.data.wind.speed,
            cloudCoverage: response.data.clouds.all,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon
          },
          location: {
            name: response.data.name,
            latitude: response.data.coord.lat,
            longitude: response.data.coord.lon
          },
          source: 'OpenWeatherMap',
          nextUpdate: new Date(Date.now() + 3600000).toISOString()
        };
        
        // Save to file
        const dataDir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        logger.info('Weather data fetched and saved from OpenWeatherMap');
        return data;
      } else {
        // Use mock data if no API key
        const data = {
          lastUpdated: new Date().toISOString(),
          current: {
            temperature: 8,
            feelsLike: 6,
            humidity: 72,
            pressure: 1013,
            windSpeed: 12,
            cloudCoverage: 65,
            description: 'Partly cloudy',
            icon: '02d'
          },
          location: {
            name: 'Southern New Zealand',
            latitude: DEFAULT_LAT,
            longitude: DEFAULT_LON
          },
          source: 'Mock Data',
          nextUpdate: new Date(Date.now() + 3600000).toISOString()
        };
        
        const dataDir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        logger.info('Mock weather data saved (configure OPENWEATHER_API_KEY for real data)');
        return data;
      }
    } catch (error) {
      logger.error(`Error fetching weather data: ${error.message}`);
      throw error;
    }
  },
  
  getLatest: () => {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      logger.error(`Error reading weather data: ${error.message}`);
      return null;
    }
  }
};

module.exports = weatherFetcher;