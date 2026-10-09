import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

interface SendCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: SendCreditsData) => void;
}

interface SendCreditsData {
  creditAmount: string;
  sendUsing: string;
  mobileNumber: string;
  agreeToTerms: boolean;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transactionData: {
    amount: string;
    recipientName: string;
    accountNumber: string;
    type: "send" | "withdraw";
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl w-full max-w-md ${className}`}>
        {children}
      </div>
    </div>
  );
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  transactionData,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Modal Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">
          {transactionData.type === "send"
            ? "Send Credits"
            : "Withdraw Credits"}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Amount Display */}
      <div className="p-4 text-center">
        <div className="text-2xl font-bold text-[#00A24A] mb-2">
          ₱ {transactionData.amount}
        </div>
        <div className="border-t border-dashed border-gray-300 my-4"></div>
      </div>

      {/* Transaction Details */}
      <div className="px-4 pb-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Name:</span>
          <span className="font-semibold">{transactionData.recipientName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Account Number:</span>
          <span className="font-semibold">{transactionData.accountNumber}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-semibold">₱ {transactionData.amount}.00</span>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onConfirm}
          className="w-full bg-[#00A24A] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#008A3F] transition-colors"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export const SendCreditsModal: React.FC<SendCreditsModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [activeTab, setActiveTab] = React.useState<"send" | "withdraw">("send");
  const [formData, setFormData] = React.useState<SendCreditsData>({
    creditAmount: "",
    sendUsing: "Mobile Number",
    mobileNumber: "",
    agreeToTerms: false,
  });

  const creditAmounts = ["100", "200", "500", "1,000", "5,000", "10,000"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    field: keyof SendCreditsData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header with tabs */}
      <div className="bg-[#00A24A] rounded-t-2xl p-4">
        <div className="flex justify-between items-center">
          <button
            className={`text-sm font-medium ${
              activeTab === "send" ? "text-white" : "text-black"
            }`}
            onClick={() => setActiveTab("send")}
          >
            Send Credits
          </button>
          <button
            className={`text-sm font-medium ${
              activeTab === "withdraw" ? "text-white" : "text-black"
            }`}
            onClick={() => setActiveTab("withdraw")}
          >
            Withdraw
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200"></div>

      {/* Content */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Credit Amount Section */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Credit Amount
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {creditAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={`border border-gray-300 rounded-lg py-2 px-3 text-sm ${
                    formData.creditAmount === amount
                      ? "bg-[#00A24A] text-white border-[#00A24A]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => handleInputChange("creditAmount", amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Amount"
                value={formData.creditAmount}
                onChange={(e) =>
                  handleInputChange("creditAmount", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                ₱
              </span>
            </div>
          </div>

          {/* Send Using Section */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Send Using
            </label>
            <div className="relative">
              <select
                value={formData.sendUsing}
                onChange={(e) => handleInputChange("sendUsing", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm appearance-none"
              >
                <option value="Mobile Number">Mobile Number</option>
                <option value="Email">Email</option>
                <option value="Username">Username</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Registered Mobile Number Section */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Registered Mobile Number
            </label>
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={formData.mobileNumber}
              onChange={(e) =>
                handleInputChange("mobileNumber", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Informational Text */}
          <p className="text-xs text-gray-500 leading-relaxed">
            Crediting of request may take 1-3 minutes. For issues, please
            contact our customer service.
          </p>

          {/* Send Button */}
          <button
            type="submit"
            className={`w-full rounded-lg py-3 text-sm font-medium transition-colors ${
              formData.creditAmount &&
              formData.mobileNumber &&
              formData.agreeToTerms
                ? "bg-[#00A24A] text-white hover:bg-[#008A3F]"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            disabled={
              !formData.creditAmount ||
              !formData.mobileNumber ||
              !formData.agreeToTerms
            }
          >
            Send
          </button>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) =>
                handleInputChange("agreeToTerms", e.target.checked)
              }
              className="mt-1"
            />
            <label
              htmlFor="terms"
              className="text-xs text-gray-600 leading-relaxed"
            >
              I agree to the{" "}
              <span className="text-blue-500 cursor-pointer">
                Terms and Conditions
              </span>{" "}
              and{" "}
              <span className="text-blue-500 cursor-pointer">
                Privacy Policy
              </span>
              .
            </label>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Modal;
