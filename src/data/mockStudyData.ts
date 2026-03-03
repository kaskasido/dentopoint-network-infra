/**
 * Real World Studies Platform Data
 *
 * DentoPoint automats serve as recruitment and data-collection points for
 * real-world evidence (RWE) studies conducted by dental manufacturers and
 * universities. Patients can opt-in at the automat or via the DentoPoint app.
 *
 * Stakeholders:
 *  - Study Sponsor: manufacturer or university
 *  - Principal Investigator: clinician at a partner clinic
 *  - Participant: patient who opts in at automat or via app
 *  - DentoPoint: platform operator (data processing agreement in place)
 */

export type StudyStatus = "recruiting" | "active" | "completed" | "paused" | "draft";
export type StudyPhase = "observational" | "interventional" | "registry";
export type SponsorType = "manufacturer" | "university" | "hospital" | "dentopoint";

export interface Study {
  id: string;
  title: string;
  shortCode: string;
  sponsor: string;
  sponsorType: SponsorType;
  principalInvestigator: string;
  investigatorInstitution: string;
  phase: StudyPhase;
  status: StudyStatus;
  targetParticipants: number;
  enrolledParticipants: number;
  startDate: string;
  endDate: string;
  description: string;
  eligibilityCriteria: string[];
  automatsParticipating: string[];
  countries: string[];
  dataPoints: string[];
  ethicsApproval: string;
  consentRequired: boolean;
  gdprCompliant: boolean;
  rewardPoints?: number;    // patient reward points for participation
}

export interface StudyEnrollment {
  id: string;
  studyId: string;
  studyTitle: string;
  participantCode: string;   // anonymised patient code
  automatNr: string;
  clinicName: string;
  enrollmentDate: string;
  consentGiven: boolean;
  status: "active" | "completed" | "withdrawn";
  dataSubmissions: number;
  lastActivity: string;
}

export interface StudyMetrics {
  studyId: string;
  weeklyEnrollments: { week: string; count: number }[];
  completionRate: number;
  avgDataSubmissionsPerParticipant: number;
  geographicDistribution: { country: string; count: number }[];
}

// ── Active & Planned Studies ───────────────────────────────────────────────

