import { motion } from 'framer-motion'
import { Card } from '../Card'
import { MobileLayout } from '../MobileLayout'
import { PrimaryButton } from '../PrimaryButton'

interface ConfirmScreenProps {
  onNext: () => void
}

export function ConfirmScreen({ onNext }: ConfirmScreenProps) {
  return (
    <MobileLayout
      character={
        <motion.div
          className="text-center text-[100px] leading-none"
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <span className="drop-shadow-lg">😎</span>
          <span className="ml-2 text-6xl">🌹</span>
        </motion.div>
      }
    >
      <Card>
        <h1 className="mb-3 text-center text-xl font-extrabold text-white uppercase">
          Você disse sim? 🥺
        </h1>
        <p className="mb-6 text-center text-sm text-white/85">
          Eu estava esperando você dizer não kkkk
        </p>
        <PrimaryButton onClick={onNext}>Próximo 🦋</PrimaryButton>
      </Card>
    </MobileLayout>
  )
}
