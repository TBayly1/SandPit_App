const express = require('express');
const router = express.Router();
const avalancheFetcher = require('../services/avalancheFetcher');

// Get all avalanche forecasts
router.get('/forecasts', (req, res) => {
  try {
    const data = avalancheFetcher.getLatest();
    if (!data) {
      return res.status(404).json({ error: 'No avalanche data available' });
    }
    res.json(data.regions || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get active avalanche alerts
router.get('/alerts', (req, res) => {
  try {
    const data = avalancheFetcher.getLatest();
    if (!data) {
      return res.status(404).json({ error: 'No avalanche data available' });
    }
    res.json(data.alerts || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get avalanche regions
router.get('/regions', (req, res) => {
  try {
    const data = avalancheFetcher.getLatest();
    if (!data) {
      return res.status(404).json({ error: 'No avalanche data available' });
    }
    res.json(data.regions || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get avalanche region by ID
router.get('/regions/:id', (req, res) => {
  try {
    const data = avalancheFetcher.getLatest();
    if (!data) {
      return res.status(404).json({ error: 'No avalanche data available' });
    }
    const region = data.regions.find(r => r.id === req.params.id);
    if (!region) {
      return res.status(404).json({ error: 'Region not found' });
    }
    res.json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get metadata
router.get('/metadata', (req, res) => {
  try {
    const data = avalancheFetcher.getLatest();
    if (!data) {
      return res.status(404).json({ error: 'No avalanche data available' });
    }
    res.json({
      lastUpdated: data.lastUpdated,
      source: data.source,
      nextUpdate: data.nextUpdate,
      regionCount: data.regions?.length || 0,
      alertCount: data.alerts?.length || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;