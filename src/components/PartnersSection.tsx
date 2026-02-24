import { motion } from "framer-motion";
import { Building, Network, TrendingUp, BarChart, Globe } from "lucide-react";

const partnerTypes = [
  {
    title: "Dental Clinics",
    desc: "Integrate smart care modules directly into your practice and unlock new aftercare revenue streams.",
    icon: Building,
  },
  {
    title: "Networks",
    desc: "Scale DentoPoint infrastructure across multi-location dental networks with centralised management.",
    icon: Network,
  },
  {
    title: "Investors",
    desc: "Invest in scalable healthcare infrastructure with transparent performance analytics and growth metrics.",
    icon: TrendingUp,
  },
  {
    title: "Strategic Partners",
    desc: "Join the ecosystem as a technology, distribution, or compliance partner to expand the care network.",
    icon: Globe,
  },
];

const benefits = [
  "Infrastructure Integration",
  "Revenue Participation",
  "Network Scaling",
  "Analytics Access",
  "China Expansion",
];

const PartnersSection = () => {
  return (
    <section id="partners" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
            For Partners
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Join the Care Network
          </h2>
          <div className="w-12 h-px bg-gradient-brand" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {partnerTypes.map((partner, i) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300"
            >
              <partner.icon size={24} className="text-accent mb-4" />
              <h3 className="font-display font-semibold text-lg text-foreground mb-3">{partner.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{partner.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          {benefits.map((b) => (
            <span
              key={b}
              className="px-5 py-2.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium border border-border"
            >
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
