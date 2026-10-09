# Accessibility handoff

Target: WCAG AA under [UX-01, UX-07, UX-12–15, UX-17](../../slop-product-requirements.md#quality-review-requirements), [MVP-10 UI release gate](../../slop-mvp-plan.md#release-gates). This document specifies intended behavior. Figma inspection cannot certify WCAG conformance or replace real assistive-technology/browser evidence.

## Contrast and meaning

Use coal `#0f0e0c` with cream `#f3efe6` for primary reading. Orange `#ff5a19` is a functional accent and inverse-area background; orange-filled actions use dark labels. The faint token `#77716a` is not approved body text on raised surfaces: it requires contrast measurement for each actual pairing and may be reserved for nonessential decoration. Body/labels/helper/error text need at least 4.5:1; large text at least 3:1; essential controls and visible focus at least 3:1 against adjacent colors. [Contrast evidence](contrast.json) records 24/24 native-backed design pairings meeting 4.5:1. Figma refines faint to `#938b7e` and pressed to `#db4b12`; these are design-only refinements, not edits to canonical source tokens. Unmeasured pairings remain unqualified.

Every status carries a word and, where useful, an icon: Projected, Under review, Approved, Scheduled, Paid, Unclaimed, Held, Excluded. Color cannot be the only channel. “Paid” requires verified finality; icon/check styling must not imply it for saved settings or signature continuity. A graph has a title, period, denominator and equivalent values. Overlapping model shares never use a pie chart. Error text includes the problem and correction; no red-outline-only validation.

## Semantics and focus

One visible route h1; header, main and footer landmarks; skip link to main. Use logical h2/h3 structure independent of type size. Buttons act; links navigate. Icons receive accessible names; decorative dripping marks are hidden from assistive technology when equivalent branding text is present. Avatar names do not repeat adjacent identity labels unnecessarily.

Account menus open by click/keyboard, expose expanded state, support Escape and restore focus. A tabs family uses `tablist`, associated `tabpanel`, selected state, one roving focus stop, Arrow/Home/End keys; fragment selection remains consistent with the visible panel. Disclosure buttons expose expanded state and controls relationship. Dialogs name their purpose, contain focus, retain an accessible close action and restore focus on dismiss; background content must not remain keyboard-operable through a modal.

On navigation update document title, scroll predictably and focus the main heading or destination; fragment links honor sticky offsets. Loading/refresh must not unexpectedly steal focus. Validation summary receives focus after failed submit, links to erroneous fields, and fields expose `aria-invalid` plus associated help/error. A disabled financial control has a nearby readable dependency and an alternative next action; a tooltip alone is insufficient.

Future React flows must work with Tab/Shift+Tab/Enter/Space and do not depend on hover, dragging, precision gestures or timed actions. Visible focus uses an orange outline with adequate contrast and offset; focus cannot be clipped by overflow or obscured by a sticky header. Preserve meaningful source order when CSS rearranges desktop sections.

## Inputs, wallets and feedback

Inputs keep visible labels, appropriate autocomplete/input modes and a 52 px visual height. Touch targets reach 48 × 48 px; compact desktop controls expand the hit area for touch. Avoid forcing screen-wide scrolling at 320 px. At 200% zoom a form still has readable errors, complete actions and accessible exact values. Safe areas and virtual keyboard cannot cover confirmation.

Wallet confirmation presents network, exact destination, public-record consequences and binding state before signature. Full addresses remain selectable/copyable with predictable wrapping. Never request private keys. Differentiate rejected signature, missing provider, unsupported wallet, wrong network, expired session and pending policy activation. Public membership settings do not imply deletion of public GitHub records.

Announce loading and nonurgent saved/copy feedback with polite status updates. Use alerts for actionable failures without repeated announcements on every keystroke. “Copied” appears only after actual clipboard success; failure gives selectable text. Download controls name format/version, and implementation verifies correct artifact bytes. Password/session/provider material is not persisted in drafts or exposed in evidence details.

## Tables, long content and diagrams

Use table captions and scoped headers for real comparisons; local horizontal overflow is labeled and keyboard reachable. Narrow card layouts preserve column labels and associations. Do not make every dense row a focus trap. Expand exact metadata through a named disclosure, keep active filters intelligible, and announce result count when appropriate without moving focus. Search/pagination cannot discard financial edits.

Long GitHub logins, project names, provider/model declarations, amounts and IDs wrap without one-character columns or text overlap. Exact currency precision and fee/network policy remain available at confirmation/export. Keep body line length near the 680 px prose constraint; no tiny type to fit a specimen. Payment-stage diagrams use actual text and an ordered equivalent; blocked/unresolved branches are explicitly named.

## Motion and state matrix

160 ms local transitions and 220 ms menu/disclosure transitions become 0 ms under reduced motion. The hero promise remains fully legible with animation stopped. No flashing, auto-advancing carousel, continuous marquee or motion-gated content. Visual expansion must not reorder focused content unexpectedly.

| State                | Accessible content and recovery                                                  |
| -------------------- | -------------------------------------------------------------------------------- |
| Loading              | Route name remains; specific polite status; no fake totals                       |
| Successful empty     | What was checked and useful next action; no error icon                           |
| Stale                | Actual timestamp/coverage; usable data and refresh action remain                 |
| Invalid data         | Dependency and safe retry/report guidance; no invented zero                      |
| Permission denied    | Required role/permission, safe account switch/return; no leaked private metadata |
| Provider unavailable | Provider/service and alternative/read-only action; distinct from denied consent  |
| Failed               | Clear failed action, retained draft, retry where safe                            |
| Ready / saved        | Correct scope and success property; saved does not imply approved/published/paid |

## Required future browser evidence

Review all canonical routes and meaningful variants with keyboard, 200% zoom, mobile reflow and reduced motion. Run screen-reader review of landmarks, menus/tabs, invalid forms, feedback, long IDs, table/card association and route focus. Check desktop and mobile providers separately: a Figma wallet modal proves neither wallet support nor consent. Confirm zero application console errors/first-party request failures, raw Markdown/archive downloads, valid source/explorer links and copy feedback at the exact implementation head.

Record expected and actual outcome for complete contributor, maintainer, sponsor and recovery workflows; upload route screenshots and walkthrough evidence to the implementation review without committing captured private material. No such browser checks were run for this document. Parent Figma structural and visual review is a separate evidence boundary and must report its actual results.

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
