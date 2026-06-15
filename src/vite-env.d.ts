/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
  readonly VITE_TELEGRAM_BOT_TOKEN?: string
  readonly VITE_TELEGRAM_CHAT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
