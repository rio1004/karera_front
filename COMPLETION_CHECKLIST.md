# Karera completion checklist

Based on the frontend and `../karera_back` source reviewed on 2026-10-11.
See [PROJECT_FLOW.md](PROJECT_FLOW.md) for architecture, protocol details, and the full endpoint inventory.

**Assessment:** The project has many core APIs already. Its main gaps are reliable
round settlement, reconnect/recovery behavior, authorization, and incomplete frontend
business flows. Adding more endpoints alone will not complete it.

This checklist distinguishes verified implementation gaps from proposed additions.
Proposed paths below are design suggestions, not existing endpoints. Completion is
defined for the features already represented in this project; gifts, badges, email,
and other secondary features can be deferred if they are outside the release scope.
No end-to-end production readiness is claimed by this source review.

Priority: **P0** blocks reliable core operation; **P1** completes existing business
flows; **P2** is secondary or depends on product scope. Each item remains unchecked
until its stated outcome is verified.

## 1. Backend capabilities that are missing or incomplete

### P0 — Round snapshot and reconnect recovery

- [ ] **Provide a complete current-round snapshot.** Extend the existing WebSocket
  `Update` command, or add a proposed `GET /studios/:studioNo/current-round`.
  Include studio, game/session ID, state, countdown, choices, odds, player's accepted
  bets, and authoritative available balance. Its purpose is to restore the screen
  after reload, reconnect, or joining an already active round. The existing update
  response does not restore all of this. **Done when:** a player reloads mid-round
  and sees the same round, accepted bets, and wallet state without submitting again.

### P0 — Safe and repeatable settlement

- [ ] **Complete the existing `/win` and `SendPayout` workflow.** This requires
  backend corrections, not necessarily a new endpoint. Enforce moderator permission,
  valid round transitions, and one settlement per session. Calculate/validate winnings
  against persisted bets and server-owned odds rather than trusting caller-provided
  `winners` and amounts. Handle empty winners, disconnected winners, and failures.
  Its purpose is to prevent duplicate payouts, incorrect balances, and rounds being
  displayed as paid after a failed settlement. **Done when:** retries settle once,
  zero-winner rounds finish correctly, and failed payout leaves a recoverable state.

### P0 — Round cancellation and stake refunds

- [ ] **Define and implement a round void/cancel operation if interrupted rounds
  are part of the supported workflow.** No dedicated game-round cancellation/refund
  route was found in the registered API inventory. A proposed
  `POST /game/session/:id/cancel` could stop betting, release reserved stakes,
  record the reason, and notify clients. Deleting a session is not equivalent to
  refunding its bets. Its purpose is to recover from a stream failure, invalid result,
  or a round that cannot finish. **Done when:** cancellation is authorized, audited,
  repeatable without duplicate refunds, and leaves no outstanding wallet holds.

### P0 — Recovery after backend or Redis restart

- [ ] **Implement a recovery process for active sessions.** A background recovery
  routine may be sufficient; it need not be a public API. The live plugin currently
  flushes the Redis database on startup/close while persisted bets remain in PostgreSQL.
  Restore the round and its bet aggregate from persistent records, or move it into an
  explicit recover/void workflow. Its purpose is to prevent lost live state and
  stranded stakes. **Done when:** restarting during betting or before payout produces
  a defined, correct outcome for the session and every wallet hold.

### P0 — Consistent authentication, logout, and authorization

- [ ] **Complete server-side logout.** `/logout` currently asks the frontend to
  delete its token but leaves the database session. Revoke the session and invalidate
  affected sockets. Verify signatures in `/session` and `/session/logout`; their
  handlers currently decode JWTs. Apply active-session checks to WebSocket auth.
  **Purpose:** make logout and session replacement effective across HTTP and sockets.
  **Done when:** an old token/socket cannot continue operating after revocation.
- [ ] **Enforce role and record ownership on sensitive routes.** A frontend route
  guard or valid JWT is insufficient. Review game results, payouts, credits, wallet
  changes, identity reviews, user administration, badges, and destructive routes.
  Restrict/remove `/debug/*`, `/reset-all`, `/debug-jwt`, and balance-reset operations
  from normal access. **Purpose:** ensure users can only perform permitted actions.
  **Done when:** disallowed roles and cross-user requests are rejected by the backend.

### P1 — Studio discovery and stream configuration

- [ ] **Extend existing `/studios` and room responses with the live connection
  information the frontend needs.** Return or consistently derive the studio's
  WebSocket address, active round, and stream URL. Live studios are hardcoded to
  DL01–DL04, the seed includes DL05, and the player video URL is hardcoded.
  **Purpose:** make selecting a room actually select its game channel and stream.
  **Done when:** two studios work independently and every offered studio has a
  valid configured channel. Avoid a new endpoint if existing responses can serve this.

