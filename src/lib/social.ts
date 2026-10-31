/**
 * Profile von DentoPoint in sozialen Medien. Leere Adressen erscheinen nirgends; sobald ein Profil existiert,
 * die Adresse eintragen, dann zeigt der Fußbereich den Link. Nur einfache Links, keine eingebetteten Inhalte:
 * Beim Laden der Seite geht nichts an die Plattformen. Mit dem ersten Profil die Datenschutzerklärung um einen
 * Abschnitt zu den Social-Media-Auftritten ergänzen.
 */
export const SOCIAL_PROFILES: { id: string; label: string; url: string }[] = [
  { id: "linkedin", label: "LinkedIn", url: "" },
  { id: "instagram", label: "Instagram", url: "" },
  { id: "facebook", label: "Facebook", url: "" },
  { id: "youtube", label: "YouTube", url: "" },
  { id: "tiktok", label: "TikTok", url: "" },
];

export const socialLinks = () => SOCIAL_PROFILES.filter((p) => p.url.trim() !== "");
