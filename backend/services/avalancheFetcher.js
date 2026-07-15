const axios = require('axios');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const DATA_FILE = path.join(__dirname, '../data/avalanche.json');
const NZ_AVALANCHE_URL = process.env.NZ_AVALANCHE_API_URL || 'https://www.aac.org.nz';

const avalancheFetcher = {
  fetch: async () => {
    try {
      // For now, we'll create a mock data structure
      // In production, you would replace this with actual API calls to NZ Avalanche Service
      const data = {
        lastUpdated: new Date().toISOString(),
        regions: [
          {
            id: 'nz_north',
            name: 'Northern New Zealand',
            latitude: -37.7870,
            longitude: 175.2793,
            riskLevel: 'low',
            forecast: 'Stable conditions expected',
            lastForecast: new Date().toISOString()
          },
          {
            id: 'nz_central',
            name: 'Central New Zealand',
            latitude: -39.2,
            longitude: 175.5,
            riskLevel: 'moderate',
            forecast: 'Watch for wind slab formation',
            lastForecast: new Date().toISOString()
          },
          {
            id: 'nz_south',
            name: 'Southern New Zealand',
            latitude: -41.2865,
            longitude: 172.8860,
            riskLevel: 'moderate',
            forecast: 'Recent snow increasing instability',
            lastForecast: new Date().toISOString()
          }
        ],
        alerts: [],
        source: 'New Zealand Avalanche Commission',
        nextUpdate: new Date(Date.now() + 3600000).toISOString()
      };

      // Ensure data directory exists
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Save to file
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      logger.info('Avalanche data fetched and saved');
      
      return data;
    } catch (error) {
      logger.error(`Error fetching avalanche data: ${error.message}`);
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
      logger.error(`Error reading avalanche data: ${error.message}`);
      return null;
    }
  }
};

module.exports = avalancheFetcher;