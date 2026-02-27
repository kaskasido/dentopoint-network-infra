import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, ArrowRight, CheckCircle, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";

interface HeroSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  portalLabel: string;
  portalIcon: LucideIcon;
  intendedRole: string;
}

const HeroSignupDialog = ({ open, onOpenChange, portalLabel, portalIcon: Icon, intendedRole }: HeroSignupDialogProps) => {
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const p = t.heroSignup;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) { setError(p.confirmError); return; }
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin, data: { intended_role: intendedRole } } });
    setLoading(false);
    if (error) { setError(error.message); } else { setSent(true); }
  };

  const handleClose = (open: boolean) => {
    if (!open) { setEmail(""); setConfirmed(false); setError(""); setSent(false); }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Icon size={22} className="text-accent" />
            {portalLabel}
          </DialogTitle>
          <DialogDescription>{p.dialogDesc}</DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="text-center py-4">
            <CheckCircle size={48} className="text-accent mx-auto mb-4" />
            <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.emailSent}</h3>
            <p className="text-sm text-muted-foreground">
              {p.magicLinkSentTo} <strong>{email}</strong>. {p.clickToSignIn}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label htmlFor="signup-email" className="text-sm font-medium text-foreground mb-1.5 block">{p.businessEmail}</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={p.placeholder} required className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={confirmed} onChange={(e) => { setConfirmed(e.target.checked); setError(""); }} className="mt-0.5 h-4 w-4 rounded border-input text-accent focus:ring-ring" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-snug">
                <Building2 size={14} className="inline mr-1 -mt-0.5" />
                {p.confirmCheckbox}
              </span>
            </label>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-brand text-primary-foreground py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? p.sending : p.sendMagicLink}
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HeroSignupDialog;
