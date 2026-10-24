import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/dentopoint-logo.png";
import { useLanguage, SUPPORTED_LANGUAGES } from "@/i18n/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContactDialog from "@/components/ContactDialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  // Welches Formular der Kontakt öffnet: Vorführung für ein Hotel oder sonstige Anfrage
  const [anfrage, setAnfrage] = useState<"demo" | "sonstige">("demo");
  const oeffne = (art: "demo" | "sonstige") => { setAnfrage(art); setContactOpen(true); };
  const { lang, setLang, t } = useLanguage();
  // Seiten neben dem Netzwerk-Menü: Standorte und Hersteller
  const seiten = [
    { label: t.netzwerk.nav.station, href: "/care-station" },
    { label: t.netzwerk.nav.produkte, href: "/manufacturers" },
  ];
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navSections = [
    {
      // Das Versorgungsnetzwerk (Aufbau über Hotels); die Seite für Zahnarztpraxen ist bis zur rechtlichen Klärung nicht verlinkt
      label: t.netzwerk.nav.label,
      items: [
        { label: t.netzwerk.nav.hotels, href: "/#hotels" },
        { label: t.netzwerk.nav.how, href: "/#netzwerk" },
        { label: t.netzwerk.nav.range, href: "/#sortiment" },
        { label: t.netzwerk.nav.status, href: "/#status" },
        { label: t.netzwerk.nav.faq, href: "/#faq" },
      ],
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="DentoPoint" width={44} height={44} className="h-11 w-11" />
          <div className="leading-none">
            <span className="font-display font-bold text-lg tracking-tight text-foreground">
              Dento<span className="text-accent">Point</span>
            </span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-7">
          {navSections.map((section) => (
            <DropdownMenu key={section.label}>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
                {section.label} <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-popover min-w-[200px]">
                {section.items.map((sub) => (
                  <DropdownMenuItem key={sub.href} asChild>
                    <Link to={sub.href} className="cursor-pointer">
                      {sub.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

          {seiten.map((sp) => (
            <Link key={sp.href} to={sp.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {sp.label}
            </Link>
          ))}
          <button type="button" onClick={() => oeffne("sonstige")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            {t.netzwerk.nav.sonstige}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
              <Globe size={16} />
              {lang}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              {SUPPORTED_LANGUAGES.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={lang === l.code ? "font-semibold text-primary" : ""}
                >
                  <span className="mr-2 font-medium">{l.code}</span>
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <>
              {role === "admin" && (
                <Link
                  to="/portal/admin"
                  className="text-sm font-semibold px-3 py-1.5 rounded-md border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
                  {user.user_metadata?.display_name || user.email?.split("@")[0] || "Account"}
                  <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover min-w-[160px]">
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut size={16} className="mr-2" />
                    {t.nav.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t.nav.login}
            </Link>
          )}
          <button
            onClick={() => oeffne("demo")}
            className="bg-gradient-brand text-primary-foreground px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t.netzwerk.nav.demo}
          </button>
        </div>

        <ContactDialog
          key={anfrage}
          open={contactOpen}
          onOpenChange={setContactOpen}
          subject={anfrage === "demo" ? t.netzwerk.hotels.contactSubject : t.netzwerk.sonstigeSubject}
          title={anfrage === "demo" ? t.netzwerk.nav.demo : t.netzwerk.nav.sonstige}
          description={anfrage === "demo" ? t.netzwerk.hotels.ctaNote : t.netzwerk.sonstigeDesc}
          defaultRole={anfrage === "demo" ? "Hotel" : "Sonstiges"}
        />

        {/* Mobile toggle */}
        <button
          className="xl:hidden text-foreground"
          aria-label="Menü"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="xl:hidden bg-background border-b border-border px-6 pb-6">
          {navSections.map((section) => (
            <div key={section.label} className="py-3 border-b border-border/50">
              <p className="text-sm font-semibold text-foreground mb-1">{section.label}</p>
              {section.items.map((sub) => (
                <Link
                  key={sub.href}
                  to={sub.href}
                  className="block py-2 pl-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
          {seiten.map((sp) => (
            <Link key={sp.href} to={sp.href} onClick={() => setIsOpen(false)} className="block py-3 text-sm font-semibold text-foreground border-b border-border/50 hover:text-primary">
              {sp.label}
            </Link>
          ))}
          <button type="button" onClick={() => { setIsOpen(false); oeffne("sonstige"); }} className="block w-full text-left py-3 text-sm font-semibold text-foreground border-b border-border/50 hover:text-primary">
            {t.netzwerk.nav.sonstige}
          </button>
          {user && role === "admin" && (
            <Link
              to="/portal/admin"
              onClick={() => setIsOpen(false)}
              className="block w-full mt-3 text-center px-5 py-2.5 rounded-md border border-primary/30 text-primary text-sm font-semibold"
            >
              Admin Dashboard
            </Link>
          )}
          {!user && (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full mt-3 text-center px-5 py-2.5 rounded-md border border-border text-sm font-medium text-muted-foreground"
            >
              {t.nav.login}
            </Link>
          )}
          <button
            className="block w-full mt-4 bg-gradient-brand text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium text-center"
            onClick={() => { setIsOpen(false); oeffne("demo"); }}
          >
            {t.netzwerk.nav.demo}
          </button>
          <div className="flex gap-2 mt-4">
            {SUPPORTED_LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1.5 rounded border text-xs font-medium transition-colors ${
                  lang === l.code
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-primary"
                }`}
              >
                {l.code}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
