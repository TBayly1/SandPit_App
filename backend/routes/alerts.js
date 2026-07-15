const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const logger = require('../services/logger');

const ALERTS_FILE = path.join(__dirname, '../data/alerts.json');

// Helper function to load alerts
const loadAlerts = () => {
  try {
    if (fs.existsSync(ALERTS_FILE)) {
      const data = fs.readFileSync(ALERTS_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return { subscriptions: [] };
  } catch (error) {
    logger.error(`Error reading alerts: ${error.message}`);
    return { subscriptions: [] };
  }
};

// Helper function to save alerts
const saveAlerts = (data) => {
  try {
    const dataDir = path.dirname(ALERTS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(ALERTS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    logger.error(`Error saving alerts: ${error.message}`);
  }
};

// Get all alerts
router.get('/', (req, res) => {
  try {
    const alerts = loadAlerts();
    res.json(alerts.subscriptions || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Subscribe to alerts
router.post('/subscribe', (req, res) => {
  try {
    const { email, region, alertTypes } = req.body;
    
    if (!email || !region) {
      return res.status(400).json({ error: 'Email and region are required' });
    }
    
    const alerts = loadAlerts();
    const subscription = {
      id: Date.now().toString(),
      email,
      region,
      alertTypes: alertTypes || ['avalanche', 'weather'],
      createdAt: new Date().toISOString(),
      active: true
    };
    
    alerts.subscriptions.push(subscription);
    saveAlerts(alerts);
    
    logger.info(`New alert subscription: ${email} for region ${region}`);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unsubscribe from alerts
router.delete('/unsubscribe/:id', (req, res) => {
  try {
    const alerts = loadAlerts();
    const index = alerts.subscriptions.findIndex(s => s.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    alerts.subscriptions.splice(index, 1);
    saveAlerts(alerts);
    
    logger.info(`Unsubscribed: ${req.params.id}`);
    res.json({ message: 'Successfully unsubscribed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;