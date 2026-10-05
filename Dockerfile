# Baut die Webseite dentopoint.care (DentoPoint Network) und liefert sie mit Caddy aus (Lernpfad Lektion 7).
# Die Werte aus .env (VITE_…) werden beim Bauen eingebrannt: zurzeit noch die Lovable-Datenbank, ab Lektion 7c die eigene.
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM caddy:2-alpine
COPY --from=build /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
