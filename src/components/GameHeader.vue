<script setup lang="ts">
import type { Language, MessageSet } from '@/types/game'

defineProps<{
  messages: MessageSet
  currentLanguage: Language
  themeClass: string
  isPlaying: boolean
  isPaused: boolean
  isShuffling: boolean
  isTimeRunningLow: boolean
  timerLogoSrc: string
  remainingSeconds: number
  minutesInput: string
  secondsInput: string
  playButtonTitle: string
  formatTime: (seconds: number) => string
}>()

const emit = defineEmits<{
  showSettings: []
  changeLanguage: [language: Language]
  play: []
  pause: []
  stop: []
  shuffle: []
  'update:minutesInput': [value: string]
  'update:secondsInput': [value: string]
  validateInput: []
}>()

const handleShuffleClick = () => {
  emit('shuffle')
}
</script>

<template>
  <header
    class="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-6"
    :class="themeClass === 'theme-light' ? 'border-gray-200 bg-bridge-light' : 'border-gray-700 bg-bridge-deep'"
  >
    <button
      type="button"
      class="shrink-0"
      aria-label="설정 열기"
      @click="emit('showSettings')"
    >
      <img src="/img/logo.png" alt="브릿지 카드" class="h-8 w-auto" />
    </button>

    <div class="flex flex-wrap items-center gap-2 sm:gap-3">
      <div
        class="flex items-center gap-2 rounded-xl px-2 py-1"
        :class="isTimeRunningLow ? 'text-red-500' : ''"
      >
        <img :src="timerLogoSrc" alt="타이머" class="h-6 w-6" />
        <div v-if="isPlaying" class="min-w-[4rem] text-center font-mono text-lg font-bold">
          {{ formatTime(remainingSeconds) }}
        </div>
        <div v-else class="flex items-center gap-1 font-mono text-lg">
          <input
            :value="minutesInput"
            type="text"
            inputmode="numeric"
            maxlength="2"
            placeholder="00"
            class="w-10 rounded border bg-transparent px-1 text-center outline-none focus:ring-2 focus:ring-bridge-purple/50"
            aria-label="분"
            @input="emit('update:minutesInput', ($event.target as HTMLInputElement).value)"
            @blur="emit('validateInput')"
          />
          <span>:</span>
          <input
            :value="secondsInput"
            type="text"
            inputmode="numeric"
            maxlength="2"
            placeholder="00"
            class="w-10 rounded border bg-transparent px-1 text-center outline-none focus:ring-2 focus:ring-bridge-purple/50"
            aria-label="초"
            @input="emit('update:secondsInput', ($event.target as HTMLInputElement).value)"
            @blur="emit('validateInput')"
          />
        </div>
      </div>

      <div class="flex items-center gap-1" :class="{ 'pointer-events-none opacity-40': isShuffling }">
        <button
          type="button"
          class="rounded-lg p-2 transition hover:bg-black/5 disabled:opacity-40"
          :disabled="isPlaying && !isPaused"
          :title="playButtonTitle"
          aria-label="시작"
          @click="emit('play')"
        >
          <img src="/img/play.png" alt="" class="h-6 w-6" />
        </button>
        <button
          type="button"
          class="rounded-lg p-2 transition hover:bg-black/5 disabled:opacity-40"
          :disabled="!isPlaying || isPaused"
          :title="messages.pause"
          aria-label="일시정지"
          @click="emit('pause')"
        >
          <img src="/img/pause.png" alt="" class="h-6 w-6" />
        </button>
        <button
          type="button"
          class="rounded-lg p-2 transition hover:bg-black/5 disabled:opacity-40"
          :disabled="!isPlaying"
          :title="messages.stop"
          aria-label="정지"
          @click="emit('stop')"
        >
          <img src="/img/stop.png" alt="" class="h-6 w-6" />
        </button>
        <button
          type="button"
          class="rounded-lg p-2 transition hover:bg-black/5 disabled:opacity-40"
          :class="{ 'animate-spin-once': isShuffling }"
          :disabled="isShuffling"
          :title="messages.shuffle"
          aria-label="카드 섞기"
          @click="handleShuffleClick"
        >
          <img src="/img/shuffle.png" alt="" class="h-6 w-6" />
        </button>
      </div>

      <div
        class="flex gap-1 rounded-full border border-black/10 bg-white/15 p-1 backdrop-blur-sm"
        :class="{ 'pointer-events-none opacity-40': isShuffling }"
      >
        <button
          type="button"
          class="rounded-full px-3 py-1 text-xs font-medium transition"
          :class="currentLanguage === 'kr' ? 'bg-black/20 text-white' : 'hover:bg-black/10'"
          @click="emit('changeLanguage', 'kr')"
        >
          KR
        </button>
        <button
          type="button"
          class="rounded-full px-3 py-1 text-xs font-medium transition"
          :class="currentLanguage === 'en' ? 'bg-black/20 text-white' : 'hover:bg-black/10'"
          @click="emit('changeLanguage', 'en')"
        >
          EN
        </button>
      </div>
    </div>

    <button
      type="button"
      class="shrink-0 rounded-lg p-2 transition hover:bg-black/5"
      :class="{ 'pointer-events-none opacity-40': isShuffling }"
      aria-label="메뉴"
      @click="emit('showSettings')"
    >
      <img
        :src="themeClass === 'theme-light' ? '/img/icon-menu.png' : '/img/icon-menu-deep.png'"
        alt="메뉴"
        class="h-6 w-6"
      />
    </button>
  </header>
</template>
