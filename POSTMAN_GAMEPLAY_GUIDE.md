# Simulate Karera gameplay in Postman

This guide follows the current `karera_back` source reviewed on 2026-10-11.
You already created a user, so use that account instead of registering it again.
Use a local development database: this simulation creates bets and changes test
wallet balances. No real payment-provider request is needed.

Postman sends requests to your running backend; it does not run the backend itself.
The frontend can remain stopped throughout this exercise.

## 1. Prepare the backend

Keep PostgreSQL running. In Ubuntu/WSL:

```bash
sudo service redis-server start
redis-cli ping
```

Expect `PONG`. In Windows PowerShell:

```powershell
cd C:\Users\Rio\Documents\node_projects\karera_back
npm run dev
```

Leave this terminal open so you can see backend errors.

In Postman, create an HTTP request:

```text
GET http://127.0.0.1:8000/health
```

Click **Send**. Expect HTTP `200` with `OK`.
Direct backend HTTP paths do **not** start with `/api`.

## 2. Set up Postman variables

Create/select an environment named `Karera Local`. Add these variables:

| Variable | Value |
| --- | --- |
| `baseUrl` | `http://127.0.0.1:8000` |
| `playerToken` | Leave empty; set after player login |
| `moderatorToken` | Leave empty; set after moderator login |
| `gameId` | Leave empty; set after choosing/creating a game |
| `roomId` | Leave empty; set after choosing/creating a room |
| `sessionId` | Leave empty; set after WebSocket `NewGame` reply |

For each HTTP request with a JSON body, select **Body → raw → JSON**.
For protected HTTP requests, select **Authorization → Bearer Token** and use
`{{playerToken}}` or `{{moderatorToken}}` as specified below.

Keep the two tokens separate. Do not set a shared `token` variable that is overwritten
when you log into the other account.

## 3. Log in your existing player

Create an HTTP request:

```text
POST {{baseUrl}}/login
```

Set authorization to **No Auth**. Body:

```json
{
  "userNameOrEmail": "YOUR_EXISTING_USERNAME_OR_EMAIL",
  "password": "YOUR_PASSWORD"
}
```

Expect HTTP `200` with `user` and `token`. Verify `user.type` is `player`.
Copy the token into the environment's `playerToken` value.

Optional: add this in the request's **Scripts → Post-response** editor to save it:

```javascript
if (pm.response.code === 200) {
  const body = pm.response.json();
  pm.environment.set("playerToken", body.token);
}
```

If your existing account is a moderator, use it for step 4 and use a separate player
for betting. Do not change one account's role back and forth during a round.

## 4. Log in a separate moderator

Create another HTTP login request using the moderator's credentials:

```text
POST {{baseUrl}}/login
```

Save its returned token as `moderatorToken`. Verify `user.type` is exactly
`moderator`. The current WebSocket command guards do not accept `admin` as a
substitute for the moderator role.

If you already ran the development initial-data seeder, its default moderator
username is `moderator`, with password `GlobalX@2025`, unless you changed that account.
If no moderator exists, the development seed can create test accounts:

```powershell
cd C:\Users\Rio\Documents\node_projects\karera_back
npm run seed:initial-data
```

This populates development data; it is not needed if your required accounts and
studios already exist. It is not a database reset. Do not call `/reset-all` to
prepare this simulation.

Log in each account once for this exercise and keep its latest token. A new login
replaces that user's saved session, which can invalidate earlier HTTP tokens.

## 5. Confirm the player has test funds

Create:

```text
GET {{baseUrl}}/balance
Authorization: Bearer {{playerToken}}
```

In `wallets`, find the entry whose `type` is `game`. Record its `balance` as your
starting available balance, called **B0** in the examples below. Use stakes small
enough for that balance.

If it is too low, use the existing development deposit route:

```text
POST {{baseUrl}}/wallet/deposit
Authorization: Bearer {{playerToken}}
```

```json
{"amount":"1000"}
```

Expect HTTP `201`, then call `/balance` again and record the new B0. `amount` here
is a **string**, while the WebSocket bet amount later is a **number**.
This route directly creates a test deposit; it does not simulate a provider callback.
Do not use `/payments/...` for this gameplay exercise.

If no game wallet exists, fix the user's development wallet setup first. A deposit
error is not evidence that betting is ready.

## 6. Choose a studio, game, and room

Use `moderatorToken` for these HTTP requests.

### 6.1 Check studios

```text
GET {{baseUrl}}/studios
```

Choose `DL01` for this walkthrough. The current live plugin supports DL01–DL04.
Do not choose DL05 even if the database lists it; it lacks a live socket server
in the inspected plugin.

If DL01 is missing, run `npm run seed:studios` in the backend terminal's directory
using another PowerShell terminal, then request the list again.

### 6.2 Find a suitable game and room

```text
GET {{baseUrl}}/game?limit=100&offset=0
GET {{baseUrl}}/rooms?limit=100&offset=0
```

