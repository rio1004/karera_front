import Text from "@/components/Text";

interface BankDetails {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
}

interface BankDetailsSectionProps {
  bankDetails: BankDetails;
}

export const BankDetailsSection = ({
  bankDetails,
}: BankDetailsSectionProps) => (
  <div className="space-y-4">
    <Text text="Bank Details" type="h8" className="text-start flex mb-1" />

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      {/* Bank Name */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">🏦</span>
        </div>
        <Text text={bankDetails.bankName} type="h7" className="font-medium" />
      </div>

      <div className="bg-gray-100 rounded p-3 mb-2">
        <Text
          text={bankDetails.accountHolder}
          type="h8"
          className="text-gray-700"
        />
      </div>

      <div className="bg-gray-100 rounded p-3">
        <Text
          text={bankDetails.accountNumber}
          type="h8"
          className="text-gray-700 font-mono"
        />
      </div>
    </div>
  </div>
);
