import type { OpWallet } from "@/store/types/operator/operatorWalletTypes";
import type { BalanceType } from "@/types/player/wallet";
import dayjs from "dayjs";

export const formatAndRoundNumber = (
  num: number,
  decimals: number = 2
): string => {
  // Round the number to the desired decimal places
  const roundedNum =
    Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

  // Convert to K, M, B
  if (roundedNum >= 1e9) {
    return (roundedNum / 1e9).toFixed(0) + "b"; // billions
  } else if (roundedNum >= 1e6) {
    return (roundedNum / 1e6).toFixed(0) + "m"; // millions
  } else if (roundedNum >= 1e3) {
    return (roundedNum / 1e3).toFixed(0) + "k"; // thousands
  } else {
    return roundedNum.toString();
  }
};

export const formatNumberWithCommas = (num: number): string => {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
export const formatNumberToK = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  }
  const thousands = num / 1000;
  if (thousands % 1 === 0) {
    return `${thousands}k`;
  }
  return `${thousands.toFixed(1)}k`;
};

export const formatLikes = (likes: number) => {
  if (likes >= 1000) {
    return `${(likes / 1000).toFixed(1)}k`;
  }
  return likes.toString();
};
export function formatToPeso(amount: number): string {
  const formatted = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);

  return formatted.replace("₱", "₱ ");
}
export function formattedDate(date: string | Date): string {
  return dayjs(date).format("MMMM D, YYYY").toUpperCase();
}

export const formatDateReport = (dateString: string) => {
  return dayjs(dateString).format("YYYY-MM-DD");
};

export const dateFormatter = (dateStr: string): string => {
  //sample Output:
  // today
  // yesterday
  // May 04

  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
  });
};

export const truncateText = (text: string, limit: number) =>
  text.length > limit ? text.slice(0, limit) + "..." : text;

export const calculateAge = (birthDateStr: string) => {
  if (!birthDateStr) return 0;
  const birthDate = new Date(birthDateStr);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};
export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
  const bstr = atob(arr[1]); // decode base64
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const formatDatePretty = (dateString: string | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formatted = date.toLocaleDateString("en-US", options);

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return formatted.replace(/(\d+),/, `$1${suffix}`);
};
export const buildBigRoad = (
  results: string[],
  rows = 6,
  minCols = 5,
  maxCols = 30
) => {
  const grid: (string | null)[][] = Array.from({ length: rows }, () =>
    Array(maxCols).fill(null)
  );

  let col = 0;
  let row = 0;

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const prev = i > 0 ? results[i - 1] : null;

    if (i === 0) {
      grid[row][col] = result;
      continue;
    }

    if (result === prev) {
      if (row + 1 < rows && grid[row + 1][col] === null) {
        row++;
      } else {
        col++;
        row = 0;
      }
    } else {
      col++;
      row = 0;
    }

    if (col >= maxCols) break;
    grid[row][col] = result;
  }

  const usedCols = col + 1;

  const visibleCols = Math.min(Math.max(usedCols, minCols), maxCols);

  const trimmedGrid = grid.map((r) => r.slice(0, visibleCols));

  return trimmedGrid;
};
export const mapWallets = (wallets: BalanceType[]) => {
  return wallets.reduce(
    (acc, w) => {
      acc[w.type] = {
        balance: Number(w.balance).toFixed(4),
        totalCredits: w.totalCredits,
        totalDebits: w.totalDebits,
        transactionCount: w.transactionCount,
      };
      return acc;
    },
    {
      game: {
        balance: "0.0000",
        totalCredits: 0,
        totalDebits: 0,
        transactionCount: 0,
      },
      commission: {
        balance: "0.0000",
        totalCredits: 0,
        totalDebits: 0,
        transactionCount: 0,
      },
      load: {
        balance: "0.0000",
        totalCredits: 0,
        totalDebits: 0,
        transactionCount: 0,
      },
    } as { game: OpWallet; commission: OpWallet; load: OpWallet }
  );
};
