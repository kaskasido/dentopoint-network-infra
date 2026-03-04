import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/dentopoint-logo.png";
import { Mail, ArrowRight, CheckCircle, Lock, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

type AuthMode = "magic" | "password-login" | "password-signup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<AuthMode>("password-login");
  const { t } = useLanguage();
  const p = t.loginPage;
  const le = t.loginExtended;
  const navigate = useNavigate();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (mode === "password-signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: window.location.origin, data: { intended_role: "manufacturer" } },
      });
      setLoading(false);
      if (error) setError(error.message);
      else setSent(true);
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message);
      } else if (data.session) {
        const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", data.session.user.id).limit(1).single();
        const userRole = roleData?.role || "manufacturer";
        navigate(`/portal/${userRole}`);
      }
    }
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
          {sent ? (
            <div className="text-center">
              <CheckCircle size={48} className="text-accent mx-auto mb-4" />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                {mode === "password-signup" ? le.registrationSuccess : p.checkEmail}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mode === "password-signup"
                  ? <>{le.confirmEmail} <strong>{email}</strong>.</>
                  : <>{p.magicLinkSent} <strong>{email}</strong>. {p.clickToSignIn}</>
                }
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                {mode === "password-signup" ? le.createAccount : p.signInTitle}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {mode === "magic" ? p.signInDesc : le.portalAccess}
              </p>

              <div className="flex rounded-md border border-border mb-6 text-xs font-medium overflow-hidden">
                <button type="button" onClick={() => { setMode("password-login"); setError(""); }}
                  className={`flex-1 py-2 transition-colors ${mode === "password-login" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                  {le.login}
                </button>
                <button type="button" onClick={() => { setMode("password-signup"); setError(""); }}
                  className={`flex-1 py-2 transition-colors ${mode === "password-signup" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                  {le.register}
                </button>
                <button type="button" onClick={() => { setMode("magic"); setError(""); }}
                  className={`flex-1 py-2 transition-colors ${mode === "magic" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                  Magic Link
                </button>
              </div>

              <form onSubmit={mode === "magic" ? handleMagicLink : handlePasswordAuth} className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">{p.emailLabel}</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={p.emailPlaceholder} required className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>

                {mode !== "magic" && (
                  <div>
                    <label htmlFor="password" className="text-sm font-medium text-foreground mb-1.5 block">{le.password}</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6}
                        className="w-full pl-10 pr-10 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

                {error && <p className="text-sm text-destructive">{error}</p>}

                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-brand text-primary-foreground py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
                  {loading ? p.sending : mode === "magic" ? p.sendMagicLink : mode === "password-signup" ? le.createAccount : le.signIn}
                  <ArrowRight size={16} />
                </button>

                {mode === "password-login" && (
                  <button type="button" onClick={async () => {
                    if (!email) { setError(le.enterEmailFirst); return; }
                    setLoading(true); setError("");
                    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
                    setLoading(false);
                    if (error) setError(error.message);
                    else setSent(true);
                  }} className="w-full text-xs text-muted-foreground hover:text-accent transition-colors mt-1">
                    {le.forgotPassword}
                  </button>
                )}
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link to="/" className="hover:text-primary transition-colors">{p.backToPlatform}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
