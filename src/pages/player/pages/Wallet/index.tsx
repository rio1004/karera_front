import DepositWithdraw from "./DepositWithdraw";
import Balance from "./Balance";
import { useWalletStore } from "@/store/player/useWalletStore";

const Wallet = () => {
  const { walletTab, setWalletTab } = useWalletStore();

  return (
    <>
      {" "}
      <Balance />
      <div className="bg-[#00A24A] -mt-2">
        <div
          className="z-10 rounded-t-[30px] bg-white px-5 pb-1"
          id="main-content"
        >
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`flex-1 py-3 text-center font-medium text-sm ${
                walletTab === "deposit"
                  ? "text-[#00A24A] border-b-2 border-[#00A24A]"
                  : "text-gray-600"
              }`}
              onClick={() => setWalletTab("deposit")}
            >
              Deposit
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium text-sm ${
                walletTab === "withdraw"
                  ? "text-[#00A24A] border-b-2 border-[#00A24A]"
                  : "text-gray-600"
              }`}
              onClick={() => setWalletTab("withdraw")}
            >
              Withdraw
            </button>
          </div>
          {walletTab === "deposit" && <DepositWithdraw type="Deposit" />}
          {walletTab === "withdraw" && <DepositWithdraw type="Withdraw" />}
        </div>
      </div>
      <div className="-mt-1"></div>
    </>
  );
};

export default Wallet;
