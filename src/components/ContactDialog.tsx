import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle2, Mail, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject?: string;
  title?: string;
  description?: string;
  defaultRole?: string;
}

const EMAIL = "info@dentopoint.care";

const schema = z.object({
  name: z.string().trim().min(2, "Bitte Namen angeben").max(120),
  email: z.string().trim().email("Bitte gültige E-Mail angeben").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  role: z.string().max(60).optional().or(z.literal("")),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Bitte kurze Nachricht angeben (min. 10 Zeichen)").max(2000),
});

const ContactDialog = ({
  open, onOpenChange,
  subject = "Anfrage über die Website",
  title = "Kontakt aufnehmen",
  description = "Schreiben Sie uns kurz – wir melden uns innerhalb von 1–2 Werktagen.",
  defaultRole = "",
}: ContactDialogProps) => {
  const [form, setForm] = useState({ name: "", email: "", company: "", role: defaultRole, phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const reset = () => {
    setForm({ name: "", email: "", company: "", role: defaultRole, phone: "", message: "" });
    setErrors({});
    setSuccess(false);
  };

  const handleClose = (o: boolean) => {
    if (!o) setTimeout(reset, 200);
    onOpenChange(o);
  };

  const submit = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const idempotencyKey = `contact-${crypto.randomUUID()}`;
      // 1) Notify admin
      const adminRes = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-inquiry-admin",
          idempotencyKey: `${idempotencyKey}-admin`,
          templateData: parsed.data,
        },
      });
      if (adminRes.error) throw adminRes.error;
      // 2) Confirm to sender
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-inquiry-confirmation",
          recipientEmail: parsed.data.email,
          idempotencyKey: `${idempotencyKey}-confirm`,
          templateData: { name: parsed.data.name, message: parsed.data.message },
        },
      });
      setSuccess(true);
    } catch (err) {
      console.error("Contact send failed", err);
      toast({
        title: "Versand fehlgeschlagen",
        description: "Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@dentopoint.care.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast({ title: "E-Mail-Adresse kopiert", description: EMAIL });
    } catch {
      toast({ title: "Kopieren fehlgeschlagen", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {success ? (
          <div className="text-center py-6">
            <CheckCircle2 className="mx-auto mb-4 text-accent" size={48} />
            <DialogTitle className="font-display text-xl mb-2">Vielen Dank!</DialogTitle>
            <p className="text-sm text-muted-foreground mb-6">
              Ihre Anfrage wurde an unser Team gesendet. Eine Bestätigung erhalten Sie in Kürze per E-Mail.
            </p>
            <Button onClick={() => handleClose(false)} className="bg-gradient-brand text-primary-foreground">Schließen</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 mt-2">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name *" error={errors.name}>
                  <Input value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={120} />
                </Field>
                <Field label="E-Mail *" error={errors.email}>
                  <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Firma / Klinik" error={errors.company}>
                  <Input value={form.company} onChange={(e) => update("company", e.target.value)} maxLength={200} />
                </Field>
                <Field label="Rolle" error={errors.role}>
                  <Select value={form.role} onValueChange={(v) => update("role", v)}>
                    <SelectTrigger><SelectValue placeholder="Bitte wählen" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Klinik">Klinik</SelectItem>
                      <SelectItem value="Hersteller">Hersteller</SelectItem>
                      <SelectItem value="Investor">Investor</SelectItem>
                      <SelectItem value="Partner">Partner</SelectItem>
                      <SelectItem value="Sonstiges">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Telefon (optional)" error={errors.phone}>
                <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={60} />
              </Field>
              <Field label="Nachricht *" error={errors.message}>
                <Textarea rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={2000} />
              </Field>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <button type="button" onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Copy size={12} /> {EMAIL} kopieren
                </button>
                <Button onClick={submit} disabled={submitting} className="bg-gradient-brand text-primary-foreground hover:opacity-90">
                  {submitting ? <><Loader2 size={16} className="mr-2 animate-spin" /> Wird gesendet …</> : <><Mail size={16} className="mr-2" /> Anfrage senden</>}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-foreground">{label}</Label>
    {children}
    {error ? <p className="text-xs text-destructive">{error}</p> : null}
  </div>
);

export default ContactDialog;
