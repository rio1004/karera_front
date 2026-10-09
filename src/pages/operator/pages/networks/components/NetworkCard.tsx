import type { NetworkItem } from "@/types/operator/network";
import { ChevronRight, ChevronUp, Copy } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const NetworkCard = ({ item }: { item: NetworkItem }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPlayerCommissionPage =
    location.pathname === "/operator/player-commission";
  const [expanded, setExpanded] = useState(false);

  const handleCardClick = (type?: "representative" | "player") => {
    if (type === "representative") {
      navigate("/operator/commission/representative");
      return;
    }
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="bg-[#C6EBD7] w-full rounded-2xl p-4 shadow-sm">
        <div
          className={`flex items-center justify-between ${
            isPlayerCommissionPage ? "cursor-pointer" : ""
          }`}
          onClick={() => handleCardClick(item.type)}
        >
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <div
                className={`px-2 rounded-full text-[12px] ${
                  item.type === "representative"
                    ? "bg-[#F8F0AC] text-primary"
                    : "bg-[#2196F3] text-white"
                }`}
              >
                <p>{item?.type?.toUpperCase()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex gap-2 items-center">
                <p className="text-sm font-medium text-gray-700">{item.name}</p>
                <div className="bg-transparent">
                  <Copy strokeWidth={1} size={14} color="#2196f3" />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center justify-end gap-3">
                  <div className="text-right">
                    <p className="text-sm text-green-600">
                      ₱ {item.amount.toFixed(2)}
                    </p>
                  </div>
                  {expanded ? (
                    <ChevronUp />
                  ) : (
                    <ChevronRight className="w-6 h-6 flex-shrink-0 cursor-pointer" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600">
            {item.date} {item.time}
          </p>
        </div>
      </div>
      {expanded && item.transaction && (
        <div className="bg-[#D9F1E487] rounded-lg p-4 mt-3 border text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-700">Transaction No.</span>
            <span className="font-medium">
              {item.transaction.transactionNo}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Transaction Date</span>
            <span>{item.transaction.transactionDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Game ID</span>
            <span className="font-semibold">
              {item.transaction.gameName} - {item.transaction.gameId}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Bet</span>
            <span>{item.transaction.bet}</span>
          </div>
          <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
            <span>Bet Amount</span>
            <span>₱{Number(item.transaction.betAmount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>
              Operator Commission ({item.transaction.OperatorCommission})
            </span>
            <span>{item.transaction.OperatorCommission}</span>
          </div>
          <div className="flex justify-between">
            <span>Franchise Tax ({item.transaction.franchiseTax})</span>
            <span>{item.transaction.franchiseTax}</span>
          </div>
          <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
            <span>Net Operator Commission</span>
            <span>₱{Number(item.transaction.netCommission).toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
