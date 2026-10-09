import AuthLogin from "@/pages/auth/login/login";
import OtpPage from "@/pages/auth/otp/OtpPage";
import Register from "@/pages/auth/register/Register";
import ForgotPassword from "@/pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "@/pages/auth/reset-password/ResetPassword";
import AdminRedirector from "@/pages/auth/admin-redirector";
import EKYC from "@/pages/player/pages/ekyc";
import UploadID from "@/pages/player/pages/ekyc/steps/UploadID";
import TypeDocument from "@/pages/player/pages/ekyc/steps/DocumentType";
import UploadSelfie from "@/pages/player/pages/ekyc/steps/UploadSelfie";
import Selfie from "@/pages/player/pages/ekyc/steps/Selfie";
import ConfirmSelfie from "@/pages/player/pages/ekyc/steps/ConfirmSelfie";

type AuthTypes = {
  label?: string;
  title?: string;
  element: React.ReactNode;
  path: string;
};
export const AuthLayoutConfig: AuthTypes[] = [
  {
    path: "auth/login",
    title: "Sign In",
    label: "Let’s Get You Signed In!",
    element: <AuthLogin />,
  },

  {
    path: "auth/register",
    title: "Sign Up",
    label: "Let’s Get You Signed In!",
    element: <Register />,
  },
  {
    path: "auth/register/ekyc-settings",
    title: "KYC Setting",
    element: <EKYC />,
  },
  {
    path: "auth/register/upload-id/front",
    title: "Take an ID Photo",
    element: <UploadID />,
  },
  {
    path: "auth/register/upload-id/back",
    title: "Take an ID Photo",
    element: <UploadID />,
  },
  {
    path: "auth/register/document-type",
    title: "Select Type of Document",
    element: <TypeDocument />,
  },
  {
    path: "auth/register/upload-selfie",
    title: "Upload Selfie",
    element: <UploadSelfie />,
  },
  {
    path: "auth/register/upload-selfie/selfie",
    title: "Upload Selfie",
    element: <Selfie />,
  },
  {
    path: "auth/register/upload-selfie/confirm-selfie",
    title: "Confirm Selfie",
    element: <ConfirmSelfie />,
  },
  {
    path: "auth/register/upload-id/confirm-id",
    title: "Confirm ID Photo",
    element: <ConfirmSelfie />,
  },

  {
    path: "auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "auth/otp",
    element: <OtpPage />,
  },
  {
    path: "auth/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "auth/redirector",
    title: "Go to",
    label: "Let’s Get You Started!",
    element: <AdminRedirector />,
  },
];
