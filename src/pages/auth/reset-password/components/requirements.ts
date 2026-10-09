export const getPasswordRequirements = (password: string) => [
  { met: password.length >= 8, text: "Between 8-16 characters" },
  { met: /[A-Z]/.test(password), text: "At least (1) uppercase letter (A-Z)" },
  { met: /[a-z]/.test(password), text: "At least (1) lowercase letter (a-z)" },
  { met: /[0-9]/.test(password), text: "At least (1) number (0-9)" },
  {
    met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    text: "At least (1) special character (e.g. ! @ # $ % ^ & *)",
  },
];
