import { Box, Divider, Group, Paper, Stack, Text } from "@mantine/core"

import { ELEMENT_COLORS } from "../data/molecules"
import type { Molecule } from "../data/types"

interface MoleculeInfoProps {
  molecule: Molecule
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

export function MoleculeInfo({ molecule }: MoleculeInfoProps) {
  // Count atoms by element
  const elementCounts = molecule.atoms.reduce(
    (acc, atom) => {
      acc[atom.element] = (acc[atom.element] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const hasSimplified = molecule.atoms.some((atom) => atom.simplified)

  return (
    <Paper p="md" radius="md" withBorder style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
      <Stack gap="md">
        <div>
          <Text size="lg" fw={700} c="white">
            {molecule.name}
          </Text>
          <Text size="xs" c="dimmed" mt={4}>
            {hasSimplified ? `${molecule.formula} (${molecule.atomCount} atoms shown)` : molecule.formula}
          </Text>
        </div>

        <Divider />

        <div>
          <Text size="sm" fw={600} c="white" mb="xs">
            Composition
          </Text>
          <Stack gap="xs">
            {Object.entries(elementCounts)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([element, count]) => (
                <Group key={element} gap="sm">
                  <Box
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: ELEMENT_COLORS[element],
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      flexShrink: 0,
                    }}
                  />
                  <Text size="sm" c="white" style={{ fontFamily: "monospace", minWidth: 30 }}>
                    {element}
                  </Text>
                  <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                    {ELEMENT_NAMES[element] || element}
                  </Text>
                  <Text size="sm" c="white" fw={500}>
                    {count}
                  </Text>
                </Group>
              ))}
          </Stack>
        </div>

        {hasSimplified && (
          <>
            <Divider />
            <Box
              p="xs"
              style={{
                backgroundColor: "rgba(201, 184, 160, 0.1)",
                borderRadius: 4,
                border: "1px solid rgba(201, 184, 160, 0.3)",
              }}
            >
              <Text size="xs" c="yellow" fw={600} mb={4}>
                Simplified Representation
              </Text>
              <Text size="xs" c="dimmed">
                This molecule uses a simplified educational model to show its general structure. In reality, it contains
                many more atoms arranged in complex patterns.
              </Text>
            </Box>
          </>
        )}

        <Divider />

        <div>
          <Text size="xs" c="dimmed" style={{ lineHeight: 1.5 }}>
            {molecule.description}
          </Text>
        </div>
      </Stack>
    </Paper>
  )
}
