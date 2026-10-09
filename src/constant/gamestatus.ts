export const GAME_STATUS = {
  OPEN: "OPEN",
  LAST_CALL: "LAST_CALL",
  CLOSING: "CLOSING",
  CLOSED: "CLOSED",
  ROLLING: "ROLLING",
  DECLARED: "DECLARED",
  SEND_PAYOUT_SUCCESSFUL: "SEND_PAYOUT_SUCCESSFUL",
  SEND_PAYOUT: "SEND_PAYOUT",
} as const;

// If you need the type for use elsewhere:
export type GameHostStatusType = keyof typeof GAME_STATUS;
