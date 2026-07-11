export type Language = 'kr' | 'en'

export type GameMode = 'light' | 'deep'

export type GamePhase = 'splash' | 'guide' | 'playing'

/** 텍스트 기반 질문 카드 */
export interface Card {
  id: number
  icon: string
  question: string
  subQuestion: string
}

export interface QuestionItem {
  icon: string
  question: string
  subQuestion: string
}

export interface MessageSet {
  gameTitle: string
  play: string
  resume: string
  pause: string
  stop: string
  shuffle: string
  close: string
  restart: string
  gameSelection: string
  lightMode: string
  lightModeDesc: string
  lightModeDesc2: string
  deepMode: string
  deepModeDesc: string
  deepModeDesc2: string
  journeyCompleted: string
  allCardsCompleted: string
  timesUp: string
  clickToStart: string
  gettingToKnowSomeone: string
  bridgeConnects: string
  beginJourney: string
  needForJourney: string
  courageToShare: string
  startExcitingJourney: string
  startExcitingJourney2: string
  setTimeAndStart: string
  start: string
  cardBackLabel: string
  settings: string
}
