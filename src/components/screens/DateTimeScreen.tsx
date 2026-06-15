import { CustomDatePicker, CustomTimePicker } from '../CustomDateTimePicker'
import { formatDateLong } from '../../utils/dateTime'
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
      <Card className="py-6">
        <h1 className="mb-5 flex items-center justify-center gap-2 text-lg font-extrabold text-white uppercase">
          <span>📅</span>
          Quando você tá livre?
        </h1>

        <div className="mb-4">
          <label className="mb-2 block text-xs font-semibold text-white/70">
            Escolhe o dia
          </label>
          <CustomDatePicker value={date} onChange={onDateChange} />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-xs font-semibold text-white/70">
            Escolhe o horário
          </label>
          <CustomTimePicker value={time} onChange={onTimeChange} />
        </div>

        {isValid && (
          <p className="mb-4 text-center text-xs text-white/50">
            {formatDateLong(date)} às {time}
          </p>
        )}

        <PrimaryButton onClick={onNext} disabled={!isValid}>
          {isValid ? 'Selecionar a data 💙' : 'Escolhe dia e horário'}
        </PrimaryButton>
      </Card>
    </MobileLayout>
  )
}
