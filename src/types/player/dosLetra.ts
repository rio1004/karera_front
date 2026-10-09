export interface LeaderboardEntry {
  rank: number;
  userName: string;
  winAmount: string;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
}
