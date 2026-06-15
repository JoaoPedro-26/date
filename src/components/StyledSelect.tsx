import type { SelectHTMLAttributes } from 'react'

interface StyledSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string | number; label: string }[]
}

export function StyledSelect({ options, className = '', ...props }: StyledSelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`w-full appearance-none rounded-full border-2 border-white/10 bg-[#2a1810] px-4 py-3.5 pr-10 text-sm font-semibold text-white outline-none focus:border-[#f05a3a] ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#2a1810]">
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs text-white/50">
        ▼
      </span>
    </div>
  )
}
