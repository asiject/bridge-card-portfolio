import { ref, computed, onMounted, onUnmounted } from 'vue'
import type {
  Card,
  GameMode,
  GamePhase,
  Language,
  MockModalType,
} from '@/types/game'
import { CARD_DATA, remapDeckLanguage } from '@/data/cardData'
import { MESSAGES } from '@/data/messages'
import { GAME_CONFIG } from '@/constants/gameConfig'
import { detectLanguage, getHtmlLang, setLanguage } from '@/utils/language'
import { preloadImages } from '@/utils/time'
import { useTimer } from '@/composables/useTimer'
import { useCardShuffle } from '@/composables/useCardShuffle'

const IS_DEV = import.meta.env.DEV

export const useGame = () => {
  const currentLanguage = ref<Language>(detectLanguage())
  const gamePhase = ref<GamePhase>('splash')
  const mode = ref<GameMode>('light')
  const deck = ref<Card[]>([])
  const flippedCards = ref<Set<number>>(new Set())
  const selectedCard = ref<Card | null>(null)
  const isModalOpen = ref(false)
  const isCardFocused = ref(false)
  const showSettingsModal = ref(false)
  const showGameEndModal = ref(false)
  const showShopLinkModal = ref(false)
  const mockModalType = ref<MockModalType>(null)

  const { isShuffling, shuffleDeck, animateShuffle } = useCardShuffle()

  const messages = computed(() => MESSAGES[currentLanguage.value])

  const currentCardData = computed(() => CARD_DATA[currentLanguage.value])

  const themeClass = computed(() =>
    mode.value === 'light' ? 'theme-light' : 'theme-deep',
  )

  const isAllCardsCompleted = computed(
    () => deck.value.length > 0 && flippedCards.value.size === deck.value.length,
  )

  const playButtonTitle = computed(() =>
    timer.isPaused.value ? messages.value.resume : messages.value.start,
  )

  const timer = useTimer(() => {
    showShopLinkModal.value = true
  })

  const applyDocumentLanguage = (language: Language) => {
    document.documentElement.lang = getHtmlLang(language)
    document.title = MESSAGES[language].gameTitle
  }

  const initializeGame = () => {
    deck.value = shuffleDeck([...currentCardData.value[mode.value]])
    flippedCards.value = new Set()
    selectedCard.value = null
    timer.resetTimer()
  }

  const runShuffleAnimation = async () => {
    const originalCards = [...currentCardData.value[mode.value]]
    await animateShuffle(deck, originalCards, (shuffled) => {
      flippedCards.value = new Set()
      deck.value = shuffled
    })
  }

  const handlePlay = () => {
    if (timer.totalSeconds.value === 0) {
      alert(messages.value.setTimeAndStart)
      return
    }

    if (timer.isPaused.value) {
      timer.resumeGame()
      return
    }

    timer.startGame()
  }

  const handleShuffle = () => {
    runShuffleAnimation()
  }

  const flipCard = (cardId: number) => {
    flippedCards.value = new Set([...flippedCards.value, cardId])
  }

  const isCardFlipped = (cardId: number) => flippedCards.value.has(cardId)

  const showCardInCenter = (card: Card) => {
    selectedCard.value = card
    isModalOpen.value = true
    isCardFocused.value = true
    document.body.style.overflow = 'hidden'
  }

  const closeCard = () => {
    selectedCard.value = null
    isModalOpen.value = false
    isCardFocused.value = false
    document.body.style.overflow = ''
    checkJourneyCompletion()
  }

  const handleCardClick = (card: Card) => {
    if (isShuffling.value || isModalOpen.value) return

    if (isCardFlipped(card.id)) {
      showCardInCenter(card)
      return
    }

    flipCard(card.id)
    setTimeout(() => showCardInCenter(card), 300)
  }

  const checkJourneyCompletion = () => {
    if (isAllCardsCompleted.value && !selectedCard.value) {
      timer.stopTimer()
      showGameEndModal.value = true
    }
  }

  const changeLanguage = (language: Language) => {
    if (!setLanguage(language)) return
    currentLanguage.value = language
    applyDocumentLanguage(language)

    if (gamePhase.value === 'playing') {
      deck.value = remapDeckLanguage(deck.value, language, mode.value)
      runShuffleAnimation()
    }
  }

  const skipSplash = () => {
    gamePhase.value = 'guide'
  }

  const startGuide = () => {
    gamePhase.value = 'playing'
    initializeGame()
  }

  const selectMode = (newMode: GameMode) => {
    mode.value = newMode
    if (gamePhase.value === 'playing') {
      runShuffleAnimation()
    } else {
      initializeGame()
    }
    showSettingsModal.value = false
  }

  const handleRestart = () => {
    showGameEndModal.value = false
    initializeGame()
    timer.resetTimer()
    timer.isPlaying.value = false
    timer.isPaused.value = false
  }

  const openMockModal = (type: MockModalType) => {
    mockModalType.value = type
  }

  const closeMockModal = () => {
    mockModalType.value = null
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return

    if (selectedCard.value) closeCard()
    else if (showSettingsModal.value) showSettingsModal.value = false
    else if (showGameEndModal.value) showGameEndModal.value = false
    else if (showShopLinkModal.value) showShopLinkModal.value = false
    else if (mockModalType.value) closeMockModal()
  }

  onMounted(() => {
    applyDocumentLanguage(currentLanguage.value)
    document.addEventListener('keydown', handleKeydown)

    const images = [
      '/img/logo.png',
      '/img/timer-green.png',
      '/img/timer-pink.png',
    ]
    preloadImages(images).catch(() => undefined)

    if (IS_DEV) {
      setTimeout(skipSplash, GAME_CONFIG.SPLASH_DURATION)
    }
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  })

  return {
    currentLanguage,
    gamePhase,
    mode,
    deck,
    selectedCard,
    isCardFocused,
    showSettingsModal,
    showGameEndModal,
    showShopLinkModal,
    mockModalType,
    isShuffling,
    messages,
    themeClass,
    playButtonTitle,
    timer,
    skipSplash,
    startGuide,
    handlePlay,
    handleShuffle,
    handleCardClick,
    closeCard,
    isCardFlipped,
    changeLanguage,
    selectMode,
    handleRestart,
    openMockModal,
    closeMockModal,
  }
}
