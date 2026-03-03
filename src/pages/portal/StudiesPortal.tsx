import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { LayoutDashboard, FlaskConical, Users } from "lucide-react";
import StudiesOverview from "@/components/portal/studies/StudiesOverview";
import StudiesEnrollment from "@/components/portal/studies/StudiesEnrollment";

const StudiesPortal = () => {
  const { t } = useLanguage();
  const navItems = [
    { label: t.portal.studies.dashboard, href: "/portal/studies", icon: LayoutDashboard },
    { label: t.portal.studies.studies, href: "/portal/studies/list", icon: FlaskConical },
    { label: t.portal.studies.enrollment, href: "/portal/studies/enrollment", icon: Users },
  ];

  return (
    <PortalLayout title={t.portal.studies.title} navItems={navItems}>
      <Routes>
        <Route index element={<StudiesOverview />} />
        <Route path="list" element={<StudiesOverview />} />
        <Route path="enrollment" element={<StudiesEnrollment />} />
      </Routes>
    </PortalLayout>
  );
};

export default StudiesPortal;
