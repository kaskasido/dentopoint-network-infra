# DentoPoint – Multi-Agent Architecture for Global Scaling

## TL;DR

**6 agents total** give you minimal but 100% coverage of all startup functions.
One Agent 0 (founder proxy) orchestrates five specialist sub-agents.

```
                      ┌─────────────────────┐
                      │   AGENT 0           │
                      │   Orchestrator      │
                      │   (Founder Proxy)   │
                      └─────────┬───────────┘
           ┌──────────┬─────────┼──────────┬──────────┐
           ▼          ▼         ▼          ▼          ▼
       Agent 1    Agent 2   Agent 3    Agent 4    Agent 5
     Engineering   Growth  Operations  BizDev    Finance
                                                 & Legal
```

---

## Why exactly 5 sub-agents?

| Domain | Without dedicated agent | With dedicated agent |
|--------|-------------------------|----------------------|
| Engineering | Code rots, outages go unfixed | CI/CD runs, security patched, deploys automated |
| Growth | No new users / regions | KPIs tracked, markets prioritised, localisations shipped |
| Operations | Device network degrades silently | Alerts acted on, SLA maintained, maintenance coordinated |
| Business Development | Deals stall, onboarding slow | Pipeline moves, partners activated, contracts closed |
| Finance & Legal | Investor relations drop, compliance risk | Reports automated, compliant in every market |

Fewer than 5 sub-agents means one agent must cover two distinct domains — proven to reduce quality. More than 5 adds coordination overhead without new coverage. **5 is the minimum for complete coverage.**

---

## Agent 0 — Orchestrator (Founder Proxy)

### Mission
Makes final decisions, sets strategy, reviews weekly rollups from all sub-agents, and escalates external blockers (funding, legal crises, board updates) to the human founder.

### Responsibilities
- Approve/reject sub-agent escalations
- Set OKRs per quarter for each sub-agent
- Cross-agent conflict resolution
- Manage Board / investor communications
- Weekly 30-min sync with founder

### Decision authority
| Decision type | Can decide alone | Must escalate to founder |
|--------------|-----------------|--------------------------|
| Product roadmap changes < 2 weeks effort | ✅ | |
| Hiring / contractors > €5K/mo | | ✅ |
| New market entry | | ✅ |
| Security incident response | ✅ | |
| Investor updates | ✅ draft | ✅ final sign-off |
| Contract > €50K | | ✅ |

### Inputs
- Weekly status reports from Agents 1–5
- KPI dashboard (Investor Portal)
- Alert feed (Manufacturer Portal)

### Outputs
- Weekly founder brief (1 page)
- Quarterly OKRs per agent
- Escalation log

### GitHub integration
- Reviews and merges PRs from Agent 1 that require strategic context
- Has write access to `main` branch

---

## Agent 1 — Engineering Agent

### Mission
Keep the codebase healthy, deploys running, and infrastructure secure — without human involvement for routine work.

### Responsibilities
- Review and merge pull requests (automated CI must be green)
- Deploy to production on merge to `main`
- Monitor Sentry / uptime alerts, create issues for regressions
- Run weekly `npm audit` and open PRs for CVE fixes
- Maintain CI/CD pipelines (`.github/workflows/`)
- Review and action CodeQL security alerts
- Scale infrastructure when network crosses region thresholds
- Manage Supabase migrations

### Triggers
| Trigger | Action |
|---------|--------|
| PR opened | Run CI (`ci.yml`), review code, post comment |
| CI fails on `main` | Create incident issue, page Agent 0 |
| CVE severity HIGH/CRITICAL | Open fix PR within 24h |
| New region onboarded | Provision Supabase project for region |
| i18n test fails | Notify Agent 5 (Content coverage drop) |

### KPIs
- Deployment frequency: ≥ 1/day
- Change failure rate: < 5%
- Mean time to restore (MTTR): < 2h
- Dependency CVEs (HIGH+): 0 open > 48h

### GitHub integration
- **Automation**: `.github/workflows/ci.yml`, `.github/workflows/codeql.yml`
- Write access to all branches except `main`
- Merges to `main` require Agent 0 approval (or green CI + 1 review)

---

## Agent 2 — Growth Agent

### Mission
Drive measurable user acquisition and market expansion across all regions by coordinating localisation, analytics, and conversion optimisation.

