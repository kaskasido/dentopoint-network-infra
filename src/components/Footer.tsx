import logo from "@/assets/dentopoint-logo.png";
import { useLanguage, Language } from "@/i18n/LanguageContext";

const languages: { code: Language; label: string }[] = [
  { code: "DE", label: "Deutsch" },
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
  { code: "IT", label: "Italiano" },
  { code: "ES", label: "Español" },
  { code: "TR", label: "Türkçe" },
  { code: "CN", label: "中文" },
];

const Footer = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <footer id="contact" className="py-16 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="DentoPoint" className="h-8 w-8 rounded" />
              <span className="font-display font-bold text-lg">DentoPoint</span>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 opacity-80">{t.footer.platform}</h4>
            <ul className="space-y-2.5 text-sm opacity-60">
              <li><a href="#infrastructure" className="hover:opacity-100 transition-opacity">{t.infrastructure.label}</a></li>
              <li><a href="#locator" className="hover:opacity-100 transition-opacity">Locator</a></li>
              <li><a href="#analytics" className="hover:opacity-100 transition-opacity">{t.analytics.label}</a></li>
              <li><a href="#categories" className="hover:opacity-100 transition-opacity">{t.categories.label}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 opacity-80">{t.footer.legal}</h4>
            <ul className="space-y-2.5 text-sm opacity-60">
              <li><a href="/impressum" className="hover:opacity-100 transition-opacity">{t.footer.impressum}</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">{t.footer.privacyPolicy}</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">{t.footer.dataProtection}</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">{t.footer.ipNotice}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 opacity-80">{t.footer.contactLabel}</h4>
            <p className="text-sm opacity-60 leading-relaxed mb-4">
              info@dentopoint.care
            </p>

            <h4 className="font-display font-semibold text-sm mb-3 opacity-80">{t.footer.language}</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
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
