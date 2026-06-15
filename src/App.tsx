import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AddressScreen } from './components/screens/AddressScreen'
import { ConfirmScreen } from './components/screens/ConfirmScreen'
import { DateTimeScreen } from './components/screens/DateTimeScreen'
import { FinalScreen } from './components/screens/FinalScreen'
import { FoodScreen } from './components/screens/FoodScreen'
import { InviteScreen } from './components/screens/InviteScreen'
import { VibeScreen } from './components/screens/VibeScreen'
import type { DateSelections, Step } from './types'

function getDefaultDate(): string {
  const today = new Date()
  const y = today.getFullYear()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const d = String(today.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function App() {
  const [step, setStep] = useState<Step>('invite')
  const [selections, setSelections] = useState<DateSelections>({
    date: getDefaultDate(),
    time: '19:00',
    address: '',
    food: null,
    vibe: null,
  })

  const update = (partial: Partial<DateSelections>) => {
    setSelections((prev) => ({ ...prev, ...partial }))
  }

  const screenVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        variants={screenVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="min-h-dvh"
      >
        {step === 'invite' && (
          <InviteScreen onYes={() => setStep('confirm')} />
        )}
        {step === 'confirm' && (
          <ConfirmScreen onNext={() => setStep('datetime')} />
        )}
        {step === 'datetime' && (
          <DateTimeScreen
            date={selections.date}
            time={selections.time}
            onDateChange={(date) => update({ date })}
            onTimeChange={(time) => update({ time })}
            onNext={() => setStep('address')}
          />
        )}
        {step === 'address' && (
          <AddressScreen
            address={selections.address}
            onAddressChange={(address) => update({ address })}
            onNext={() => setStep('food')}
          />
        )}
        {step === 'food' && (
          <FoodScreen
            selected={selections.food}
            onSelect={(food) => update({ food })}
            onNext={() => setStep('vibe')}
          />
        )}
        {step === 'vibe' && (
          <VibeScreen
            selected={selections.vibe}
            onSelect={(vibe) => update({ vibe })}
            onNext={() => setStep('final')}
          />
        )}
        {step === 'final' && <FinalScreen selections={selections} />}
      </motion.div>
    </AnimatePresence>
  )
}

export default App
