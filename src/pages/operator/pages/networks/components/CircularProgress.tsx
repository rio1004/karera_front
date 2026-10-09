export const CircularProgress = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 96 96">
        {/* Outer circle */}
        <circle
          cx="48"
          cy="48"
          r="42"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-yellow-400"
        />
        <circle
          cx="48"
          cy="48"
          r="36"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-yellow-400"
        />
        <circle
          cx="48"
          cy="48"
          r="30"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-yellow-400"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold text-gray-700">
          {percentage}%
        </span>
      </div>
    </div>
  );
};