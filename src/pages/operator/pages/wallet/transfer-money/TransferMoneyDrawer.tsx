import { formatToPeso } from "@/utils/utils.helper";
import { useOperatorWalletStore } from "@/store/operator/useWalletStore";
import OperatorWalletDrawer from "../components/WalletDrawer";

const listOptions = [
  {
    label: "Name",
    value: "Jose Matalo",
  },
  {
    label: "Account Number",
    value: "09192288787",
  },
  {
    label: "Service Fee",
    value: formatToPeso(599),
  },
  {
    label: "Total Amount",
    value: formatToPeso(20087),
  },
];
const  WithdrawMoneyDrawer = () => {
   const { showSendDrawer, setShowSendDrawer, setShowSendPin } =
    useOperatorWalletStore();

  const handleSubmit = () => {
    setShowSendDrawer(false);
    setShowSendPin(true);
  };
  return (
    <div>
      {" "}
      <OperatorWalletDrawer
        open={showSendDrawer}
        setOpen={setShowSendDrawer}
        amount={100}
        title="Withdraw Money"
        lists={listOptions}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default WithdrawMoneyDrawer;
