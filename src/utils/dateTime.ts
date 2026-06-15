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

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

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

export function getMonthLabel(month: number): string {
  return MONTHS[month - 1] ?? ''
}

export function getWeekdayLabels() {
  return WEEKDAYS
}

export function formatDateLong(date: string): string {
  const { year, month, day } = parseDate(date)
  return `${day} de ${getMonthLabel(month).toLowerCase()} de ${year}`
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

export interface CalendarDay {
  day: number
  year: number
  month: number
  date: string
  isToday: boolean
  isDisabled: boolean
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isDateDisabled(year: number, month: number, day: number): boolean {
  const today = startOfDay(new Date())
  const candidate = new Date(year, month - 1, day)
  return candidate < today
}

export function getCalendarDays(year: number, month: number): (CalendarDay | null)[] {
  const firstWeekday = new Date(year, month - 1, 1).getDay()
  const totalDays = daysInMonth(year, month)
  const today = startOfDay(new Date())
  const cells: (CalendarDay | null)[] = []

  for (let i = 0; i < firstWeekday; i++) {
    cells.push(null)
  }

  for (let day = 1; day <= totalDays; day++) {
    const candidate = new Date(year, month - 1, day)
    cells.push({
      day,
      year,
      month,
      date: buildDate(year, month, day),
      isToday: candidate.getTime() === today.getTime(),
      isDisabled: isDateDisabled(year, month, day),
    })
  }

  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return cells
}

export function getMonthStart(year: number, month: number) {
  return new Date(year, month - 1, 1)
}

export function canNavigatePrev(viewYear: number, viewMonth: number): boolean {
  const now = new Date()
  const view = getMonthStart(viewYear, viewMonth)
  const current = getMonthStart(now.getFullYear(), now.getMonth() + 1)
  return view > current
}

export function canNavigateNext(viewYear: number, viewMonth: number): boolean {
  const now = new Date()
  const limit = getMonthStart(now.getFullYear(), now.getMonth() + 13)
  const view = getMonthStart(viewYear, viewMonth)
  return view < limit
}

export function shiftMonth(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  const date = new Date(year, month - 1 + delta, 1)
  return { year: date.getFullYear(), month: date.getMonth() + 1 }
}
