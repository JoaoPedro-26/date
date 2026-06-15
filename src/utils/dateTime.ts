const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export function parseDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return { year, month, day }
}

export function buildDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

export function getMonthOptions() {
  return MONTHS.map((label, index) => ({
    value: index + 1,
    label,
  }))
}

export function getYearOptions() {
  const current = new Date().getFullYear()
  return [current, current + 1]
}

export function getDayOptions(year: number, month: number) {
  const total = daysInMonth(year, month)
  return Array.from({ length: total }, (_, i) => i + 1)
}

export function getTimeSlots() {
  const slots: string[] = []
  for (let hour = 10; hour <= 23; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`)
    if (hour < 23) {
      slots.push(`${String(hour).padStart(2, '0')}:30`)
    }
  }
  return slots
}
