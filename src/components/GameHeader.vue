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
      <h1 class="text-lg font-bold tracking-tight sm:text-xl">{{ messages.gameTitle }}</h1>
    </button>

    <div class="flex flex-wrap items-center gap-2 sm:gap-3">
      <div
        class="flex items-center gap-2 rounded-xl px-2 py-1"
        :class="isTimeRunningLow ? 'text-red-500' : ''"
      >
        <span
          class="text-xl"
          :class="isTimeRunningLow ? 'text-red-500' : 'text-emerald-600'"
          aria-hidden="true"
        >
          ⏱
        </span>
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
          class="min-w-[2.25rem] rounded-lg px-2 py-2 text-sm font-semibold transition hover:bg-black/5 disabled:opacity-40"
          :disabled="isPlaying && !isPaused"
          :title="playButtonTitle"
          aria-label="시작"
          @click="emit('play')"
        >
          ▶
        </button>
        <button
          type="button"
          class="min-w-[2.25rem] rounded-lg px-2 py-2 text-sm font-semibold transition hover:bg-black/5 disabled:opacity-40"
          :disabled="!isPlaying || isPaused"
          :title="messages.pause"
          aria-label="일시정지"
          @click="emit('pause')"
        >
          ⏸
        </button>
        <button
          type="button"
          class="min-w-[2.25rem] rounded-lg px-2 py-2 text-sm font-semibold transition hover:bg-black/5 disabled:opacity-40"
          :disabled="!isPlaying"
          :title="messages.stop"
          aria-label="정지"
          @click="emit('stop')"
        >
          ⏹
        </button>
        <button
          type="button"
          class="min-w-[2.25rem] rounded-lg px-2 py-2 text-sm font-semibold transition hover:bg-black/5 disabled:opacity-40"
          :class="{ 'animate-spin-once': isShuffling }"
          :disabled="isShuffling"
          :title="messages.shuffle"
          aria-label="카드 섞기"
          @click="handleShuffleClick"
        >
          🔀
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
      class="shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-black/5"
      :class="{ 'pointer-events-none opacity-40': isShuffling }"
      :aria-label="messages.settings"
      @click="emit('showSettings')"
    >
      {{ messages.settings }}
    </button>
  </header>
</template>
