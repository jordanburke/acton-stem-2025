# 3D Globe Data Visualization - ACTON STEM

An interactive 3D Earth globe visualizing real-world datasets including earthquakes and wildfires. Built for ACTON STEM educational exhibit to showcase AI-assisted development.

## Features

- **Interactive 3D Globe**: Rotate and zoom with mouse/touch controls
- **Real-time Earthquake Data**: USGS data for the last 30 days with magnitude-based visualization
- **Wildfire Detection**: NASA FIRMS satellite fire data with Fire Radiative Power (FRP) metrics
- **Dynamic Statistics**: Live stats panel showing dataset metrics
- **Responsive Controls**: Dataset selection and rotation speed adjustment

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Development Commands

### Main Commands

- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Production build
- `pnpm preview` - Preview production build

### Code Quality

- `pnpm validate` - **Pre-commit check**: format, lint, test, and build
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Fix ESLint issues
- `pnpm test` - Run tests with Vitest
- `pnpm test:coverage` - Run tests with coverage report

## NASA FIRMS Wildfire Data Setup

The wildfire dataset requires a free NASA FIRMS API key.

### Getting Your API Key

1. Visit: https://firms.modaps.eosdis.nasa.gov/api/area/
2. Sign up for a free account
3. Request an API key (instant approval)

### Configuring the API Key

#### Option 1: Environment Variable (Recommended)

Create a `.env` file in the project root:

```env
VITE_NASA_FIRMS_API_KEY=your_api_key_here
```

#### Option 2: Direct Configuration

Edit `src/data/wildfires.ts` and replace the environment variable:

```typescript
const NASA_FIRMS_API_KEY = "your_api_key_here"
```

### Without API Key

The app will automatically use sample wildfire data (5 demo fires) if no API key is configured.

## Tech Stack

- **React 18** - UI framework
- **Mantine UI 7** - Component library with dark theme
- **Three.js** - 3D graphics engine
- **Globe.gl** - 3D globe visualization
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe development

## Data Sources

### Earthquakes (No API Key Required)

- **Source**: USGS Earthquake Hazards Program
- **API**: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson
- **Coverage**: Last 30 days, worldwide
- **Update Frequency**: Real-time (updates every minute)

### Wildfires (API Key Required)

- **Source**: NASA FIRMS (Fire Information for Resource Management System)
- **Sensor**: VIIRS S-NPP (375m resolution)
- **Coverage**: Last 24 hours, worldwide
- **Update Frequency**: Near real-time (every 3-5 hours)

## Project Structure

```
src/
├── components/          # React components
│   ├── Globe.tsx       # Globe wrapper component
│   ├── ControlsPanel.tsx # Dataset and rotation controls
│   └── InfoPanel.tsx   # Statistics display
├── data/               # Data fetching and processing
│   ├── earthquakes.ts  # USGS earthquake data
│   ├── wildfires.ts    # NASA FIRMS wildfire data
│   └── types.ts        # Shared TypeScript types
├── globe/              # Globe rendering logic
│   └── GlobeRenderer.ts # Three.js globe setup
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Visualization Details

### Earthquakes

- **Color Scale**: Green (micro) → Yellow (minor) → Orange (moderate) → Red (major)
- **Size**: Exponentially scaled by magnitude (M^1.5)
- **Data Points**: 7,000+ earthquakes from last 30 days
- **Tooltips**: Magnitude, depth, location, time, tsunami warnings

### Wildfires

- **Color Scale**: Gold (low FRP) → Orange → Red (extreme FRP)
- **Size**: Logarithmically scaled by Fire Radiative Power
- **Data Points**: Active fires detected in last 24 hours
- **Tooltips**: FRP, brightness, confidence, satellite, day/night detection

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance Notes

- Optimized for 60 FPS rendering
- Code splitting for Three.js, Globe.gl, React, and Mantine
- Lazy loading of dataset APIs
- Sample data fallback for offline demos

## Troubleshooting

### Globe not visible

- Check browser console for CORS errors
- Ensure HTTPS URLs are used for globe textures
- Verify WebGL is enabled in browser

### Wildfires showing sample data only

- Verify API key is configured correctly
- Check `.env` file exists with `VITE_NASA_FIRMS_API_KEY`
- Restart dev server after adding environment variables

### Data not loading

- Check internet connection
- Verify API endpoints are accessible
- Look for CORS errors in browser console
- Check if API services are operational

## License

MIT

## Educational Use

This project was built to demonstrate AI-assisted development capabilities at the ACTON STEM exhibit, showing how modern AI tools can accelerate complex 3D application development from weeks to hours.
