import { Link } from "react-router-dom";
import logo from "@/assets/dentopoint-logo.png";
import { useLanguage, SUPPORTED_LANGUAGES } from "@/i18n/LanguageContext";

const Footer = () => {
  const { lang, setLang, t } = useLanguage();

  const overview = [
    { href: "/#automat", label: t.infrastructure.label },
    { href: "/#standort", label: t.locator.label },
    { href: "/#sortiment", label: t.categories.label },
    { href: "/#status", label: t.status.label },
    { href: "/#faq", label: t.faq.label },
  ];

  return (
    <footer id="contact" className="py-16 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="DentoPoint" width={44} height={44} className="h-11 w-11 rounded" />
              <span className="font-display font-bold text-lg">DentoPoint</span>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 opacity-80">{t.footer.platform}</h4>
            <ul className="space-y-2.5 text-sm opacity-60">
              {overview.map((o) => (
                <li key={o.href}>
                  <Link to={o.href} className="hover:opacity-100 transition-opacity">{o.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 opacity-80">{t.footer.legal}</h4>
            <ul className="space-y-2.5 text-sm opacity-60">
              <li><Link to="/impressum" className="hover:opacity-100 transition-opacity">{t.footer.impressum}</Link></li>
              <li><Link to="/datenschutz" className="hover:opacity-100 transition-opacity">{t.footer.privacyPolicy}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 opacity-80">{t.footer.contactLabel}</h4>
            <p className="text-sm opacity-60 leading-relaxed mb-1">
              DentoPoint GbR<br />
              Clarenbachstraße 6<br />
              50931 Köln
            </p>
            <p className="text-sm opacity-60 leading-relaxed mb-4">
              <a href="mailto:info@dentopoint.care" className="hover:opacity-100">info@dentopoint.care</a><br />
              <a href="tel:+491735108172" className="hover:opacity-100">+49 173 5108172</a>
            </p>

            <h4 className="font-display font-semibold text-sm mb-3 opacity-80">{t.footer.language}</h4>
            <div className="flex flex-wrap gap-2">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1.5 rounded border text-xs font-medium transition-opacity ${
                    lang === l.code
                      ? "border-primary-foreground/60 opacity-100"
                      : "border-primary-foreground/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  {l.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-40">
            {t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
          </p>
          <p className="text-xs opacity-40">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
