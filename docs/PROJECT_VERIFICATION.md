# Project verification — November 15–16, 2026

| Project | Check                              | Outcome                                   | Limit                                                                              |
| ------- | ---------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------- |
| PCOSina | Five selected planner pytest cases | 5 passed, 111 deselected; 5.47 s          | Modified planner and tests; not full suite, Android or clinical validation         |
| Barion  | FSRS and generation Jest suites    | 2 suites, 7 tests passed; 12.707 s        | Providers stubbed; adapter files unchanged from HEAD but local dependencies differ |
| Barion  | Local web sample review capture    | Open → reveal → source → Good → next card | Modified development tree, synthetic deck, not native or production certification  |
| PCOSina | Android device discovery           | No connected devices                      | No fresh device recording                                                          |

Commands, base revisions, selected file hashes and limits are in the downloadable
`public/evidence/*-verification.json` records. Hashes identify selected files, not
a reproducible archive of all dependencies. Public links remain pinned to published
commits, not misrepresented as the exact working tree tested or recorded.

PCOSina's one pytest warning concerned `cache_dir` with the cache provider disabled.
Barion's web warnings concerned missing optional Supabase configuration, reduced
motion and the web fallback for native animation. No page errors occurred during
the captured flow; authentication and external AI services were not exercised.

## Reproduce the isolated capture

Use existing Barion dependencies. Do not use its combined development launcher,
which can load dotenv and start a gateway. From its checkout in PowerShell:

```powershell
$env:EXPO_NO_DOTENV='1'
$env:EXPO_NO_TELEMETRY='1'
$env:CI='1'
$env:BARION_WEB_PORT='8081'
$env:BARION_METRO_PORT='8082'
node scripts/start-web.js --web
```

Adding `--localhost` bound Metro to IPv6 while the proxy expected IPv4, causing 503.
Omitting the flag resolved that mismatch without application edits. Stop this
development service after capture. In the portfolio, `node scripts/capture-barion.mjs`
uses fresh storage and blocks external requests. Inspect the images and video, then
run `node scripts/prepare-current-barion.mjs` to import them. The video has no audio;
adjacent written steps provide an accessible alternative.

## Ownership and first-person voice

The owner confirmed sole software-development responsibility for both applications,
with AI coding assistance. This does not imply solitary event participation or
ownership of third-party dependencies. First-person text describes source-backed
implementation and tradeoffs, not invented bug history, rejected alternatives,
user feedback or metrics. Owner review of personal wording remains open.

## Boundaries and follow-up

Neither application source repository was edited, committed or pushed. Existing
uncommitted work was preserved; runtime tooling may update ignored local caches.
Next: make snapshots reproducible, run full suites, record PCOSina on a device,
verify native and deployed behavior, and independently review health/learning
content. Public-repository presentation work is prepared in `REPOSITORY_HANDOFF.md`
without modifying either application checkout.
