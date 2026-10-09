# Responsive implementation handoff

Authority: [UX-01–17](../../slop-product-requirements.md#quality-review-requirements), [MVP-10](../../slop-mvp-plan.md#work-packages). These are design constraints for future React implementation; no CSS or application source is changed by this proposal.

## Canvas coverage and fluid model

Primary review canvases: mobile **390 × 844**, tablet portrait **834 × 1194**, tablet landscape **1194 × 834**, desktop **1440 × 1000**. These are samples of reflow, not four hard-coded layouts. Adaptation checkpoints: 320, 360, 375, 430, 768, 1024, 1280, 1920, 2560 CSS pixels. At 320 and 200% zoom content must remain understandable without page-wide horizontal scrolling. Tall route pages continue below the first viewport; screens must show complete content rather than crop away evidence or controls.

Use React components with CSS Grid/Flex and intrinsic sizing. Shell `width: min(100% - 2 * gutter, 1280px)` centered; gutters of 16 px below 600 px viewport width, 32 px from 600 px to below 1000 px, 48 px from 1000 px to below 1300 px, and 80 px at 1300 px and above. Prose max-width 680 px. Grid tracks use `minmax(0, 1fr)` so long IDs cannot force overflow. Section space `clamp(40px, 6vw, 88px)`; internal rhythm 8/16/24/32 px. Prefer content-driven wrapping over device detection. At 2560 the main shell stays 1280 px; the footer/background may span the viewport.

Display headings scale with `clamp`, uppercase Bricolage Grotesque; body remains readable at 16 px or above; numeric/technical values use JetBrains Mono. Hero type may scale from 44 px at narrow widths to 112 px at wide widths, with fluid line breaks and no fixed height. Do not truncate the promise during animation. Preserve logical DOM order when arranging asymmetric desktop areas.

| Surface               | Wide behavior                                                                         | Narrow / zoom behavior                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Header                | Mark left; points beside far-right avatar/account control                             | Same hierarchy; wrap menu content, never overlap mark. No hidden primary setup action behind hover.                |
| Home/projects         | Lined project index, mission/status/action alignment; preview ranking                 | Rows become labeled vertical blocks; financial state stays beside amount. Featured/Community distinct.             |
| Project detail        | Main content + bounded status/action area; local navigation wraps                     | Status and skill action precede details; tabs wrap or become an accessible local selector. No clipped labels.      |
| Ranking/people        | Shared table/grid, filters in one wrapping toolbar                                    | Identity + selected metric first, other metrics in expandable labeled details. Preserve sort/cohort/time controls. |
| Models                | Ranked outcome bars and sparse comparison columns                                     | Readable model/client rows or labeled scrollable table; no one-character headers. Diagnostic columns in details.   |
| Account/login         | Prose-width forms; aligned controls                                                   | Single column, full usable input width, provider and saved feedback in flow. Keyboard must not hide confirm.       |
| Proposal/manage       | Step list beside form when space permits                                              | Step summary above fields; previous/continue wrap in DOM order. Error summary remains visible.                     |
| Funding/payouts       | Public Records separated from action workspace; recipient filters and exact-edit rows | Stages stack; recipient summary expands to exact inputs. Filters/pagination do not reset drafts.                   |
| Profile               | One identity summary, aligned scoped metrics, activity list                           | Summary wraps to two or one columns; long login wraps; combined activity remains chronological.                    |
| Archive/receipts      | Compact records with search/filter and evidence disclosure                            | Labeled vertical records; hashes in details, original records downloadable.                                        |
| How it works/sponsors | Short paths and evidence-supported diagrams                                           | Diagram steps stack with the same branches/order; no miniature unreadable diagram.                                 |
| Footer                | Product, Records, Community groups on orange                                          | Groups stack; account action stays recognizable; links never crowd touch targets.                                  |

## Tables, exact values and overflow

Use actual semantic table headers when column comparisons matter. If a table retains horizontal scrolling, contain it in one labeled region with visible overflow affordance and keyboard reachability; page shell still reflows. Do not duplicate separate screen-reader and visual tables. A row converted to a card must repeat meaningful labels, source link, state and scope.

Currency scanning may be compact, but editing, confirmation and export use exact decimal amounts from integer data. USDC denomination and historical fee policy travel with the value. A percentage in an external-prize view never becomes dollars. Show full destination at confirmation; hashes/addresses may wrap via `overflow-wrap:anywhere` or enter a selectable detail region. Copy always uses full value; failed copy exposes selectable text. Do not shrink technical text below readable size to fit.

## Scroll, sticky elements and input

Use document scrolling. Sticky section navigation may be enabled only where it leaves useful content visible; do not add a fixed-height nested page scroller. Anchor targets use `scroll-margin-top` for the actual header. On shorter tablet-landscape viewports or zoom, sticky elements become ordinary flow when they obscure fields. Persistent action bars must reserve their height and safe-area inset; prefer in-flow actions on forms.

Use `min-height:100dvh` with a fallback, `env(safe-area-inset-*)` for edge controls, and scroll focused inputs into view without abrupt recentering. Virtual keyboard shrinks the visual viewport: input, error and confirmation remain reachable; no `100vh` modal trapped behind the keyboard. Dialogs have bounded height, internal scrolling where necessary, focus containment and a clear close control. Touch actions target at least 48 × 48 px; the canonical 40 px desktop compact button needs an expanded mobile hit area.

## State and interaction contract

Preserve route title/shell during loading. Resource states use a shared notice family but describe the dependency in plain language: loading, successful empty, stale usable data, invalid data, denied permission, unavailable provider, failed request. Each has its correct retry/correction/next action. Unknown data is never zero. Background refresh does not erase a user draft or move focus. Session expiration preserves unsent form content, then returns to the safe route after login.

Prototype variants require hover, pressed, visible keyboard focus, disabled with reason, busy, selected, invalid and saved feedback. Use 160 ms for local state changes, 220 ms for disclosure/menu transitions; no required action depends on animation. With reduced motion, both become 0 ms and hero movement stops with the whole promise readable. Prototype animation settings are only a proposal; browser media-query behavior must be implemented and verified later.

## Handoff evidence limits

Figma Auto Layout/constraints should expose growth, wrapping, hug/fill decisions and shared component variants. Four device frames alone do not establish fluid behavior. Inspect all stated checkpoint widths during implementation, long fixture values, safe areas, keyboard and 200% zoom. Structural/visual Figma review is performed by the design evidence; no real-browser rendering, accessibility, provider, deployment or chain evidence is claimed here. No Code Connect mapping is published by these documents.

## Profile Activity integration

Current source is rebased to `8c621b5be61201585c45b6e7596f1a3deb5c9dd4`. Recent Activity is present in six primary/core profile frames; desktop/mobile `profile-activity-expanded` exposes all 943 available archive records (941 work + two reported direct payments). Points and finalized settlement sources are explicitly missing, not zero. The Activity anchor is `/contributors/ss251#activity`; expanded/collapsed state uses the same focused control. Preserve project/month labels and distinguish reported from verified payments. React ownership: `src/Profiles.tsx:256,328–351`; payment labels at lines 113 and 139. Figma focus appearance is not proof of React focus preservation or assistive-technology behavior.

## Shared component propagation evidence

Field Input uses vertical HUG sizing with a 52px minimum and grows for multiline technical values/status. It does not clip a fixed-height box or hide checksum suffixes. Narrow textual Metric values “Not established” and “Not configured” use existing DataSmall 18/26; quantitative values retain Data 32/40. Member headers show “— pts” when the points source is unavailable; zero requires a loaded source. These refinements add no tokens or families.

The native propagation audit across all three pages reports zero remaining `0 pts`, long-status Data32 or fixed-height Input instances, with 1,776 HUG inputs and 168 unavailable-header points texts. This is native design propagation evidence. All 96 final native exports were reviewed after the shared fixes; representative player evidence is recorded below.

## Completed native and pixel evidence

The final native graph audit covers 449 roots and 12,211 wired click actions, with zero missing roots, horizontal overflow, unwired controls or invalid destinations. Native text containment inspected 40,748 text nodes with zero clipping against inner clipping ancestors. The final library geometry audit reports zero overlapping variants after the demonstrated Toggle overlap was repaired; Toggle Off/On values are explicit.

Pixel evidence covers 96 final native PNGs: all 68 primary layouts and 28 critical state frames. Six corrected Account/onboarding exports supersede earlier exports. All actionable pixel findings were resolved. Review used full-page contact sheets/atlases and targeted native-size detail crops; reduction limits fine-text inspection, and individual reports distinguish replacement checks from repeated full-page review. This is not a claim of 449 pixel screenshots. Artifact manifest and review reports underpin this scope; application/browser evidence is separate.

Representative actual prototype-player paths are recorded below; this is not a claim of 26 complete executions. Figma native wiring, pixels and contrast do not establish React/browser assistive technology, 200% zoom, provider, wallet or chain behavior.

## Final design inventory and interaction scope

Published [JSON coverage](coverage.json) and [CSV coverage](coverage.csv) record 449 roots and 390 route/state compositions: 68 primary layouts, 44 named-project variants, 16 edge layouts, 228 state frames and 34 core clones. The system has 108 variables, 12 text styles, 27 families and 110 variants. There are 28 flow starts on page 2 and four Main Page starts on page 1. Reviewer indexes launch 17 conditional/resource states, 404 and one expanded-menu component reference; these are prototype-only entry aids. Click/Escape and a labeled 1.5-second receipt-loading simulation do not establish DOM focus, assistive technology, HTTP success or provider behavior. All 26 named journey clone starts were checked against their native keys; start-identity review is not player traversal evidence.

## Representative Figma player walkthrough

Recorded player observations cover representative design simulation paths across the 13 named journeys: desktop discovery to project/funding; mobile GitHub/provider/privacy/saved and X connect/link/disconnect; mobile Base address/confirm/proof/unsupported/recovery; desktop Solana address/confirm/proof/saved; actual account-overlay Escape dismissal on desktop/mobile; mobile earnings/lifecycle/2% arithmetic; desktop receipt detail/no-match/clear and failed-source Retry/loading/1.5-second automatic return; desktop project wizard through lookup, Rules, Rewards, Funding, Review and PR handoff; desktop maintainer adjustment/save handoff/review/page two/public funding/payout review/funding/approval/tracking; mobile sponsorship/public records/disclosure/protected vault with disabled deposit/withdrawal; desktop cycle archive/frozen Eliza/external shares/failure/retry; and desktop model declaration/How/verification/read-only tools/missing-evidence recovery.

These observations are representative paths, not 26 complete end-to-end executions. The native graph separately validates all 26 journey starts and destinations. Fields, retained drafts and validation screens are predetermined scenario navigation, not editable persistent inputs or actual validation. Provider, signature and payment screens are design simulations. Player click/Escape observations do not establish React DOM focus, browser assistive technology, 200% zoom, provider authorization or chain behavior.

The 96-PNG review remains complete, followed by targeted player and containment review. Final copy/date spacing was repaired in the native canvas; the post-copy graph audit passed with 449 roots, 12,211 click actions and zero missing roots, overflow, unwired controls or invalid destinations; post-copy text containment passed across 40,748 nodes with zero inner clipping. Observations and screenshots remain outside the repository; no private evidence is committed.

Supplemental visual review is complete for 16 adaptation compositions and five system boards, using full-page contact sheets plus native-size detail crops at 320px and 720px for maintainer rows, steps and footer. No new visual findings were recorded. The 720px composition demonstrates intended desktop 200% reflow only; it does not prove browser zoom or actual React text enlargement. This supplemental set remains separate from the completed 96-PNG primary/critical-state review. The source stamp reflects final integration `8c621b5`, replacing the initial baseline stamp.
