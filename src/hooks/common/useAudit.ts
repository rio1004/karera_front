import { useState, type JSX } from "react";
import { AdminAuditTrail } from "@/api/services/admin/auditTrailApi.service";
import { useAuthStore } from "@/store/auth/useAuth";
import type { AuditPayload } from "@/types/admin/auditTrail";
import { toast } from "sonner";

interface AuditConfig {
  actionType: string | ((response: any, requestData?: any) => string);
  module: string;
  target?: string | ((response: any, requestData?: any) => string);
  additionalMeta?:
    | Record<string, any>
    | ((response: any, requestData?: any) => Record<string, any>);
}

interface ToastConfig {
  success?: {
    message:
      | string
      | ((response: any, requestData?: any) => JSX.Element | string);
    showToast?: boolean;
  };
  error?: {
    message: string | ((error: any) => string);
    showToast?: boolean;
  };
}

interface UseApiWithAuditOptions {
  audit?: AuditConfig;
  toast?: ToastConfig;
  onSuccess?: (response: any, requestData?: any) => void;
  onError?: (error: any) => void;
  showLoading?: boolean;
}

export const useApiWithAudit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user: currentUser } = useAuthStore();

  const createAuditTrail = async (
    auditConfig: AuditConfig,
    response: any,
    requestData?: any
  ) => {
    if (!currentUser) {
      console.warn("No current user found for audit trail");
      return;
    }

    try {
      const actionType =
        typeof auditConfig.actionType === "function"
          ? auditConfig.actionType(response, requestData)
          : auditConfig.actionType;

      const target =
        typeof auditConfig.target === "function"
          ? auditConfig.target(response, requestData)
          : auditConfig.target || "";



      const auditPayload: AuditPayload = {
        userId: Number(currentUser.id),
        meta: {
          Timestamp: new Date().toISOString(),
          User: currentUser?.userName || "",
          ActionType: actionType,
          Module: auditConfig.module,
          Target: target,
        },
      };

      await AdminAuditTrail.postAuditTrail(auditPayload);
    } catch (error) {
      console.error("Failed to create audit trail:", error);
    }
  };

  const showToast = (
    type: "success" | "error",
    config: ToastConfig[typeof type],
    data?: any,
    requestData?: any
  ) => {
    if (!config || config.showToast === false) return;

    const message =
      typeof config.message === "function"
        ? config.message(type === "success" ? data : data, requestData)
        : config.message;

    // Handle JSX or string message
    if (typeof message === "string") {
      if (type === "success") {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } else {
      // Handle JSX message (like the original toast with icons)
      toast(message as JSX.Element);
    }
  };

  const executeWithAudit = async <T = any>(
    apiCall: () => Promise<T>,
    options: UseApiWithAuditOptions = {}
  ): Promise<T | null> => {
    const {
      audit,
      toast: toastConfig,
      onSuccess,
      onError,
      showLoading = true,
    } = options;

    if (showLoading) setIsLoading(true);

    try {
      const response = await apiCall();
      if (audit) {
        await createAuditTrail(audit, response);
      }

      // Show success toast if configured
      if (toastConfig?.success) {
        showToast("success", toastConfig.success, response);
      }

      onSuccess?.(response);

      return response;
    } catch (error) {
      console.error("API call failed:", error);

      if (toastConfig?.error) {
        showToast("error", toastConfig.error, error);
      }

      onError?.(error);

      return null;
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  return {
    executeWithAudit,
    isLoading,
    currentUser,
  };
};
