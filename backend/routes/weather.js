const express = require('express');
const router = express.Router();
const weatherFetcher = require('../services/weatherFetcher');

// Get current weather
router.get('/current', (req, res) => {
  try {
    const data = weatherFetcher.getLatest();
    if (!data) {
      return res.status(404).json({ error: 'No weather data available' });
    }
    res.json(data.current || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get weather location
router.get('/location', (req, res) => {
  try {
    const data = weatherFetcher.getLatest();
    if (!data) {
      return res.status(404).json({ error: 'No weather data available' });
    }
    res.json(data.location || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all weather data
router.get('/all', (req, res) => {
  try {
    const data = weatherFetcher.getLatest();
    if (!data) {
      return res.status(404).json({ error: 'No weather data available' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get weather metadata
router.get('/metadata', (req, res) => {
  try {
    const data = weatherFetcher.getLatest();
    if (!data) {
      return res.status(404).json({ error: 'No weather data available' });
    }
    res.json({
      lastUpdated: data.lastUpdated,
      source: data.source,
      nextUpdate: data.nextUpdate,
      location: data.location
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;