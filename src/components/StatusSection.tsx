import { motion } from "framer-motion";
import { CheckCircle2, Clock, Hammer } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

type State = "available" | "inProgress" | "planned";

const StatusSection = () => {
  const { t } = useLanguage();
  const s = t.status;

  const badge: Record<State, { label: string; className: string; Icon: typeof CheckCircle2 }> = {
    available: { label: s.availableLabel, className: "bg-accent/10 text-accent", Icon: CheckCircle2 },
    inProgress: { label: s.inProgressLabel, className: "bg-primary/10 text-primary", Icon: Hammer },
    planned: { label: s.plannedLabel, className: "bg-secondary text-muted-foreground", Icon: Clock },
  };

  return (
    <section id="status" className="py-24 md:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{s.label}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{s.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">{s.intro}</p>
          <div className="w-12 h-px bg-gradient-brand" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.items.map((item, i) => {
            const b = badge[(item.state as State) ?? "planned"];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border border-border rounded-lg p-6 bg-card"
              >
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium mb-4 ${b.className}`}>
                  <b.Icon size={14} />
                  {b.label}
                </span>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatusSection;
