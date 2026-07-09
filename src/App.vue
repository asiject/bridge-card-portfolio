<script setup lang="ts">
import { computed } from 'vue'
import { useGame } from '@/composables/useGame'
import SplashScreen from '@/components/SplashScreen.vue'
import GuideScreen from '@/components/GuideScreen.vue'
import GameHeader from '@/components/GameHeader.vue'
import CardGrid from '@/components/CardGrid.vue'
import CardModal from '@/components/CardModal.vue'
import SettingsModal from '@/components/SettingsModal.vue'
import GameEndModal from '@/components/GameEndModal.vue'
import ShopModal from '@/components/ShopModal.vue'
import MockModal from '@/components/MockModal.vue'

const {
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
} = useGame()

const mockModalTitle = computed(() => messages.value.mockReviewTitle)

const isPlaying = computed(() => timer.isPlaying.value)
const isPaused = computed(() => timer.isPaused.value)
const isTimeRunningLow = computed(() => timer.isTimeRunningLow.value)
const timerLogoSrc = computed(() => timer.timerLogoSrc.value)
const remainingSeconds = computed(() => timer.remainingSeconds.value)
const minutesInput = computed({
  get: () => timer.minutesInput.value,
  set: (value: string) => {
    timer.minutesInput.value = value
  },
})
const secondsInput = computed({
  get: () => timer.secondsInput.value,
  set: (value: string) => {
    timer.secondsInput.value = value
  },
})

const handleMinutesInput = (value: string) => {
  timer.minutesInput.value = value
  timer.updateMinutes()
}

const handleSecondsInput = (value: string) => {
  timer.secondsInput.value = value
  timer.updateSeconds()
}

const handleOpenReviewWrite = () => {
  showSettingsModal.value = false
  openMockModal('review-write')
}
</script>

<template>
  <div class="min-h-screen">
    <Transition name="fade" mode="out-in">
      <SplashScreen
        v-if="gamePhase === 'splash'"
        :messages="messages"
        :current-language="currentLanguage"
        @skip="skipSplash"
        @change-language="changeLanguage"
      />
    </Transition>

    <Transition name="fade" mode="out-in">
      <GuideScreen
        v-if="gamePhase === 'guide'"
        :messages="messages"
        @start="startGuide"
      />
    </Transition>

    <Transition name="fade" mode="out-in">
      <div
        v-if="gamePhase === 'playing'"
        class="game-container min-h-screen transition-colors duration-300"
        :class="[
          themeClass,
          isCardFocused ? 'card-focused' : '',
          themeClass === 'theme-light' ? 'bg-bridge-light text-black' : 'bg-bridge-deep text-white',
        ]"
      >
        <GameHeader
          :messages="messages"
          :current-language="currentLanguage"
          :theme-class="themeClass"
          :is-playing="isPlaying"
          :is-paused="isPaused"
          :is-shuffling="isShuffling"
          :is-time-running-low="isTimeRunningLow"
          :timer-logo-src="timerLogoSrc"
          :remaining-seconds="remainingSeconds"
          :minutes-input="minutesInput"
          :seconds-input="secondsInput"
          :play-button-title="playButtonTitle"
          :format-time="timer.formatTime"
          @show-settings="showSettingsModal = true"
          @change-language="changeLanguage"
          @play="handlePlay"
          @pause="timer.pauseGame"
          @stop="timer.stopGame"
          @shuffle="handleShuffle"
          @update:minutes-input="handleMinutesInput"
          @update:seconds-input="handleSecondsInput"
          @validate-input="timer.validateInput"
        />

        <main class="py-4">
          <CardGrid
            :deck="deck"
            :is-shuffling="isShuffling"
            :is-card-focused="isCardFocused"
            :selected-card-id="selectedCard?.id ?? null"
            :is-flipped="isCardFlipped"
            @card-click="handleCardClick"
          />
        </main>
      </div>
    </Transition>

    <Transition name="modal">
      <CardModal
        v-if="selectedCard"
        :card="selectedCard"
        :messages="messages"
        @close="closeCard"
      />
    </Transition>

    <Transition name="modal">
      <SettingsModal
        v-if="showSettingsModal"
        :messages="messages"
        :mode="mode"
        @close="showSettingsModal = false"
        @select-mode="selectMode"
        @open-review-write="handleOpenReviewWrite"
        @open-review-board="openMockModal('review-board')"
      />
    </Transition>

    <Transition name="modal">
      <GameEndModal
        v-if="showGameEndModal"
        :messages="messages"
        @close="showGameEndModal = false"
        @restart="handleRestart"
      />
    </Transition>

    <Transition name="modal">
      <ShopModal
        v-if="showShopLinkModal"
        :messages="messages"
        @close="showShopLinkModal = false"
      />
    </Transition>

    <Transition name="modal">
      <MockModal
        v-if="mockModalType"
        :messages="messages"
        :title="mockModalTitle"
        @close="closeMockModal"
      />
    </Transition>
  </div>
</template>
