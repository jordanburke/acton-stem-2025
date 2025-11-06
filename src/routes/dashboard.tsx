import { Container, Paper, Stack, Text, Title } from "@mantine/core"
import { createFileRoute } from "@tanstack/react-router"

function DashboardDemo() {
  return (
    <Container size="xl" py="xl" style={{ height: "100%", overflow: "auto" }}>
      <Stack gap="lg">
        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="md">
            Financial Dashboard
          </Title>
          <Text c="dimmed">Dashboard implementation coming soon...</Text>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Text size="sm" c="dimmed">
            This route is a placeholder for the financial dashboard demo.
          </Text>
        </Paper>
      </Stack>
    </Container>
  )
}

export const Route = createFileRoute("/dashboard")({
  component: DashboardDemo,
})
