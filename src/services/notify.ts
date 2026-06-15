import { FOOD_OPTIONS, VIBE_OPTIONS } from '../constants'
import type { DateSelections } from '../types'

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

export function formatSelectionsMessage(selections: DateSelections): string {
  const food = getLabel(FOOD_OPTIONS, selections.food)
  const vibe = getLabel(VIBE_OPTIONS, selections.vibe)

  return [
    '💙 Nova resposta no date!',
    '',
    `📅 Data: ${formatDate(selections.date)}`,
    `⏰ Horário: ${selections.time}`,
    `📍 Endereço: ${selections.address}`,
    `🍽️ Comida: ${food?.emoji} ${food?.label ?? '-'}`,
    `✨ Vibe: ${vibe?.emoji} ${vibe?.label ?? '-'}`,
    '',
    `Enviado em: ${new Date().toLocaleString('pt-BR')}`,
  ].join('\n')
}

async function sendEmail(message: string): Promise<boolean> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    console.warn('[date] VITE_WEB3FORMS_ACCESS_KEY não configurada no build')
    return false
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: '💙 Alguém aceitou o date!',
      from_name: 'Date App',
      message,
      botcheck: '',
    }),
  })

  const data = await response.json()
  if (!data.success) {
    console.error('[date] Web3Forms erro:', data.message ?? data)
  }
  return data.success === true
}

async function sendTelegram(message: string): Promise<boolean> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID
  if (!token || !chatId) return false

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    },
  )

  const data = await response.json()
  return data.ok === true
}

export async function notifySelections(
  selections: DateSelections,
): Promise<{ email: boolean; telegram: boolean }> {
  const message = formatSelectionsMessage(selections)
  const hasEmail = Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
  const hasTelegram = Boolean(
    import.meta.env.VITE_TELEGRAM_BOT_TOKEN &&
      import.meta.env.VITE_TELEGRAM_CHAT_ID,
  )

  if (!hasEmail && !hasTelegram) {
    console.info(
      '[date] Notificação não configurada. Veja o arquivo .env.example',
    )
    return { email: false, telegram: false }
  }

  const [email, telegram] = await Promise.all([
    hasEmail ? sendEmail(message) : Promise.resolve(false),
    hasTelegram ? sendTelegram(message) : Promise.resolve(false),
  ])

  return { email, telegram }
}
