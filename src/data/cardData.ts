import type { Card, Language } from '@/types/game'

const createCardSet = (prefix: string, modeSuffix: string): Card[] => {
  const baseCards = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    img: `/img/${prefix}_bridge_${index + 1}.png`,
  }))

  const modeCards = Array.from({ length: 8 }, (_, index) => ({
    id: index + 9,
    img: `/img/${prefix}_bridge_${modeSuffix}_${index + 1}.png`,
  }))

  return [...baseCards, ...modeCards]
}

const createEnglishCardSet = (modeSuffix: string): Card[] => {
  const baseCards = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    img: `/img/bridge_${index + 1}.png`,
  }))

  const modeCards = Array.from({ length: 8 }, (_, index) => ({
    id: index + 9,
    img: `/img/bridge_${modeSuffix}_${index + 1}.png`,
  }))

  return [...baseCards, ...modeCards]
}

export const CARD_DATA: Record<Language, { light: Card[]; deep: Card[] }> = {
  kr: {
    light: createCardSet('kr', 'light'),
    deep: createCardSet('kr', 'deep'),
  },
  en: {
    light: createEnglishCardSet('light'),
    deep: createEnglishCardSet('deep'),
  },
}
