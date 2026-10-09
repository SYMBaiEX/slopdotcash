# Slop UI design notes

Scope: [PRD UX-01–08](../../slop-product-requirements.md#quality-review-requirements)
and [MVP-10](../../slop-mvp-plan.md#work-packages).

## Implemented direction

- Preserve the Blackout tokens, display typography and 1180px page width.
- Use a typography-led home hero, compact agent prompt and manifest-backed
  project carousel. List all projects at `/projects`.
- Reuse the contributor standings view on home, project and contributor pages.
  Keep score, participation points and verified money distinct.
- Group project identity, repository facts and description in one summary.
- Use one contributor identity and contribution record, with date-grouped
  activity paginated in batches of ten and a distinct participation summary.
- Preserve public source links, payment states, loading and error handling,
  copy feedback, keyboard access and mobile reflow.

## Design reference

The [Figma proposal](https://www.figma.com/design/Rn7Z8KYAKbiz7S6ns6qB4i)
was an exploration. The maintainer's subsequent live-app feedback controls the
implemented layout. Generated frame inventories and audit exports are review
artifacts, not application source or product authority.

## Release status

Local previews and design review do not establish release readiness, deployment,
OAuth, wallet, provider or settlement availability. The repository's existing
verification and publication gates still apply. This note does not close the MVP.
