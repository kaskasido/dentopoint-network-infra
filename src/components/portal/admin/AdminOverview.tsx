import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Users, Building, Cpu, ArrowRight, ShoppingCart, Wrench, Coins, AlertTriangle } from "lucide-react";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    automats: 0, automatsActive: 0, automatsMaint: 0, automatsOffline: 0,
    profiles: 0, orgs: 0, orders: 0, alerts: 0, maintenance: 0, commissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [a, p, o, ord, al, m, c] = await Promise.all([
        supabase.from("automats").select("status"),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("organizations").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("alerts").select("id", { count: "exact", head: true }).eq("acknowledged", false),
        supabase.from("maintenance_logs").select("id", { count: "exact", head: true }),
        supabase.from("commissions").select("id", { count: "exact", head: true }),
      ]);
      const automatRows = a.data ?? [];
      setStats({
        automats: automatRows.length,
        automatsActive: automatRows.filter((r: any) => r.status === "active").length,
        automatsMaint: automatRows.filter((r: any) => r.status === "maintenance").length,
        automatsOffline: automatRows.filter((r: any) => r.status === "offline").length,
        profiles: p.count ?? 0,
        orgs: o.count ?? 0,
        orders: ord.count ?? 0,
        alerts: al.count ?? 0,
        maintenance: m.count ?? 0,
        commissions: c.count ?? 0,
      });
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: "Nutzer", value: stats.profiles, icon: Users, href: "/portal/admin/users" },
    { label: "Organisationen", value: stats.orgs, icon: Building, href: "/portal/admin/users" },
    { label: "Automaten", value: stats.automats, icon: Cpu, href: "/portal/admin/automats" },
    { label: "Offene Alerts", value: stats.alerts, icon: AlertTriangle, href: "/portal/admin/logs" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8">Plattformweite Übersicht in Echtzeit.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((s) => (
          <Link key={s.label} to={s.href} className="border border-border rounded-lg p-5 bg-card hover:border-accent/40 transition-colors">
            <s.icon size={20} className="text-accent mb-3" />
            <p className="font-display text-2xl font-bold text-foreground">{loading ? "…" : s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="border border-border rounded-lg p-5 bg-card mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Cpu size={20} className="text-accent" />
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Automaten</h2>
              <p className="text-xs text-muted-foreground">Hinzufügen, bearbeiten und löschen</p>
            </div>
          </div>
          <Link to="/portal/admin/automats" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            Verwalten <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-md bg-muted/40 p-3"><p className="text-xs text-muted-foreground">Gesamt</p><p className="font-display text-xl font-bold text-foreground">{stats.automats}</p></div>
          <div className="rounded-md bg-accent/10 p-3"><p className="text-xs text-muted-foreground">Aktiv</p><p className="font-display text-xl font-bold text-accent">{stats.automatsActive}</p></div>
          <div className="rounded-md bg-yellow-500/10 p-3"><p className="text-xs text-muted-foreground">Wartung</p><p className="font-display text-xl font-bold text-yellow-500">{stats.automatsMaint}</p></div>
          <div className="rounded-md bg-destructive/10 p-3"><p className="text-xs text-muted-foreground">Offline</p><p className="font-display text-xl font-bold text-destructive">{stats.automatsOffline}</p></div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Bestellungen", value: stats.orders, icon: ShoppingCart, href: "/portal/admin/orders" },
          { label: "Wartungen", value: stats.maintenance, icon: Wrench, href: "/portal/admin/maintenance" },
          { label: "Provisionen", value: stats.commissions, icon: Coins, href: "/portal/admin/commissions" },
        ].map((s) => (
          <Link key={s.label} to={s.href} className="border border-border rounded-lg p-5 bg-card hover:border-accent/40 transition-colors">
            <s.icon size={18} className="text-accent mb-2" />
            <p className="font-display text-xl font-bold text-foreground">{loading ? "…" : s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
