export type Step =
  | 'invite'
  | 'confirm'
  | 'datetime'
  | 'address'
  | 'food'
  | 'vibe'
  | 'final'

export interface DateSelections {
  date: string
  time: string
  address: string
  food: string | null
  vibe: string | null
}

export interface OptionItem {
  id: string
  label: string
  emoji: string
}
