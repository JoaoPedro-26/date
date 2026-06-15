import { useEffect, useRef } from 'react'
import { FOOD_OPTIONS, VIBE_OPTIONS } from '../../constants'
import { notifySelections } from '../../services/notify'
import type { DateSelections } from '../../types'
import { Card } from '../Card'
import { MobileLayout } from '../MobileLayout'

interface FinalScreenProps {
  selections: DateSelections
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getLabel(
  options: { id: string; label: string; emoji: string }[],
  id: string | null,
) {
  return options.find((o) => o.id === id)
}

export function FinalScreen({ selections }: FinalScreenProps) {
  const food = getLabel(FOOD_OPTIONS, selections.food)
  const vibe = getLabel(VIBE_OPTIONS, selections.vibe)
  const notified = useRef(false)

  useEffect(() => {
    if (notified.current) return
    notified.current = true
    notifySelections(selections).catch((error) => {
      console.error('[date] Falha ao enviar notificação:', error)
    })
  }, [selections])

  return (
    <MobileLayout
      character={
        <div className="text-center text-[90px] leading-none drop-shadow-lg">
          🐧🕶️🌹
        </div>
      }
    >
      <Card>
        <h1 className="mb-2 text-center text-xl font-extrabold text-white uppercase">
          Tô contigo, gatinha. 💙
        </h1>
        <p className="mb-6 text-center text-sm text-white/85">
          Fica pronta que eu vou te buscar 🚗
        </p>

        <ul className="space-y-3 text-sm text-white">
          <li className="flex items-center gap-3 rounded-2xl bg-[#2a1810]/60 px-4 py-3">
            <span>🗓️</span>
            <span className="font-semibold">{formatDate(selections.date)}</span>
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-[#2a1810]/60 px-4 py-3">
            <span>⏰</span>
            <span className="font-semibold">{selections.time}</span>
          </li>
          <li className="flex items-start gap-3 rounded-2xl bg-[#2a1810]/60 px-4 py-3">
            <span className="mt-0.5">📍</span>
            <span className="font-semibold leading-snug">{selections.address}</span>
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-[#2a1810]/60 px-4 py-3">
            <span>🍽️</span>
            <span className="font-semibold">
              {food?.emoji} {food?.label}
            </span>
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-[#2a1810]/60 px-4 py-3">
            <span>✨</span>
            <span className="font-semibold">
              {vibe?.emoji} {vibe?.label}
            </span>
          </li>
        </ul>
      </Card>
    </MobileLayout>
  )
}
