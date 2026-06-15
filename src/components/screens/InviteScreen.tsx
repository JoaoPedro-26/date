import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NO_MESSAGES } from '../../constants'
import { Card } from '../Card'
import { MobileLayout } from '../MobileLayout'
import { PrimaryButton } from '../PrimaryButton'

interface Popup {
  id: number
  text: string
  top: number
  left: number
}

interface ScreenPosition {
  top: number
  left: number
}

const BUTTON_WIDTH = 130
const BUTTON_HEIGHT = 48
const SCREEN_PADDING = 12

function randomScreenPosition(): ScreenPosition {
  const maxTop = window.innerHeight - BUTTON_HEIGHT - SCREEN_PADDING
  const maxLeft = window.innerWidth - BUTTON_WIDTH - SCREEN_PADDING
  return {
    top: SCREEN_PADDING + Math.random() * Math.max(maxTop - SCREEN_PADDING, 0),
    left: SCREEN_PADDING + Math.random() * Math.max(maxLeft - SCREEN_PADDING, 0),
  }
}

interface InviteScreenProps {
  onYes: () => void
}

export function InviteScreen({ onYes }: InviteScreenProps) {
  const [popups, setPopups] = useState<Popup[]>([])
  const [noEscaped, setNoEscaped] = useState(false)
  const [noPosition, setNoPosition] = useState<ScreenPosition>({ top: 0, left: 0 })
  const [noClicks, setNoClicks] = useState(0)

  const handleNo = useCallback(() => {
    const message = NO_MESSAGES[Math.floor(Math.random() * NO_MESSAGES.length)]
    const popup: Popup = {
      id: Date.now() + Math.random(),
      text: message,
      top: 8 + Math.random() * 75,
      left: 5 + Math.random() * 80,
    }

    setPopups((prev) => [...prev, popup])
    setNoClicks((c) => c + 1)
    setNoEscaped(true)
    setNoPosition(randomScreenPosition())

    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== popup.id))
    }, 2200)
  }, [])

  const noButton = (
    <PrimaryButton
      variant="nao"
      onClick={handleNo}
      className={noEscaped ? 'w-[130px] shadow-2xl' : 'w-full'}
      style={{ fontSize: noClicks > 3 ? '0.7rem' : undefined }}
    >
      {noClicks > 5 ? 'não dá 😭' : 'Não'}
    </PrimaryButton>
  )

  return (
    <MobileLayout
      character={
        <motion.span
          className="text-[120px] leading-none drop-shadow-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🥺
        </motion.span>
      }
    >
      <AnimatePresence>
        {popups.map((popup) => (
          <motion.div
            key={popup.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="pointer-events-none fixed z-50 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-[#3d2314] shadow-xl"
            style={{ top: `${popup.top}%`, left: `${popup.left}%` }}
          >
            {popup.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {noEscaped && (
        <motion.div
          className="fixed z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            top: noPosition.top,
            left: noPosition.left,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          {noButton}
        </motion.div>
      )}

      <Card>
        <h1 className="mb-6 text-center text-lg leading-snug font-extrabold text-white uppercase">
          Você aceitaria ir à um date comigo?
        </h1>

        <div className={`flex gap-3 ${noEscaped ? '' : ''}`}>
          <PrimaryButton
            variant="sim"
            onClick={onYes}
            className={noEscaped ? 'w-full' : 'flex-1'}
          >
            Sim
          </PrimaryButton>

          {!noEscaped && <div className="flex-1">{noButton}</div>}
        </div>
      </Card>
    </MobileLayout>
  )
}
