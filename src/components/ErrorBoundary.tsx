import { Alert, Button, Container, Stack, Text, Title } from "@mantine/core"
import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
    window.location.href = "/"
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container size="md" style={{ marginTop: "2rem" }}>
          <Stack gap="lg">
            <Title order={1}>Something went wrong</Title>
            <Alert color="red" title="Error">
              <Text size="sm">{this.state.error?.message || "An unexpected error occurred"}</Text>
            </Alert>
            <Text c="dimmed">
              The application encountered an error. You can try refreshing the page or returning to the home page.
            </Text>
            <Button onClick={this.handleReset} variant="filled" color="cyan">
              Return to Home
            </Button>
          </Stack>
        </Container>
      )
    }

    return this.props.children
  }
}
