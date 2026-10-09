# Baut die Webseite dentopoint.care (DentoPoint Network) und liefert sie mit Caddy aus (Lernpfad Lektion 7).
# Die Werte aus .env (VITE_…) werden beim Bauen eingebrannt: zurzeit noch die Lovable-Datenbank, ab Lektion 7c die eigene.
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Vorrendern: fertige HTML-Datei je öffentlicher Seite, damit Suchmaschinen den Text ohne JavaScript sehen (scripts/prerender.mjs)
FROM mcr.microsoft.com/playwright:v1.55.0-noble AS prerender
WORKDIR /p
RUN npm install --no-save --no-audit --no-fund playwright@1.55.0
COPY scripts/prerender.mjs ./
COPY --from=build /app/dist ./dist
RUN node prerender.mjs dist

FROM caddy:2-alpine
COPY --from=prerender /p/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
