import { Box, Group, Paper, Stack, Text } from "@mantine/core"

import { ELEMENT_COLORS } from "../data/molecules"

interface AtomLegendProps {
  variant?: "full" | "compact"
}

const ELEMENT_NAMES: Record<string, string> = {
  H: "Hydrogen",
  C: "Carbon",
  N: "Nitrogen",
  O: "Oxygen",
  S: "Sulfur",
  P: "Phosphorus",
  Fe: "Iron",
  Zn: "Zinc",
}

export function AtomLegend({ variant = "full" }: AtomLegendProps) {
  const elements = Object.keys(ELEMENT_COLORS)

  if (variant === "compact") {
    return (
      <Paper
        p="xs"
        radius="md"
        withBorder
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          maxWidth: 240,
        }}
      >
        <Stack gap="xs">
          <Text size="xs" fw={600} c="white">
            Atom Colors (CPK)
          </Text>
          {elements.map((symbol) => (
            <Group key={symbol} gap="xs">
              <Box
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: ELEMENT_COLORS[symbol],
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  flexShrink: 0,
                }}
              />
              <Text size="xs" c="white" style={{ fontFamily: "monospace" }}>
                {symbol}
              </Text>
              <Text size="xs" c="dimmed">
                {ELEMENT_NAMES[symbol] || symbol}
              </Text>
            </Group>
          ))}
        </Stack>
      </Paper>
    )
  }

  return (
    <Paper p="sm" radius="md" withBorder>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          Atom Colors (CPK Convention)
        </Text>
        <Stack gap="xs">
          {elements.map((symbol) => (
            <Group key={symbol} gap="sm">
              <Box
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: ELEMENT_COLORS[symbol],
                  border: "2px solid rgba(0, 0, 0, 0.2)",
                  flexShrink: 0,
                }}
              />
              <Text size="sm" fw={500} style={{ fontFamily: "monospace", minWidth: 30 }}>
                {symbol}
              </Text>
              <Text size="sm" c="dimmed">
                {ELEMENT_NAMES[symbol] || symbol}
              </Text>
            </Group>
          ))}
        </Stack>
      </Stack>
    </Paper>
  )
}
