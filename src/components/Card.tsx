import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`w-full rounded-3xl bg-[#3d2314]/95 px-6 py-7 shadow-2xl backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.div>
  )
}
