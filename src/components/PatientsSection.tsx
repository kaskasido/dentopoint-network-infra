import { motion } from "framer-motion";
import { ShieldCheck, QrCode, ClipboardList, Heart, Sparkles, CalendarCheck } from "lucide-react";

const items = [
  { icon: ClipboardList, title: "Aftercare Programs", desc: "Structured follow-up protocols tailored to your treatment." },
  { icon: Sparkles, title: "Product Categories", desc: "Curated dental care products matched to clinical recommendations." },
  { icon: ShieldCheck, title: "Digital Membership", desc: "Access your care network with a secure digital membership profile." },
  { icon: QrCode, title: "QR Integration", desc: "Instant access to products and programs via in-clinic QR codes." },
  { icon: Heart, title: "Precision Recommendations", desc: "AI-guided aftercare suggestions based on your treatment history." },
  { icon: CalendarCheck, title: "Structured Follow-Up", desc: "Automated appointment and care reminders for optimal outcomes." },
];

const PatientsSection = () => {
  return (
    <section id="patients" className="py-24 md:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
            For Patients
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Your Aftercare, Simplified
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A calm, structured approach to dental aftercare — connecting you to the right products and programs through your clinic's care network.
          </p>
          <div className="w-12 h-px bg-gradient-brand mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-border rounded-lg p-7 hover:shadow-brand transition-all duration-300"
            >
              <item.icon size={22} className="text-accent mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientsSection;
