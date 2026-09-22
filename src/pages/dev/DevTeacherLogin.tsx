import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

/**
 * DEV-ONLY: /dev/teacher-login?email=...&password=...
 *
 * Signs in with the credentials from the URL and lands on the teacher
 * dashboard, so localhost testing needs no typing. The route is only
 * registered when import.meta.env.DEV is true (see App.tsx); it never ships
 * in a production build. Nothing is stored in the repo: the credentials live
 * in your bookmark.
 */
export default function DevTeacherLogin() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const email = params.get("email") ?? "";
    const password = params.get("password") ?? "";
    if (!email || !password) {
      setError("Add ?email=...&password=... to the URL.");
      return;
    }
    let cancelled = false;
    (async () => {
      await supabase.auth.signOut().catch(() => undefined);
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (cancelled) return;
      if (err) {
        setError(err.message);
        return;
      }
      navigate("/teacher-dashboard", { replace: true });
    })();
    return () => {
      cancelled = true;
    };
  }, [params, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-background text-sm text-muted-foreground">
      {error ? (
        <p className="text-destructive">Dev login failed: {error}</p>
      ) : (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Signing in as the dev teacher…
        </>
      )}
    </div>
  );
}
