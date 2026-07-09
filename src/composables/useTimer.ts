import { ref, computed, onUnmounted } from 'vue'
import { GAME_CONFIG } from '@/constants/gameConfig'
import { debounce, formatTime, validateNumber } from '@/utils/time'

export const useTimer = (onTimeUp: () => void) => {
  const totalSeconds = ref(0)
  const remainingSeconds = ref(0)
  const minutesInput = ref('05')
  const secondsInput = ref('00')
  const isPlaying = ref(false)
  const isPaused = ref(false)
  let timerInterval: ReturnType<typeof setInterval> | null = null

  const isTimeRunningLow = computed(
    () => remainingSeconds.value <= GAME_CONFIG.LOW_TIME_THRESHOLD && isPlaying.value,
  )

  const timerLogoSrc = computed(() =>
    isTimeRunningLow.value ? '/img/timer-pink.png' : '/img/timer-green.png',
  )

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  const resetTimer = () => {
    remainingSeconds.value = totalSeconds.value
    stopTimer()
  }

  const startTimer = () => {
    if (timerInterval) return

    timerInterval = setInterval(() => {
      if (remainingSeconds.value > 0) {
        remainingSeconds.value -= 1
        return
      }
      handleTimeUp()
    }, 1000)
  }

  const handleTimeUp = () => {
    stopTimer()
    isPlaying.value = false
    isPaused.value = false
    onTimeUp()
  }

  const syncTotalSeconds = () => {
    const minutes = validateNumber(minutesInput.value)
    const seconds = validateNumber(secondsInput.value)
    totalSeconds.value = minutes * 60 + seconds
    remainingSeconds.value = totalSeconds.value
  }

  const updateMinutes = debounce(syncTotalSeconds, GAME_CONFIG.DEBOUNCE_DELAY)
  const updateSeconds = debounce(syncTotalSeconds, GAME_CONFIG.DEBOUNCE_DELAY)

  const validateInput = () => {
    const minutes = validateNumber(minutesInput.value)
    const seconds = validateNumber(secondsInput.value)
    minutesInput.value = minutes.toString().padStart(2, '0')
    secondsInput.value = seconds.toString().padStart(2, '0')
    syncTotalSeconds()
  }

  const startGame = () => {
    isPlaying.value = true
    isPaused.value = false
    startTimer()
  }

  const pauseGame = () => {
    isPaused.value = true
    stopTimer()
  }

  const resumeGame = () => {
    isPaused.value = false
    startTimer()
  }

  const stopGame = () => {
    isPlaying.value = false
    isPaused.value = false
    stopTimer()
    resetTimer()
  }

  onUnmounted(stopTimer)

  return {
    totalSeconds,
    remainingSeconds,
    minutesInput,
    secondsInput,
    isPlaying,
    isPaused,
    isTimeRunningLow,
    timerLogoSrc,
    formatTime,
    validateInput,
    updateMinutes,
    updateSeconds,
    startGame,
    pauseGame,
    resumeGame,
    stopGame,
    resetTimer,
    stopTimer,
  }
}
