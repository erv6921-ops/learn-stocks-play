import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Translation } from "react-i18next";

interface Props {
  children: React.ReactNode;
  /**
   * What to render if the subtree throws. Defaults to the full-page fallback
   * card. Pass `null` for non-essential widgets (overlays, mascots) so a crash
   * there quietly disappears instead of blanking the whole app.
   */
  fallback?: React.ReactNode;
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
      if (this.props.fallback !== undefined) return this.props.fallback;
      // Render-prop form of useTranslation: hooks can't run in a class component.
      return (
        <Translation>{(t) => (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-border bg-card p-6 text-center">
            <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-destructive" />
            <h1 className="font-display text-xl font-extrabold mb-1">{t("errors.boundary.title")}</h1>
            <p className="text-sm text-muted-foreground mb-4">
              {t("errors.boundary.body")}
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => this.setState({ error: null })}>
                {t("errors.boundary.tryAgain")}
              </Button>
              <Button onClick={() => { window.location.href = "/dashboard"; }}>
                {t("errors.boundary.goToDashboard")}
              </Button>
            </div>
          </div>
        </div>
        )}</Translation>
      );
    }
    return this.props.children;
  }
}
