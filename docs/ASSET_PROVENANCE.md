# Public asset provenance

## Responsive derivatives — November 21, 2026

`scripts/prepare-preview-assets.ts` creates resized WebP derivatives from the
approved FEU logo and eleven approved application captures only. No UI was
generated, reconstructed or enlarged. Source files remain unchanged. The exact
source/variant SHA-256 hashes, dimensions and encoded sizes are recorded in
`preview-asset-manifest.json` and checked against the built public files.
Home's 26px FEU badge selects a 64px (2970 bytes) or 128px (7566 bytes) image instead
of the 205812-byte source. Home, collection and case-opening captures use srcset;
enlargement dialogs and existing full case galleries retain approved originals.

## Approved portrait branding — November 18, 2026

Owner clarification: the portrait is used only for browser/saved-site icons.
The header is text-only; the previously generated WebP is no longer rendered.

The owner supplied `Salvacion_Portfolio_newlogo.png` and explicitly requested its
use as the portfolio identity. `brands/joshua-portrait.webp` (160×160),
`favicon-portrait.png` (64×64) and `apple-touch-icon.png` (180×180) are top-aligned
square crops, resized with Sharp and stripped of metadata. No retouching or AI
generation is applied. The original remains unchanged; SHA-256:
`0ecb9524db3652651da31540057daaba1d3e9c8ed5a6cd3e5a8f27a79edce553`.
Recreate with `node scripts/prepare-portrait.mjs "<approved source path>"`.
The header retains the visible name and accessible home-link label. This explicit
approval supersedes the initial no-portrait direction for branding only.

## Current Barion media — November 16, 2026

`images/barion-current-{home,source,review}.webp` and `videos/barion-review.webm`
are actual captures of the modified local web preview, not generated mockups.
Fresh browser storage used the built-in synthetic deck, with dotenv disabled and
external requests blocked. No external requests or page errors occurred during capture.
The silent VP9 video is 14.4 seconds, 390×844, 25 fps and 778,418 bytes. It shows
opening review, revealing, inspecting source provenance, rating Good and advancing.
Sample content is not medical advice. WebP encoding strips image metadata. Hashes
and timestamps are in `barion-capture-manifest.json`. Earlier Barion assets below
are historical import records, no longer used by the pages.

## Original asset import

All assets were inspected locally before being included. No project database, private dataset, credential file or raw manuscript is included. The later owner-approved portrait is documented above.

| Portfolio asset                     | Source                                               | Treatment                                                                                                                                                                                 |
| ----------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `images/pcosina-plan.webp`          | PCOSina `tools/avp/v2_3d/public/assets/week.png`     | WebP encoding; unchanged 784 × 1745 image content                                                                                                                                         |
| `images/pcosina-grocery.webp`       | PCOSina `tools/avp/v2_3d/public/assets/shopping.png` | WebP encoding; unchanged 784 × 1745 image content                                                                                                                                         |
| `images/barion-home.webp`           | Barion local checkout `medstudy-home-settled.png`    | WebP encoding; historical MedStudy dashboard, 1366 × 900                                                                                                                                  |
| `images/barion-review.webp`         | Barion local checkout `medstudy-study-mobile.png`    | WebP encoding; historical sample study screen, 390 × 844                                                                                                                                  |
| `Joshua-Salvacion-Resume.pdf`       | Owner-selected `SALVACION_JOSHUA_RESUME.pdf`         | Byte-for-byte copy; includes contact details already present in the approved public document                                                                                              |
| Former `images/resume-preview.webp` | Render of approved PDF                               | Removed from public assets November 21; recoverable local backup at ignored `output/resume-preview-original.webp`. Current preview is an abstract CSS silhouette; approved PDF untouched. |
| `social-card.png`                   | Portfolio typographic artwork                        | Generated from local SVG, no synthetic project UI                                                                                                                                         |

The PCOSina captures also appear in the project's presentation assets. They show application functionality, not a portfolio-created UI. The Barion captures are clearly labeled as earlier development-stage media; their seeded values are sample UI data, not usage statistics or project outcomes.

Resume SHA-256: `1854a1d13980b57337470da29ddea30eadd2ddb8a242bb2ebbbb47481cb4211c`.

Machine-readable image dimensions, sizes and resume hash: `media-manifest.json`.

