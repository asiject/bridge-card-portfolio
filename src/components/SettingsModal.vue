<script setup lang="ts">
import type { GameMode, MessageSet } from '@/types/game'

defineProps<{
  messages: MessageSet
  mode: GameMode
}>()

const emit = defineEmits<{
  close: []
  selectMode: [mode: GameMode]
}>()
</script>

<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-label="게임 설정"
    @click="emit('close')"
  >
    <div
      class="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      @click.stop
    >
      <button
        type="button"
        class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-xl text-gray-500 transition hover:bg-gray-100"
        aria-label="닫기"
        @click="emit('close')"
      >
        ×
      </button>

      <h2 class="mb-6 text-center text-2xl font-bold">{{ messages.gameSelection }}</h2>

      <div class="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          class="rounded-xl border-2 p-5 text-center transition hover:shadow-md"
          :class="mode === 'light' ? 'border-bridge-purple bg-bridge-light' : 'border-gray-200'"
          @click="emit('selectMode', 'light')"
        >
          <span class="mb-2 block text-3xl" aria-hidden="true">☀️</span>
          <h3 class="font-bold">{{ messages.lightMode }}</h3>
          <p class="text-sm text-gray-600">{{ messages.lightModeDesc }}</p>
          <p class="text-sm text-gray-600">{{ messages.lightModeDesc2 }}</p>
        </button>

        <button
          type="button"
          class="rounded-xl border-2 p-5 text-center transition hover:shadow-md"
          :class="mode === 'deep' ? 'border-bridge-purple bg-gray-900 text-white' : 'border-gray-200'"
          @click="emit('selectMode', 'deep')"
        >
          <span class="mb-2 block text-3xl" aria-hidden="true">🌙</span>
          <h3 class="font-bold">{{ messages.deepMode }}</h3>
          <p class="text-sm opacity-80">{{ messages.deepModeDesc }}</p>
          <p class="text-sm opacity-80">{{ messages.deepModeDesc2 }}</p>
        </button>
      </div>
    </div>
  </div>
</template>
