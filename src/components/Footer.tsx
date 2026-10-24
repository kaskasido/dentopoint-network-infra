import { Link } from "react-router-dom";
import logo from "@/assets/dentopoint-logo.png";
import { useLanguage, SUPPORTED_LANGUAGES } from "@/i18n/LanguageContext";

const Footer = () => {
  const { lang, setLang, t } = useLanguage();

  const overview = [
    { href: "/#hotels", label: t.netzwerk.nav.hotels },
    { href: "/#netzwerk", label: t.netzwerk.nav.how },
    { href: "/#sortiment", label: t.netzwerk.nav.range },
    { href: "/#status", label: t.netzwerk.nav.status },
    { href: "/#faq", label: t.netzwerk.nav.faq },
    { href: "/care-station", label: t.netzwerk.nav.station },
    { href: "/manufacturers", label: t.netzwerk.nav.produkte },
  ];

  return (
    <footer id="contact" className="py-16 bg-muted text-foreground border-t border-gold">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="DentoPoint" width={44} height={44} className="h-11 w-11 rounded" />
              <span className="font-display text-xl">DentoPoint</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.netzwerk.footerDescription}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">{t.footer.platform}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {overview.map((o) => (
                <li key={o.href}>
                  <Link to={o.href} className="hover:text-primary transition-colors">{o.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/impressum" className="hover:text-primary transition-colors">{t.footer.impressum}</Link></li>
              <li><Link to="/datenschutz" className="hover:text-primary transition-colors">{t.footer.privacyPolicy}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">{t.footer.contactLabel}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-1">
              DentoPoint GbR<br />
              Clarenbachstraße 6<br />
              50931 Köln
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              <a href="mailto:info@dentopoint.care" className="hover:text-primary">info@dentopoint.care</a><br />
              <a href="tel:+491735108172" className="hover:text-primary">+49 173 5108172</a>
            </p>

            <h4 className="font-display font-semibold text-sm mb-3">{t.footer.language}</h4>
            <div className="flex flex-wrap gap-2">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1.5 rounded border text-xs font-medium transition-colors ${
                    lang === l.code
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground hover:text-primary"
                  }`}
                >
                  {l.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            {t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
          </p>
          <p className="text-xs text-muted-foreground">
            {t.netzwerk.footerTagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
