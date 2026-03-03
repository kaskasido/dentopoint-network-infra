# DentoPoint – GitHub Copilot Instructions

## Project
DentoPoint is a B2B SaaS startup operating a network of smart dental-care dispensing automats
in clinics across EU and Asian markets. The platform connects four stakeholder groups — clinics,
manufacturers, investors, and strategic partners — each with their own role-protected portal.

**Stack**: React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Supabase (auth + DB) · Leaflet maps

## Multi-Agent Architecture
This repository is operated by **6 Copilot Coding Agents**. See `AGENTS.md` for the full spec.

| Agent | Role | Primary area |
|-------|------|--------------|
| Agent 0 | Orchestrator (Founder Proxy) | Strategy, escalations, cross-agent coordination |
| Agent 1 | Engineering | CI/CD, deployments, security, code quality |
| Agent 2 | Growth | Analytics, localisation, market expansion |
| Agent 3 | Operations | Automat network health, maintenance, SLA |
| Agent 4 | Business Development | Clinic/partner onboarding, deal pipeline |
| Agent 5 | Finance & Legal | KPIs, investor reporting, compliance |

When making code changes, always indicate which agent owns the affected area in PR descriptions.

## Coding Conventions
- All components use **named exports**, not default where possible (exception: page-level route components)
- Use `t.sectionName` (typed) — never `(t as any).sectionName`
- Translations live in `src/i18n/translations/`. Always add new keys to **en.ts first**, then other languages
- Portal sections map to `src/pages/portal/` + `src/components/portal/<role>/`
- Database types are auto-generated in `src/integrations/supabase/types.ts` — do not hand-edit
- Mock data in `src/data/mock*.ts` is the **source of truth** until Supabase queries are implemented

## Testing
- Run `npm test` (vitest) before every PR
- `src/test/i18n.test.ts` enforces ≥ 75% translation coverage for every language — must stay green
- TypeScript: `npx tsc --noEmit` must pass with zero errors

## Branch & PR conventions
- Feature branches: `feat/<agent-id>/<short-description>` (e.g. `feat/agent-2/add-nl-translations`)
- Bugfix branches: `fix/<agent-id>/<issue-number>`
- Every PR must have the CI workflow green before merge
- Use the PR template (`.github/PULL_REQUEST_TEMPLATE.md`)

## Security
- Never commit secrets. `.env` is in `.gitignore` — use `.env.example` as the template
- All Supabase RLS policies live in `supabase/migrations/` — changes require Agent 5 review
- CodeQL scans run weekly; all HIGH/CRITICAL alerts must be resolved within 48 h (Agent 1)

## Global Scaling
When adding a new market:
1. Add translation file to `src/i18n/translations/<code>.ts`
2. Register language in `src/i18n/LanguageContext.tsx` and `src/i18n/localeMap.ts`
3. Add representative automat to `src/data/mockAutomats.ts`
4. Add region row to `src/data/mockInvestorData.ts`
5. Follow the full checklist in `AGENTS.md → Global Scaling Checklist`
