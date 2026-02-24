import { motion } from "framer-motion";
import { Droplets, CircleDot, Sparkles, HeartPulse, Shield } from "lucide-react";

const categories = [
  { icon: Droplets, name: "Hygiene", desc: "Professional oral hygiene products for daily and clinical use." },
  { icon: CircleDot, name: "Implant Care", desc: "Specialised aftercare solutions for dental implant maintenance." },
  { icon: Sparkles, name: "Whitening", desc: "Clinical-grade whitening systems with structured protocols." },
  { icon: HeartPulse, name: "Therapeutic Care", desc: "Targeted therapeutic products for post-treatment recovery." },
  { icon: Shield, name: "Preventive Programs", desc: "Long-term preventive care kits and subscription programs." },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
            Product Ecosystem
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Structured Care Categories
          </h2>
          <div className="w-12 h-px bg-gradient-brand" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group border border-border rounded-lg p-6 bg-card hover:shadow-brand hover:border-accent/30 transition-all duration-300 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-gradient-brand transition-all duration-300">
                <cat.icon size={18} className="text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-sm text-foreground mb-2">{cat.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
