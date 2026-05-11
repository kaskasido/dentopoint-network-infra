import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-28 pb-20 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          Datenschutzerklärung
        </h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed text-sm">
          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              1. Verantwortlicher
            </h2>
            <p>
              DentoPoint GbR<br />
              vertreten durch die Gesellschafter Olga Henriette Seifert,
              Michael Kasig, Peter Corovic<br />
              Clarenbachstraße 6, 50931 Köln, Deutschland<br />
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
              2. Allgemeines zur Datenverarbeitung
            </h2>
            <p>
              Wir verarbeiten personenbezogene Daten unserer Nutzer
              grundsätzlich nur, soweit dies zur Bereitstellung einer
              funktionsfähigen Website sowie unserer Inhalte und Leistungen
              erforderlich ist. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und f
              DSGVO.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              3. Server-Logfiles
            </h2>
            <p>
              Beim Aufruf unserer Website werden technisch notwendige
              Verbindungsdaten (IP-Adresse, Datum/Uhrzeit, Browser-Typ,
              Betriebssystem, Referrer) durch unseren Hosting-Anbieter
              verarbeitet. Eine Zusammenführung dieser Daten mit anderen
              Datenquellen erfolgt nicht.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              4. Kontaktaufnahme
            </h2>
            <p>
              Bei Kontaktaufnahme per E-Mail werden die Angaben des Nutzers
              zur Bearbeitung der Anfrage und für den Fall von
              Anschlussfragen gespeichert. Eine Weitergabe an Dritte erfolgt
              nicht.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              5. Nutzerkonten und Portale
            </h2>
            <p>
              Für registrierte Nutzer (Kliniken, Hersteller, Investoren,
              Partner, Administratoren) verarbeiten wir die im
              Registrierungsprozess angegebenen Daten zur Bereitstellung der
              jeweiligen Portalfunktionen. Die Authentifizierung erfolgt
              über einen sicheren Backend-Dienst innerhalb der EU.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              6. Cookies
            </h2>
            <p>
              Wir setzen ausschließlich technisch notwendige Cookies ein
              (z. B. zur Sitzungs- und Spracheinstellung). Tracking- oder
              Marketing-Cookies werden nicht verwendet.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              7. Rechte der betroffenen Personen
            </h2>
            <p>
              Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO),
              Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
              Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie
              Widerspruch (Art. 21). Anfragen richten Sie bitte an{" "}
              <a
                href="mailto:info@dentopoint.care"
                className="text-primary hover:underline"
              >
                info@dentopoint.care
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              8. Beschwerderecht
            </h2>
            <p>
              Sie haben das Recht zur Beschwerde bei einer
              Datenschutz-Aufsichtsbehörde, in der Regel bei der
              Landesbeauftragten für Datenschutz und Informationsfreiheit
              Nordrhein-Westfalen.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-foreground text-base mb-2">
              9. Änderungen
            </h2>
            <p>
              Diese Datenschutzerklärung kann angepasst werden, um sie an
              geänderte Rechtslage oder Funktionen anzupassen. Es gilt jeweils
              die aktuell auf dieser Seite veröffentlichte Fassung.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
