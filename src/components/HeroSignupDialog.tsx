import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, ArrowRight, CheckCircle, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface HeroSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  portalLabel: string;
  portalIcon: LucideIcon;
  intendedRole: string;
}

const HeroSignupDialog = ({
  open,
  onOpenChange,
  portalLabel,
  portalIcon: Icon,
  intendedRole,
}: HeroSignupDialogProps) => {
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) {
      setError("Bitte bestätigen Sie, dass Sie eine juristische Person vertreten.");
      return;
    }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
        data: { intended_role: intendedRole },
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setEmail("");
      setConfirmed(false);
      setError("");
      setSent(false);
    }
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
          <DialogDescription>
            Melden Sie sich mit Ihrer geschäftlichen E-Mail an, um Zugang zum Portal zu erhalten.
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="text-center py-4">
            <CheckCircle size={48} className="text-accent mx-auto mb-4" />
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              E-Mail gesendet
            </h3>
            <p className="text-sm text-muted-foreground">
              Wir haben einen Magic Link an <strong>{email}</strong> gesendet. Klicken Sie auf den Link, um sich anzumelden.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label htmlFor="signup-email" className="text-sm font-medium text-foreground mb-1.5 block">
                Geschäftliche E-Mail
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@firma.de"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => { setConfirmed(e.target.checked); setError(""); }}
                className="mt-0.5 h-4 w-4 rounded border-input text-accent focus:ring-ring"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-snug">
                <Building2 size={14} className="inline mr-1 -mt-0.5" />
                Ich bestätige, dass ich im Namen einer <strong>juristischen Person (Firma)</strong> handle.
              </span>
            </label>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-brand text-primary-foreground py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Wird gesendet..." : "Magic Link senden"}
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HeroSignupDialog;
