import React from "react";
import { Check } from "lucide-react";

interface PasswordRequirementProps {
  met: boolean;
  children: React.ReactNode;
}

const PasswordRequirement = ({ met, children }: PasswordRequirementProps) => (
  <div className="flex items-center gap-2 text-sm">
    <Check className={`w-4 h-4 ${met ? "text-green-500" : "text-gray-300"}`} />
    <span className={met ? "text-green-600" : "text-gray-500"}>{children}</span>
  </div>
);

export default PasswordRequirement;
