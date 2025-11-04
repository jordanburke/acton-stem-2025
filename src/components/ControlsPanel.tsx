import { Button, Paper, Select, Slider, Stack, Text, Title } from "@mantine/core"

interface ControlsPanelProps {
  dataset: string
  rotationSpeed: number
  onDatasetChange: (value: string | null) => void
  onRotationSpeedChange: (value: number) => void
  onLoadData?: () => void
  loading: boolean
}

export function ControlsPanel({
  dataset,
  rotationSpeed,
  onDatasetChange,
  onRotationSpeedChange,
  onLoadData,
  loading,
}: ControlsPanelProps) {
  return (
    <Paper
      p="xl"
      radius="md"
      withBorder
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        minWidth: 320,
        backgroundColor: "rgba(10, 14, 39, 0.95)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
      }}
    >
      <Stack gap="lg">
        <Title order={3} c="cyan.4">
          Globe Controls
        </Title>

        <Select
          label="Dataset"
          value={dataset}
          onChange={onDatasetChange}
          data={[
            { value: "sample", label: "Sample Data" },
            { value: "earthquakes", label: "Earthquakes (Last 30 Days)" },
          ]}
          comboboxProps={{ withinPortal: true, zIndex: 2000 }}
          styles={{
            input: {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
            },
            label: {
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: 8,
            },
            dropdown: {
              backgroundColor: "rgba(10, 14, 39, 0.95)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            },
            option: {
              color: "white",
              "&[data-combobox-selected]": {
                backgroundColor: "rgba(77, 171, 247, 0.3)",
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            },
          }}
        />

        <div>
          <Text size="sm" c="dimmed" mb="xs">
            Rotation Speed: {rotationSpeed.toFixed(1)}
          </Text>
          <Slider
            value={rotationSpeed}
            onChange={onRotationSpeedChange}
            min={0}
            max={2}
            step={0.1}
            marks={[
              { value: 0, label: "0" },
              { value: 1, label: "1" },
              { value: 2, label: "2" },
            ]}
            styles={{
              markLabel: { color: "rgba(255, 255, 255, 0.6)" },
            }}
          />
        </div>

        {onLoadData && (
          <Button
            onClick={onLoadData}
            loading={loading}
            variant="gradient"
            gradient={{ from: "violet", to: "grape", deg: 135 }}
            fullWidth
          >
            {loading ? "Loading..." : "Refresh Data"}
          </Button>
        )}
      </Stack>
    </Paper>
  )
}
