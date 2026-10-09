import { useState, useRef, useEffect } from "react"

interface Option {
  label: string
  value: string
}

interface SelectFieldProps {
  options: readonly Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

export const SelectField = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error,
}: SelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleSelect = (option: Option) => {
    onChange(option.value)
    setIsOpen(false)
  }

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full my-4" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex justify-between items-center w-full px-4 py-3 border rounded-md text-sm bg-white focus:outline-none transition ${
          error ? "border-red-500" : "border-gray-300 hover:border-gray-500"
        }`}
      >
        <span className={selectedOption ? "" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="text-xs ml-2">▾</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto border border-gray-300 rounded-md bg-white shadow">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                option.value === value ? "bg-gray-200 font-medium" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  )
}
