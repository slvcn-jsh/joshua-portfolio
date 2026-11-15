# Release status

Owner authorization: public GitHub repository and Vercel deployment after QA,
explicitly confirmed on 2026-11-14.

- Local implementation: complete, including the Behind the interface interactions, editorial refinement, credentials, original event photos, brand marks and restrained motion.
- GitHub: public repository at https://github.com/slvcn-jsh/joshua-portfolio, default branch `main`.
- Vercel: production deployment is READY in the owner's `joshua-salvacions-projects` scope.
- Public website: https://joshua-portfolio-phi-lemon.vercel.app (anonymous access verified).
- Production `SITE_URL`: persisted as a production-only Vercel Config variable using the public origin above. Production indexing and sitemap are enabled; preview builds remain noindex.
- Live checks: ten routes, canonical URLs, ten-entry sitemap, robots, all configured security headers, genuine 404 responses, immutable assets, unchanged resume and both certificate SHA-256 hashes passed.
- Live browser checks: 20 page/viewport combinations (390 and 1440px), both walkthroughs, annotations, modal/Escape/focus, Barion challenge, all five new evidence dialogs, mobile navigation and real PDF downloads passed with no browser/CSP errors.
- GitHub Actions: the initial quality workflow passed clean install, lint/build/static checks, SEO mode checks and dependency audit.
- Automatic GitHub-to-Vercel deployment: not established. Both CLI connection attempts failed; the owner was asked to connect the repository through the project's Git settings. Direct authenticated CLI deployment works and was used for this release.

Latest production deployment verified (2026-11-15): `dpl_5CVPoohBEByvPykUyWBfNxcNimZc`.
Application implementation commit: `a783e18` (credentials, original event evidence, brand details and motion).
The original release was `255409b` / `dpl_7hcFMmTvxXMRmVfJmJEAbDUoZFWU`.
All ten public routes and 20 production browser/viewport combinations passed after
the credential and event update, including security headers, metadata, real 404s,
all three PDF files' integrity and interactive behavior. GitHub Actions run
`43708912668` passed for `a783e18`. An initial network failure and stalled upload
were followed by a successful retry; the verified production state is READY.

## Updating the live site

Until the Git integration is confirmed, pushing to GitHub does **not** update Vercel automatically. After reviewing and passing `npm run check` and `npm run check:seo`, push the commit and run:

```sh
npx vercel deploy --prod --yes --scope joshua-salvacions-projects
node scripts/check-deployment.mjs https://joshua-portfolio-phi-lemon.vercel.app
```

The local `.vercel/` link and `.env.local` credential file are ignored by Git; `.vercelignore` excludes local environment files, browser artifacts and build caches from upload. Do not publish or copy their credentials.

No application repository was modified. No domains were purchased, and no account
plan or unrelated account settings were changed.
