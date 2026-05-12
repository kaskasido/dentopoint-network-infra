import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

type State = "validating" | "valid" | "already" | "invalid" | "submitting" | "success" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("validating");

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
  const fnUrl = `${supabaseUrl}/functions/v1/handle-email-unsubscribe`;

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    (async () => {
      try {
        const res = await fetch(`${fnUrl}?token=${encodeURIComponent(token)}`, {
          headers: { apikey: supabaseAnonKey },
        });
        const data = await res.json();
        if (data.valid) setState("valid");
        else if (data.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch { setState("invalid"); }
    })();
  }, [token, fnUrl, supabaseAnonKey]);

  const confirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const res = await fetch(fnUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: supabaseAnonKey },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      setState(data.success || data.reason === "already_unsubscribed" ? "success" : "error");
    } catch { setState("error"); }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full border border-border rounded-2xl bg-card p-10 shadow-brand text-center">
          {state === "validating" && (
            <><Loader2 className="mx-auto mb-4 animate-spin text-accent" /><p className="text-muted-foreground">Wird geprüft …</p></>
          )}
          {state === "valid" && (
            <>
              <h1 className="font-display text-2xl font-bold mb-3">E-Mails abbestellen</h1>
              <p className="text-sm text-muted-foreground mb-6">Möchten Sie keine weiteren E-Mails von DentoPoint erhalten?</p>
              <Button onClick={confirm} className="bg-gradient-brand text-primary-foreground">Abbestellen bestätigen</Button>
            </>
          )}
          {state === "submitting" && (<><Loader2 className="mx-auto mb-4 animate-spin text-accent" /><p className="text-muted-foreground">Wird verarbeitet …</p></>)}
          {state === "success" && (
            <><CheckCircle2 className="mx-auto mb-4 text-accent" size={40} />
              <h1 className="font-display text-xl font-bold mb-2">Sie wurden abgemeldet</h1>
              <p className="text-sm text-muted-foreground mb-6">Sie erhalten ab sofort keine E-Mails mehr von uns.</p>
              <Link to="/" className="text-sm text-accent hover:underline">Zur Startseite</Link></>
          )}
          {state === "already" && (
            <><CheckCircle2 className="mx-auto mb-4 text-accent" size={40} />
              <h1 className="font-display text-xl font-bold mb-2">Bereits abgemeldet</h1>
              <p className="text-sm text-muted-foreground mb-6">Diese E-Mail-Adresse ist bereits aus unserem Verteiler entfernt.</p>
              <Link to="/" className="text-sm text-accent hover:underline">Zur Startseite</Link></>
          )}
          {(state === "invalid" || state === "error") && (
            <><XCircle className="mx-auto mb-4 text-destructive" size={40} />
              <h1 className="font-display text-xl font-bold mb-2">Link ungültig</h1>
              <p className="text-sm text-muted-foreground mb-6">Der Link ist ungültig oder abgelaufen. Bitte kontaktieren Sie info@dentopoint.care.</p>
              <Link to="/" className="text-sm text-accent hover:underline">Zur Startseite</Link></>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Unsubscribe;
