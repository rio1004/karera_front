export type OtpResponse = {
  message: string;
  otpCode: string;
};
export type OtpPayload = {
  mobile: string;
};

export interface OtpState {
  mobile: string | null;
  resetToken: string | null;
  isLoading: boolean;

  setMobile: (mobile: string) => void;
  setResetToken: (resetToken: string) => void; 
  OtpRequest: (mobile: string) => Promise<any>;
  OtpVerify: (otp: string, mobile: string) => Promise<any>;
  confirmPassword: (
    otp: string,
    newPassword: string,
    confirmNewPassword: string,
    userName: string
  ) => Promise<any>;
  PasswordChange: (
    oldPassword: string,
    newPassword: string,
    newRepeatPassword: string
  ) => Promise<any>;
}

