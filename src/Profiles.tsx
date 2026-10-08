import { type ReactNode, useState } from "react";
import { fetchWithDeadline, readBoundedJson } from "./lib/browser-json";
import type { CycleIndex } from "./lib/cycle-index";
import type { ScoreEvent } from "./lib/leaderboard";
import { type PointsMember, pointKey } from "./lib/points";
import {
  assertProfiles,
  type ProfileIndex,
  profileCounts,
} from "./lib/profiles";
import { findProject, findProjectByRepositoryId } from "./lib/projects.mjs";
import { usePublicResource } from "./lib/use-public-resource";
import {
  ContributorIdentity,
  ExternalLinkAnchor,
  formatCycleMonth,
  formatDate,
  formatScore,
} from "./Presentation";

const disclosures = import.meta.glob("../disclosures/*.json", {
  eager: true,
  import: "default",
}) as Record<
  string,
  {
    projectId: string;
    contributionMonth: string;
    observedAt: string;
    rows: {
      actorId: string;
      state: string;
      observed: null | { amountMinor: string; signature: string };
    }[];
  }
>;
async function loadProfiles(signal: AbortSignal) {
  const response = await fetchWithDeadline("/data/profiles.json", {
    signal,
    cache: "no-store",
  });
  if (!response.ok) throw Error("Profiles unavailable");
  const index = await readBoundedJson(response, 8 * 1024 * 1024, "profiles");
  assertProfiles(index);
  return { index };
}
type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; index: ProfileIndex };
export function useProfiles(): { state: State; retry: () => void } {
  const [state, retry] = usePublicResource(
    true,
    loadProfiles,
    "Profiles unavailable",
    15_000,
  );
  return { state, retry };
}
function dollars(n: bigint) {
  return `$${(n / 1000000n).toLocaleString("en-US")}.${(n % 1000000n).toString().padStart(6, "0").replace(/0+$/, "").padEnd(2, "0")}`;
}
export function ProfileActivity({
  work,
  awards,
  login,
  actorId,
  showIdentity = false,
  cycles,
  recordsLoading = false,
  census,
  summary,
}: {
  login: string;
  work?: readonly ScoreEvent[];
  awards?: PointsMember["awards"];
  actorId?: string;
  showIdentity?: boolean;
  cycles?: CycleIndex;
  /** The cycle records are still loading; their absence is not a failure. */
  recordsLoading?: boolean;
  census: ReturnType<typeof useProfiles>;
  summary?: ReactNode;
}) {
  const { state, retry } = census;
  const matches =
    state.status === "ready"
      ? state.index.people.filter((p) =>
          actorId
            ? p.id === actorId
            : p.login.toLowerCase() === login.toLowerCase(),
        )
      : [];
  const p = matches.length === 1 ? matches[0] : undefined;
  const id = actorId ?? p?.id;
  const counts = p
    ? profileCounts(p)
    : id && state.status === "ready"
      ? { merged: 0, open: 0, closed: 0 }
      : null;
  const image =
    p?.avatarUrl ??
    `https://avatars.githubusercontent.com/${encodeURIComponent(login)}?size=160`;
  const payments =
    cycles && id
      ? cycles.cycles.flatMap((c) =>
          c.contributors
            .filter((m) => m.actor.id === id && m.state === "paid")
            .map((m) => ({
              date: c.settledAt,
              amount: BigInt(m.paidMinor),
              href: `/cycles/${c.projectId}/${c.cycleId}`,
              name: `${findProject(c.projectId)?.name ?? c.projectId} · ${formatCycleMonth(c.cycleId)}`,
            })),
        )
      : null;
  const seen = new Set<string>();
  const direct = id
    ? Object.values(disclosures).flatMap((d) =>
        d.rows
          .filter(
            (r) => r.actorId === id && r.state === "paid-direct" && r.observed,
          )
          .flatMap((r) => {
            const o = r.observed;
            if (
              !o ||
              !/^\d+$/.test(o.amountMinor) ||
              !/^[1-9A-HJ-NP-Za-km-z]{80,90}$/.test(o.signature) ||
              seen.has(o.signature)
            )
              return [];
            seen.add(o.signature);
            return [
              {
                date: d.observedAt,
                amount: BigInt(o.amountMinor),
                href: `https://solscan.io/tx/${o.signature}`,
                name: `${findProject(d.projectId)?.name ?? d.projectId} · ${formatCycleMonth(d.contributionMonth)}`,
              },
            ];
          }),
      )
    : [];
  return (
    <section className="profile-activity" aria-label="Contributor profile">
      {showIdentity ? (
        <ContributorIdentity
          actor={{
            login: p?.login ?? login,
            avatarUrl: image,
            url: `https://github.com/${encodeURIComponent(p?.login ?? login)}`,
          }}
        />
      ) : null}
      <h2>Contribution record</h2>
      <div className="profile-totals">
        {summary}
        {state.status === "ready" ? (
          <>
            {(
              [
                ["Merged", "merged"],
                ["Open", "open"],
                ["Closed without merging", "closed"],
              ] as const
            ).map(([label, key]) => (
              <div key={key}>
                <strong>
                  {counts ? counts[key].toLocaleString() : "Unknown"}
                </strong>
                <span>PRs {label.toLowerCase()}</span>
              </div>
            ))}
          </>
        ) : null}
        <div>
          <strong>
            {payments
              ? dollars(payments.reduce((n, r) => n + r.amount, 0n))
              : recordsLoading || (!id && state.status === "loading")
                ? "Loading…"
                : "Unavailable"}
          </strong>
          <span>verified payments received · USDC</span>
        </div>
        <div>
          <strong>
            {id
              ? dollars(direct.reduce((n, r) => n + r.amount, 0n))
              : state.status === "loading"
                ? "Loading…"
                : "Unavailable"}
          </strong>
          <span>direct payments reported · USDC</span>
        </div>
      </div>

      {state.status === "error" ? (
        <p role="status">
          PR counts are unavailable.{" "}
          <button type="button" onClick={retry}>
            Retry profile
          </button>
        </p>
      ) : state.status === "loading" ? (
        <p role="status">Loading PR history…</p>
      ) : (
        <>
          <p className="points-meta">
            Slop repository history · updated{" "}
            {new Date(state.index.generatedAt).toLocaleString()}
            {Date.now() - Date.parse(state.index.generatedAt) > 8 * 3600000
              ? " · Stale: refresh pending"
              : ""}
          </p>
          {p ? (
            <details>
              <summary>PR counts by repository</summary>
              <p className="points-meta">
                Statuses observed between{" "}
                {new Date(state.index.startedAt).toLocaleString()} and{" "}
                {new Date(state.index.generatedAt).toLocaleString()}.
              </p>
              <ul>
                {p.repositories.map((r) => (
                  <li key={r.repository}>
                    <a
                      href={`https://github.com/${r.repository}/pulls?q=${encodeURIComponent(`is:pr author:${p.login}`)}`}
                    >
                      {r.repository}
                    </a>{" "}
                    · {r.merged} merged · {r.open} open · {r.closed} closed
                    without merging
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </>
      )}
      <p className="points-meta">
        Direct payments come from published disclosures outside Slop’s verified
        settlement process.
      </p>
      <ProfileTimeline
        work={work}
        awards={awards}
        payments={payments ?? []}
        direct={direct}
      />
    </section>
  );
}

function ProfileTimeline({
  work = [],
  awards = [],
  payments,
  direct,
}: {
  work?: readonly ScoreEvent[];
  awards?: PointsMember["awards"];
  payments: Array<{
    date: string | null;
    amount: bigint;
    href: string;
    name: string;
  }>;
  direct: Array<{ date: string; amount: bigint; href: string; name: string }>;
}) {
  const [expanded, setExpanded] = useState(false);
  const unmatchedAwards = new Map(awards.map((award) => [award.key, award]));
  const records = [
    ...work.map((event) => {
      const project = findProjectByRepositoryId(event.repository);
      if (!project)
        throw new TypeError(
          `Score event ${event.id} has no registered project`,
        );
      const candidate = unmatchedAwards.get(
        pointKey(
          project.id,
          event.actor.id,
          event.category,
          event.category === "evidence" ? event.id : event.source.id,
        ),
      );
      const award =
        candidate?.sourceUrl === event.source.url &&
        candidate.occurredAt === new Date(event.occurredAt).toISOString()
          ? candidate
          : undefined;
      if (award) unmatchedAwards.delete(award.key);
      return {
        key: `work:${event.id}`,
        date: event.occurredAt,
        href: event.evaluation?.decisionUrl ?? event.source.url,
        title: event.source.title,
        detail: `${project.name} · ${event.category.replaceAll("-", " ")}${event.evaluation ? ` · reviewed by ${event.evaluation.reviewer}` : ""}`,
        amount: `+${formatScore(event.points)} Slop Score${award ? ` · +${award.amount.toLocaleString()} Points${award.provisional ? " · Provisional tier" : ""}` : ""}`,
      };
    }),
    ...[...unmatchedAwards.values()].map((award) => ({
      key: `points:${award.key}`,
      date: award.occurredAt,
      href: award.sourceUrl,
      title: award.category.replaceAll("-", " "),
      detail: `${findProject(award.projectId)?.name ?? award.projectId}${award.provisional ? " · Provisional tier" : ""}`,
      amount: `+${award.amount.toLocaleString()} Points`,
    })),
    ...payments.map((payment) => ({
      key: `paid:${payment.href}`,
      date: payment.date,
      href: payment.href,
      title: payment.name,
      detail: "Verified settlement",
      amount: `${dollars(payment.amount)} USDC paid`,
    })),
    ...direct.map((payment) => ({
      key: `reported:${payment.href}`,
      date: payment.date,
      href: payment.href,
      title: payment.name,
      detail: "Reported outside Slop settlement · grouped by disclosure date",
      amount: `${dollars(payment.amount)} USDC reported`,
    })),
  ].sort(
    (a, b) =>
      (b.date ?? "").localeCompare(a.date ?? "") || a.key.localeCompare(b.key),
  );
  if (records.length === 0) return null;
  const groups = new Map<string, typeof records>();
  for (const record of expanded ? records : records.slice(0, 10)) {
    const day = record.date?.slice(0, 10) ?? "";
    const group = groups.get(day) ?? [];
    group.push(record);
    groups.set(day, group);
  }
  return (
    <section className="profile-timeline" aria-label="Contribution activity">
      <h2>Activity</h2>
      {[...groups].map(([day, rows]) => (
        <section key={day}>
          <h3>
            {day ? (
              <time dateTime={day}>{formatDate(day)}</time>
            ) : (
              "Date unavailable"
            )}
          </h3>
          <ul className="points-history">
            {rows.map((row) => (
              <li key={row.key} data-activity-date={row.date ?? ""}>
                <ExternalLinkAnchor href={row.href}>
                  <strong>{row.title}</strong>
                </ExternalLinkAnchor>
                <small>
                  {row.amount} · {row.detail}
                </small>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {records.length > 10 ? (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded
            ? "Show recent activity"
            : `View all ${records.length} activity records`}
        </button>
      ) : null}
    </section>
  );
}
