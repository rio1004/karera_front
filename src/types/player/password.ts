export interface PasswordStore {
  showPassword: boolean;
  showConfirmPassword: boolean;
  showOldPassword: boolean;
  isSubmitting: boolean;
  
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;
  toggleOldPasswordVisibility: () => void;
  setSubmitting: (loading: boolean) => void;
}