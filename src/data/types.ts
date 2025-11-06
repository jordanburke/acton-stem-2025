export interface EarthquakeProperties {
  mag: number
  place: string
  time: number
  updated: number
  tz: number | null
  url: string
  detail: string
  felt: number | null
  cdi: number | null
  mmi: number | null
  alert: string | null
  status: string
  tsunami: number
  sig: number
  net: string
  code: string
  ids: string
  sources: string
  types: string
  nst: number | null
  dmin: number | null
  rms: number
  gap: number | null
  magType: string
  type: string
  title: string
}

export interface EarthquakeGeometry {
  type: "Point"
  coordinates: [number, number, number] // [longitude, latitude, depth]
}

export interface EarthquakeFeature {
  type: "Feature"
  properties: EarthquakeProperties
  geometry: EarthquakeGeometry
  id: string
}

export interface EarthquakeData {
  type: "FeatureCollection"
  metadata: {
    generated: number
    url: string
    title: string
    status: number
    api: string
    count: number
  }
  features: EarthquakeFeature[]
}

export interface GlobePoint {
  lat: number
  lng: number
  size: number
  color: string
  label: string
  data: unknown
}

// Molecule Viewer Types
export interface Atom {
  id: number
  element: string // Chemical symbol (H, C, N, O, etc.)
  position: [number, number, number] // 3D coordinates [x, y, z]
  color: string // Hex color for rendering
  radius: number // Van der Waals radius
  simplified?: boolean // If true, atom represents simplified/educational model (not exact composition)
}

export interface Bond {
  atom1: number // Atom ID
  atom2: number // Atom ID
  order: number // 1=single, 2=double, 3=triple
}

export interface Molecule {
  id: string
  name: string
  description: string
  formula: string // Chemical formula (e.g., "H2O")
  atomCount: number
  bondCount: number
  atoms: Atom[]
  bonds: Bond[]
  category: "protein" | "dna" | "small-molecule" | "complex"
}
