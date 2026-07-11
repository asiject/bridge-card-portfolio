import { ref, nextTick } from 'vue'
import type { Card } from '@/types/game'
import { GAME_CONFIG } from '@/constants/gameConfig'

interface Coordinate {
  x: number
  y: number
}

const SPREAD_ANIMATION_MS = 1000

export const useCardShuffle = () => {
  const isShuffling = ref(false)

  const shuffleDeck = (cards: Card[]): Card[] => {
    const shuffled = [...cards]
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const FLIP_DURATION_MS = GAME_CONFIG.CARD_FLIP_DURATION_MS
  const SPREAD_STAGGER_MS = GAME_CONFIG.SPREAD_STAGGER_MS

  const flipAllCards = async (): Promise<void> => {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, FLIP_DURATION_MS)
    })
  }

  const gatherCardsToCenter = (
    cardElements: NodeListOf<Element>,
    coordinates: Coordinate[],
    gatherStaggerMs: number,
  ): Promise<void> =>
    new Promise((resolve) => {
      cardElements.forEach((element) => {
        ;(element as HTMLElement).style.position = 'relative'
      })

      setTimeout(() => {
        cardElements.forEach((element, index) => {
          const el = element as HTMLElement
          el.style.left = '0px'
          el.style.top = '0px'
          el.style.transition = `all ${SPREAD_ANIMATION_MS}ms cubic-bezier(0.68,-0.55,0.265,1.25)`

          setTimeout(() => {
            el.style.left = `-${coordinates[index].x}px`
            el.style.top = `-${coordinates[index].y}px`
          }, index * gatherStaggerMs)
        })
      }, 100)

      const totalTime =
        100 + gatherStaggerMs * cardElements.length + SPREAD_ANIMATION_MS
      setTimeout(resolve, totalTime)
    })

  /** 슬롯별 그리드 좌표 저장 (고정 위치) */
  const captureSlotCoordinates = (
    cardElements: NodeListOf<Element>,
  ): Coordinate[] => {
    const firstRect = cardElements[0].getBoundingClientRect()

    return Array.from(cardElements).map((element) => {
      const rect = element.getBoundingClientRect()
      return {
        x: rect.left - firstRect.left,
        y: rect.top - firstRect.top,
      }
    })
  }

  /** 덱 갱신 직후 모든 카드를 중앙 더미에 배치 */
  const positionCardsAtCenter = (
    cardElements: NodeListOf<Element>,
    slotCoordinates: Coordinate[],
  ): void => {
    if (cardElements.length === 0) return

    cardElements.forEach((element, index) => {
      const el = element as HTMLElement
      el.style.position = 'relative'
      el.style.transition = 'none'
      el.style.left = `-${slotCoordinates[index].x}px`
      el.style.top = `-${slotCoordinates[index].y}px`
    })

    cardElements[0].getBoundingClientRect()
  }

  /** 번호 순서대로 중앙 더미 → 각 슬롯으로 펼치기 (N번 카드는 (N-1)×250ms에 시작) */
  const spreadCardsFromCenter = (
    cardElements: NodeListOf<Element>,
  ): Promise<void> =>
    new Promise((resolve) => {
      const cardCount = cardElements.length
      if (cardCount === 0) {
        resolve()
        return
      }

      const transitionValue = `left ${SPREAD_ANIMATION_MS}ms cubic-bezier(0.68,-0.55,0.265,1.25), top ${SPREAD_ANIMATION_MS}ms cubic-bezier(0.68,-0.55,0.265,1.25)`

      cardElements.forEach((element, slotIndex) => {
        const startDelayMs = slotIndex * SPREAD_STAGGER_MS

        setTimeout(() => {
          const el = element as HTMLElement
          el.style.transition = 'none'
          void el.offsetHeight
          el.style.transition = transitionValue
          el.style.left = '0px'
          el.style.top = '0px'
        }, startDelayMs)
      })

      const totalTime = (cardCount - 1) * SPREAD_STAGGER_MS + SPREAD_ANIMATION_MS
      setTimeout(resolve, totalTime + 50)
    })

  const resetCardStyles = (cardElements: NodeListOf<Element>): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        cardElements.forEach((element) => {
          const el = element as HTMLElement
          el.style.removeProperty('left')
          el.style.removeProperty('top')
          el.style.removeProperty('transition')
          el.style.removeProperty('position')
        })
        resolve()
      }, 100)
    })

  const animateShuffle = async (
    deck: { value: Card[] },
    onShuffle: (cards: Card[]) => void,
    createShuffledDeck: () => Card[],
  ): Promise<void> => {
    isShuffling.value = true

    const cardElements = document.querySelectorAll('.card-slot')
    if (cardElements.length === 0) {
      onShuffle(createShuffledDeck())
      isShuffling.value = false
      return
    }

    const slotCoordinates = captureSlotCoordinates(cardElements)
    const gatherStaggerMs = 1000 / cardElements.length

    await flipAllCards()
    await gatherCardsToCenter(cardElements, slotCoordinates, gatherStaggerMs)

    const shuffled = createShuffledDeck()
    deck.value = shuffled
    onShuffle(shuffled)
    await nextTick()

    const slotElements = document.querySelectorAll('.card-slot')
    positionCardsAtCenter(slotElements, slotCoordinates)
    await spreadCardsFromCenter(slotElements)
    await resetCardStyles(slotElements)
    isShuffling.value = false
  }

  return {
    isShuffling,
    shuffleDeck,
    animateShuffle,
  }
}
