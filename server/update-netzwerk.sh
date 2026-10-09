#!/bin/sh
# Lernpfad Lektion 7: holt den neuesten Stand der Webseite aus GitHub und baut sie nur neu, wenn sich etwas geändert hat.
# Wird nachts von dentopoint_app/server/update-anzeige.sh mit aufgerufen, kann aber auch von Hand laufen.
set -eu
cd "${NETZWERK:-$HOME/dentopoint/dentopoint-network-infra}"
# Pausenschalter (siehe dentopoint_app/server/update-anzeige.sh): mit Datei .pausiert bleibt die Webseite aus
if [ -f .pausiert ]; then echo "Webseite pausiert (Datei .pausiert), kein Update und kein Start"; exit 0; fi
VOR=$(git rev-parse HEAD)
git pull -q
NACH=$(git rev-parse HEAD)
if [ "$VOR" != "$NACH" ]; then
  docker compose up -d --build
  echo "Webseite aktualisiert: $(git log --oneline "$VOR..$NACH" | wc -l) neue Änderungen, Stand $(git log -1 --format='%h %s')"
else
  echo "Webseite unverändert, Stand $(git log -1 --format='%h %s')"
fi
