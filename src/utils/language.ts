import type { Language } from '@/types/game'

const STORAGE_KEY = 'bridgeCardLanguage'

export const detectLanguage = (): Language => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'kr' || saved === 'en') return saved

  const browserLanguage = navigator.language || ''
  if (browserLanguage.startsWith('ko') || browserLanguage.startsWith('kr')) {
    return 'kr'
  }
  if (browserLanguage.startsWith('en')) return 'en'

  return 'kr'
}

export const setLanguage = (language: Language): boolean => {
  if (language !== 'kr' && language !== 'en') return false
  localStorage.setItem(STORAGE_KEY, language)
  return true
}

export const getHtmlLang = (language: Language): string =>
  language === 'kr' ? 'ko' : 'en'
