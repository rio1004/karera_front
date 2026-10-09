import { useGenerateCodeStore } from "@/store/operator/useGenerateCode";
import type { RepresentativeCode } from "@/types/operator/generateCode";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormField from "@/components/form/FormField";
import { codeTypeOptions, repTypeOptions } from "@/constant/operator/option";

type FormData = {
  pctOperator: number;
  pctRep1: number;
  pctRep2: number;
  codeType: "player" | "representative";
  repType?: "rep1" | "rep2";
};

const GenerateCode = () => {
  const {
    formData,
    isLoading,
    error,
    generatedCode,
    updateFormData,
    resetForm,
    generateCode,
    clearError,
    clearGeneratedCode,
  } = useGenerateCodeStore();

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      pctOperator: formData.pctOperator,
      pctRep1: formData.pctRep1,
      pctRep2: formData.pctRep2,
      codeType: formData.codeType,
      repType:
        formData.codeType === "representative"
          ? (formData as RepresentativeCode).repType
          : undefined,
    },
  });

  const watchedCodeType = watch("codeType");

  useEffect(() => {
    const subscription = watch((value) => {
      if (error) clearError();

      if (value.codeType === "representative" && value.repType) {
        updateFormData({
          pctOperator: value.pctOperator || 0,
          pctRep1: value.pctRep1 || 0,
          pctRep2: value.pctRep2 || 0,
          codeType: "representative",
          repType: value.repType,
        });
      } else if (value.codeType === "player") {
        updateFormData({
          pctOperator: value.pctOperator || 0,
          pctRep1: value.pctRep1 || 0,
          pctRep2: value.pctRep2 || 0,
          codeType: "player",
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData, clearError, error]);

  useEffect(() => {
    if (watchedCodeType === "player") {
      setValue("repType", undefined);
    } else if (watchedCodeType === "representative" && !watch("repType")) {
      setValue("repType", "rep1");
    }
  }, [watchedCodeType, setValue, watch]);

  const onSubmit = async (data: FormData) => {
    await generateCode();
  };

  const handleReset = () => {
    resetForm();
    clearGeneratedCode();
    reset({
      pctOperator: 0,
      pctRep1: 0,
      pctRep2: 0,
      codeType: "player",
      repType: undefined,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Generate Code</h2>

      <form onSubmit={hookFormHandleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="pctOperator"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Operator Percentage
            </label>
            <FormField
              name="pctOperator"
              register={register}
              control={control}
              type="number"
              placeholder="0.05"
              errors={errors.pctOperator}
            />
          </div>

          <div>
            <label
              htmlFor="pctRep1"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rep 1 Percentage
            </label>
            <FormField
              name="pctRep1"
              register={register}
              control={control}
              type="number"
              placeholder="0.02"
              errors={errors.pctRep1}
            />
          </div>

          <div>
            <label
              htmlFor="pctRep2"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rep 2 Percentage
            </label>
            <FormField
              name="pctRep2"
              register={register}
              control={control}
              type="number"
              placeholder="0.01"
              errors={errors.pctRep2}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="codeType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Code Type
          </label>
          <FormField
            name="codeType"
            register={register}
            control={control}
            type="select"
            options={codeTypeOptions}
            placeholder="Select code type"
            errors={errors.codeType}
          />
        </div>

        {watchedCodeType === "representative" && (
          <div>
            <label
              htmlFor="repType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Representative Type
            </label>
            <FormField
              name="repType"
              register={register}
              control={control}
              type="select"
              options={repTypeOptions}
              placeholder="Select representative type"
              errors={errors.repType}
              validate={(value: string) => {
                if (watchedCodeType === "representative" && !value) {
                  return "Please select a representative type";
                }
                return true;
              }}
            />
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="flex space-x-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Generating..." : "Generate Code"}
          </Button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {generatedCode && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-md">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            Generated Code Result
          </h3>

          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Code: </span>
              <span className="font-mono text-green-700">
                {generatedCode.referralCode.code}
              </span>
            </div>

            <div>
              <span className="font-medium text-gray-700">Referral URL: </span>
              <a
                href={generatedCode.referralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all"
              >
                {generatedCode.referralUrl}
              </a>
            </div>

            <div>
              <span className="font-medium text-gray-700">QR Code: </span>
              <div className="mt-2">
                <img
                  src={generatedCode.qrCode}
                  alt="QR Code"
                  className="border border-gray-300 rounded"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={clearGeneratedCode}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Clear Result
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateCode;
