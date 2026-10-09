import { buildBigRoad } from "@/utils/utils.helper";

type Props = {
  setShowHistory: (value: boolean) => void;
  showHistory: boolean;
};

const computePercentages = (results: string[]) => {
  const total = results.length;
  const countA = results.filter((r) => r === "A").length;
  const countB = total - countA;

  return {
    A: total > 0 ? ((countA / total) * 100).toFixed(0) + "%" : "0%",
    B: total > 0 ? ((countB / total) * 100).toFixed(0) + "%" : "0%",
  };
};

const results = [
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "B",
  "A",
  "B",
  "A",
  "B",
  "B",
];

const percentages = computePercentages(results);
const grid = buildBigRoad(results, 5, 5, 30);

const GameHistory = ({ setShowHistory, showHistory }: Props) => {
  const renderHistory = () => (
    <div className="absolute top-[238px] z-3 right-0 w-[200px] h-[276px] bg-[url('/DosLetra/gameHistoryBackground.png')] bg-[right] bg-cover bg-no-repeat rounded-tl-[20px] rounded-bl-[20px] p-[12px] flex flex-col items-center">
      <div
        className="absolute top-[25px] left-[-27px] cursor-pointer"
        onClick={() => setShowHistory(false)}
      >
        <img src="/DosLetra/gameHistoryArrow.png" alt="" className="h-[43px]" />
      </div>

      <div className="flex flex-row items-center gap-1">
        <img
          src="/DosLetra/gameHistoryStar.png"
          alt=""
          className="h-[20px] object-contain"
        />
        <span className="font-bold text-sm text-black">GAME HISTORY</span>
      </div>

      <div className="flex flex-row gap-3 mt-2">
        <div className="flex flex-row items-center gap-1">
          <img
            src="/DosLetra/DosLetraA.png"
            alt="A"
            className="h-[20px] object-contain"
          />
          <span className="text-[#7F631A] font-bold text-sm">
            {percentages.A}
          </span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <img
            src="/DosLetra/DosLetraB.png"
            alt="B"
            className="h-[20px] object-contain"
          />
          <span className="text-[#7F631A] font-bold text-sm">
            {percentages.B}
          </span>
        </div>
      </div>

      <div className="bg-[#7F631A40] h-[2px] w-full mt-3" />

      <div className="overflow-x-auto mt-3 w-full pl-[12px]">
        <div
          className="grid gap-1"
          style={{
            gridTemplateRows: `repeat(${grid.length}, 28px)`,
            gridTemplateColumns: `repeat(${grid[0].length}, 28px)`,
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-[28px] h-[28px] bg-[#7F631AA0] flex items-center justify-center rounded-full"
              >
                {cell && (
                  <img
                    src={`/DosLetra/gameHistory${cell}.png`}
                    alt={cell}
                    className="h-[28px] object-contain"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className="absolute top-[250px] right-0 cursor-pointer"
        onClick={() => setShowHistory(true)}
      >
        <img src="/DosLetra/game history.png" alt="" className="h-[131px]" />
      </div>
      {showHistory && renderHistory()}
    </>
  );
};

export default GameHistory;
