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
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              DentoPoint GbR<br />
              vertreten durch die Gesellschafter:<br />
              Olga Henriette Seifert<br />
              Michael Kasig<br />
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
            <p>
              Telefon: +49 (0) XXX XXXXX<br />
              E-Mail:{" "}
              <a
                href="mailto:info@dentopoint.care"
                className="text-primary hover:underline"
              >
                info@dentopoint.care
              </a>
            </p>
          </div>

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
              Umsatzsteuer-ID
            </h2>
            <p>Wird nachgetragen.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
