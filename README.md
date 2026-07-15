# Avalanche & Weather Data Application

A public application that displays avalanche data and weather reports with real-time updates and automated data fetching.

## Features

- 🏔️ Real-time avalanche forecasts and alerts
- 🌦️ Weather data integration
- 🗺️ Interactive map visualization
- 📱 Mobile-responsive design
- ⏰ Automated hourly data updates
- 🔔 Real-time alerts and notifications
- 📊 Historical data tracking
- 🌍 Location-based forecasts

## Technology Stack

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express
- **Data Fetching**: Axios, node-schedule
- **Data Storage**: JSON (easily extensible to MongoDB, PostgreSQL)
- **APIs**: New Zealand Avalanche Service + OpenWeatherMap (extensible)

## Project Structure

```
SandPit_App/
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── dataSource.js
│   ├── services/
│   │   ├── avalancheFetcher.js
│   │   ├── weatherFetcher.js
│   │   └── scheduler.js
│   ├── routes/
│   │   ├── avalanche.js
│   │   ├── weather.js
│   │   └── alerts.js
│   ├── data/
│   │   ├── avalanche.json
│   │   ├── weather.json
│   │   └── alerts.json
│   ├── logs/
│   │   └── .gitkeep
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Map.jsx
│   │   │   ├── AlertsPanel.jsx
│   │   │   ├── WeatherCard.jsx
│   │   │   └── Navigation.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Forecasts.jsx
│   │   │   ├── Alerts.jsx
│   │   │   └── History.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── components.css
│   │   │   └── responsive.css
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
├── .env.example
├── .gitignore
└── docker-compose.yml (optional)
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TBayly1/SandPit_App.git
   cd SandPit_App
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

6. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```

The application will be available at `http://localhost:3000`

## Environment Variables

```
# Backend
PORT=5000
NODE_ENV=development
LOG_LEVEL=info

# Data Sources
NZ_AVALANCHE_API_URL=https://api.example.com/avalanche
OPENWEATHER_API_KEY=your_api_key
OPENWEATHER_API_URL=https://api.openweathermap.org

# Fetching Schedule
FETCH_INTERVAL_MINUTES=60
```

## API Endpoints

### Avalanche Data
- `GET /api/avalanche/forecasts` - Get all avalanche forecasts
- `GET /api/avalanche/alerts` - Get active avalanche alerts
- `GET /api/avalanche/regions` - Get avalanche regions
- `GET /api/avalanche/history` - Get historical data

### Weather Data
- `GET /api/weather/current` - Get current weather
- `GET /api/weather/forecast` - Get weather forecast
- `GET /api/weather/alerts` - Get weather alerts

### Alerts
- `GET /api/alerts` - Get all active alerts
- `POST /api/alerts/subscribe` - Subscribe to alerts
- `DELETE /api/alerts/unsubscribe/:id` - Unsubscribe from alerts

## Data Sources

### Primary Data Sources
- **New Zealand Avalanche Service**: [www.aac.org.nz](https://www.aac.org.nz)
- **OpenWeatherMap**: [openweathermap.org](https://openweathermap.org)

### Extensible Architecture
The application is designed to easily add more data sources:
1. Create a new fetcher service in `backend/services/`
2. Add routes in `backend/routes/`
3. Update the scheduler
4. Add frontend components to display the data

## Automated Data Fetching

The application automatically fetches data every **60 minutes** (configurable):

- Avalanche forecasts and alerts are updated automatically
- Weather data is refreshed on schedule
- Historical data is archived automatically
- Failed requests are logged and retried

Monitor the scheduler logs in `backend/logs/`

## Development

### Frontend Development
```bash
cd frontend
npm start          # Start dev server
npm run build      # Build for production
npm run lint       # Run ESLint
```

### Backend Development
```bash
cd backend
npm start          # Start server
npm run dev        # Start with nodemon (auto-restart)
npm test           # Run tests
```

## Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### Manual Deployment
1. Build frontend: `cd frontend && npm run build`
2. Set environment variables on production server
3. Start backend: `cd backend && npm start`
4. Serve frontend build with nginx or Node.js static server

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or data source suggestions, please open an issue on GitHub.

---

**Last Updated**: July 15, 2026