### Responsibilities
- Own KPI dashboard (Investor Portal → Growth tab)
- A/B test landing-page copy and signup flows
- Commission and QA translations for new markets (feeds back to i18n test in CI)
- Monitor regional automat deployment rates and flag under-performing regions
- Generate weekly growth report → Agent 0
- Plan and track market-entry checklist per new country

### Global market priority queue (current)
| Priority | Market | Status | Blocker |
|----------|--------|--------|---------|
| 1 | Germany (home) | 🟢 Active | — |
| 2 | Austria + Switzerland | 🟡 Pilot | Partner contract |
| 3 | Netherlands + Belgium | 🟡 Pilot | Translation QA |
| 4 | Turkey | 🔵 Planned | MDR adaptation |
| 5 | Singapore + UAE | 🔵 Planned | Regulatory research |
| 6 | Japan + South Korea | 🔵 Planned | Language + compliance |

### KPIs
- Month-over-month clinic signups: target +15%
- New country activations per quarter: ≥ 1
- Translation coverage (CI test): 100%
- Landing-page conversion rate (per language): tracked weekly

---

## Agent 3 — Operations Agent

### Mission
Ensure the physical automat network runs at maximum uptime and fill levels, coordinating manufacturers, technicians, and clinics.

### Responsibilities
- Monitor all automat alerts (Manufacturer Portal → Alerts)
- Dispatch maintenance for automats offline > 4h
- Track fill levels; trigger refill orders when below 40%
- Maintain maintenance schedule and SLA compliance
- Interface with clinic contacts for access coordination
- Coordinate hardware warranty and spare-parts logistics
- Generate weekly network health report → Agent 0

### Alert response matrix
| Alert type | Response time | Action |
|------------|--------------|--------|
| Automat offline > 4h | 4h | Dispatch technician |
| Fill level < 40% | 24h | Schedule refill |
| Fill level < 20% | 4h | Emergency refill |
| Payment system error | 2h | Remote reset + escalate |
| Temperature out of range | 1h | Check + dispatch |

### KPIs
- Network uptime: ≥ 98.5%
- Average fill level across fleet: ≥ 65%
- Mean time to resolve alert: < 24h
- Preventive maintenance on schedule: ≥ 95%

### Geographic expansion ops checklist (per new country)
- [ ] Customs/import clearance for automat hardware
- [ ] Local power adapter / standards verified
- [ ] Local payment processor integrated
- [ ] Local technician network established
- [ ] Spare parts depot in region

---

## Agent 4 — Business Development Agent

### Mission
Build the pipeline of clinics, manufacturers, and strategic partners that fuel network-effect growth in every market.

### Responsibilities
- Manage the deal pipeline (Partner Portal → Deals)
- Qualify and onboard new clinic partners
- Recruit and certify regional distribution partners
- Negotiate manufacturer supply agreements
- Track commission payments (Partner Portal → Commissions)
- Prepare partnership decks per market segment
- Coordinate with Agent 3 for post-deal hardware deployment

### Deal stages and owner actions
| Stage | Action required |
|-------|----------------|
| Lead | Qualify within 48h, send deck |
| Verhandlung (Negotiation) | Weekly follow-up, remove blockers |
| Abgeschlossen (Closed) | Trigger onboarding workflow, notify Agent 3 |
| Verloren (Lost) | Log reason, re-qualify in 90 days |

### KPIs
- Pipeline value: track weekly
- Lead-to-close conversion: target ≥ 25%
- Time to first automat install post-close: < 3 weeks
- Active distribution partners per region: ≥ 1

---

## Agent 5 — Finance & Legal Agent

### Mission
Keep the company financially healthy, investor-ready, and legally compliant in every market — without the founder spending time on reporting.

### Responsibilities
- Generate monthly/quarterly investor reports (Investor Portal data)
- Track ARR, MRR, gross margin, CAC, LTV/CAC (see `mockInvestorData.ts`)
- Calculate and process partner commissions
- Monitor regulatory compliance per market:
  - **EU**: GDPR, MDR (Medical Device Regulation), CE marking
  - **CH**: Heilmittelgesetz, SwissMedic
  - **TR**: TITCK medical device registration
  - **SG/AE**: Health Sciences Authority / Dubai Health Authority
  - **JP/KR**: PMDA / MFDS approval
- Manage tax registrations per country (VAT, corporate)
- Legal review of all partnership contracts > €10K
- Insurance coverage per new market

