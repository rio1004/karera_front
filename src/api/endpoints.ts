export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout",
  },
  USERS: {
    LIST: "/users",
    UPDATE: "/users",
    GET_BY_ID: (id: string) => `/users/${id}`,
    CONFIRM_PASSWORD: "/users/confirm-reset-password",
    RESET_PASSWORD: "/users/reset-password",
    OTP_REQUEST: "/otp/request",
    OTP_VERIFY: "/otp/verify",
    PASSWORD_CHANGE: "/password/change",
    PASSWORD_RESET: "/password/reset",
  },
  ADMIN: {
    TRANSACTIONS: "/transactions",
    ARCHIVE_TRANSACTIONS: "/transactions",
    REPORT: "/transactions/report",
    UPDATE: "/users",
  },
  POSTS: {
    GET_ALL: "/posts",
    CREATE: "/posts",
  },
  TICKET: {
    CREATE: "/ticket",
  },
  WALLET: {
    DEPOSIT: (modeOfPayment: string) => `/payments/${modeOfPayment}/deposit`,
    WITHDRAW: "/withdraw",
    WITHDRAW_ICORE: "/payments/icore/withdraw",
    BALANCE: "/balance",
    CREATE_PIN: "/wallet/pin",
    CHANGE_PIN: "/wallet/pin",
    VERIFY_PIN: "/wallet/pin/verify",
    ACTIVE_PIN: "/wallet/pin/status",
  },
  HOSTS: {
    LIST: "/hosts",
    LIKED: "/likehost",
    HOSTS_BY_ID: (id: string) => `/hosts/${id}`,
  },
  CSR: {
    CREATE: "/attendance",
    GET_BY_ID: (userId: string) => `/attendance/user/${userId}`,
  },
  OTP: {
    OTP_REQUEST: "/otp/request",
  },
  ROOMS: {
    LIST: "/rooms",
    CREATE: "/rooms",
    STUDIO: "/studios",
    GET_BY_ID: (id: string) => `/rooms/${id}`,
  },
  EKYC: {
    CREATE: "/ekyc",
    UPLOAD_BY_ID: (ekycID: string) => `/ekyc/${ekycID}/id`,
    UPLOAD_BY_SELFIE: (ekycId: string) => `/ekyc/${ekycId}/liveness`,
    GET_BY_PATCH_USER_ID: (ekycID: string) => `/ekyc/${ekycID}`,
  },
  DOS_LETRA: {
    LEADERBOARDS: "/leaderboard",
  },
  OPERATOR: {
    OP_GENERATE_CODE: "/operator/generate/code",
  },
  PLAYER: {
    TRANSACTION: "/transactions/player",
    GET_BY_ID: (id: string) => `/transactions/${id}`,
  },
  AUDIT_TRAIL: {
    GET_POST_AUDITS: "/users-audit",
  },
  GAME_SITE: {
    GET_SITES: "/sites",
  },
  GAME: {
    GET_GAMES: "/game",
    SESSION: "/game/session",
    PATCH_GAME_STATUS: (id: number | string) => `/game/${id}/status`,
  },
} as const;
