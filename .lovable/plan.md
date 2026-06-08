## Ziel
Das Impressum gesetzeskonformer machen, indem die echte Telefonnummer eingetragen und der abmahnfähige USt-IdNr.-Platzhalter entfernt wird.

## Änderungen
1. **Telefonnummer aktualisieren** in `src/pages/Impressum.tsx`:
   - Alt: `+49 (0) XXX XXXXX`
   - Neu: `+49 173 5108172`

2. **USt-IdNr.-Abschnitt entfernen**:
   - Der Platzhalter "Wird nachgetragen" ist nach TMG-Richtlinien problematisch.
   - Da die GbR aktuell keine USt-IdNr. hat (bzw. diese noch geprüft wird), wird der gesamte Block `<div>` mit der Überschrift "Umsatzsteuer-ID" und dem Platzhalter entfernt.
   - Sobald eine USt-IdNr. vorliegt, kann der Block wieder eingefügt werden.

## Nach dem Bau
- Preview prüfen, ob Impressum korrekt gerendert wird.
- Keine weiteren Seiten betroffen.