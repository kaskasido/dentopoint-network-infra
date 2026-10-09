import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/dentopoint-logo.png";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { usePageSeo } from "@/lib/seo";

const ResetPassword = () => {
  usePageSeo("login", undefined, { noindex: true });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check for recovery session in URL hash
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) setError(error.message);
    else setDone(true);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-3 justify-center mb-10">
          <img src={logo} alt="DentoPoint" className="h-10 w-10" />
          <span className="font-display font-bold text-2xl tracking-tight text-foreground">
            Dento<span className="text-accent">Point</span>
          </span>
        </Link>

        <div className="bg-card border border-border rounded-xl p-8 shadow-brand-lg">
          {done ? (
            <div className="text-center">
              <CheckCircle size={48} className="text-accent mx-auto mb-4" />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Passwort geändert</h2>
              <p className="text-sm text-muted-foreground mb-4">Ihr Passwort wurde erfolgreich aktualisiert.</p>
              <Link to="/portal/manufacturer" className="text-sm text-accent hover:underline">Zum Portal →</Link>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Neues Passwort setzen</h2>
              <p className="text-sm text-muted-foreground mb-6">Geben Sie Ihr neues Passwort ein.</p>
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label htmlFor="password" className="text-sm font-medium text-foreground mb-1.5 block">Neues Passwort</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className="w-full pl-10 pr-10 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <button type="submit" disabled={loading} className="w-full bg-gradient-brand text-primary-foreground py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
                  {loading ? "Wird gespeichert..." : "Passwort speichern"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
