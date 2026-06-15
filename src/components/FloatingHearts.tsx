import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface Heart {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
}

function createHearts(count: number): Heart[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    size: 14 + Math.random() * 22,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 5,
    opacity: 0.35 + Math.random() * 0.45,
  }))
}

export function FloatingHearts() {
  const hearts = useMemo(() => createHearts(18), [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute select-none"
          style={{
            left: `${heart.left}%`,
            fontSize: heart.size,
            opacity: heart.opacity,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
          }}
          initial={{ y: '110vh', rotate: 0 }}
          animate={{
            y: '-15vh',
            rotate: [0, 15, -10, 0],
            x: [0, 20, -15, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          🖤
        </motion.span>
      ))}
    </div>
  )
}
