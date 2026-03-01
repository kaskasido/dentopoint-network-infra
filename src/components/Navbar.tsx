import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, Mail, MapPin, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/dentopoint-logo.png";
import { useLanguage, Language } from "@/i18n/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const languages: { code: Language; label: string }[] = [
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
  { code: "NL", label: "Nederlands" },
  { code: "FR", label: "Français" },
  { code: "IT", label: "Italiano" },
  { code: "ES", label: "Español" },
  { code: "TR", label: "Türkçe" },
  { code: "SR", label: "Srpski" },
  { code: "CN", label: "中文" },
  { code: "KO", label: "한국어" },
  { code: "AR", label: "العربية" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navSections = [
    {
      label: t.nav.clinics,
      items: [
        { label: t.nav.clinicsItems.overview, href: "/clinics" },
        { label: t.nav.clinicsItems.revenue, href: "/clinics#revenue" },
        { label: t.nav.clinicsItems.implementation, href: "/clinics#implementation" },
        { label: t.nav.clinicsItems.workflow, href: "/clinics#workflow" },
        { label: t.nav.clinicsItems.compliance, href: "/clinics#compliance" },
        { label: t.nav.clinicsItems.portal, href: "/login" },
      ],
    },
    {
      label: t.nav.manufacturers,
      items: [
        { label: t.nav.manufacturersItems.overview, href: "/manufacturers" },
        { label: t.nav.manufacturersItems.integration, href: "/manufacturers#integration" },
        { label: t.nav.manufacturersItems.data, href: "/manufacturers#data" },
        { label: t.nav.manufacturersItems.performance, href: "/manufacturers#performance" },
        { label: t.nav.manufacturersItems.distribution, href: "/manufacturers#distribution" },
        { label: t.nav.manufacturersItems.portal, href: "/login" },
      ],
    },
    {
      label: t.nav.investors,
      items: [
        { label: t.nav.investorsItems.overview, href: "/investors" },
        { label: t.nav.investorsItems.market, href: "/investors#markt" },
        { label: t.nav.investorsItems.scaling, href: "/investors#skalierung" },
        { label: t.nav.investorsItems.kpis, href: "/investors#kpis" },
        { label: t.nav.investorsItems.expansion, href: "/investors#expansion" },
        { label: t.nav.investorsItems.portal, href: "/login" },
      ],
    },
    {
      label: t.nav.strategicPartners,
      items: [
        { label: t.nav.partnersItems.tech, href: "/partners#technology" },
        { label: t.nav.partnersItems.healthcare, href: "/partners#healthcare" },
        { label: t.nav.partnersItems.academic, href: "/partners#academic" },
        { label: t.nav.partnersItems.industry, href: "/partners#industry" },
        { label: t.nav.partnersItems.global, href: "/partners#global" },
        { label: t.nav.partnersItems.portal, href: "/login" },
      ],
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="DentoPoint" className="h-11 w-11" />
          <div className="leading-none">
            <span className="font-display font-bold text-lg tracking-tight text-foreground">
              Dento<span className="text-accent">Point</span>
            </span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
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

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
              <Globe size={16} />
              {lang}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              {languages.map((l) => (
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
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t.nav.login}
            </Link>
          )}
          <button
            onClick={() => setContactOpen(true)}
            className="bg-gradient-brand text-primary-foreground px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t.nav.contact}
          </button>
        </div>

        <Dialog open={contactOpen} onOpenChange={setContactOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">{t.nav.contactTitle}</DialogTitle>
              <DialogDescription>{t.nav.contactDesc}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.nav.email}</p>
                  <a href="mailto:info@dentopoint.care" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    info@dentopoint.care
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.nav.address}</p>
                  <p className="text-sm text-muted-foreground">
                    DentoPoint GmbH<br />
                    Germany
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b border-border px-6 pb-6">
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
          <button
            className="block w-full mt-4 bg-gradient-brand text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium text-center"
            onClick={() => { setIsOpen(false); setContactOpen(true); }}
          >
            {t.nav.contact}
          </button>
          <div className="flex gap-2 mt-4">
            {languages.map((l) => (
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
