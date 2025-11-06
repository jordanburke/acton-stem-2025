import { AppShell, Group, Tabs, Title } from "@mantine/core"
import { createRootRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

function RootComponent() {
  const navigate = useNavigate()
  const location = useLocation()

  // Determine active tab from pathname
  const activeTab = location.pathname === "/" ? "globe" : location.pathname.slice(1)

  const handleTabChange = (value: string | null) => {
    if (value) {
      navigate({ to: value === "globe" ? "/" : `/${value}` })
    }
  }

  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={3}>DiscoverSTEM 2025 - Agentic AI Exhibit</Title>

          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tabs.List>
              <Tabs.Tab value="globe">3D Globe</Tabs.Tab>
              <Tabs.Tab value="molecules">Molecules</Tabs.Tab>
              <Tabs.Tab value="auto-cycle">Auto-Cycle</Tabs.Tab>
              <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Group>
      </AppShell.Header>

      <AppShell.Main style={{ height: "calc(100vh - 60px)", overflow: "hidden" }}>
        <Outlet />
      </AppShell.Main>

      <TanStackRouterDevtools />
    </AppShell>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