export const mockStudies: Study[] = [
  {
    id: "study-001",
    title: "Effectiveness of Implant Care Products Post-Surgery: A Real-World Registry",
    shortCode: "ECIPS-2025",
    sponsor: "Dentsply Sirona",
    sponsorType: "manufacturer",
    principalInvestigator: "Prof. Dr. Hans Neugebauer",
    investigatorInstitution: "Charité Universitätsmedizin Berlin",
    phase: "registry",
    status: "active",
    targetParticipants: 500,
    enrolledParticipants: 187,
    startDate: "2025-09-01",
    endDate: "2026-08-31",
    description: "Observational registry tracking patient-reported outcomes and product usage after implant surgery. Participants receive curated implant care kits via DentoPoint automats.",
    eligibilityCriteria: [
      "Minimum 18 years of age",
      "Received dental implant within the past 6 months",
      "Able to provide informed consent",
      "No participation in other implant-related studies",
    ],
    automatsParticipating: ["DP-001", "DP-003", "DP-006", "DP-007"],
    countries: ["DE", "CH", "AT"],
    dataPoints: ["Product usage frequency", "Pain score (NRS)", "Patient satisfaction", "Adverse events"],
    ethicsApproval: "EA2/245/24 – Charité Ethics Committee",
    consentRequired: true,
    gdprCompliant: true,
    rewardPoints: 200,
  },
  {
    id: "study-002",
    title: "Whitening Product Safety & Efficacy in Clinical Practice",
    shortCode: "WPSE-2026",
    sponsor: "University of Hamburg – Dental Faculty",
    sponsorType: "university",
    principalInvestigator: "Dr. Sarah Möller",
    investigatorInstitution: "Universitätsklinikum Hamburg-Eppendorf",
    phase: "observational",
    status: "recruiting",
    targetParticipants: 200,
    enrolledParticipants: 34,
    startDate: "2026-02-01",
    endDate: "2026-10-31",
    description: "Prospective cohort study evaluating safety and patient-reported whitening outcomes for OTC whitening products dispensed via DentoPoint automats.",
    eligibilityCriteria: [
      "Age 18–65",
      "No active periodontal disease",
      "No dental hypersensitivity (severe)",
      "Non-pregnant / non-lactating",
    ],
    automatsParticipating: ["DP-002", "DP-009"],
    countries: ["DE", "NL"],
    dataPoints: ["Tooth shade measurement (VITA scale)", "Sensitivity score", "Product satisfaction", "Usage compliance"],
    ethicsApproval: "PV7823 – Ethikkommission Hamburg",
    consentRequired: true,
    gdprCompliant: true,
    rewardPoints: 150,
  },
  {
    id: "study-003",
    title: "Patient Access to Preventive Dental Care Products at the Point of Care",
    shortCode: "PADCP-2026",
    sponsor: "DentoPoint GmbH",
    sponsorType: "dentopoint",
    principalInvestigator: "Dr. Petra Corovic",
    investigatorInstitution: "DentoPoint Research",
    phase: "observational",
    status: "active",
    targetParticipants: 1000,
    enrolledParticipants: 423,
    startDate: "2025-10-01",
    endDate: "2026-09-30",
    description: "Multi-centre real-world study measuring the impact of in-clinic automat placement on patient uptake of preventive dental care products and follow-up compliance.",
    eligibilityCriteria: [
      "Any patient visiting a DentoPoint partner clinic",
      "Age ≥ 16",
      "Consent to anonymised data collection",
    ],
    automatsParticipating: ["DP-001", "DP-002", "DP-003", "DP-004", "DP-006", "DP-007", "DP-009"],
    countries: ["DE", "AT", "CH", "NL"],
    dataPoints: ["Purchase intent survey", "Product selection", "Repeat visit rate", "Automat engagement time"],
    ethicsApproval: "EA2/198/25 – Charité Ethics Committee",
    consentRequired: false,
    gdprCompliant: true,
    rewardPoints: 50,
  },
  {
    id: "study-004",
    title: "Real-World Evidence: Interdental Hygiene Compliance in Asian Markets",
    shortCode: "IHCA-2026",
    sponsor: "Sunstar Foundation",
    sponsorType: "manufacturer",
    principalInvestigator: "Dr. Li Ming",
    investigatorInstitution: "Tongji University School of Dentistry",
    phase: "interventional",
    status: "recruiting",
    targetParticipants: 300,
    enrolledParticipants: 42,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    description: "Randomised controlled study comparing patient compliance with interdental hygiene regimens when products are provided at the point of care (DentoPoint automat) versus pharmacy purchase.",
    eligibilityCriteria: [
      "Age 25–70",
      "Diagnosed with mild to moderate gingivitis",
      "Smartphone user (for DentoPoint app follow-up)",
    ],
    automatsParticipating: ["DP-008", "DP-012"],
    countries: ["CN", "SG"],
    dataPoints: ["Plaque index (Silness-Löe)", "Gingivitis score", "Product usage diary", "App engagement"],
    ethicsApproval: "TJ-EC-2025-0342 – Tongji Ethics Committee",
    consentRequired: true,
    gdprCompliant: true,
    rewardPoints: 300,
  },
  {
    id: "study-005",
    title: "DentoPoint Network Expansion: Clinical Outcomes Registry – Global",
    shortCode: "DNCE-GLOBAL",
    sponsor: "DentoPoint GmbH",
    sponsorType: "dentopoint",
    principalInvestigator: "Dr. Petra Corovic",
    investigatorInstitution: "DentoPoint Research",
    phase: "registry",
    status: "draft",
    targetParticipants: 5000,
    enrolledParticipants: 0,
    startDate: "2026-07-01",
    endDate: "2028-06-30",
    description: "Global registry for long-term outcome tracking across all DentoPoint markets. Will serve as the foundational RWE dataset for regulatory submissions and market access negotiations.",
    eligibilityCriteria: [
      "Patient at a DentoPoint partner clinic",
      "Any dental treatment received",
      "Age ≥ 18",
    ],
    automatsParticipating: [],
    countries: ["DE", "AT", "CH", "NL", "FR", "TR", "SG", "JP", "CN"],
    dataPoints: ["Treatment type", "Aftercare product usage", "Follow-up compliance", "Outcome assessment"],
    ethicsApproval: "Pending – multi-site ethics submission in progress",
    consentRequired: true,
    gdprCompliant: true,
    rewardPoints: 100,
  },
];

// ── Enrollment Records ────────────────────────────────────────────────────

export const mockEnrollments: StudyEnrollment[] = [
  { id: "enr-001", studyId: "study-001", studyTitle: "ECIPS-2025", participantCode: "ECIPS-DE-0047", automatNr: "DP-001", clinicName: "Charité Mitte", enrollmentDate: "2025-11-12", consentGiven: true, status: "active", dataSubmissions: 6, lastActivity: "2026-02-28" },
  { id: "enr-002", studyId: "study-001", studyTitle: "ECIPS-2025", participantCode: "ECIPS-DE-0048", automatNr: "DP-001", clinicName: "Charité Mitte", enrollmentDate: "2025-11-15", consentGiven: true, status: "active", dataSubmissions: 5, lastActivity: "2026-02-25" },
  { id: "enr-003", studyId: "study-001", studyTitle: "ECIPS-2025", participantCode: "ECIPS-CH-0012", automatNr: "DP-006", clinicName: "Inselspital Bern", enrollmentDate: "2025-12-01", consentGiven: true, status: "active", dataSubmissions: 4, lastActivity: "2026-02-20" },
  { id: "enr-004", studyId: "study-002", studyTitle: "WPSE-2026", participantCode: "WPSE-DE-0001", automatNr: "DP-002", clinicName: "UKE Hamburg", enrollmentDate: "2026-02-05", consentGiven: true, status: "active", dataSubmissions: 1, lastActivity: "2026-02-20" },
  { id: "enr-005", studyId: "study-003", studyTitle: "PADCP-2026", participantCode: "PADCP-DE-0101", automatNr: "DP-001", clinicName: "Charité Mitte", enrollmentDate: "2025-10-10", consentGiven: false, status: "active", dataSubmissions: 12, lastActivity: "2026-03-01" },
  { id: "enr-006", studyId: "study-004", studyTitle: "IHCA-2026", participantCode: "IHCA-SG-0003", automatNr: "DP-012", clinicName: "NUH Singapore", enrollmentDate: "2026-01-15", consentGiven: true, status: "active", dataSubmissions: 3, lastActivity: "2026-02-28" },
];
