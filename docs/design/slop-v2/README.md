# Slop v2 design handoff

[Figma design proposal](https://www.figma.com/design/Rn7Z8KYAKbiz7S6ns6qB4i) · source `sym-ui` at `8c621b5be61201585c45b6e7596f1a3deb5c9dd4`.

This proposal redesigns the currently supported public route families and documents required account, funding and recovery targets. It does not change application source or establish live OAuth, wallet binding, permissions, provider availability, funding, payment, deployment or WCAG conformance. Current source and approved target behavior are labeled separately in the audit and Figma state data.

Authority: [canonical PRD, UX-01–17](../../slop-product-requirements.md#quality-review-requirements), [MVP-10 and dependencies](../../slop-mvp-plan.md#work-packages), [scoped payout migration](../../payouts-mvp.md), [Base/Solana payout plan](../../base-solana-payout-plan.md). MVP completion remains unconfirmed; future phases are blocked. The design does not resolve issuer/recovery authority, wallet-change delay, historical fee policy, review clocks or branch-policy discrepancies.

## Read the handoff

- [Source audit](source-audit.md): routes, aliases, query/fragment contracts, permissions, reused React components and implementation gaps.
- [Responsive specification](responsive-spec.md): fluid layout, primary canvases, adaptation widths, long values, scrolling and virtual keyboard.
- [Design decisions](decisions.md): Blackout direction, UX requirement mapping and policy gates.
- [Accessibility specification](accessibility-spec.md): contrast requirements, keyboard/focus, semantics and browser evidence limits.
- [Journey map](journey-map.json): deterministic named prototype journeys, route/state keys, mobile/desktop starting keys, recovery branches and missing states.

The journey map references the published `coverage.json` artifact, which records route/state keys and actual Figma frame coverage. Design coverage is not a runtime registry. Canonical project facts remain in `projects/*/project.json`.

## Canvas and artifact inventory

Three Figma design pages: **Direction/system**, **All routes / 4 devices**, **Flows/handoff**. Primary canvases: **390×844 mobile**, **834×1194 tablet portrait**, **1194×834 tablet landscape**, **1440×1000 desktop**. Fluid adaptation checkpoints: 320, 360, 375, 430, 768, 1024, 1280, 1920 and 2560 CSS pixels.

Recorded evidence covers 390 route/state compositions: core routes 68, additional named projects 44, edge layouts 16, meaningful states 228 (114 keys × desktop/mobile), and core-flow clones 34. Current total is 449 roots, including two expanded Activity compositions and two Activity anchor clones added to the earlier 445. Final native audit passed across all 449 roots and 12211 wired click actions: zero unwired actions, invalid destinations, missing roots or horizontal overflow. Pixel export review is complete within the 96-PNG scope below; representative prototype-player paths are recorded below. The system retains 27 UI families, 110 variants, 108 variables and 12 text styles. The final native audit includes the later additions.

Final node identities/counts belong to `coverage.json`. A component specimen does not substitute for a complete route-state frame. [Contrast evidence](contrast.json) records 24/24 native-backed pairings meeting 4.5:1. Figma faint `#938b7e` and pressed `#db4b12` are design-only refinements; they do not silently modify canonical application tokens.

| Evidence boundary                                                  | Status of this documentation                                                                                   |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Source route/state inventory                                       | Inspected against stated SHA and supplied authoring input                                                      |
| Local document format and relative link targets                    | Checked during document delivery                                                                               |
| Actual Figma frames and native geometry                            | 390 compositions; 449 total roots; native audit and 96-PNG review passed; representative player paths recorded |
| Prototype connections and 28 flow starts                           | Native wiring audit passed; 96-PNG review passed; representative player paths recorded                         |
| Responsive browser rendering, keyboard, zoom, assistive technology | Not run by documentation task                                                                                  |
| Live providers, wallet signatures, permissions, finality           | Not established by design                                                                                      |
| Production release / MVP phase completion                          | Not claimed                                                                                                    |

## Canonical route families

Links below show route destinations, not independent live availability verification. Parameterized families use source-backed example destinations; 404 is unmatched-route recovery.

| Family          | Destination                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| Home            | [Projects and discovery](https://slop.cash/)                                             |
| Project         | [Project example](https://slop.cash/projects/eliza) — `/projects/:id`                    |
| Project funding | [Public records](https://slop.cash/projects/eliza/funding) — `/projects/:id/funding`     |
| Project manage  | [Update draft](https://slop.cash/projects/eliza/manage) — `/projects/:id/manage`         |
| New project     | [Proposal](https://slop.cash/projects/new)                                               |
| Contributor     | [Public profile example](https://slop.cash/contributors/ss251) — `/contributors/:login`  |
| Login           | [GitHub entry](https://slop.cash/login)                                                  |
| Account         | [Personal setup](https://slop.cash/account)                                              |
| Points          | [Participation rules](https://slop.cash/points)                                          |
| Earnings        | [Payment account](https://slop.cash/earnings)                                            |
| Cycles          | [Archive](https://slop.cash/cycles)                                                      |
| Cycle           | [Historical example](https://slop.cash/cycles/eliza/2026-09) — `/cycles/:project/:cycle` |
| Receipts        | [Run metadata](https://slop.cash/receipts)                                               |
| Models          | [Self-reported diagnostics](https://slop.cash/models)                                    |
| Sponsors        | [Funding choices](https://slop.cash/sponsors)                                            |
| How it works    | [Process and verification](https://slop.cash/how-it-works)                               |
| 404             | Unmatched or malformed path; useful Home/Projects recovery                               |

Compatibility: `/wallet` → `/account#wallets`; `/verification` → `/how-it-works#verification`; `/points?x` displays Account. Preserve `/#projects`, `/#leaderboard`, `/points#rules`, `/points#people`, Account anchors, project `#start`/`#contributors`, funding `#payouts`, and shareable standings/archive query filters. Design-only state paths are not newly implemented public URLs. Proposed `/leaderboard`, `/admin`, legal/help/status and expanded account areas remain inventory gaps or gated targets beyond the current 17 route families.

## Prototype honesty and implementation handoff

All twelve audited manifests have zero committed funding and payment disabled. Historical snapshots and external-prize shares are not active balances. Illustrative escrow states must carry a visible gated-scenario label; never attribute a fictional award, signature or transfer to a real account. New escrow 2% gross deduction and 10% unused withdrawal apply only under the adopted scoped policy; preserve recorded legacy fees and immutable cycle evidence.

The journey map provides recovery branches as well as happy paths. The receipt journey includes distinct loading, unavailable-source and invalid-source branches with retry through loading; the no-match search state remains separate. Account-menu overlay coverage is present in the design; actual keyboard, focus restoration and assistive-technology behavior require later browser evidence. Do not map successful no-match to failure or invent unsupported route keys.

Future implementation should reuse the mapped React components and approved tokens. No Code Connect mapping is published by this documentation. Real browser checks, copy/download bytes, GitHub links, console/network logs, uploaded walkthrough and policy-specific provider/chain evidence remain separate required release boundaries.

## Scope-preserving prototype navigation

Project-scoped standings at `#contributors` show the source-backed 878.67 project score, distinct from the 905.67 global score; a profile/global metric must not be copied into a project cycle. Seven payout-workspace states use the actual `/projects/eliza/funding#payouts` route; two project standings states preserve project scope. Account-menu click and Escape behavior are Figma prototype interactions. React DOM focus, roving tab order, assistive-technology announcements and virtual-keyboard behavior still require implementation and browser verification.

## React mapping and review artifacts

The [source component inventory](source-audit.md#reused-components--figma-families--react-handoff) records the existing declarations, input props and proposed Figma family mapping. Apply the same rendering contract across route frames; no Code Connect mapping has been published.

| React ownership                                          | Figma presentation families                           | Scope / source reference                                                                                                                |
| -------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| App Header/Footer, Logo, PointsNav                       | Shell, Brand, account/menu                            | Existing source `src/App.tsx:262,279`, `src/Logo.tsx:5,42`, `src/Points.tsx:211`; overlays model interactions                           |
| Presentation, Link, ErrorBoundary                        | Resource notice, Identity, Amount, Link, Recovery     | Existing source `src/Presentation.tsx`, `src/Link.tsx:69`, `src/ErrorBoundary.tsx:16`; loading and unknown remain distinct              |
| ContributorStandings, ProjectLeaderboard                 | Ranking, filters, person rows, project-scoped metrics | `src/Points.tsx:876`, `src/ProjectLeaderboard.tsx:27`; shared existing inputs, UX-03 target refinements                                 |
| ProfilePage, Profiles                                    | Identity summary, activity, points and record details | `src/ProfilePage.tsx:43`, `src/Profiles.tsx:51`; public actor scope preserved                                                           |
| LoginPage, AccountPage, WalletRegistration, EarningsPage | Login, fields, consent, wallets, obligations          | `src/Points.tsx:791,799`, `src/WalletRegistration.tsx:40`, `src/Earnings.tsx:130`; binding/provider/recovery targets remain gated       |
| ProjectParticipation, ProjectFunding, SignerReports      | Project state, skill install, funding evidence        | `src/App.tsx:753,1064,1147`; manifests remain inventory authority                                                                       |
| ProjectProposalPage and ProjectUpdatePage                | Stepper, shared fields, ErrorSummary, preview/handoff | `src/ProjectProposalPage.tsx:262,324,365,418,1423`; drafts do not activate projects                                                     |
| FundingReview, FundingRecords, EscrowFunding             | Four payout steps, exact edit, public funding records | `src/FundingReview.tsx:93`, `src/FundingRecords.tsx:45`, `src/EscrowFunding.tsx:19`; maintainer authority/financial activation distinct |
| CyclePages and SquadsTracking                            | Archive, frozen allocation, stage/evidence            | `src/CyclePages.tsx:24,386`, `src/SquadsTracking.tsx:14`; historical policy and network remain frozen                                   |
| ReceiptsPage, ModelsPage, HowItWorksPage, SponsorsPage   | Receipt rows, diagnostics, process, funding choices   | `src/App.tsx:2750,2923,1712,2393`; safe metadata and factual source qualification                                                       |
| SettlementVerification and ContributionQualityReview     | Derivation, advisory review, interactive Disclosure   | `src/SettlementVerification.tsx:138`, `src/ContributionQualityReview.tsx:17`; derived/recommended is not approved or paid               |

`coverage.json` is the published route/state/frame matrix and `journey-map.json` is the flow-key matrix. Published [JSON coverage](coverage.json) and [CSV coverage](coverage.csv) record route/state/frame coverage. The native audit passed; the verified prototype URL does not certify pixels or player traversal. Current source facts versus approved-target/gated scope are recorded in the source audit and each journey.

## Profile Activity integration

Current source is rebased to `8c621b5be61201585c45b6e7596f1a3deb5c9dd4`. Recent Activity is present in six primary/core profile frames; desktop/mobile `profile-activity-expanded` exposes all 943 available archive records (941 work + two reported direct payments). Points and finalized settlement sources are explicitly missing, not zero. The Activity anchor is `/contributors/ss251#activity`; expanded/collapsed state uses the same focused control. Preserve project/month labels and distinguish reported from verified payments. React ownership: `src/Profiles.tsx:256,328–351`; payment labels at lines 113 and 139. Figma focus appearance is not proof of React focus preservation or assistive-technology behavior.

[Open the verified Figma prototype](https://www.figma.com/proto/Rn7Z8KYAKbiz7S6ns6qB4i/Slop-v2-%E2%80%94-The-Work-Economy---2027?node-id=10-94081&scaling=min-zoom&content-scaling=fixed&page-id=3%3A5&starting-point-node-id=10%3A94081&show-proto-sidebar=1). Native audit and 96-PNG review passed; representative player paths are recorded below.

## Completed native and pixel evidence

The final native graph audit covers 449 roots and 12,211 wired click actions, with zero missing roots, horizontal overflow, unwired controls or invalid destinations. Native text containment inspected 40,748 text nodes with zero clipping against inner clipping ancestors. The final library geometry audit reports zero overlapping variants after the demonstrated Toggle overlap was repaired; Toggle Off/On values are explicit.

Pixel evidence covers 96 final native PNGs: all 68 primary layouts and 28 critical state frames. Six corrected Account/onboarding exports supersede earlier exports. All actionable pixel findings were resolved. Review used full-page contact sheets/atlases and targeted native-size detail crops; reduction limits fine-text inspection, and individual reports distinguish replacement checks from repeated full-page review. This is not a claim of 449 pixel screenshots. Artifact manifest and review reports underpin this scope; application/browser evidence is separate.

Representative actual prototype-player paths are recorded below; this is not a claim of 26 complete executions. Figma native wiring, pixels and contrast do not establish React/browser assistive technology, 200% zoom, provider, wallet or chain behavior.

## Representative Figma player walkthrough

Recorded player observations cover representative design simulation paths across the 13 named journeys: desktop discovery to project/funding; mobile GitHub/provider/privacy/saved and X connect/link/disconnect; mobile Base address/confirm/proof/unsupported/recovery; desktop Solana address/confirm/proof/saved; actual account-overlay Escape dismissal on desktop/mobile; mobile earnings/lifecycle/2% arithmetic; desktop receipt detail/no-match/clear and failed-source Retry/loading/1.5-second automatic return; desktop project wizard through lookup, Rules, Rewards, Funding, Review and PR handoff; desktop maintainer adjustment/save handoff/review/page two/public funding/payout review/funding/approval/tracking; mobile sponsorship/public records/disclosure/protected vault with disabled deposit/withdrawal; desktop cycle archive/frozen Eliza/external shares/failure/retry; and desktop model declaration/How/verification/read-only tools/missing-evidence recovery.

These observations are representative paths, not 26 complete end-to-end executions. The native graph separately validates all 26 journey starts and destinations. Fields, retained drafts and validation screens are predetermined scenario navigation, not editable persistent inputs or actual validation. Provider, signature and payment screens are design simulations. Player click/Escape observations do not establish React DOM focus, browser assistive technology, 200% zoom, provider authorization or chain behavior.

The 96-PNG review remains complete, followed by targeted player and containment review. Final copy/date spacing was repaired in the native canvas; the post-copy graph audit passed with 449 roots, 12,211 click actions and zero missing roots, overflow, unwired controls or invalid destinations; post-copy text containment passed across 40,748 nodes with zero inner clipping. Observations and screenshots remain outside the repository; no private evidence is committed.

Supplemental visual review is complete for 16 adaptation compositions and five system boards, using full-page contact sheets plus native-size detail crops at 320px and 720px for maintainer rows, steps and footer. No new visual findings were recorded. The 720px composition demonstrates intended desktop 200% reflow only; it does not prove browser zoom or actual React text enlargement. This supplemental set remains separate from the completed 96-PNG primary/critical-state review. The source stamp reflects final integration `8c621b5`, replacing the initial baseline stamp.