### P1 — Payment reconciliation and status

- [ ] **Complete provider callback validation, duplicate handling, and payment status.**
  Deposit/withdrawal and callback routes already exist; verify their behavior rather
  than assuming they are complete. Use existing `/payments/icore/status/:id` for
  ICore. For other providers, add a status capability only if persisted transaction
  reads cannot provide the required lifecycle. **Purpose:** show whether a payment is
  pending, successful, or failed and reconcile its wallet effect.
  **Done when:** callback retries cannot credit/debit twice and UI status matches records.

### P1 — Upload storage and file access

- [ ] **Finish profile-image persistence and serving.** The profile upload handler
  still builds `/app/uploads/profiles` paths and comments out directory/file writes.
  Configure a local upload directory or storage service and return a usable URL.
  **Purpose:** ensure uploaded images actually exist and display outside Docker.
  **Done when:** upload, reload, replacement, and deletion work for the correct user.

### P2 — Resolve unused or documentation-only contracts

- [ ] **Decide whether `Join` needs a real WebSocket handler.** It exists in enums
  and Swagger placeholders but has no inspected game implementation. Implement it
  only if authentication plus snapshot does not cover joining. **Purpose:** avoid
  frontend clients waiting for an acknowledgement that never arrives.
- [ ] **Remove unused `/posts` constants or implement posts only if required.**
  The frontend declares them; no registered matching route was found.
  **Purpose:** keep the API contract aligned with actual product features.

## 2. Existing APIs that still need frontend integration

These APIs already exist. Add service calls, stores/hooks, usable pages, loading/error
states, and response handling as needed; do not duplicate their backend endpoints.

| Done | Priority | Feature and existing API | What it is for | Completion check |
| --- | --- | --- | --- | --- |
| [ ] | P0 | Initial session validation: `GET /verify-login` | Validate persisted login before protected screens load | Expired/replaced sessions redirect and clear stale state |
| [ ] | P0 | Round/bet history: `GET /game/history/:id`, `GET /bet`, session detail/list | Show accepted bets and settled rounds from persisted data | Records remain correct after reload and match wallet transactions |
| [ ] | P0 | Game `Bet`/`Win` acknowledgements and `GET /balance` | Show accepted stakes, rejected bets, winnings, and available funds | Refresh follows acknowledgement; failed bets show an error |
| [ ] | P1 | Support: `/csr/session-types`, `/csr/sessions`, session messages/read receipts, support WebSocket | Replace sample chat with real player-to-agent conversations | Start, reply, reload/history, read, and end work for both roles |
| [ ] | P1 | Support tickets: `/csr/tickets`, `/csr/ticket`, assignment/status/message routes | Let agents track and resolve support issues | Ticket ownership, assignment, status and message history persist |
| [ ] | P1 | Game-site bets: `/gamesite/bet`, `/gamesite/bet/finalize`, `/gamesite/bet/results`, `/gamesite/transactions`, `PATCH /gamesite/:id` | Replace dummy records with actual site bets and their settlement | Printed/site records and results match backend data |
| [ ] | P1 | Ticket lookup: `GET /ticket/:ticketNumber`, `GET /all-tickets` | Retrieve existing game-site tickets and support lookup/reprint flows | A saved ticket can be retrieved without creating it again |
| [ ] | P1 | Game administration: `POST /game`, `PUT /game/:id`, `DELETE /game/:id`, session reads | Manage game definitions and inspect rounds | Authorized users can configure a playable game and inspect its sessions |
| [ ] | P1 | Room restoration: `GET /room/session/:id`; remaining host/site management routes | Restore the selected room's game and manage operational assignments | Room, studio, host and session displayed together are consistent |
| [ ] | P1 | Payment tracking: `GET /payments/icore/status/:id`, transaction reads | Display pending/success/failure rather than assume deposit completion | Final status and wallet changes are visible after reload |
| [ ] | P1 | Identity review: `GET /ekyc`, `PATCH /ekyc/:userId/status`, relevant detail routes | Give reviewers a persisted approval/rejection workflow | Status changes reach the player's UI with correct permissions |
| [ ] | P1 | Referral codes/joins: `/operator/codes`, `/operator/:code`, operator join routes; representative equivalents | Link users to the correct operator/representative network | Code generation, lookup and join are reflected in persisted referrals |
| [ ] | P1 | `GET /commission/history` | Show earned/distributed referral commissions | Displayed totals and records match settled transactions |
| [ ] | P1 | `POST /credits`, `GET /credits/history` | Complete supported credit transfers and their history | Successful transfer updates balances; failures leave funds unchanged |
| [ ] | P2 | `POST /gift`, `GET /leaderboard/gift`, gift broadcasts | Support gifting and gift leaderboard features | Gift deduction and displayed gift event agree |
| [ ] | P2 | `GET /badges/:userId`, `POST /badges`, `DELETE /badges/:id` | Display and administer user badges | Users see badges; management is limited to permitted roles |
| [ ] | P2 | `/email/:id`, `/email/:id/status` | Read and manage stored email records | Records/status persist; do not treat these as email-send endpoints |
| [ ] | P2 | Per-user audit reads and additional transaction detail workflows | Explain administrative/account changes and individual transactions | UI exposes the required persisted records with correct access |

