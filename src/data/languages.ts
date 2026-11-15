export const languages = [
  { value: 'en', lang: 'en', label: 'English' },
  { value: 'zh', lang: 'zh-CN', label: '简体中文' },
  { value: 'es', lang: 'es', label: 'Español' },
  { value: 'pt', lang: 'pt-BR', label: 'Português' },
  { value: 'fr', lang: 'fr', label: 'Français' },
  { value: 'de', lang: 'de', label: 'Deutsch' },
  { value: 'ja', lang: 'ja', label: '日本語' },
  { value: 'ko', lang: 'ko', label: '한국어' },
  { value: 'ru', lang: 'ru', label: 'Русский' },
  { value: 'ar', lang: 'ar', label: 'العربية' },
] as const

export type Language = (typeof languages)[number]['value']

export function isLanguage(value: string | null): value is Language {
  return languages.some(language => language.value === value)
}
