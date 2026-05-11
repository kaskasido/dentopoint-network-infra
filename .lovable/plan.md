# CRUD-Funktionalität für das Admin-Dashboard

Ich verbinde das Admin-Portal mit der echten Datenbank und füge überall **Hinzufügen / Bearbeiten / Löschen** hinzu — inkl. Bestätigungs-Dialogen und Toast-Benachrichtigungen.

## Was bekommst du am Ende

Im Admin-Portal kannst du dann über UI verwalten:

| Bereich | Tabelle | Aktionen |
|---|---|---|
| Benutzer & Rollen | `profiles` + `user_roles` | Rolle zuweisen, ändern, entfernen |
| Smart Care Module | `automats` | Anlegen, bearbeiten, löschen |
| Bestellungen | `orders` | Status ändern, löschen |
| Wartungen | `maintenance_logs` | Anlegen, bearbeiten, löschen |
| Alerts/Logs | `alerts` | Bestätigen, löschen |
| Provisionen | `commissions` | Anlegen, bearbeiten, Status ändern |

Jede Aktion zeigt eine Toast-Meldung (Erfolg/Fehler) und Lösch-Vorgänge erfordern eine Bestätigung.

## Umsetzung in 4 Schritten

### Schritt 1 — Wiederverwendbare CRUD-Bausteine
- `DataTableActions.tsx` — Edit/Delete-Buttons mit Bestätigungs-Dialog
- `EntityFormDialog.tsx` — Generisches Dialog-Formular mit Zod-Validierung
- `useEntityCrud.tsx` — Hook für Insert/Update/Delete + Toast + Realtime-Refresh

### Schritt 2 — Mock-Daten ersetzen durch Supabase-Queries
Alle `Admin*.tsx`-Komponenten lesen künftig per `supabase.from(...).select()` statt aus `mockAdminData.ts`. Loading-States und Empty-States werden ergänzt.

### Schritt 3 — CRUD-Dialoge pro Bereich
Neue Komponenten: `AdminAutomats.tsx`, `AdminOrders.tsx`, `AdminMaintenance.tsx`, `AdminCommissions.tsx`. Erweitert: `AdminUsers.tsx`, `AdminLogs.tsx`. Sidebar-Navigation wird ergänzt.

### Schritt 4 — RLS-Check & Sicherheit
Prüfe, dass Admins überall schreiben dürfen. Falls Policies fehlen (z. B. UPDATE/DELETE auf `profiles`), wird eine Migration erstellt. Validierung: Zod-Schemas client-seitig + RLS server-seitig.

## Technische Hinweise

- **Validierung**: zod (Pflichtfelder, Längen, Email-Format)
- **Formulare**: react-hook-form + shadcn `Form`
- **Toasts**: `sonner`
- **Bestätigungs-Dialoge**: shadcn `AlertDialog`
- **Realtime**: Optional — nach jeder Mutation wird die Liste neu geladen (einfacher und ausreichend)
- **Mock-Dateien** bleiben vorerst liegen (für die Investor-Charts noch genutzt), werden später entfernt

## Was NICHT enthalten ist

- Bulk-Edit (mehrere Zeilen gleichzeitig)
- CSV-Import/Export (kann später ergänzt werden)
- Audit-Trail (wer hat wann was geändert)

Soll ich so loslegen?
