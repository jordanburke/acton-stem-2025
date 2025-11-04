import { useEffect, useRef } from "react"

import type { GlobePoint } from "../data/types"
import { GlobeRenderer } from "../globe/GlobeRenderer"

interface GlobeProps {
  points: GlobePoint[]
  rotationSpeed: number
}

export function Globe({ points, rotationSpeed }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<GlobeRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    try {
      globeRef.current = new GlobeRenderer("globe-container")
    } catch (error) {
      console.error("Failed to initialize globe:", error)
    }

    return () => {
      globeRef.current?.destroy()
      globeRef.current = null
    }
  }, [])

  useEffect(() => {
    if (globeRef.current && points.length > 0) {
      globeRef.current.setPoints(points)
    }
  }, [points])

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.setRotationSpeed(rotationSpeed)
    }
  }, [rotationSpeed])

  return (
    <div
      id="globe-container"
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  )
}
