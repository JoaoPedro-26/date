import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'sim' | 'nao' | 'muted'
}

const variants = {
  primary: 'bg-[#f05a3a] hover:bg-[#ff6b4a] active:scale-95',
  sim: 'bg-[#f06b4e] hover:bg-[#ff7d62] active:scale-95',
  nao: 'bg-[#b83220] hover:bg-[#c93d2a] active:scale-95',
  muted: 'bg-[#5c3828] text-white/70 cursor-not-allowed',
}

export function PrimaryButton({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`w-full rounded-full px-6 py-3.5 text-sm font-extrabold tracking-wide text-white uppercase transition-all ${disabled ? variants.muted : variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
