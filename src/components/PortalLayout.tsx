import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, type LucideIcon, LayoutGrid, Factory, Building2, TrendingUp, Handshake, Shield } from "lucide-react";
import logo from "@/assets/dentopoint-logo.png";

const portalLinks = [
  { label: "Hersteller", href: "/portal/manufacturer", icon: Factory },
  { label: "Klinik", href: "/portal/clinic", icon: Building2 },
  { label: "Investor", href: "/portal/investor", icon: TrendingUp },
  { label: "Partner", href: "/portal/partner", icon: Handshake },
  { label: "Admin", href: "/portal/admin", icon: Shield },
];

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface PortalLayoutProps {
  title: string;
  navItems: NavItem[];
  children: ReactNode;
  accentColor?: string;
}

const PortalLayout = ({ title, navItems, children }: PortalLayoutProps) => {
  const { user, role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = role === "admin";

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar-background border-r border-sidebar-border flex flex-col shrink-0">
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="DentoPoint" className="h-8 w-8" />
            <span className="font-display font-bold text-sm tracking-tight text-sidebar-foreground">
              Dento<span className="text-accent">Point</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground mt-2 font-medium">{title}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {isAdmin && (
          <div className="px-4 pb-4">
            <div className="border-t border-sidebar-border pt-4">
              <div className="flex items-center gap-2 px-3 mb-2">
                <LayoutGrid size={14} className="text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Portale</span>
              </div>
              {portalLinks.map((p) => {
                const isPortalActive = location.pathname.startsWith(p.href);
                return (
                  <Link
                    key={p.href}
                    to={p.href}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors ${
                      isPortalActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    }`}
                  >
                    <p.icon size={14} />
                    {p.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground truncate mb-2">{user?.email}</p>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PortalLayout;
