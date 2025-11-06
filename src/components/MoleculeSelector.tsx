import { Badge, Group, Paper, Select, Stack, Switch, Text } from "@mantine/core"

import type { Molecule } from "../data/types"

interface MoleculeSelectorProps {
  molecules: Molecule[]
  selectedMolecule: Molecule
  onSelectMolecule: (moleculeId: string) => void
  autoRotate: boolean
  onToggleAutoRotate: (value: boolean) => void
}

export function MoleculeSelector({
  molecules,
  selectedMolecule,
  onSelectMolecule,
  autoRotate,
  onToggleAutoRotate,
}: MoleculeSelectorProps) {
  const selectData = molecules.map((mol) => ({
    value: mol.id,
    label: mol.name,
  }))

  return (
    <Paper p="md" radius="md" withBorder style={{ minWidth: 300, maxWidth: 400 }}>
      <Stack gap="md">
        <Text size="lg" fw={700}>
          Molecule Viewer
        </Text>

        <Select
          label="Select Molecule"
          placeholder="Choose a molecule"
          data={selectData}
          value={selectedMolecule.id}
          onChange={(value) => value && onSelectMolecule(value)}
        />

        <Switch
          label="Auto-rotate"
          checked={autoRotate}
          onChange={(event) => onToggleAutoRotate(event.currentTarget.checked)}
        />

        <Paper p="sm" withBorder>
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" fw={600}>
                {selectedMolecule.name}
              </Text>
              <Badge size="sm" variant="light">
                {selectedMolecule.category}
              </Badge>
            </Group>

            <Text size="sm" c="dimmed">
              {selectedMolecule.description}
            </Text>

            <Group gap="lg" mt="xs">
              <div>
                <Text size="xs" c="dimmed">
                  Formula
                </Text>
                <Text size="sm" fw={500}>
                  {selectedMolecule.formula}
                </Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">
                  Atoms
                </Text>
                <Text size="sm" fw={500}>
                  {selectedMolecule.atomCount}
                </Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">
                  Bonds
                </Text>
                <Text size="sm" fw={500}>
                  {selectedMolecule.bondCount}
                </Text>
              </div>
            </Group>
          </Stack>
        </Paper>

        <Paper p="sm" style={{ backgroundColor: "rgba(0, 100, 200, 0.1)" }}>
          <Stack gap="xs">
            <Text size="xs" fw={600}>
              Controls
            </Text>
            <Text size="xs" c="dimmed">
              • Click and drag to rotate
            </Text>
            <Text size="xs" c="dimmed">
              • Scroll to zoom in/out
            </Text>
            <Text size="xs" c="dimmed">
              • Right-click drag to pan
            </Text>
          </Stack>
        </Paper>
      </Stack>
    </Paper>
  )
}
