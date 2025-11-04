import "@mantine/core/styles.layer.css"

import { createTheme, MantineProvider } from "@mantine/core"
import { StrictMode } from "react"
import React from "react"
import { createRoot } from "react-dom/client"

import { App } from "./App"

const theme = createTheme({
  /** Your theme configuration */
  primaryColor: "cyan",
  defaultRadius: "md",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
})

const root = createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>,
)
