import { QUESTIONS } from '@/data/questions'
import type { Card, GameMode, Language } from '@/types/game'

/** 언어·모드별 16장 덱 생성 (공통 8 + 모드 전용 8) */
const buildDeck = (language: Language, mode: GameMode): Card[] => {
  const baseItems = QUESTIONS.base[language]
  const modeItems = QUESTIONS[mode][language]

  const baseCards: Card[] = baseItems.map((item, index) => ({
    id: index + 1,
    ...item,
  }))

  const modeCards: Card[] = modeItems.map((item, index) => ({
    id: index + 9,
    ...item,
  }))

  return [...baseCards, ...modeCards]
}

export const CARD_DATA: Record<Language, Record<GameMode, Card[]>> = {
  kr: {
    light: buildDeck('kr', 'light'),
    deep: buildDeck('kr', 'deep'),
  },
  en: {
    light: buildDeck('en', 'light'),
    deep: buildDeck('en', 'deep'),
  },
}

/** ID 기준으로 카드 내용만 언어에 맞게 교체 */
export const remapDeckLanguage = (
  currentDeck: Card[],
  language: Language,
  mode: GameMode,
): Card[] => {
  const cardMap = new Map(
    CARD_DATA[language][mode].map((card) => [card.id, card]),
  )

  return currentDeck.map((card) => cardMap.get(card.id) ?? card)
}
