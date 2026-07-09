import { ref, nextTick } from 'vue'
import type { Card } from '@/types/game'

interface Coordinate {
  x: number
  y: number
}

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

  const flipAllCards = async (): Promise<void> => {
    const flippedElements = document.querySelectorAll('.card.card-front')
    if (flippedElements.length === 0) return

    await new Promise<void>((resolve) => {
      flippedElements.forEach((element) => {
        element.classList.add('flipping')
        element.classList.remove('card-front', 'completed')
        const cardFace = element.querySelector('.card-face')
        if (cardFace) cardFace.remove()
      })

      setTimeout(() => {
        flippedElements.forEach((element) => {
          element.classList.add('card-back')
          element.classList.remove('flipping')
        })
        resolve()
      }, 400)
    })
  }

  const gatherCardsToCenter = (
    cardElements: NodeListOf<Element>,
    coordinates: Coordinate[],
    shuffleTime: number,
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
          el.style.transition = 'all 1s cubic-bezier(0.68,-0.55,0.265,1.25)'

          setTimeout(() => {
            el.style.left = `-${coordinates[index].x}px`
            el.style.top = `-${coordinates[index].y}px`
          }, index * shuffleTime)
        })
      }, 100)

      const totalTime = 100 + shuffleTime * cardElements.length + 1000
      setTimeout(resolve, totalTime)
    })

  const spreadCardsToPositions = (
    cardElements: NodeListOf<Element>,
    coordinates: Coordinate[],
    shuffleTime: number,
  ): Promise<void> =>
    new Promise((resolve) => {
      cardElements.forEach((element) => {
        const el = element as HTMLElement
        el.style.left = '0px'
        el.style.top = '0px'
        el.style.transition = 'all 1s cubic-bezier(0.68,-0.55,0.265,1.25)'
      })

      setTimeout(() => {
        cardElements.forEach((element, index) => {
          const el = element as HTMLElement
          setTimeout(() => {
            el.style.left = `${coordinates[index].x}px`
            el.style.top = `${coordinates[index].y}px`
          }, index * shuffleTime)
        })

        const totalTime = shuffleTime * cardElements.length + 1000
        setTimeout(resolve, totalTime)
      }, 100)
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
    originalCards: Card[],
    onShuffle: (cards: Card[]) => void,
  ): Promise<void> => {
    isShuffling.value = true

    const cardElements = document.querySelectorAll('.card')
    if (cardElements.length === 0) {
      onShuffle(shuffleDeck(deck.value))
      isShuffling.value = false
      return
    }

    const firstRect = cardElements[0].getBoundingClientRect()
    const coordinates: Coordinate[] = []

    cardElements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      coordinates.push({
        x: rect.left - firstRect.left,
        y: rect.top - firstRect.top,
      })
    })

    const shuffleTime = 1000 / cardElements.length

    await flipAllCards()
    await gatherCardsToCenter(cardElements, coordinates, shuffleTime)

    const shuffled = shuffleDeck(deck.value)
    deck.value = []
    await nextTick()
    onShuffle(shuffled)
    deck.value = shuffled
    await nextTick()

    const shuffledElements = document.querySelectorAll('.card')
    const shuffledCoordinates: Coordinate[] = []

    shuffled.forEach((card, newIndex) => {
      const originalIndex = originalCards.findIndex((item) => item.id === card.id)
      shuffledCoordinates[newIndex] = coordinates[originalIndex]
    })

    await spreadCardsToPositions(shuffledElements, shuffledCoordinates, shuffleTime)
    await resetCardStyles(shuffledElements)
    isShuffling.value = false
  }

  return {
    isShuffling,
    shuffleDeck,
    animateShuffle,
  }
}
