import { GAME_CONFIG } from '@/constants/gameConfig'

export const validateNumber = (
  value: string,
  min = GAME_CONFIG.MIN_TIME,
  max = GAME_CONFIG.MAX_TIME,
): number => {
  const parsed = parseInt(value, 10)
  const num = Number.isNaN(parsed) ? 0 : parsed
  return Math.max(min, Math.min(max, num))
}

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const debounce = <T extends (...args: never[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const preloadImages = (imageUrls: string[]): Promise<string[]> => {
  return Promise.all(
    imageUrls.map(
      (url) =>
        new Promise<string>((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve(url)
          img.onerror = () => reject(url)
          img.src = url
        }),
    ),
  )
}
