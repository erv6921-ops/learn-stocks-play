// Lightweight, in-memory console/error capture. Keeps a rolling buffer of the
// last few errors and warnings from the CURRENT session so the in-app bug
// reporter can attach them to a report. Nothing is persisted - we only care
// about errors from the session where the bug happened.

export interface CapturedError {
  timestamp: string; // ISO
  level: "error" | "warn";
  message: string;
  stack?: string;
}

const MAX_ENTRIES = 10;
const buffer: CapturedError[] = [];
let installed = false;

function push(level: CapturedError["level"], message: string, stack?: string) {
  buffer.push({ timestamp: new Date().toISOString(), level, message, stack });
  if (buffer.length > MAX_ENTRIES) buffer.splice(0, buffer.length - MAX_ENTRIES);
}

// Turn arbitrary console arguments into a readable single-line-ish string, and
// surface a stack trace if any argument is an Error.
function serializeArgs(args: unknown[]): { message: string; stack?: string } {
  let stack: string | undefined;
  const parts = args.map((arg) => {
    if (arg instanceof Error) {
      if (!stack && arg.stack) stack = arg.stack;
      return arg.message ? `${arg.name}: ${arg.message}` : String(arg);
    }
    if (typeof arg === "string") return arg;
    try {
      return JSON.stringify(arg);
    } catch {
      return String(arg);
    }
  });
  return { message: parts.join(" ").slice(0, 2000), stack };
}

// Idempotent: safe to call more than once (HMR / React StrictMode double-invoke).
export function installErrorLog(): void {
  if (installed || typeof window === "undefined") return;
  installed = true;

  // Uncaught runtime errors.
  window.addEventListener("error", (event: ErrorEvent) => {
    const message = event.message || "Uncaught error";
    push("error", message, event.error instanceof Error ? event.error.stack : undefined);
  });

  // Unhandled promise rejections.
  window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    if (reason instanceof Error) {
      push("error", `Unhandled rejection: ${reason.message}`, reason.stack);
    } else {
      let text: string;
      try {
        text = typeof reason === "string" ? reason : JSON.stringify(reason);
      } catch {
        text = String(reason);
      }
      push("error", `Unhandled rejection: ${text}`.slice(0, 2000));
    }
  });

  // Intercept console.error / console.warn while preserving normal behavior.
  const originalError = console.error.bind(console);
  const originalWarn = console.warn.bind(console);

  console.error = (...args: unknown[]) => {
    const { message, stack } = serializeArgs(args);
    push("error", message, stack);
    originalError(...args);
  };
  console.warn = (...args: unknown[]) => {
    const { message, stack } = serializeArgs(args);
    push("warn", message, stack);
    originalWarn(...args);
  };
}

// Returns a copy of the current rolling buffer (oldest first).
export function getRecentErrors(): CapturedError[] {
  return buffer.slice();
}
