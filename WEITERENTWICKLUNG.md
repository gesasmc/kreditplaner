# Kreditplaner – Weiterentwicklung

## Stabiler Ausgangspunkt
Stand: 27.08.2026, PWA Cache v16.
Letzter rein lokaler Rückfallpunkt: `7a22c122d7ee9decdafa4623043574cb3a3e7133`.
Aktueller Stand umfasst private + gemeinsame Kredite.

## Aktueller Funktionsumfang
- Drei Ansichten: Übersicht, Kredite, Gemeinsam.
- Private Kredite bleiben ausschließlich im localStorage (`kreditplaner_v1`) des jeweiligen Handys.
- Gemeinsame Kredite werden über Supabase synchronisiert.
- Übersicht zeigt oben Eigene Kredite, Gemeinsame Kredite und Alles zusammen inklusive Restschuld und Monatsrate.
- Der große Hero-Wert zeigt die gesamte Restschuld aus privat + gemeinsam.
- Private und gemeinsame Kredite haben dynamisches voraussichtliches Enddatum aus aktueller Restschuld / Monatsrate.
- Fällige Monatsraten werden genau einmal automatisch verbucht.
- Sonderzahlungen reduzieren Restschuld und ziehen das prognostizierte Enddatum vor.
- Sonderzahlungs-Prognose ist für private und gemeinsame Kredite vorhanden.
- Neue Kredite benötigen weiterhin nur Name, Monatsrate und Enddatum.
- Zusätzlich optional: Startdatum und Jahreszins. Beide sind Zusatzinformationen und verändern die einfache Restschuld-/Enddatum-Berechnung nicht.
- Sicherung/Import der privaten Daten als JSON.
- Hell/Dunkel über Systemdarstellung.
- PWA/Homescreen-Icons vorhanden.

## Gemeinsamer Modus
- Supabase-Projekt: `Kreditplaner`, Projekt-ID `ymjngslafotilihvvbbl`, Region `eu-central-1`.
- Gemeinsamer Bereich über einen 24-stelligen Einladungscode.
- Code lokal unter `kreditplaner_shared_code`; Datenbank speichert nur SHA-256-Hash.
- Edge Function `couple-sync` ist der einzige Zugriffspfad für gemeinsame Daten.
- Gemeinsame Monatsraten werden serverseitig beim Abruf verarbeitet.

## Wichtige Dateien
- `index.html`: Haupt-App und private Kernlogik.
- `auto-calc.js`: vereinfachtes Anlegen privater Kredite + private Sonderzahlungs-Prognose.
- `loan-options.js`: optionale Felder Startdatum/Jahreszins für private Kredite und Anzeige dieser Zusatzinfos.
- `shared-sync.js`: gemeinsamer Bereich, Gesamtübersicht, gemeinsame Kredite und gemeinsame Prognose.
- `sw.js`: Service Worker; nach sichtbaren Änderungen Cache-Version erhöhen.
- `manifest.webmanifest`: PWA-Metadaten.
- `icon.svg`, `icon-192.png`, `icon-512.png`: Icons.

## Supabase-Struktur
Aktiv:
- `couple_spaces`
- `couple_loans` mit optional `start_date` und `annual_interest`
- `couple_transactions`
- Edge Function `couple-sync`, Version 2 ab v16

## Regeln für zukünftige Änderungen
1. Private Datenstruktur und localStorage-Key `kreditplaner_v1` kompatibel halten.
2. `kreditplaner_shared_code` beibehalten.
3. Private Kredite niemals automatisch in Supabase kopieren.
4. Gemeinsame Tabellen nicht direkt für Browserrollen freigeben; Zugriff über Edge Function.
5. Jahreszins ist derzeit nur Information. Erst bei ausdrücklichem Wunsch eine echte Zins-/Tilgungsrechnung einführen.
6. Bestehende Kredite beim Bearbeiten nicht neu berechnen und Verlauf nicht löschen.
7. Nach UI-/JS-Änderungen `sw.js` Cache-Version erhöhen.
8. Testen: Übersicht privat+gemeinsam, Anlegen mit/ohne optionale Felder, Monatsrate, Sonderzahlung, beide Prognosen, Verlauf, Reload, zweites Gerät.

## Start für die nächste Sitzung
Zuerst diese Datei lesen. Danach `index.html`, `auto-calc.js`, `loan-options.js`, `shared-sync.js` und `sw.js` prüfen. Für gemeinsame Serverlogik `couple-sync` und die drei `couple_*` Tabellen prüfen.