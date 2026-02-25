import logo from "@/assets/dentopoint-logo.png";

const languages = [
  { code: "DE", label: "Deutsch" },
  { code: "EN", label: "English" },
  { code: "TR", label: "Türkçe" },
  { code: "CN", label: "中文" },
];

const Footer = () => {
  return (
    <footer id="contact" className="py-16 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="DentoPoint" className="h-8 w-8 rounded" />
              <span className="font-display font-bold text-lg">DentoPoint</span>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">
              The Therapeutic Care Network — Digital infrastructure for structured dental aftercare.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 opacity-80">Platform</h4>
            <ul className="space-y-2.5 text-sm opacity-60">
              <li><a href="#infrastructure" className="hover:opacity-100 transition-opacity">Infrastructure</a></li>
              <li><a href="#locator" className="hover:opacity-100 transition-opacity">Locator</a></li>
              <li><a href="#analytics" className="hover:opacity-100 transition-opacity">Analytics</a></li>
              <li><a href="#categories" className="hover:opacity-100 transition-opacity">Categories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 opacity-80">Legal</h4>
            <ul className="space-y-2.5 text-sm opacity-60">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Imprint</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Data Protection</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">IP Notice</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 opacity-80">Contact</h4>
            <p className="text-sm opacity-60 leading-relaxed mb-4">
              info@dentopoint.com
            </p>

            <h4 className="font-display font-semibold text-sm mb-3 opacity-80">Language</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="px-3 py-1.5 rounded border border-primary-foreground/20 text-xs font-medium opacity-60 hover:opacity-100 transition-opacity"
                >
                  {lang.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-40">
            © {new Date().getFullYear()} DentoPoint® — Therapeutisches Versorgungsnetzwerk. All rights reserved.
          </p>
          <p className="text-xs opacity-40">
            Medical Infrastructure Ecosystem · EU & Asia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
