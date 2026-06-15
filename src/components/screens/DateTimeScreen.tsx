import { Card } from '../Card'
import { MobileLayout } from '../MobileLayout'
import { PrimaryButton } from '../PrimaryButton'

interface DateTimeScreenProps {
  date: string
  time: string
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
  onNext: () => void
}

export function DateTimeScreen({
  date,
  time,
  onDateChange,
  onTimeChange,
  onNext,
}: DateTimeScreenProps) {
  const isValid = date.length > 0 && time.length > 0

  return (
    <MobileLayout>
      <Card>
        <h1 className="mb-6 flex items-center justify-center gap-2 text-lg font-extrabold text-white uppercase">
          <span>📅</span>
          Quando você tá livre?
        </h1>

        <div className="mb-4">
          <label className="mb-2 block text-xs font-semibold text-white/70">
            Escolhe a data
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full rounded-full border-2 border-white/10 bg-[#2a1810] px-5 py-3.5 text-white outline-none focus:border-[#f05a3a]"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold text-white/70">
            Escolhe o horário
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full rounded-full border-2 border-white/10 bg-[#2a1810] px-5 py-3.5 text-white outline-none focus:border-[#f05a3a]"
          />
        </div>

        <PrimaryButton onClick={onNext} disabled={!isValid}>
          {isValid ? 'Selecionar a data 💙' : 'Preenche data e horário'}
        </PrimaryButton>
      </Card>
    </MobileLayout>
  )
}
