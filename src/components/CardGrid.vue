<script setup lang="ts">
import type { Card, GameMode } from '@/types/game'
import CardFace from '@/components/CardFace.vue'

defineProps<{
  deck: Card[]
  mode: GameMode
  isShuffling: boolean
  isCardFocused: boolean
  isCardSelecting: boolean
  selectedCardId: number | null
  cardBackLabel: string
  isFlipped: (cardId: number) => boolean
}>()

const emit = defineEmits<{
  cardClick: [card: Card]
}>()
</script>

<template>
  <ul
    class="card-grid mx-auto grid max-w-5xl list-none grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:gap-4"
    :class="{ shuffling: isShuffling, 'is-interaction-locked': isShuffling || isCardSelecting }"
  >
    <li
      v-for="(card, index) in deck"
      :key="`slot-${index}`"
      class="card-slot relative cursor-pointer rounded-xl shadow-md"
      :class="[
        isFlipped(card.id) ? 'is-completed' : '',
        isCardFocused && selectedCardId !== card.id ? 'is-blurred' : '',
      ]"
      :data-card-id="card.id"
      role="button"
      tabindex="0"
      :aria-label="`${cardBackLabel} ${index + 1}`"
      @click="emit('cardClick', card)"
      @keydown.enter="emit('cardClick', card)"
    >
      <span
        class="absolute left-2 top-2 z-20 rounded-lg bg-black/70 px-2 py-0.5 text-sm font-semibold text-white"
      >
        {{ index + 1 }}
      </span>

      <!-- 플립은 내부 flipper만 적용 — 슬롯(배경)은 고정 -->
      <div
        class="card-flipper absolute inset-0"
        :class="{ 'is-flipped': isFlipped(card.id) }"
      >
        <div
          class="card-back-face absolute inset-0 flex items-center justify-center rounded-xl"
          aria-hidden="true"
        >
          <span class="text-3xl opacity-80 sm:text-4xl">🌉</span>
        </div>

        <CardFace :card="card" :mode="mode" size="grid" />
      </div>
    </li>
  </ul>
</template>