Choose a game with choices `A` and `B`, then find its room with `studioNo: "DL01"`.
Set `gameId` and `roomId` to those records' IDs. Reuse a valid mapping rather than
creating competing rooms for the same studio. Keep other moderators/frontends
from controlling DL01 during this exercise.

If your development database has no suitable game/room, create them:

```text
POST {{baseUrl}}/game
Authorization: Bearer {{moderatorToken}}
```

```json
{
  "name": "Postman Dos Letra Test",
  "choices": ["A", "B"],
  "commission": "0.10"
}
```

Expect `201`. Save the returned `id` as `gameId`.
If the name already exists, use the listing to find it rather than retrying creation.

Then:

```text
POST {{baseUrl}}/rooms
Authorization: Bearer {{moderatorToken}}
```

```json
{
  "gameId": {{gameId}},
  "studioNo": "DL01"
}
```

Expect `201`. Save `room.id` as `roomId`. A host is optional for this backend
simulation. A matching room is required before `NewGame`; without one, session
creation can fail with a backend error.

## 7. Open two raw WebSocket tabs

In Postman, choose **New → WebSocket**, enter the URL, then click **Connect**.
Use raw WebSocket rather than Socket.IO, because this backend uses the `ws` protocol.
These controls follow [Postman's WebSocket guide](https://learning.postman.com/docs/use/send-requests/protocols/websocket/create-a-websocket-request/).

Create two tabs with the same URL:

```text
ws://127.0.0.1:8000/api/studio/DL01
```

- Tab 1: **Moderator DL01**
- Tab 2: **Player DL01**

Do not append another `/api` to that URL. HTTP and WebSocket paths differ here.
The backend expects authentication as a JSON message after connection; an HTTP
Authorization header by itself does not authenticate the gameplay socket.

In each tab's message editor, send JSON. For WebSocket payloads below, paste the
actual token/ID in place of placeholders. If you use `{{variables}}` instead,
confirm they resolve in the outgoing message and contain valid values.

### 7.1 Authenticate the moderator tab

```json
{
  "channel": "Game",
  "state": "Authenticate",
  "data": {"token": "PASTE_MODERATOR_TOKEN"}
}
```

Click **Send**. Expect a received message:

```json
{"channel":"Game","state":"Authenticate","data":"Success"}
```

### 7.2 Authenticate the player tab

Send the same envelope with the **player** token. Expect `Authenticate` success;
you may also receive `PlayerCount` messages. Keep both sockets connected until
settlement completes.

Only connect one game socket per user in this simulation: the current backend
indexes authenticated game sockets by mobile number within a studio.

## 8. Create the round using the moderator socket

Send in **Moderator DL01**, replacing `123` with your actual game ID:

```json
{"channel":"Game","state":"NewGame","data":{"gameId":123}}
```

Expect a received `NewGame` message on both tabs. The moderator's reply includes:

```json
{"channel":"Game","state":"NewGame","data":{"sessionId":456}}
```

Save the actual session ID as `sessionId`. IDs shown here are examples.

This command internally calls `/game/session`, initializes studio Redis state,
and starts periodic live updates. Do not separately POST `/game/session` for this
round: an HTTP-created session alone does not initialize the live studio state.

If nothing happens, check the moderator role, current studio state, game/room
mapping, and backend logs before sending another `NewGame`.

## 9. Open betting and place two small bets

Send in **Moderator DL01**:

```json
{"channel":"Game","state":"Open","data":{"play":true}}
```

Expect `Open` messages with a countdown beginning around 60 seconds.

While betting is open, send in **Player DL01**:

```json
{"channel":"Game","state":"Bet","data":{"choice":"A","amount":100}}
```

Wait for the successful `Bet` acknowledgement before continuing. It contains
`choice`, `amount`, and `balance`; errors appear as a top-level `error`.
Then send:

```json
{"channel":"Game","state":"Bet","data":{"choice":"B","amount":50}}
```

The current code allows one bet per player/choice/session. This example therefore
uses two different choices; repeating A is rejected as a duplicate.

For time to inspect requests, the moderator can pause while still in `Open`:

```json
{"channel":"Game","state":"Open","data":{"play":false}}
```

Resume by sending `Open` with `play:true`. Pause/resume guards accept `Open` state,
so do this before the countdown enters `LastCall` or `Closing`.

After the accepted bets, call `GET /balance` with `playerToken`:

```text
available balance = B0 − 150
```

The stake is held during betting. `GET /balance` already subtracts wallet holds.

## 10. Inspect live odds and wait for betting to close

Watch received `Update` messages. For this isolated example, with only A=100,
B=50, and commission=10%, expect odds approximately:

```json
{"A":1.35,"B":2.7}
```

Other users' bets or a different commission will change these values. Allow a live
update before closing/declaring so the odds aggregate reflects both accepted bets.

Resume the countdown if paused and observe:

```text
Open → LastCall (10–6 seconds) → Closing (5–1 seconds) → Closed (0 seconds)
```

Wait for a received `Closed` message. Do not submit new bets afterward.

## 11. Start rolling

In **Moderator DL01**:

```json
{"channel":"Game","state":"Rolling","data":{}}
```

Expect `Rolling` on both tabs. The backend does not simulate a race or randomly
choose a result; you act as the moderator and choose a winning choice next.

## 12. Declare A as the winner

In **Moderator DL01**:

```json
{"channel":"Game","state":"WinnerDeclared","data":{"choice":"A"}}
```

Expect:

```json
{"channel":"Game","state":"WinnerDeclared","data":{"choice":"A"}}
```

Winner declaration alone does not settle wallet balances. Continue with payout.

## 13. Send payout once

In **Moderator DL01**:

```json
{"channel":"Game","state":"SendPayout","data":{}}
```

The handler internally calls `/win`, updates wallets/bets, then marks the session
completed. The player should receive a `Win` message with winnings and balance;
the studio also receives `SendPayout` with top winners. Extra acknowledgements and
periodic updates may arrive between these messages.

For the isolated A=100/B=50 example above, A wins 135. After deducting both stakes
and paying A, the player's final available balance should be:

```text
final balance = B0 − 100 − 50 + 135 = B0 − 15
```

Do not resend payout to test retries in this first walkthrough: retry/idempotency
handling has known gaps. If it fails, inspect persisted state and logs before
attempting recovery. Do not start another round to hide an unresolved payout.

## 14. Verify persisted results with HTTP

Use the appropriate bearer token and inspect each response:

| Request | Token | What to check |
| --- | --- | --- |
| `GET {{baseUrl}}/balance` | Player | Game-wallet available balance matches the settlement |
| `GET {{baseUrl}}/game/session/{{sessionId}}` | Moderator | Session status is `completed` |
| `GET {{baseUrl}}/bet` | Player | Inspect returned bets for this session/choice; response filtering depends on the handler |
| `GET {{baseUrl}}/game/history/{{gameId}}` | Player | Round/bet results are persisted |
| `GET {{baseUrl}}/transactions/player` | Player | Bet/settlement records correspond to the submitted stakes |

Use HTTP history for this walkthrough. The current WebSocket `History` broadcast
helper has an unbound studio-context issue noted in the project review.

## 15. Run another round and finish

After successful settlement, send `NewGame` again with the same game ID. Save the
new session ID, then repeat Open → Bet → Closed → Rolling → WinnerDeclared → SendPayout.
The current payout broadcast returns Redis state to `WinnerDeclared`, which permits
the next `NewGame` command.

When finished, click **Disconnect** on both Postman WebSocket tabs. Stop the
backend with Ctrl+C only after the round's settlement has been verified.

## Troubleshooting

| Symptom | Check / next step |
| --- | --- |
| Connection refused on port 8000 | Backend terminal must be running; inspect startup errors and Redis/PostgreSQL access |
| HTTP `/api/login` returns 404 | Use `/login` directly on port 8000; `/api` belongs to the frontend HTTP proxy |
| Socket immediately disconnects | First message must be valid Authenticate JSON with a current JWT |
| Socket connected but controls do nothing | Check account `type` is exactly moderator and command/current state match |
| HTTP 401 after another login | Reuse that user's newest token; reconnect and authenticate the socket again |
| `Studio not found or inactive` | Confirm `/studios` lists DL01; seed local studios if missing |
| `NewGame` fails with missing room/backend error | Verify chosen game has its own DL01 room; inspect backend logs |
| Bet fails: insufficient balance | Check the player's game wallet with `/balance`; use a smaller stake or local test deposit |
| Bet fails: already placed a bet | Same user/choice/session is already recorded; do not resend it |
| Odds differ from the example | Check other bets, commission, studio selection, and latest Update |
| Rolling produces no transition | Wait for Closed first; Open/LastCall/Closing are not valid rolling states |
| No payout for a zero-winner/no-bet round | Current `/win` rejects empty winners/no bets; this walkthrough intentionally places a winning A bet |
| Payout errors or status not completed | Keep the session ID, inspect logs and database results; current flow has known failure-handling gaps |
| Live state disappears on backend restart | Current game plugin flushes Redis; finish this exercise without restarting mid-round |

## Quick command sequence

```text
HTTP: Player login → Moderator login → Balance → Game/room setup
WS: Connect moderator + player → Authenticate both
Moderator: NewGame → Open
Player: Bet A → Bet B
Both: Observe Update → LastCall → Closing → Closed
Moderator: Rolling → WinnerDeclared A → SendPayout
HTTP: Verify balance + completed session + history
```

Do not POST to `/docs/ws/requests/...` to play. Those endpoints contain empty
documentation handlers; real commands go through the WebSocket message editor.
