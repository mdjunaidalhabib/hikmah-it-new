import { Component } from "react";
import { RefreshCcw, Home } from "lucide-react";
import Button from "./Button";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled UI error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-[70vh] place-items-center bg-[#edf4ff] px-6 py-16 text-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Something went wrong</h1>
            <p className="mt-3 max-w-md text-slate-600">
              An unexpected error occurred while loading this page. Please try
              refreshing or go back to the homepage.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button type="button" onClick={() => window.location.reload()}>
                <RefreshCcw size={16} /> Refresh Page
              </Button>
              <Button href="/" variant="ghost-dark">
                <Home size={16} /> Back to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
