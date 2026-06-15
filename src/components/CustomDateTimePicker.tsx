import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  canNavigateNext,
  canNavigatePrev,
  formatDateLong,
  getCalendarDays,
  getMonthLabel,
  getTimeSlots,
  getWeekdayLabels,
  parseDate,
  shiftMonth,
} from '../utils/dateTime'

interface CustomDatePickerProps {
  value: string
  onChange: (date: string) => void
}

export function CustomDatePicker({ value, onChange }: CustomDatePickerProps) {
  const selected = parseDate(value)
  const [viewYear, setViewYear] = useState(selected.year)
  const [viewMonth, setViewMonth] = useState(selected.month)
  const [direction, setDirection] = useState(0)

  const navigate = (delta: number) => {
    setDirection(delta)
    const next = shiftMonth(viewYear, viewMonth, delta)
    setViewYear(next.year)
    setViewMonth(next.month)
  }

  const days = getCalendarDays(viewYear, viewMonth)

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-white/10 bg-[#2a1810] p-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={!canNavigatePrev(viewYear, viewMonth)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d2314] text-lg text-white transition enabled:active:scale-90 disabled:opacity-25"
          aria-label="Mês anterior"
        >
          ‹
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.p
            key={`${viewYear}-${viewMonth}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-extrabold text-white capitalize"
          >
            {getMonthLabel(viewMonth)} {viewYear}
          </motion.p>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => navigate(1)}
          disabled={!canNavigateNext(viewYear, viewMonth)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d2314] text-lg text-white transition enabled:active:scale-90 disabled:opacity-25"
          aria-label="Próximo mês"
        >
          ›
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {getWeekdayLabels().map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="py-1 text-center text-[10px] font-bold text-white/40"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((cell, index) => {
          if (!cell) {
            return <span key={`empty-${index}`} className="aspect-square" />
          }

          const isSelected =
            cell.year === selected.year &&
            cell.month === selected.month &&
            cell.day === selected.day

          return (
            <button
              key={cell.date}
              type="button"
              disabled={cell.isDisabled}
              onClick={() => onChange(cell.date)}
              className={`relative flex aspect-square items-center justify-center rounded-xl text-sm font-bold transition-all active:scale-95 ${
                isSelected
                  ? 'bg-[#f05a3a] text-white shadow-lg'
                  : cell.isDisabled
                    ? 'text-white/20'
                    : cell.isToday
                      ? 'bg-[#5c3828] text-white ring-2 ring-white/30'
                      : 'text-white hover:bg-[#3d2314]'
              }`}
            >
              {cell.day}
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-center text-xs font-semibold text-white/60">
        📅 {formatDateLong(value)}
      </p>
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
    <div className="grid max-h-36 grid-cols-4 gap-2 overflow-y-auto pr-1">
      {slots.map((slot) => {
        const isSelected = value === slot
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onChange(slot)}
            className={`rounded-2xl border-2 px-1 py-2.5 text-xs font-bold transition-all active:scale-95 ${
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