## Credential and identity update — November 15, 2026

The owner explicitly approved the two PDFs and three event photographs below for
the portfolio. Event photos are contextual group photos, not a profile portrait.
No identities or private contact details were transcribed from visible badges/screens.
Original source files and application repositories remain unchanged.

- `certificates/it-specialist-python.pdf`: owner-supplied `Cert23661857621.pdf`;
  Information Technology Specialist — Python, Certiport/Pearson VUE, July 31, 2025.
  Document states five-year validity and verification code `2rNW-XMzH` at
  https://verify.certiport.com/. SHA-256:
  `7da6ea1734407e2b96bd616149473c53caa1c530a3cbd71327976691c33752bf`.
- `certificates/sap-autonomous-enterprise.pdf`: owner-supplied SAP certificate;
  SAP Certified — Positioning the Autonomous Enterprise, July 18, 2026 through
  July 19, 2027. Enterprise positioning knowledge, not a software-development credential.
  Embedded issuer link: https://www.credly.com/badges/b85e3286-172d-4043-af54-31c1a2bb43ca.
  SHA-256: `ebbeabb5f524229282fdb96d060c7c45c41095d5a0bd575aa442d7cb4844f6ec`.
- Both PDF files are byte-for-byte copies. Full-page 1584 × 1224 previews are rendered
  from the originals. PyMuPDF emitted an AES filter warning for the Python document;
  extraction and rendering completed and the complete rendered page was visually
  inspected. The source was not repaired or rewritten. Issuer web status was not
  independently validated; the site describes what the documents state.
- `images/events/*.webp`: `CHAMPION.jpg`, `UP HACKATHON.jpg`, `BUILDATHON.jpg` supplied
  by owner with explicit event associations. Full frame retained, maximum dimension
  1600px, metadata stripped. The UP Computer Science and Adamson University context
  is owner-confirmed; no unverified campus, organizer, ranking or role is added.
  See `event-media-manifest.json` for dimensions and source hashes.
- `brands/pcosina.webp`: PCOSina `app/src/main/res/drawable/pcosina_logo.png`, referenced
  by Android UI. `brands/barion.webp`: Barion `app/image/BARIONLOGO.png`, referenced by
  `app.json`. Full artwork retained and resized to 256px. The unused Expo starter
  icon is not used.

### Third-party marks

FEU Tech education mark (November 20, 2026): downloaded from the official site's
`https://www.feutech.edu.ph/images/Tech_Logo.png`, linked from
`https://www.feutech.edu.ph/`. Original PNG: 1313 × 1600, 329,646 bytes,
SHA-256 `b3ad9a9486cb914c052f5c75a07efb9b3cdde14057d441f5ef43b277c800d8e8`.
Local `brands/feu-tech.webp`: lossless WebP conversion at unchanged dimensions,
205,812 bytes, SHA-256 `0c626dd723cc84b272221596bbd8c2bcf12f48f3662c8b8a010679c5b83bbea4`.
No cropping, recoloring, invented details or upscaling. The mark identifies the
owner's stated school; it does not independently verify enrollment or imply endorsement.
Original download is retained in ignored `output/brand-sources/`.

The approved `brands/joshua-portrait.webp` is reused without modification in the
November 20 sidebar/mobile brand. This supersedes the November 18 text-only-header
presentation decision; favicon and Apple touch icon remain unchanged.

Seventeen technology/contact SVGs are exported from Simple Icons 16.37.0 (development
dependency) and served locally; no complete icon collection is shipped to the browser.
Paths retain their source geometry, with the package's supplied brand color. Sources,
available individual license information and guidelines are recorded in
`brand-asset-manifest.json`. Simple Icons' CC0 distribution does not override the
trademark or other rights of individual brand owners; marks identify tools or contact
destinations, not endorsement. See https://github.com/simple-icons/simple-icons and
its DISCLAIMER.md. Conceptual icons use Lucide rather than fabricated brand marks.

LinkedIn's blue [in] mark is from its official `in-logo.zip`, linked by
https://brand.linkedin.com/downloads. It is resized proportionally without recoloring
and used only as a hyperlink to the owner-supplied profile, consistent with
https://brand.linkedin.com/in-logo. The profile URL is owner-supplied; automated
profile access was blocked by LinkedIn and is not described as independently verified.
