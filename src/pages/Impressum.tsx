import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePageSeo } from "@/lib/seo";

// Das Impressum steht auf Deutsch (auch für EN). Für NL gibt es eine Übersetzung mit Hinweis,
// dass die deutsche Fassung rechtsverbindlich ist.
const TEXTS = {
  DE: {
    title: "Impressum",
    note: "",
    provider: "Angaben gemäß § 5 DDG",
    representedBy: "vertreten durch die Gesellschafter:",
    country: "Deutschland",
    contact: "Kontakt",
    phone: "Telefon:",
    email: "E-Mail:",
    vatTitle: "Umsatzsteuer-Identifikationsnummer",
    vatText: "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:",
    responsibleTitle: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    addressAsAbove: "Anschrift wie oben",
    disputeTitle: "Streitbeilegung",
    disputeText:
      "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
  },
  NL: {
    title: "Colofon",
    note: "Deze vertaling is bedoeld ter informatie; de Duitse versie is juridisch bindend.",
    provider: "Gegevens conform § 5 DDG",
    representedBy: "vertegenwoordigd door de vennoten:",
    country: "Duitsland",
    contact: "Contact",
    phone: "Telefoon:",
    email: "E-mail:",
    vatTitle: "Btw-identificatienummer",
    vatText: "Btw-identificatienummer conform § 27a van de Duitse omzetbelastingwet (Umsatzsteuergesetz):",
    responsibleTitle: "Verantwoordelijk voor de inhoud conform § 18 lid 2 MStV",
    addressAsAbove: "Adres zie boven",
    disputeTitle: "Geschillenbeslechting",
    disputeText:
      "Wij zijn niet bereid en niet verplicht deel te nemen aan geschillenbeslechtingsprocedures voor een consumentengeschillencommissie.",
  },
};

const Impressum = () => {
  usePageSeo("impressum", "/impressum");
  const { lang } = useLanguage();
  const x = lang === "NL" ? TEXTS.NL : TEXTS.DE;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-28 pb-20 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">{x.title}</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed text-sm">
          {x.note && <p className="italic">{x.note}</p>}

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              {x.provider}
            </h2>
            <p>
              DentoPoint GbR<br />
              {x.representedBy}<br />
              Olga Henriette Seifert<br />
              Michael Kassig<br />
              Peter Corovic
            </p>
          </div>

          <div>
            <p>
              Clarenbachstraße 6<br />
              50931 Köln<br />
              {x.country}
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">{x.contact}</h2>
            <p>
              {x.phone}{" "}
              <a href="tel:+491735108172" className="text-primary hover:underline">+49 173 5108172</a><br />
              {x.email}{" "}
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
              {x.vatTitle}
            </h2>
            <p>
              {x.vatText}<br />
              DE459232045
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              {x.responsibleTitle}
            </h2>
            <p>
              Olga Henriette Seifert, Michael Kassig, Peter Corovic<br />
              {x.addressAsAbove}
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              {x.disputeTitle}
            </h2>
            <p>
              {x.disputeText}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
