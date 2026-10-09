export const USER_TYPE = [
  "admin",
  "player",
  "accounting",
  "moderator",
  "csr",
  "host",
  "operator",
] as const;
export type Role = (typeof USER_TYPE)[number];
