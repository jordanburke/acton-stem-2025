import { LoadingOverlay } from "@mantine/core"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import { AutoCycleControls } from "../components/AutoCycleControls"
import { Globe } from "../components/Globe"
import { MoleculeViewer } from "../components/MoleculeViewer"
import { convertEarthquakesToPoints, type EarthquakeData, fetchEarthquakeData } from "../data/earthquakes"
import { molecules } from "../data/molecules"
import { convertMountainsToPoints } from "../data/mountains"
import type { GlobePoint, Molecule } from "../data/types"
import { convertWildfiresToPoints, fetchWildfireData, type WildfireData } from "../data/wildfires"
import { getCurrentGlobeDataset, getCurrentMoleculeId, useAutoCycle } from "../hooks/useAutoCycle"

interface CachedGlobeData {
  earthquakes: EarthquakeData | null
  wildfires: WildfireData | null
}

function AutoCycleDemo() {
  const controls = useAutoCycle(10000) // 10 seconds default duration
  const { state } = controls

  // State for globe data
  const [globePoints, setGlobePoints] = useState<GlobePoint[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [cachedData, setCachedData] = useState<CachedGlobeData>({
    earthquakes: null,
    wildfires: null,
  })

  // State for molecule data
  const [currentMolecule, setCurrentMolecule] = useState<Molecule>(molecules[0])

  // Prefetch async globe data on mount
  useEffect(() => {
    const prefetchData = async (): Promise<void> => {
      setLoading(true)
      try {
        const [earthquakeData, wildfireData] = await Promise.all([fetchEarthquakeData(), fetchWildfireData()])

        setCachedData({
          earthquakes: earthquakeData,
          wildfires: wildfireData,
        })
      } catch (error) {
        console.error("Failed to prefetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    prefetchData()
  }, [])

  // Update globe points when dataset changes
  useEffect(() => {
    if (state.currentPhase === "globe") {
      const dataset = getCurrentGlobeDataset(state.globeIndex)

      if (dataset === "mountains") {
        const points = convertMountainsToPoints()
        setGlobePoints(points)
      } else if (dataset === "earthquakes" && cachedData.earthquakes) {
        const points = convertEarthquakesToPoints(cachedData.earthquakes)
        setGlobePoints(points)
      } else if (dataset === "wildfires" && cachedData.wildfires) {
        const points = convertWildfiresToPoints(cachedData.wildfires)
        setGlobePoints(points)
      }
    }
  }, [state.currentPhase, state.globeIndex, cachedData])

  // Update molecule when molecule index changes
  useEffect(() => {
    if (state.currentPhase === "molecule") {
      const moleculeId = getCurrentMoleculeId(state.moleculeIndex)
      const molecule = molecules.find((m) => m.id === moleculeId) || molecules[0]
      setCurrentMolecule(molecule)
    }
  }, [state.currentPhase, state.moleculeIndex])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      // Space = play/pause
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault()
        if (state.isRunning) {
          controls.pause()
        } else {
          controls.play()
        }
      }
      // Arrow left = previous
      else if (e.code === "ArrowLeft") {
        e.preventDefault()
        controls.skipBackward()
      }
      // Arrow right = next
      else if (e.code === "ArrowRight") {
        e.preventDefault()
        controls.skipForward()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [state.isRunning, controls])

  return (
    <div
      style={{ width: "100%", height: "100%", position: "relative" }}
      role="main"
      aria-label="Auto-cycle visualization"
    >
      <LoadingOverlay visible={loading} overlayProps={{ radius: "sm", blur: 2 }} />

      {state.currentPhase === "globe" ? (
        <Globe points={globePoints} rotationSpeed={0.5} />
      ) : (
        <div style={{ width: "100%", height: "100%", background: "#000000" }}>
          <MoleculeViewer molecule={currentMolecule} autoRotate={true} />
        </div>
      )}

      <AutoCycleControls controls={controls} />
    </div>
  )
}

export const Route = createFileRoute("/auto-cycle")({
  component: AutoCycleDemo,
})
