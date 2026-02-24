import { motion } from "framer-motion";
import { Globe, ShieldCheck, Handshake, ArrowRightLeft } from "lucide-react";

const points = [
  { icon: ArrowRightLeft, title: "Dual Map Integration", desc: "Google Maps for EU/Global markets, Gaode/Amap for China — automatic region detection." },
  { icon: ShieldCheck, title: "Local Compliance", desc: "Full regulatory compliance with Chinese healthcare data requirements and EU GDPR." },
  { icon: Handshake, title: "Partner Infrastructure", desc: "Localised partner network with Chinese dental clinic chains and manufacturer integrations." },
  { icon: Globe, title: "Scalable Cross-Border Model", desc: "Architecture designed for seamless EU–China operations with multi-currency and multi-language support." },
];

const ChinaSection = () => {
  return (
    <section id="china" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
              International Expansion
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Bridging Europe and China
            </h2>
            <div className="w-12 h-px bg-gradient-brand mb-8" />

            <div className="space-y-6">
              {points.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <p.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decorative map element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl border border-border bg-secondary/20 flex items-center justify-center relative overflow-hidden">
              {/* Abstract connection lines */}
              <svg viewBox="0 0 400 400" className="w-full h-full opacity-20" fill="none">
                <circle cx="120" cy="180" r="6" fill="hsl(175, 100%, 31%)" />
                <circle cx="280" cy="200" r="6" fill="hsl(175, 100%, 31%)" />
                <circle cx="200" cy="140" r="4" fill="hsl(181, 55%, 59%)" />
                <circle cx="160" cy="260" r="4" fill="hsl(181, 55%, 59%)" />
                <circle cx="300" cy="150" r="4" fill="hsl(181, 55%, 59%)" />
                <line x1="120" y1="180" x2="200" y2="140" stroke="hsl(175, 100%, 31%)" strokeWidth="1" />
                <line x1="200" y1="140" x2="280" y2="200" stroke="hsl(175, 100%, 31%)" strokeWidth="1" />
                <line x1="120" y1="180" x2="160" y2="260" stroke="hsl(181, 55%, 59%)" strokeWidth="0.5" />
                <line x1="280" y1="200" x2="300" y2="150" stroke="hsl(181, 55%, 59%)" strokeWidth="0.5" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-6xl font-bold text-gradient-brand">EU ↔ CN</p>
                  <p className="text-sm text-muted-foreground mt-2">Connected Infrastructure</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChinaSection;
