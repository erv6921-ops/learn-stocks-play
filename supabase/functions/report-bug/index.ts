import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// In-app bug reporter: takes a report from the client and files it as a GitHub
// issue on the app repo, labeled "bug-report". The GitHub token lives in the
// GITHUB_PAT function secret and never touches the client.

const REPO = "erv6921-ops/learn-stocks-play";

// Callable from the production app (and local dev). We reflect the request
// Origin when it's on the allow-list so credentialed fetches work.
const ALLOWED_ORIGINS = [
  "https://investiplay.app",
  "https://www.investiplay.app",
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:5173",
];

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : "https://investiplay.app";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

const json = (body: unknown, status: number, origin: string | null) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });

interface ReportBody {
  title?: unknown;
  description?: unknown;
  route?: unknown;
  userAgent?: unknown;
}

serve(async (req) => {
  const origin = req.headers.get("Origin");

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(origin) });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);

  try {
    const pat = Deno.env.get("GITHUB_PAT");
    if (!pat) return json({ error: "GITHUB_PAT is not configured" }, 500, origin);

    let parsed: ReportBody;
    try {
      parsed = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400, origin);
    }

    const title = typeof parsed.title === "string" ? parsed.title.trim() : "";
    const description = typeof parsed.description === "string" ? parsed.description.trim() : "";
    const route = typeof parsed.route === "string" ? parsed.route : "unknown";
    const userAgent = typeof parsed.userAgent === "string" ? parsed.userAgent : "unknown";

    if (!title) return json({ error: "title is required" }, 400, origin);

    const timestamp = new Date().toISOString();
    const issueBody = [
      "## 🐛 Bug report",
      "",
      description || "_No description provided._",
      "",
      "---",
      `**Route:** \`${route}\``,
      `**User agent:** \`${userAgent}\``,
      `**Reported at:** ${timestamp}`,
      "",
      "_Filed automatically via the in-app bug reporter._",
    ].join("\n");

    const ghRes = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${pat}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "investiplay-report-bug",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body: issueBody, labels: ["bug-report"] }),
    });

    if (!ghRes.ok) {
      const detail = await ghRes.text();
      console.error("[report-bug] GitHub API error", ghRes.status, detail);
      return json({ error: "Failed to create GitHub issue", status: ghRes.status, detail }, 502, origin);
    }

    const issue = await ghRes.json();
    return json({ number: issue.number, url: issue.html_url }, 201, origin);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[report-bug] Error:", message);
    return json({ error: message }, 500, origin);
  }
});
