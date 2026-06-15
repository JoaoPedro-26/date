import { FOOD_OPTIONS } from '../../constants'
import { Card } from '../Card'
import { MobileLayout } from '../MobileLayout'
import { PrimaryButton } from '../PrimaryButton'

interface FoodScreenProps {
  selected: string | null
  onSelect: (id: string) => void
  onNext: () => void
}

export function FoodScreen({ selected, onSelect, onNext }: FoodScreenProps) {
  return (
    <MobileLayout>
      <Card>
        <h1 className="mb-5 text-center text-lg font-extrabold text-white uppercase">
          O que tá afim? 😏
        </h1>

        <div className="mb-5 grid grid-cols-2 gap-3">
          {FOOD_OPTIONS.map((option) => {
            const isSelected = selected === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option.id)}
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-2 px-3 py-4 transition-all active:scale-95 ${
                  isSelected
                    ? 'border-white bg-[#5c3828] shadow-lg'
                    : 'border-white/20 bg-[#2a1810] hover:border-white/40'
                }`}
              >
                <span className="text-3xl">{option.emoji}</span>
                <span className="text-xs font-bold text-white">{option.label}</span>
              </button>
            )
          })}
        </div>

        <PrimaryButton onClick={onNext} disabled={!selected}>
          {selected ? 'Continuar 💕' : 'Escolhe primeiro 👆'}
        </PrimaryButton>
      </Card>
    </MobileLayout>
  )
}
