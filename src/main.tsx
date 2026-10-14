import React, { Component, type ErrorInfo, type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  override state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Smart Living failed to render", error, info.componentStack);
  }

  override render() {
    if (this.state.error) {
      return (
        <main className="min-h-screen bg-background p-8 text-foreground">
          <h1 className="text-xl font-semibold">This page didn’t load</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong. Please refresh and try again.
          </p>
        </main>
      );
    }
    return this.props.children;
  }
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("The app root element was not found.");
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>,
);
