import { mockEnrollments, mockStudies } from "@/data/mockStudyData";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";
import { Users, CheckCircle2, Activity, ShieldCheck } from "lucide-react";

const StudiesEnrollment = () => {
  const { t, lang } = useLanguage();
  const sp = t.studiesPortal;
  const locale = getLocale(lang);

  const active = mockEnrollments.filter((e) => e.status === "active").length;
  const completed = mockEnrollments.filter((e) => e.status === "completed").length;
  const withdrawn = mockEnrollments.filter((e) => e.status === "withdrawn").length;
  const consentRate = Math.round((mockEnrollments.filter((e) => e.consentGiven).length / mockEnrollments.length) * 100);

  const studyMap = Object.fromEntries(mockStudies.map((s) => [s.id, s]));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{sp.enrollmentTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{sp.enrollmentDesc}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: sp.activeParticipants, value: active, icon: Users, color: "text-accent" },
          { label: sp.completedParticipants, value: completed, icon: CheckCircle2, color: "text-accent" },
          { label: sp.withdrawnParticipants, value: withdrawn, icon: Activity, color: "text-muted-foreground" },
          { label: sp.consentRate, value: `${consentRate}%`, icon: ShieldCheck, color: "text-accent" },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Enrollment table */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{sp.enrollmentRecords}</h2>
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.participantCode}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.study}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.automat}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.clinic}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.enrolled}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.consent}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.dataSubmissions}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.lastActivity}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.status}</th>
              </tr>
            </thead>
            <tbody>
              {mockEnrollments.map((e) => (
                <tr key={e.id} className="border-t border-border hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-foreground">{e.participantCode}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{e.studyTitle}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{e.automatNr}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{e.clinicName}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(e.enrollmentDate).toLocaleDateString(locale)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${e.consentGiven ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                      {e.consentGiven ? sp.consentYes : sp.consentNo}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground">{e.dataSubmissions}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(e.lastActivity).toLocaleDateString(locale)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      e.status === "active" ? "bg-accent/10 text-accent" :
                      e.status === "completed" ? "bg-muted text-muted-foreground" :
                      "bg-destructive/10 text-destructive"
                    }`}>{e.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GDPR note */}
      <div className="mt-6 border border-border rounded-lg p-4 bg-muted/30 flex items-start gap-3">
        <ShieldCheck size={18} className="text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">{sp.gdprNote}:</strong> {sp.gdprNoteText}
        </p>
      </div>
    </div>
  );
};

export default StudiesEnrollment;
