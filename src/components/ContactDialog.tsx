import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject?: string;
  title?: string;
  description?: string;
}

const EMAIL = "info@dentopoint.care";

const ContactDialog = ({ open, onOpenChange, subject = "Anfrage", title = "Kontakt aufnehmen", description = "Schreiben Sie uns direkt oder kopieren Sie die E-Mail-Adresse." }: ContactDialogProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast({ title: "E-Mail-Adresse kopiert", description: EMAIL });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Kopieren fehlgeschlagen", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 p-4 rounded-md border border-border bg-secondary/40">
          <Mail size={18} className="text-accent shrink-0" />
          <span className="font-mono text-sm text-foreground flex-1 truncate">{EMAIL}</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            aria-label="E-Mail-Adresse kopieren"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Kopiert" : "Kopieren"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button asChild className="flex-1 bg-gradient-brand text-primary-foreground hover:opacity-90">
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`}>
              <Mail size={16} className="mr-2" /> E-Mail schreiben
            </a>
          </Button>
          <Button variant="outline" onClick={handleCopy} className="flex-1">
            {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
            Adresse kopieren
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
