import { formatToPeso } from "@/utils/utils.helper";
import OperatorWalletDrawer from "../components/WalletDrawer";
import { useOperatorWalletStore } from "@/store/operator/useWalletStore";

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
    label: "Role",
    value: "Player",
  },
  {
    label: "Total Amount",
    value: formatToPeso(20087),
  },
];
const SendReqCreditDrawer = () => {
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
        title="Send Credits"
        lists={listOptions}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SendReqCreditDrawer;