Existing frontend wiring already covers registration/login/logout, much of wallet/PIN,
identity uploads, room management, host listing/likes, transaction reporting, audit
list/create, operator code generation, and basic game-site ticket creation.
The rows above identify missing or partial workflows, not an absence of all API calls.

## 3. WebSocket and game implementation fixes

| Done | Priority | Work | Purpose and completion check |
| --- | --- | --- | --- |
| [ ] | P0 | Use the configured complete URL, remove appended `/api`, and fix the truthy `undefined/api` fallback | Every selected studio connects using its intended path |
| [ ] | P0 | Reset flags on disconnect and authenticate on every new socket | Reconnect restores authenticated operation instead of a stale UI flag |
| [ ] | P0 | Stop retrying after deliberate close and prevent duplicate clients | Leaving/reopening a screen produces one live connection |
| [ ] | P0 | Align bet response `{choice,amount,balance}` with the player hook currently checking `data.A`/`data.B` | Accepted bets update the correct choice and balance |
| [ ] | P0 | Await `isGameSessionValid()` in moderator winner/payout guards | Invalid sessions stop the operation before state changes |
| [ ] | P0 | Enforce betting window and role checks in HTTP and WebSocket paths | A direct `/bet` cannot bypass closed-round controls |
| [ ] | P0 | Move countdown state transitions outside connected-client loops | An empty studio still closes betting at the right time |
| [ ] | P0 | Enforce payout-before-next-round and preserve failures for recovery | New rounds cannot silently abandon unsettled bets |
| [ ] | P1 | Pass studio context explicitly into game chat/history helpers | Helpers no longer depend on unbound `this.studioNo` |
| [ ] | P1 | Correct game-status handler traversal of the nested studio socket map | Enable/disable events reach the intended clients without map-shape errors |
| [ ] | P1 | Separate CSR user sockets from game studio socket maps | Support chat and gaming can run together without incompatible storage |
| [ ] | P1 | Bound stored message history and clean listeners/timers | Long-running pages do not accumulate unlimited messages or duplicate updates |

## 4. Setup, operations, and verification

- [ ] **P0 — Validate wallet concurrency.** Check locking inside transactions,
  simultaneous bets, duplicate submissions, settlement retries, and PostgreSQL/Redis
  reconciliation. **Purpose:** keep financial records consistent under real usage.
- [ ] **P1 — Verify a fresh local install.** Use PostgreSQL, Redis in WSL, migrations,
  development seeds, and the two Node.js processes. Create the required game/room
  mapping. **Purpose:** make a new developer's environment reproducible.
- [ ] **P1 — Validate optional external services.** SMS, Zoloz, payment providers,
  video streams, archive, and embedded game-site service need their own configuration.
  **Purpose:** prevent a working local UI from being mistaken for integrated services.
- [ ] **P1 — Add useful readiness/dependency reporting.** The current `/health`
  returns `OK`; add a readiness check if deployment needs to know whether PostgreSQL
  and Redis are reachable. **Purpose:** distinguish a running process from a usable API.
- [ ] **P1 — Review and run the existing test suites, then fill the gaps.** Tests already
  exist in `../karera_back/tests`; their presence does not establish current passing
  coverage. Verify login, authorization, round transitions, bets, payout/refund,
  reload/reconnect, two studios, and failed dependencies. **Purpose:** prove completed
  behavior, including failure recovery, rather than just successful builds.
- [ ] **P1 — Define backup and restore procedures for PostgreSQL.** Verify restore
  against a disposable environment. **Purpose:** recover persistent users, rounds,
  and transactions after an operational failure.

## 5. Suggested implementation order

1. Fix authentication/authorization and the existing WebSocket lifecycle.
2. Complete round snapshots, persisted bet recovery, and consistent betting checks.
3. Make settlement reliable and define cancellation/refund plus restart recovery.
4. Connect wallet acknowledgements, history, payment status, and administrative setup.
5. Finish support and game-site flows, then referrals/commissions/credits.
6. Complete secondary features chosen for the release.
7. Run end-to-end and failure-case validation before marking the release complete.

The first playable milestone is a verified login → room/studio → new round → bet →
close → winner → payout → wallet/history flow that also survives reload and retry.
Full completion adds the selected operational features and defined failure recovery.
