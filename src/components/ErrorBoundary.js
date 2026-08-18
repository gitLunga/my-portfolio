import React from "react";

/**
 * Catches render errors so one broken route shows a recoverable message
 * instead of unmounting the whole app to a blank page. Every reveal wrapper
 * in this codebase starts its children at opacity 0, so an uncaught error
 * would leave a visitor staring at an empty screen with no indication why.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // No telemetry endpoint here; the console is the only sink available.
    console.error("Route render failed:", error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="route-error" role="alert">
        <h1 className="route-error-title">Something went wrong</h1>
        <p className="route-error-body">
          This section failed to load. The rest of the site still works.
        </p>
        <button
          type="button"
          className="route-error-btn"
          onClick={() => this.setState({ error: null })}
        >
          Try again
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
