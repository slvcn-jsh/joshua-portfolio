# Release status

Owner authorization: public GitHub repository and Vercel deployment after QA,
explicitly confirmed on 2026-11-14.

- Local implementation: complete, including the Behind the interface interactions and November 15 editorial refinement.
- GitHub: public repository at https://github.com/slvcn-jsh/joshua-portfolio, default branch `main`.
- Vercel: production deployment is READY in the owner's `joshua-salvacions-projects` scope.
- Public website: https://joshua-portfolio-phi-lemon.vercel.app (anonymous access verified).
- Production `SITE_URL`: persisted as a production-only Vercel Config variable using the public origin above. Production indexing and sitemap are enabled; preview builds remain noindex.
- Live checks: nine routes, canonical URLs, nine-entry sitemap, robots, all configured security headers, genuine 404 responses, immutable assets and the unchanged resume SHA-256 passed.
- Live browser checks: 18 page/viewport combinations (390 and 1440px), both walkthroughs, annotations, modal/Escape/focus, Barion challenge, mobile navigation and real PDF download passed with no browser/CSP errors.
- GitHub Actions: the initial quality workflow passed clean install, lint/build/static checks, SEO mode checks and dependency audit.
- Automatic GitHub-to-Vercel deployment: not established. Both CLI connection attempts failed; the owner was asked to connect the repository through the project's Git settings. Direct authenticated CLI deployment works and was used for this release.

Latest production deployment verified (2026-11-15): `dpl_6s7CtDXVqU8BpDKQaZJwsa1ytH1h`.
Application implementation commit: `6cf5636` (editorial hierarchy and design refinement).
The original release was `255409b` / `dpl_7hcFMmTvxXMRmVfJmJEAbDUoZFWU`.
All nine public routes and 18 production browser/viewport combinations passed again
after the refinement, including security headers, metadata, real 404s, PDF integrity
and interactive behavior. GitHub Actions run `43679890548` passed for `6cf5636`.

## Updating the live site

Until the Git integration is confirmed, pushing to GitHub does **not** update Vercel automatically. After reviewing and passing `npm run check` and `npm run check:seo`, push the commit and run:

```sh
npx vercel deploy --prod --yes --scope joshua-salvacions-projects
node scripts/check-deployment.mjs https://joshua-portfolio-phi-lemon.vercel.app
```

The local `.vercel/` link and `.env.local` credential file are ignored by Git; `.vercelignore` excludes local environment files, browser artifacts and build caches from upload. Do not publish or copy their credentials.

No application repository was modified. No domains were purchased, and no account
plan or unrelated account settings were changed.
