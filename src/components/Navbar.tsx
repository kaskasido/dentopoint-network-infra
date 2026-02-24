import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/dentopoint-logo.png";

const navItems = [
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Locator", href: "#locator" },
  { label: "Patients", href: "#patients" },
  { label: "Partners", href: "#partners" },
  { label: "Manufacturers", href: "#manufacturers" },
  { label: "Analytics", href: "#analytics" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="DentoPoint" className="h-9 w-9" />
          <div className="leading-none">
            <span className="font-display font-bold text-lg tracking-tight text-foreground">
              Dento<span className="text-accent">Point</span>
            </span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gradient-brand text-primary-foreground px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact
          </a>
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
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border-b border-border/50"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block mt-4 bg-gradient-brand text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium text-center"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
