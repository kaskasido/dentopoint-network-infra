/**
 * Online-Shop von DentoPoint (Projekt „DentoPoint Connect“). Dort gelten AGB und Widerrufsbelehrung für
 * Bestellungen; diese Seite verkauft selbst nichts online und verlinkt deshalb nur dorthin.
 * Leere Adresse: Die Shop-Links im Fußbereich erscheinen nicht.
 */
export const SHOP_URL = "https://dentopoint.com";

export const shopLink = (pfad = "/") => (SHOP_URL.trim() ? SHOP_URL.trim().replace(/\/$/, "") + pfad : "");
