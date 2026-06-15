import type { ReactNode } from 'react'
import { FloatingHearts } from './FloatingHearts'

interface MobileLayoutProps {
  children: ReactNode
  character?: ReactNode
}

export function MobileLayout({ children, character }: MobileLayoutProps) {
  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#e8432e] px-4 py-8">
      <FloatingHearts />
      <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center gap-6">
        {character && (
          <div className="flex items-center justify-center">{character}</div>
        )}
        {children}
      </div>
    </div>
  )
}
