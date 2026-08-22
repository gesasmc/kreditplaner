# Kreditplaner – Weiterentwicklung

## Stabiler Ausgangspunkt
Stand: 22.08.2026, PWA Cache v14.
Wiederherstellungs-Commit vor dieser Dokumentation: `7a22c122d7ee9decdafa4623043574cb3a3e7133`.

## Aktueller Funktionsumfang
- Mobile GitHub-Pages-PWA, Daten ausschließlich im localStorage (`kreditplaner_v1`).
- Zwei Ansichten: Übersicht und Kredite.
- Kreditkarten standardmäßig zugeklappt mit Restschuld, Monatsrate, nächster Rate, Fortschrittsbalken und dynamischem voraussichtlichem Enddatum.
- Neue Kredite: Name, Monatsrate und Enddatum; Restschuld wird automatisch aus verbleibenden Monatsraten berechnet. Nächste Rate ist der 1. des nächsten Monats.
- Fällige Monatsraten werden beim Öffnen automatisch einmalig abgezogen und im Verlauf verbucht.
- Sonderzahlungen reduzieren die Restschuld und ziehen das prognostizierte Enddatum vor.
- Aufgeklappte Kredite: Verlauf, Sonderzahlungen, Bearbeiten.
- Sonderzahlungs-Prognose simuliert Betrag, neue Restschuld, neues Enddatum und ungefähr eingesparte Monate, ohne Daten zu verändern.
- Sicherung/Import als JSON.
- Hell/Dunkel über Systemdarstellung.
- PWA/Homescreen-Icons vorhanden.

## Wichtige Dateien
- `index.html`: Haupt-App und Kernlogik.
- `auto-calc.js`: vereinfachtes Anlegen neuer Kredite + Sonderzahlungs-Prognose.
- `sw.js`: Service Worker und Cache-Version. Bei sichtbaren Änderungen Cache-Version erhöhen.
- `manifest.webmanifest`: PWA-Metadaten.
- `icon.svg`, `icon-192.png`, `icon-512.png`: Icons.
- `forecast.js`: ältere separate Prognose-Erweiterung; die aktuelle Prognose ist zusätzlich direkt in `auto-calc.js` integriert. Bei späterer Bereinigung erst testen, bevor diese Datei entfernt wird.

## Regeln für zukünftige Änderungen
1. Bestehende Datenstruktur und localStorage-Key `kreditplaner_v1` nicht ändern, außer mit Migration.
2. Vor größeren Änderungen einen Git-Commit als stabilen Wiederherstellungspunkt festhalten.
3. Änderungen möglichst klein halten; die App soll mobil und simpel bleiben.
4. Nach UI-/JS-Änderungen `sw.js` Cache-Version erhöhen, damit iOS/GitHub Pages die neue Version lädt.
5. Sonderzahlungen und Prognose müssen das dynamische Enddatum aus aktueller Restschuld / Monatsrate berechnen.
6. Bestehende Kredite dürfen beim Bearbeiten nicht versehentlich neu berechnet oder deren Verlauf gelöscht werden.
7. Nach Änderungen insbesondere testen: Anlegen, Auf-/Zuklappen, Monatsrate, Sonderzahlung, Prognose, Verlauf, Export/Import und Reload/PWA-Cache.

## Start für die nächste Sitzung
Bitte zuerst diese Datei lesen und anschließend den aktuellen Stand von `index.html`, `auto-calc.js` und `sw.js` prüfen. Der oben genannte Commit ist der stabile Referenzpunkt, falls eine Änderung zurückgerollt werden muss.
