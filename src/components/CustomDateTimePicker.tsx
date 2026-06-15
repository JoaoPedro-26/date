import {
  buildDate,
  getDayOptions,
  getMonthOptions,
  getTimeSlots,
  getYearOptions,
  parseDate,
} from '../utils/dateTime'
import { StyledSelect } from './StyledSelect'

interface CustomDatePickerProps {
  value: string
  onChange: (date: string) => void
}

export function CustomDatePicker({ value, onChange }: CustomDatePickerProps) {
  const { year, month, day } = parseDate(value)
  const dayOptions = getDayOptions(year, month)
  const safeDay = Math.min(day, dayOptions.length)

  const update = (nextYear: number, nextMonth: number, nextDay: number) => {
    const maxDay = getDayOptions(nextYear, nextMonth).length
    onChange(buildDate(nextYear, nextMonth, Math.min(nextDay, maxDay)))
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      <StyledSelect
        aria-label="Dia"
        value={safeDay}
        onChange={(e) => update(year, month, Number(e.target.value))}
        options={dayOptions.map((d) => ({ value: d, label: String(d) }))}
      />
      <StyledSelect
        aria-label="Mês"
        value={month}
        onChange={(e) => update(year, Number(e.target.value), safeDay)}
        options={getMonthOptions().map((m) => ({
          value: m.value,
          label: m.label.slice(0, 3),
        }))}
      />
      <StyledSelect
        aria-label="Ano"
        value={year}
        onChange={(e) => update(Number(e.target.value), month, safeDay)}
        options={getYearOptions().map((y) => ({ value: y, label: String(y) }))}
      />
    </div>
  )
}

interface CustomTimePickerProps {
  value: string
  onChange: (time: string) => void
}

export function CustomTimePicker({ value, onChange }: CustomTimePickerProps) {
  const slots = getTimeSlots()

  return (
    <div className="grid max-h-44 grid-cols-3 gap-2 overflow-y-auto pr-1">
      {slots.map((slot) => {
        const isSelected = value === slot
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onChange(slot)}
            className={`rounded-2xl border-2 px-2 py-2.5 text-xs font-bold transition-all active:scale-95 ${
              isSelected
                ? 'border-white bg-[#f05a3a] text-white shadow-lg'
                : 'border-white/20 bg-[#2a1810] text-white hover:border-white/40'
            }`}
          >
            {slot}
          </button>
        )
      })}
    </div>
  )
}
