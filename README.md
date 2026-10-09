# DentoPoint Network (dentopoint.care)

Webseite von DentoPoint für Praxen, Hersteller und Partner. Entwickelt in Lovable (Projekt „DentoPoint Network“), der Code liegt hier; Änderungen aus Lovable landen automatisch in diesem Repository und umgekehrt.

## Betrieb auf dem eigenen Server (Lernpfad Lektion 7)

Die Seite läuft als Container `netzwerk` neben der Automatenanzeige und ist nur über den Cloudflare-Tunnel aus `dentopoint_app` erreichbar (kein eigener Port). Beide Repositories liegen nebeneinander unter `~/dentopoint/`.

Einrichten (einmalig):

```sh
cd ~/dentopoint && git clone https://github.com/kaskasido/dentopoint-network-infra
cd dentopoint-network-infra && docker compose up -d --build
```

Danach in Cloudflare Zero Trust beim Tunnel `dentopoint-server` eine Route ergänzen: `netzwerk.dentopoint.com → http://netzwerk:80`. Die Testadresse zeigt dieselbe Seite wie dentopoint.care; die echte Domain wird erst in Lektion 7e umgehängt.

Aktualisieren: `sh server/update-netzwerk.sh` (holt den neuesten Stand und baut nur bei Änderungen neu). Das nächtliche Update der Anzeige um 04:15 ruft dieses Skript mit auf.

Suchmaschinen: Beim Bauen rendert `scripts/prerender.mjs` jede öffentliche Seite (Liste `ROUTES`, dieselbe wie in `public/sitemap.xml`) in einem Chromium vor und legt sie als fertige HTML-Datei ab (`/clinics/index.html` usw.). Alle anderen Pfade bekommen die App-Hülle `spa.html`. Der erste Bau lädt dafür das Playwright-Abbild (rund 2 GB). Titel und Beschreibung je Seite stehen in den Übersetzungen unter `seo`, gesetzt über `usePageSeo` aus `src/lib/seo.ts`. Neue öffentliche Seite: dort einen Eintrag ergänzen, `usePageSeo` aufrufen und den Pfad in `ROUTES` und `sitemap.xml` eintragen.

Stand der Datenbank: Die Seite nutzt noch die Lovable-Datenbank (`.env`). Der Wechsel auf die eigene Supabase unter db.dentopoint.com ist Lektion 7c.

## Lovable

## Project info

**URL**: https://lovable.dev/projects/9400cd2f-d9fa-4aea-bf3f-cfd0037f1b52

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9400cd2f-d9fa-4aea-bf3f-cfd0037f1b52) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9400cd2f-d9fa-4aea-bf3f-cfd0037f1b52) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
