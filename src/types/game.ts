export type Language = 'kr' | 'en'

export type GameMode = 'light' | 'deep'

export type GamePhase = 'splash' | 'guide' | 'playing'

export type MockModalType = 'review-write' | 'review-board' | null

export interface Card {
  id: number
  img: string
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
  writeReview: string
  journeyCompleted: string
  allCardsCompleted: string
  timesUp: string
  buyBridgeCards: string
  adLabel: string
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
  mockReviewTitle: string
  mockReviewDesc: string
}
