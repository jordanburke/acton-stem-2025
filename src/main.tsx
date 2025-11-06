import "@mantine/core/styles.layer.css"

import { createTheme, MantineProvider } from "@mantine/core"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { ErrorBoundary } from "./components/ErrorBoundary"
// Import the generated route tree
import { routeTree } from "./routeTree.gen"

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const theme = createTheme({
  /** Your theme configuration */
  primaryColor: "cyan",
  defaultRadius: "md",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
})

const root = createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <ErrorBoundary>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <RouterProvider router={router} />
      </MantineProvider>
    </ErrorBoundary>
  </StrictMode>,
)
