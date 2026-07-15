const schedule = require('node-schedule');
const logger = require('./logger');
const avalancheFetcher = require('./avalancheFetcher');
const weatherFetcher = require('./weatherFetcher');

const FETCH_INTERVAL = process.env.FETCH_INTERVAL_MINUTES || 60;

let jobs = [];

const scheduler = {
  start: () => {
    logger.info(`📅 Scheduler started with ${FETCH_INTERVAL} minute interval`);
    
    // Initial fetch on startup
    performFetch();
    
    // Schedule recurring fetch every N minutes
    const job = schedule.scheduleJob(`*/${FETCH_INTERVAL} * * * *`, () => {
      performFetch();
    });
    
    jobs.push(job);
  },
  
  stop: () => {
    jobs.forEach(job => job.cancel());
    jobs = [];
    logger.info('Scheduler stopped');
  }
};

const performFetch = async () => {
  logger.info('🔄 Starting data fetch cycle...');
  
  try {
    // Fetch avalanche data
    logger.info('Fetching avalanche data...');
    await avalancheFetcher.fetch();
    
    // Fetch weather data
    logger.info('Fetching weather data...');
    await weatherFetcher.fetch();
    
    logger.info('✅ Data fetch cycle completed successfully');
  } catch (error) {
    logger.error(`❌ Error during fetch cycle: ${error.message}`);
  }
};

module.exports = scheduler;