### Compliance tracker
| Market | GDPR | Local MDR equiv. | VAT reg. | Status |
|--------|------|-----------------|----------|--------|
| DE/AT/CH | ✅ | ✅ CE mark | ✅ | Active |
| NL/BE | ✅ | ✅ CE mark | 🔵 Planned | Pilot |
| TR | ✅ | 🔵 TITCK filing | 🔵 Planned | Planned |
| SG | N/A | 🔵 HSA filing | 🔵 Planned | Planned |

### KPIs
- Investor report: delivered ≤ 5 days after month close
- Commission payment accuracy: 100%
- Open compliance items (HIGH priority): 0
- Contracts reviewed within SLA: ≥ 95%

---

## Inter-Agent Escalation Matrix

```
Escalation path: Sub-agent → Agent 0 → Founder

Trigger                           | From    | To
----------------------------------|---------|--------
Outage > 2h                       | Agent 1 | Agent 0
New market entry decision         | Agent 2 | Agent 0 → Founder
Automat fleet uptime < 95%        | Agent 3 | Agent 0
Contract > €50K                   | Agent 4 | Agent 0 → Founder
Regulatory block in new market    | Agent 5 | Agent 0 → Founder
CVE CRITICAL in production        | Agent 1 | Agent 0 (immediate)
MRR growth < 5% two months in row | Agent 2 | Agent 0 → Founder
```

---

## Weekly Cadence

| Day | Activity |
|-----|----------|
| Monday 08:00 | Agents 1–5 generate status reports |
| Monday 09:00 | Agent 0 reviews all reports, compiles founder brief |
| Monday 10:00 | Agent 0 → Founder: 30-min async brief (written) |
| Wednesday | Mid-week KPI check by Agent 0 |
| Friday | Agent 0 reviews open escalations, closes resolved items |

---

## Repository Integration

### Automated workflows (Engineering Agent)
```
.github/
  workflows/
    ci.yml          # Lint + typecheck + test on every PR
    codeql.yml      # Security scanning (weekly + on push)
```

### Monitoring hooks (Operations Agent)
```
src/integrations/supabase/   # Real-time automat status
src/data/mockAutomats.ts     # Becomes live Supabase query
```

### KPI data (Finance + Growth agents)
```
src/data/mockInvestorData.ts  # Becomes live Supabase aggregation
src/data/mockPartnerData.ts   # Becomes live deal pipeline
```

### Localization (Growth Agent quality gate)
```
src/test/i18n.test.ts         # Fails CI if any translation key is missing
src/i18n/translations/        # 11 languages — target: 100% coverage
```

---

## Global Scaling Checklist

Use this when entering a new market:

### Technical (Agent 1)
- [ ] Supabase project provisioned in target region
- [ ] Environment variables configured for new region (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`)
- [ ] CDN distribution point added (Cloudflare / Vercel edge)
- [ ] Load tested for expected traffic

### Localisation (Agent 2)
- [ ] Translation file added to `src/i18n/translations/`
- [ ] Language added to `LanguageContext.tsx` Language type
- [ ] Locale added to `localeMap.ts`
- [ ] CI i18n test passes (all keys translated)

### Operations (Agent 3)
- [ ] Local technician partner contracted
- [ ] Automat import/customs approved
- [ ] First pilot location confirmed

### Business (Agent 4)
- [ ] Minimum 2 anchor clinic deals signed
- [ ] Regional distribution partner activated
- [ ] Go-to-market deck localised

### Finance/Legal (Agent 5)
- [ ] Legal entity / branch registered (or pass-through model approved)
- [ ] Local MDR-equivalent compliance confirmed
- [ ] VAT/tax registration filed
- [ ] GDPR DPA updated for new region

---

## Recommended Tooling per Agent

| Agent | Primary tools |
|-------|--------------|
| Agent 0 | GitHub (issues/PRs), Investor Portal, Email |
| Agent 1 | GitHub Actions, CodeQL, Sentry, Supabase dashboard |
| Agent 2 | Analytics platform, GitHub (i18n PRs), Growth dashboard |
| Agent 3 | Manufacturer Portal (alerts/map), Maintenance scheduler |
| Agent 4 | Partner Portal (deals/commissions), CRM |
| Agent 5 | Investor Portal (KPIs), Accounting software, Legal tracker |

---

*This document is owned by Agent 0. Update after every new market entry and every OKR cycle.*
