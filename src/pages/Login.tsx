import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import logo from "@/assets/dentopoint-logo.png";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const p = t.loginPage;

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
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
              <h2 className="font-display text-xl font-bold text-foreground mb-2">{p.checkEmail}</h2>
              <p className="text-sm text-muted-foreground">
                {p.magicLinkSent} <strong>{email}</strong>. {p.clickToSignIn}
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">{p.signInTitle}</h2>
              <p className="text-sm text-muted-foreground mb-8">{p.signInDesc}</p>

              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">{p.emailLabel}</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={p.emailPlaceholder} required className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-brand text-primary-foreground py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
                  {loading ? p.sending : p.sendMagicLink}
                  <ArrowRight size={16} />
                </button>
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
