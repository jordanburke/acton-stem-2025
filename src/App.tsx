import { LoadingOverlay } from "@mantine/core"
import { useEffect, useState } from "react"

import { ControlsPanel } from "./components/ControlsPanel"
import { Globe } from "./components/Globe"
import { InfoPanel } from "./components/InfoPanel"
import { convertEarthquakesToPoints, fetchEarthquakeData, getEarthquakeStats } from "./data/earthquakes"
import type { GlobePoint } from "./data/types"

const SAMPLE_DATA: GlobePoint[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    size: 0.05,
    color: "#ff6b6b",
    label: "New York City",
    data: { city: "New York" },
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    size: 0.05,
    color: "#4ecdc4",
    label: "London",
    data: { city: "London" },
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    size: 0.05,
    color: "#45b7d1",
    label: "Tokyo",
    data: { city: "Tokyo" },
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    size: 0.05,
    color: "#96ceb4",
    label: "Sydney",
    data: { city: "Sydney" },
  },
  {
    lat: 37.7749,
    lng: -122.4194,
    size: 0.05,
    color: "#ffeaa7",
    label: "San Francisco",
    data: { city: "San Francisco" },
  },
]

export function App() {
  const [dataset, setDataset] = useState<string>("sample")
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.5)
  const [points, setPoints] = useState<GlobePoint[]>(SAMPLE_DATA)
  const [loading, setLoading] = useState<boolean>(false)
  const [stats, setStats] = useState<{
    total: number
    maxMagnitude?: number
    avgMagnitude?: number
  }>({ total: SAMPLE_DATA.length })

  const handleLoadData = async () => {
    if (dataset === "sample") {
      setPoints(SAMPLE_DATA)
      setStats({ total: SAMPLE_DATA.length })
    } else if (dataset === "earthquakes") {
      setLoading(true)
      try {
        const earthquakeData = await fetchEarthquakeData()
        const earthquakePoints = convertEarthquakesToPoints(earthquakeData)
        const earthquakeStats = getEarthquakeStats(earthquakeData)

        setPoints(earthquakePoints)
        setStats({
          total: earthquakeStats.total,
          maxMagnitude: earthquakeStats.maxMagnitude,
          avgMagnitude: earthquakeStats.avgMagnitude,
        })
      } catch (error) {
        console.error("Failed to load earthquake data:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDatasetChange = (value: string | null) => {
    if (value) {
      setDataset(value)
    }
  }

  // Auto-load data when dataset changes
  useEffect(() => {
    handleLoadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset])

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <LoadingOverlay visible={loading} overlayProps={{ radius: "sm", blur: 2 }} />

      <Globe points={points} rotationSpeed={rotationSpeed} />

      <ControlsPanel
        dataset={dataset}
        rotationSpeed={rotationSpeed}
        onDatasetChange={handleDatasetChange}
        onRotationSpeedChange={setRotationSpeed}
        onLoadData={handleLoadData}
        loading={loading}
      />

      <InfoPanel
        totalPoints={stats.total}
        dataset={dataset}
        maxMagnitude={stats.maxMagnitude}
        avgMagnitude={stats.avgMagnitude}
      />
    </div>
  )
}
