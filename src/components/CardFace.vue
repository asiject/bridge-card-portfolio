<script setup lang="ts">
import type { Card, GameMode } from '@/types/game'

const props = defineProps<{
  card: Card
  mode: GameMode
  size?: 'grid' | 'modal'
}>()

const isModal = props.size === 'modal'
</script>

<template>
  <div
    class="card-face absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 p-3 text-center sm:p-4"
    :class="
      mode === 'light'
        ? 'border-emerald-200 bg-gradient-to-b from-white to-emerald-50 text-gray-800'
        : 'border-violet-500/40 bg-gradient-to-b from-gray-800 to-gray-900 text-white'
    "
  >
    <span
      class="mb-2"
      :class="isModal ? 'text-5xl' : 'text-2xl sm:text-3xl'"
      aria-hidden="true"
    >
      {{ card.icon }}
    </span>

    <p
      class="font-bold leading-snug"
      :class="isModal ? 'text-xl sm:text-2xl' : 'text-xs sm:text-sm'"
    >
      {{ card.question }}
    </p>

    <p
      class="mt-2 leading-relaxed opacity-75"
      :class="isModal ? 'text-base sm:text-lg' : 'text-[10px] sm:text-xs'"
    >
      {{ card.subQuestion }}
    </p>
  </div>
</template>
