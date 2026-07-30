import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: React.ReactNode;
}
interface State {
  error: Error | null;
}

/**
 * Catches render/runtime errors from anywhere in its subtree and shows a
 * fallback instead of letting a single broken component blank the whole app.
 * Must be a class component - React only exposes error lifecycles here.
 *
 * Wrapped around the routes (keyed by pathname), so navigating to another
 * page remounts it and clears the error automatically.
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Surface the crash in the console for debugging.
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-border bg-card p-6 text-center">
            <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-destructive" />
            <h1 className="font-display text-xl font-extrabold mb-1">Something went wrong</h1>
            <p className="text-sm text-muted-foreground mb-4">
              This page hit an unexpected error. You can try again or head back to your dashboard.
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => this.setState({ error: null })}>
                Try again
              </Button>
              <Button onClick={() => { window.location.href = "/dashboard"; }}>
                Go to dashboard
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
