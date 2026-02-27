interface SubPageItem {
  title: string;
  description: string;
}

interface PortalSubPageProps {
  title: string;
  description: string;
  items: SubPageItem[];
}

const PortalSubPage = ({ title, description, items }: PortalSubPageProps) => (
  <div>
    <h1 className="font-display text-2xl font-bold text-foreground mb-2">{title}</h1>
    <p className="text-muted-foreground text-sm mb-8">{description}</p>
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.title} className="border border-border rounded-lg p-6 bg-card">
          <h3 className="font-display text-base font-semibold text-foreground mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default PortalSubPage;
