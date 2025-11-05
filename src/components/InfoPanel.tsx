import { Group, Paper, Stack, Text, Title } from "@mantine/core"

interface InfoPanelProps {
  totalPoints: number
  dataset: string
  maxMagnitude?: number
  avgMagnitude?: number
}

export function InfoPanel({ totalPoints, dataset, maxMagnitude, avgMagnitude }: InfoPanelProps) {
  const datasetLabels: Record<string, string> = {
    mountains: "Mountains (Over 1000m)",
    earthquakes: "Earthquakes (Last 30 Days)",
    wildfires: "Wildfires (Last 24 Hours)",
  }

  const datasetLabel = datasetLabels[dataset] || dataset

  const maxLabel =
    dataset === "wildfires" ? "Max FRP (MW)" : dataset === "mountains" ? "Highest Peak (m)" : "Max Magnitude"
  const avgLabel =
    dataset === "wildfires" ? "Avg FRP (MW)" : dataset === "mountains" ? "Avg Elevation (m)" : "Avg Magnitude"

  return (
    <Paper
      p="xl"
      radius="md"
      withBorder
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        minWidth: 350,
        backgroundColor: "rgba(10, 14, 39, 0.95)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
      }}
    >
      <Stack gap="md">
        <Title order={4} c="cyan.4">
          Statistics
        </Title>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Total Points:
          </Text>
          <Text size="sm" fw={600}>
            {totalPoints}
          </Text>
        </Group>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Dataset:
          </Text>
          <Text size="sm" fw={600}>
            {datasetLabel}
          </Text>
        </Group>

        {maxMagnitude !== undefined && (
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              {maxLabel}:
            </Text>
            <Text size="sm" fw={600}>
              {maxMagnitude.toFixed(1)}
            </Text>
          </Group>
        )}

        {avgMagnitude !== undefined && (
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              {avgLabel}:
            </Text>
            <Text size="sm" fw={600}>
              {avgMagnitude.toFixed(1)}
            </Text>
          </Group>
        )}
      </Stack>
    </Paper>
  )
}
