import { types } from "util";

export const GameEvent = {
  AuthRequest: "auth:request",
  Authenticated: "auth:success",
  GameState: "game:state",
  Countdown: "game:countdown",
  Bet: "game:bet",
  BetUpdate: "game:bet:update",
} as const;

export type GameEvent = keyof typeof GameEvent;

export const GameType = {
  DOSLETRA: "DOS LETRA",
  ZODIAC: "ZODIAC",
} as const;

export type GameType = keyof typeof GameType;

export const GameState = {
  Authenticate: "Authenticate",
  Update: "Update",
  Unavailable: "Unavailable",
  Open: "Open",
  Countdown: "Countdown",
  LastCall: "LastCall",
  Closing: "Closing",
  Closed: "Closed",
  Rolling: "Rolling",
  WinnerDeclared: "WinnerDeclared",
  NewGame: "NewGame",
  Bet: "Bet",
  SendPayout: "SendPayout",
};

export const Channel = {
  AuthRequest: "AuthRequest",
  Game: "Game",
};
