import { mockStudies, mockEnrollments } from "@/data/mockStudyData";
import { useLanguage } from "@/i18n/LanguageContext";
import { FlaskConical, Users, CheckCircle2, Clock, Globe2, BookOpen } from "lucide-react";

const statusColors: Record<string, string> = {
  active:     "bg-accent/10 text-accent",
  recruiting: "bg-blue-500/10 text-blue-500",
  completed:  "bg-muted text-muted-foreground",
  paused:     "bg-yellow-500/10 text-yellow-600",
  draft:      "bg-purple-500/10 text-purple-500",
};

const phaseColors: Record<string, string> = {
  registry:       "bg-orange-500/10 text-orange-500",
  observational:  "bg-blue-500/10 text-blue-500",
  interventional: "bg-red-500/10 text-red-500",
};

const StudiesOverview = () => {
  const { t } = useLanguage();
  const sp = t.studiesPortal;

  const totalStudies = mockStudies.length;
  const activeStudies = mockStudies.filter((s) => s.status === "active" || s.status === "recruiting").length;
  const totalEnrolled = mockStudies.reduce((s, study) => s + study.enrolledParticipants, 0);
  const totalTarget = mockStudies.reduce((s, study) => s + study.targetParticipants, 0);
  const totalEnrollments = mockEnrollments.length;
  const countriesActive = [...new Set(mockStudies.flatMap((s) => s.countries))].length;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{sp.overviewTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{sp.overviewDesc}</p>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: sp.totalStudies, value: totalStudies, icon: FlaskConical, color: "text-accent" },
          { label: sp.activeStudies, value: activeStudies, icon: CheckCircle2, color: "text-accent" },
          { label: sp.totalEnrolled, value: `${totalEnrolled.toLocaleString()} / ${totalTarget.toLocaleString()}`, icon: Users, color: "text-blue-500" },
          { label: sp.enrollmentsThisMonth, value: totalEnrollments, icon: BookOpen, color: "text-accent" },
          { label: sp.activeCountries, value: countriesActive, icon: Globe2, color: "text-accent" },
          { label: sp.pendingStudies, value: mockStudies.filter((s) => s.status === "draft").length, icon: Clock, color: "text-purple-500" },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Study cards */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{sp.allStudies}</h2>
      <div className="space-y-4">
        {mockStudies.map((study) => {
          const enrollmentPct = Math.round((study.enrolledParticipants / study.targetParticipants) * 100);
          return (
            <div key={study.id} className="border border-border rounded-lg bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{study.shortCode}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${phaseColors[study.phase] ?? "bg-muted text-muted-foreground"}`}>{study.phase}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[study.status] ?? "bg-muted text-muted-foreground"}`}>{study.status}</span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground leading-tight">{study.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{sp.sponsor}: {study.sponsor} · {sp.pi}: {study.principalInvestigator}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{study.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">{sp.enrolled}</p>
                  <p className="font-semibold text-foreground">{study.enrolledParticipants} / {study.targetParticipants}</p>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${Math.min(enrollmentPct, 100)}%` }} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{sp.automats}</p>
                  <p className="font-semibold text-foreground">{study.automatsParticipating.length || "–"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{sp.countries}</p>
                  <p className="font-semibold text-foreground">{study.countries.join(", ")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{sp.ethics}</p>
                  <p className="text-xs text-foreground leading-tight">{study.ethicsApproval.split("–")[0].trim()}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {study.dataPoints.slice(0, 4).map((dp) => (
                  <span key={dp} className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">{dp}</span>
                ))}
                {study.dataPoints.length > 4 && (
                  <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">+{study.dataPoints.length - 4} {sp.more}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudiesOverview;
