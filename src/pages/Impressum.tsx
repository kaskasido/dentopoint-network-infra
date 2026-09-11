import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-28 pb-20 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Impressum</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed text-sm">
          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              Angaben gemäß § 5 DDG
            </h2>
            <p>
              DentoPoint GbR<br />
              vertreten durch die Gesellschafter:<br />
              Olga Henriette Seifert<br />
              Michael Kassig<br />
              Peter Corovic
            </p>
          </div>

          <div>
            <p>
              Clarenbachstraße 6<br />
              50931 Köln<br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">Kontakt</h2>
            <p>
              Telefon:{" "}
              <a href="tel:+491735108172" className="text-primary hover:underline">+49 173 5108172</a><br />
              E-Mail:{" "}
              <a
                href="mailto:info@dentopoint.care"
                className="text-primary hover:underline"
              >
                info@dentopoint.care
              </a>
            </p>
          </div>

          {/* USt-IdNr. ergänzen, sobald vorhanden. */}

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p>
              Olga Henriette Seifert<br />
              Anschrift wie oben
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              Streitbeilegung
            </h2>
            <p>
              Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
