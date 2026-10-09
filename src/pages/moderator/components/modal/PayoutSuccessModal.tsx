import { useHostStore } from "@/store/moderator/useHostStore";

const PayoutSuccessModal = () => {
  const { isPayoutSuccess, resetAfterPayout } = useHostStore();

  if (!isPayoutSuccess) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-80 text-center shadow-lg">
        <div className="flex justify-center mb-4">
          {/* Checkmark icon for success */}
          <span className="text-5xl text-green-600">✅</span>
        </div>
        <h2 className="text-xl font-bold mb-6 text-green-600">
          The payout has been sent!
        </h2>
        <button
          onClick={resetAfterPayout}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default PayoutSuccessModal;