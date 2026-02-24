import { motion } from "framer-motion";
import { Cpu, CreditCard, Factory, BarChart3, Network } from "lucide-react";
import smartCareModule from "@/assets/smart-care-module.png";

const features = [
  {
    icon: Cpu,
    title: "Smart Care Modules",
    description: "Intelligent in-clinic dispensing systems with real-time monitoring and automated replenishment.",
  },
  {
    icon: CreditCard,
    title: "Digital Payment Integration",
    description: "Seamless cashless transactions with multi-currency support across European and Asian markets.",
  },
  {
    icon: Factory,
    title: "Manufacturer Ecosystem",
    description: "Direct integration between certified dental manufacturers and the care network infrastructure.",
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    description: "Real-time insights on aftercare engagement, product performance and network utilisation.",
  },
  {
    icon: Network,
    title: "Scalable Network Model",
    description: "Modular architecture designed for rapid deployment across clinics, regions and international markets.",
  },
];

const InfrastructureSection = () => {
  return (
    <section id="infrastructure" className="py-24 md:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
            Infrastructure
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            The Infrastructure Behind Modern Dental Aftercare
          </h2>
          <div className="w-12 h-px bg-gradient-brand" />
        </motion.div>

        {/* Smart Care Module showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div className="flex justify-center">
            <div className="relative max-w-sm">
              <img
                src={smartCareModule}
                alt="DentoPoint Smart Care Module – in-clinic therapeutic dispensing system"
                className="rounded-xl shadow-brand-lg"
                loading="lazy"
              />
              <div className="absolute -bottom-3 -right-3 bg-gradient-brand text-primary-foreground text-xs font-medium px-4 py-2 rounded-md">
                Smart Care Module
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              The Smart Care Module
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our precision-engineered in-clinic units connect patients with curated aftercare products — powered by digital membership, QR integration, and contactless payment. Each module is personalised to the clinic and its manufacturer partners.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Contactless Payment", "QR Membership", "Clinic-Branded", "Real-Time Analytics"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-lg p-8 hover:shadow-brand transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-6 group-hover:bg-gradient-brand group-hover:text-primary-foreground transition-all duration-300">
                <feature.icon size={22} className="text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
