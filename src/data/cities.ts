import type { GlobePoint } from "./types"

// Top 50 most populous metropolitan areas in the world (2025 estimates)
// Metropolitan area / urban agglomeration populations (not city proper)
// Data source: Demographia World Urban Areas, 20th Edition (August 2025)
// Coordinates from GeoNames

interface CityData {
  name: string
  country: string
  population: number // in millions
  latitude: number
  longitude: number
}

const TOP_50_CITIES: CityData[] = [
  { name: "Guangzhou", country: "China", population: 72.7, latitude: 23.1291, longitude: 113.2644 },
  { name: "Shanghai", country: "China", population: 41.6, latitude: 31.2304, longitude: 121.4737 },
  { name: "Tokyo", country: "Japan", population: 41.2, latitude: 35.6762, longitude: 139.6503 },
  { name: "Delhi", country: "India", population: 35.7, latitude: 28.6139, longitude: 77.209 },
  { name: "Jakarta", country: "Indonesia", population: 29.5, latitude: -6.2088, longitude: 106.8456 },
  { name: "Manila", country: "Philippines", population: 27.8, latitude: 14.5995, longitude: 120.9842 },
  { name: "Mumbai", country: "India", population: 27.6, latitude: 19.076, longitude: 72.8777 },
  { name: "Mexico City", country: "Mexico", population: 25.4, latitude: 19.4326, longitude: -99.1332 },
  { name: "Seoul", country: "South Korea", population: 25.2, latitude: 37.5665, longitude: 126.978 },
  { name: "Dhaka", country: "Bangladesh", population: 23.1, latitude: 23.8103, longitude: 90.4125 },
  { name: "Cairo", country: "Egypt", population: 22.8, latitude: 30.0444, longitude: 31.2357 },
  { name: "São Paulo", country: "Brazil", population: 22.6, latitude: -23.5505, longitude: -46.6333 },
  { name: "Bangkok", country: "Thailand", population: 21.8, latitude: 13.7563, longitude: 100.5018 },
  { name: "New York", country: "United States", population: 21.8, latitude: 40.7128, longitude: -74.006 },
  { name: "Beijing", country: "China", population: 21.5, latitude: 39.9042, longitude: 116.4074 },
  { name: "Lagos", country: "Nigeria", population: 21.3, latitude: 6.5244, longitude: 3.3792 },
  { name: "Karachi", country: "Pakistan", population: 21.0, latitude: 24.8607, longitude: 67.0011 },
  { name: "Moscow", country: "Russia", population: 18.8, latitude: 55.7558, longitude: 37.6173 },
  { name: "Chengdu", country: "China", population: 18.1, latitude: 30.5728, longitude: 104.0668 },
  { name: "Kolkata", country: "India", population: 17.9, latitude: 22.5726, longitude: 88.3639 },
  { name: "Osaka", country: "Japan", population: 17.7, latitude: 34.6937, longitude: 135.5023 },
  { name: "Los Angeles", country: "United States", population: 17.1, latitude: 34.0522, longitude: -118.2437 },
  { name: "Buenos Aires", country: "Argentina", population: 16.7, latitude: -34.6037, longitude: -58.3816 },
  { name: "Tehran", country: "Iran", population: 16.2, latitude: 35.6892, longitude: 51.389 },
  { name: "Kinshasa", country: "DR Congo", population: 16.0, latitude: -4.4419, longitude: 15.2663 },
  { name: "Istanbul", country: "Turkey", population: 15.8, latitude: 41.0082, longitude: 28.9784 },
  { name: "London", country: "United Kingdom", population: 15.4, latitude: 51.5074, longitude: -0.1278 },
  { name: "Johannesburg", country: "South Africa", population: 15.2, latitude: -26.2041, longitude: 28.0473 },
  { name: "Bangalore", country: "India", population: 14.9, latitude: 12.9716, longitude: 77.5946 },
  { name: "Hangzhou", country: "China", population: 14.3, latitude: 30.2741, longitude: 120.1551 },
  { name: "Lahore", country: "Pakistan", population: 14.2, latitude: 31.5497, longitude: 74.3436 },
  { name: "Ho Chi Minh City", country: "Vietnam", population: 13.9, latitude: 10.8231, longitude: 106.6297 },
  { name: "Rio de Janeiro", country: "Brazil", population: 13.8, latitude: -22.9068, longitude: -43.1729 },
  { name: "Xi'an", country: "China", population: 13.7, latitude: 34.3416, longitude: 108.9398 },
  { name: "Chennai", country: "India", population: 13.4, latitude: 13.0827, longitude: 80.2707 },
  { name: "Chongqing", country: "China", population: 13.3, latitude: 29.4316, longitude: 106.9123 },
  { name: "Wuhan", country: "China", population: 13.0, latitude: 30.5928, longitude: 114.3055 },
  { name: "Lima", country: "Peru", population: 12.9, latitude: -12.0464, longitude: -77.0428 },
  { name: "Hyderabad", country: "India", population: 12.8, latitude: 17.385, longitude: 78.4867 },
  { name: "Tianjin", country: "China", population: 12.6, latitude: 39.3434, longitude: 117.3616 },
  { name: "Changsha", country: "China", population: 12.5, latitude: 28.2282, longitude: 112.9388 },
  { name: "Paris", country: "France", population: 12.4, latitude: 48.8566, longitude: 2.3522 },
  { name: "Rhine-Ruhr", country: "Germany", population: 11.9, latitude: 51.4556, longitude: 7.0116 },
  { name: "Bogotá", country: "Colombia", population: 11.7, latitude: 4.711, longitude: -74.0721 },
  { name: "Nagoya", country: "Japan", population: 11.4, latitude: 35.1815, longitude: 136.9066 },
  { name: "Zhengzhou", country: "China", population: 11.3, latitude: 34.7466, longitude: 113.6253 },
  { name: "Taipei", country: "Taiwan", population: 11.2, latitude: 25.033, longitude: 121.5654 },
  { name: "Ahmedabad", country: "India", population: 11.1, latitude: 23.0225, longitude: 72.5714 },
  { name: "Luanda", country: "Angola", population: 11.0, latitude: -8.8383, longitude: 13.2344 },
  { name: "Chicago", country: "United States", population: 10.9, latitude: 41.8781, longitude: -87.6298 },
]

