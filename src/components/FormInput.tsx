import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"

type FormInputProps = {
  label?: string
  error?: FieldError
} & InputHTMLAttributes<HTMLInputElement>

const FormInput = ({ label, error, ...props }: FormInputProps) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium">{label}</label>}
    <input {...props} className="input w-full" />
    {error && <p className="text-error text-sm">{error.message}</p>}
  </div>
)

export default FormInput
