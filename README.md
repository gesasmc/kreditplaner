# Kreditplaner – Handy-PWA

Kleine, rein lokale Webapp zur privaten Verwaltung von Krediten.

## Funktionen

- mehrere Kredite verwalten
- Kreditsumme, aktuelle Restschuld, Monatsrate und Enddatum
- Sonderzahlungen mit Datum und Notiz
- Verlauf der Monatsraten und Sonderzahlungen
- automatische Nachbuchung fälliger Monatsraten beim nächsten Öffnen
- lokaler Speicher im Browser, keine Cloud-Datenbank
- Export/Import als JSON-Sicherung
- installierbar als PWA und nach der ersten Installation offline nutzbar
- bewusst für Smartphones ausgelegt

## Wichtig zur Automatik

Eine geschlossene Webapp kann auf Smartphones nicht zuverlässig jeden Monat im Hintergrund ausgeführt werden. Deshalb prüft die App bei jedem Öffnen, welche Raten seit der letzten Nutzung fällig waren, und verbucht jede Fälligkeit genau einmal.

## Datenschutz

Persönliche Kreditdaten werden ausschließlich im lokalen Browser-Speicher des jeweiligen Geräts gespeichert. Im GitHub-Repository liegen nur die App-Dateien, keine Kreditdaten. Regelmäßige Exporte über **Sicherung** werden empfohlen.

## GitHub Pages

Für GitHub Pages kann der Inhalt dieses Repositorys direkt aus `main` / `/ (root)` veröffentlicht werden.
