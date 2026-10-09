import Text from "@/components/Text";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import Tab from "../../components/Tab";
import { useForm, type FieldError } from "react-hook-form";
import FormField from "@/components/form/FormField";
import { useGenerateCodeStore } from "@/store/operator/useGenerateCode";

const tabs = [
  { label: "Representatives", value: "rep" as const },
  { label: "Players", value: "player" as const },
];

const Referral = () => {
  const [activeTab, setActiveTab] = useState("rep");
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [loading, setLoading] = useState(false);
  const [dataUrl, setDataUrl] = useState("");
  const [showGenerateForm, setShowGenerateForm] = useState(false);

  const {
    formData,
    isLoading: apiLoading,
    error,
    generatedCode,
    updateFormData,
    generateCode,
    resetForm,
  } = useGenerateCodeStore();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pctOperator: formData.pctOperator || 0,
      pctRep1: formData.pctRep1 || 0,
      pctRep2: formData.pctRep2 || 0,
      repType: (formData as any).repType || "rep1",
    },
  });

  useEffect(() => {
    const subscription = watch((values) => {
      updateFormData(values);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const switchTab = (tab: string) => {
    const tabValue = tab;
    setActiveTab(tabValue);
    const codeType = tabValue === "rep" ? "representative" : "player";
    updateFormData({ codeType });
  };

  const handleGenerateCode = handleSubmit(async (values) => {
    updateFormData({
      ...values,
      codeType: activeTab === "rep" ? "representative" : "player",
    });
    await generateCode();
  });

  const generateQRFromUrl = async (url: string) => {
    try {
      setLoading(true);
      const qrUrl = await QRCode.toDataURL(url, {
        errorCorrectionLevel: errorLevel,
        width: 200,
        margin: 1,
      });
      setDataUrl(qrUrl);
    } catch (err) {
      console.error("QR generation failed:", err);
      setDataUrl("");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!dataUrl) return;

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = generatedCode?.referralCode?.code
      ? `${generatedCode.referralCode.code}-qr.png`
      : "referral-qrcode.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = async () => {
    const linkToCopy = generatedCode?.referralUrl || "https://your-site.com/referral";

    try {
      await navigator.clipboard.writeText(linkToCopy);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      const textArea = document.createElement("textarea");
      textArea.value = linkToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const handleReset = () => {
    resetForm();
    reset();
    setDataUrl("");
    setShowGenerateForm(false);
  };

  useEffect(() => {
    if (generatedCode?.referralUrl) {
      generateQRFromUrl(generatedCode.referralUrl);
    }
  }, [generatedCode, errorLevel]);

  const currentQRSource = generatedCode?.qrCode || dataUrl;
  const currentReferralUrl = generatedCode?.referralUrl || "https://your-site.com/referral";

  return (
    <div className="absolute bottom-0 h-[90vh] bg-white left-0 w-full rounded-t-[30px] p-[30px] overflow-y-auto">
      <Tab tabs={tabs} onSwitch={switchTab} defaultTab="rep" />

      <div className="mt-5">
        {!generatedCode && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <Text text="Generate New Referral Code" type="h3" weight="bold" />
              <Button
                variant="outline"
                onClick={() => setShowGenerateForm(!showGenerateForm)}
                className="text-sm"
              >
                {showGenerateForm ? "Hide Form" : "Show Form"}
              </Button>
            </div>

            {showGenerateForm && (
              <form onSubmit={handleGenerateCode} className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <FormField
                    name="pctOperator"
                    register={register}
                    control={control}
                    errors={errors.pctOperator as FieldError | undefined}
                    placeholder="0.05"
                    type="number"
                    className="text-sm"
                  />
                  <FormField
                    name="pctRep1"
                    register={register}
                    control={control}
                    errors={errors.pctRep1 as FieldError | undefined}
                    placeholder="0.02"
                    type="number"
                    className="text-sm"
                  />
                  <FormField
                    name="pctRep2"
                    register={register}
                    control={control}
                    errors={errors.pctRep2 as FieldError | undefined}
                    placeholder="0.01"
                    type="number"
                    className="text-sm"
                  />
                </div>

                {activeTab === "rep" && (
                  <FormField
                    name="repType"
                    register={register}
                    control={control}
                    errors={errors.repType as FieldError | undefined}
                    type="select"
                    options={[
                      { value: "rep1", label: "Rep 1" },
                      { value: "rep2", label: "Rep 2" },
                    ]}
                    className="text-sm"
                  />
                )}

                {error && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={apiLoading}
                  variant={activeTab === "rep" ? "yellow" : "blue"}
                  className="w-full rounded-[10px] text-[14px]"
                >
                  {apiLoading ? "Generating..." : "Generate Code"}
                </Button>
              </form>
            )}
          </div>
        )}

        {generatedCode && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <Text
              text={`Generated Code: ${generatedCode.referralCode.code}`}
              type="p1"
              weight="bold"
            />
            <Button
              variant="outline"
              onClick={handleReset}
              className="mt-2 text-xs h-8"
            >
              Generate New Code
            </Button>
          </div>
        )}

        <Text
          text="You can Download this QR Code OR Copy your Referral Link"
          type="p1"
          weight="medium"
        />

        <div className="flex items-center justify-center mt-5">
          {currentQRSource || loading ? (
            <div className="relative">
              <img
                src={currentQRSource}
                alt="QR code for referral link"
                width={200}
                height={200}
                className={`border border-gray-200 rounded ${loading ? "opacity-50" : ""}`}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-[200px] h-[200px] border border-gray-200 rounded bg-gray-50">
              <div className="text-sm text-gray-500 text-center">No QR generated yet</div>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <Text text="Current Referral URL:" type="p2" weight="medium" />
          <div className="mt-1 text-xs text-blue-600 break-all font-mono">
            {currentReferralUrl}
          </div>
        </div>

        <div className="flex gap-3 mt-5 flex-col items-center">
          <Button
            variant={activeTab === "rep" ? "yellow" : "blue"}
            onClick={handleDownload}
            disabled={!currentQRSource || loading}
            className="rounded-[10px] text-[14px] w-[180px]"
          >
            {loading ? "Generating..." : "Download QR Code"}
          </Button>
          <Button
            variant={activeTab === "rep" ? "yellow" : "blue"}
            onClick={handleCopyLink}
            className="rounded-[10px] text-[14px] w-[180px]"
          >
            Copy Referral Link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Referral;
