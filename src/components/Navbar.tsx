import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import logo from "@/assets/dentopoint-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavDropdownItem {
  label: string;
  href: string;
}

interface NavSection {
  label: string;
  items: NavDropdownItem[];
}

const navSections: NavSection[] = [
  {
    label: "Clinics",
    items: [
      { label: "Overview", href: "/clinics" },
      { label: "Revenue Streams", href: "/clinics#revenue" },
      { label: "Implementation", href: "/clinics#implementation" },
      { label: "Clinic Workflow", href: "/clinics#workflow" },
      { label: "Compliance", href: "/clinics#compliance" },
      { label: "Clinic Portal", href: "/login" },
    ],
  },
  {
    label: "Manufacturers",
    items: [
      { label: "Overview", href: "/manufacturers" },
      { label: "System Integration", href: "/manufacturers#integration" },
      { label: "Data & Standards", href: "/manufacturers#data" },
      { label: "Performance Metrics", href: "/manufacturers#performance" },
      { label: "Distribution", href: "/manufacturers#distribution" },
      { label: "Manufacturer Portal", href: "/login" },
    ],
  },
  {
    label: "Investors",
    items: [
      { label: "Overview", href: "/investors" },
      { label: "Market Opportunity", href: "/investors#markt" },
      { label: "Scaling Roadmap", href: "/investors#skalierung" },
      { label: "KPIs", href: "/investors#kpis" },
      { label: "Expansion Pipeline", href: "/investors#expansion" },
      { label: "Investor Portal", href: "/portal/investor" },
    ],
  },
  {
    label: "Strategic Partners",
    items: [
      { label: "Technology Partners", href: "#tech-partners" },
      { label: "Healthcare Networks", href: "#healthcare-networks" },
      { label: "Academic Partners", href: "#academic-partners" },
      { label: "Industry Alliances", href: "#industry-alliances" },
      { label: "Global Expansion", href: "#global-expansion" },
      { label: "Partner Portal", href: "/login" },
    ],
  },
];

const languages = [
  { code: "DE", label: "Deutsch" },
  { code: "EN", label: "English" },
  { code: "TR", label: "Türkçe" },
  { code: "CN", label: "中文" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="DentoPoint" className="h-9 w-9" />
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

          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/#contact"
            className="bg-gradient-brand text-primary-foreground px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact
          </Link>
        </div>

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
          <Link
            to="/#contact"
            className="block mt-4 bg-gradient-brand text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium text-center"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
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
