import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const Datenschutz = () => {
  const { t } = useLanguage();
  const p = (t as any).privacy;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-28 pb-20 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          {p.title}
        </h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed text-sm">
          {p.sections.map((s: { h: string; p: string }) => (
            <div key={s.h}>
              <h2 className="font-display font-semibold text-foreground text-base mb-2">
                {s.h}
              </h2>
              <p>{s.p}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
