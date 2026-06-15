import { VIBE_OPTIONS } from '../../constants'
import { Card } from '../Card'
import { MobileLayout } from '../MobileLayout'
import { PrimaryButton } from '../PrimaryButton'

interface VibeScreenProps {
  selected: string | null
  onSelect: (id: string) => void
  onNext: () => void
}

export function VibeScreen({ selected, onSelect, onNext }: VibeScreenProps) {
  return (
    <MobileLayout>
      <Card>
        <h1 className="mb-1 text-center text-lg font-extrabold text-white uppercase">
          Qual é a vibe? 🌟
        </h1>
        <p className="mb-5 text-center text-sm text-white/75">
          Já vamos planejar o próximo date — escolhe a atividade ideal
        </p>

        <div className="mb-5 grid grid-cols-3 gap-2.5">
          {VIBE_OPTIONS.map((option) => {
            const isSelected = selected === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option.id)}
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-2 px-2 py-3.5 transition-all active:scale-95 ${
                  isSelected
                    ? 'border-white bg-[#5c3828] shadow-lg'
                    : 'border-white/20 bg-[#2a1810] hover:border-white/40'
                }`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-[10px] leading-tight font-bold text-white">
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>

        <PrimaryButton onClick={onNext} disabled={!selected}>
          {selected ? 'Isso parece legal! 😎' : 'Escolhe a vibe 👆'}
        </PrimaryButton>
      </Card>
    </MobileLayout>
  )
}
