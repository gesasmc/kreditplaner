# Kreditplaner – Weiterentwicklung

## Stabiler Ausgangspunkt
Stand: 27.08.2026, PWA Cache v15.
Letzter stabiler Stand vor gemeinsamer Synchronisierung: `7a22c122d7ee9decdafa4623043574cb3a3e7133`.
Aktueller Shared-Sync-Commit: `000cf1b4687a34b923a834d8167cb2492cc00355`.

## Aktueller Funktionsumfang
- Mobile GitHub-Pages-PWA.
- Private Kredite bleiben ausschließlich im localStorage (`kreditplaner_v1`) des jeweiligen Handys.
- Drei Ansichten: Übersicht, Kredite, Gemeinsam.
- Kreditkarten standardmäßig zugeklappt mit Restschuld, Monatsrate, nächster Rate, Fortschrittsbalken und dynamischem voraussichtlichem Enddatum.
- Neue private Kredite: Name, Monatsrate und Enddatum; Restschuld wird automatisch aus verbleibenden Monatsraten berechnet. Nächste Rate ist der 1. des nächsten Monats.
- Fällige Monatsraten werden beim Öffnen automatisch einmalig abgezogen und im Verlauf verbucht.
- Sonderzahlungen reduzieren die Restschuld und ziehen das prognostizierte Enddatum vor.
- Sonderzahlungs-Prognose simuliert Betrag, neue Restschuld, neues Enddatum und ungefähr eingesparte Monate, ohne Daten zu verändern.
- Sicherung/Import der privaten Daten als JSON.
- Hell/Dunkel über Systemdarstellung.
- PWA/Homescreen-Icons vorhanden.

## Gemeinsamer Modus
- Supabase-Projekt: `Kreditplaner`, Projekt-ID `ymjngslafotilihvvbbl`, Region `eu-central-1`.
- Der Bereich `Gemeinsam` wird über `shared-sync.js` in die vorhandene PWA eingebunden.
- Einer erstellt einen gemeinsamen Bereich und erhält einen 24-stelligen Einladungscode.
- Der zweite Nutzer gibt denselben Code unter `Gemeinsam > Beitreten` ein.
- Der Code wird nur lokal unter `kreditplaner_shared_code` gespeichert; in der Datenbank liegt nur ein SHA-256-Hash.
- Gemeinsame Kredite, Monatsraten, Sonderzahlungen und Verlauf werden über die Edge Function `couple-sync` synchronisiert.
- Private Kredite werden NICHT hochgeladen und bleiben getrennt.
- Die Edge Function nutzt eine eigene Code-Prüfung; direkte Tabellenzugriffe für `anon` und `authenticated` sind entzogen und RLS ist aktiviert.
- Gemeinsame Monatsraten werden beim Abruf serverseitig genau einmal verbucht; ein Unique Index verhindert doppelte Ratenbuchungen.

## Wichtige Dateien
- `index.html`: Haupt-App und private Kernlogik.
- `auto-calc.js`: vereinfachtes Anlegen privater Kredite + Sonderzahlungs-Prognose.
- `shared-sync.js`: UI und Verbindung für gemeinsame Kredite.
- `sw.js`: Service Worker und Cache-Version. Bei sichtbaren Änderungen Cache-Version erhöhen.
- `manifest.webmanifest`: PWA-Metadaten.
- `icon.svg`, `icon-192.png`, `icon-512.png`: Icons.
- `forecast.js`: ältere separate Prognose-Erweiterung; aktuelle Prognose steckt zusätzlich direkt in `auto-calc.js`.

## Supabase-Struktur
Aktiv für die gemeinsame Nutzung:
- `couple_spaces`
- `couple_loans`
- `couple_transactions`
- Edge Function `couple-sync`

Frühere Auth-basierte Versuchstabellen (`households`, `household_members`, `shared_loans`, `shared_transactions`) sind nicht Teil des aktuellen Frontends.

## Regeln für zukünftige Änderungen
1. Bestehende private Datenstruktur und localStorage-Key `kreditplaner_v1` nicht ändern, außer mit Migration.
2. Den gemeinsamen Code-Key `kreditplaner_shared_code` beibehalten, damit bestehende Verbindungen nicht verloren gehen.
3. Vor größeren Änderungen einen Git-Commit als stabilen Wiederherstellungspunkt festhalten.
4. Änderungen möglichst klein halten; die App soll mobil und simpel bleiben.
5. Nach UI-/JS-Änderungen `sw.js` Cache-Version erhöhen, damit iOS/GitHub Pages die neue Version lädt.
6. Sonderzahlungen und Prognose müssen das dynamische Enddatum aus aktueller Restschuld / Monatsrate berechnen.
7. Private Kredite dürfen niemals automatisch in Supabase kopiert werden.
8. Gemeinsame Tabellen niemals direkt für `anon` freigeben; Zugriff nur über die geprüfte Edge Function.
9. Nach Änderungen testen: private Kredite, gemeinsamer Bereich, Erstellen/Beitreten, gemeinsamer Kredit, Monatsrate, Sonderzahlung, Verlauf, Reload und zweites Gerät.

## Start für die nächste Sitzung
Zuerst diese Datei lesen. Danach `index.html`, `auto-calc.js`, `shared-sync.js` und `sw.js` prüfen. Für Serverlogik die Edge Function `couple-sync` und die drei `couple_*` Tabellen prüfen. Der Commit `7a22c122...` bleibt der Rückfallpunkt für die reine lokale Version.