/**
 * Gets color based on city population
 * Heat map gradient: blue (small) → green → yellow → orange → red (large)
 */
function getPopulationColor(population: number): string {
  if (population >= 50) return "#d32f2f" // Red - Megaregion (50M+)
  if (population >= 35) return "#ff6f00" // Dark orange - Mega-megacity (35-50M)
  if (population >= 25) return "#ffa726" // Orange - Megacity (25-35M)
  if (population >= 20) return "#ffeb3b" // Yellow - Large megacity (20-25M)
  if (population >= 15) return "#aed581" // Light green - Megacity (15-20M)
  if (population >= 12) return "#66bb6a" // Green - Large city (12-15M)
  return "#42a5f5" // Blue - Major city (<12M)
}

/**
 * Gets size based on city population
 * Logarithmic scaling for better visual distribution
 */
function getPopulationSize(population: number): number {
  // Scale logarithmically: log10(population) * multiplier
  // Range: ~0.03 for 11M to ~0.055 for 72M
  return Math.log10(population) * 0.03
}

/**
 * Creates a label for the city point
 */
function createCityLabel(city: CityData): string {
  return `
    <div class="tooltip-title">${city.name}, ${city.country}</div>
    <div class="tooltip-content">
      <strong>Population:</strong> ${city.population.toFixed(1)}M<br/>
      <strong>Country:</strong> ${city.country}<br/>
      <strong>Rank:</strong> ${TOP_50_CITIES.findIndex((c) => c.name === city.name) + 1} of 50
    </div>
  `
}

/**
 * Converts city data to globe points
 */
export function convertCitiesToPoints(): GlobePoint[] {
  return TOP_50_CITIES.map((city) => ({
    lat: city.latitude,
    lng: city.longitude,
    size: getPopulationSize(city.population),
    color: getPopulationColor(city.population),
    label: createCityLabel(city),
    data: city,
  }))
}

/**
 * Gets statistics about the cities dataset
 */
export function getCityStats() {
  const populations = TOP_50_CITIES.map((c) => c.population)

  return {
    total: TOP_50_CITIES.length,
    maxPopulation: Math.max(...populations),
    minPopulation: Math.min(...populations),
    avgPopulation: populations.reduce((a, b) => a + b, 0) / populations.length,
    totalPopulation: populations.reduce((a, b) => a + b, 0),
  }
}
