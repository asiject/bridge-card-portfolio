<script setup lang="ts">
import type { Card, GameMode } from '@/types/game'
import CardFace from '@/components/CardFace.vue'

defineProps<{
  deck: Card[]
  mode: GameMode
  isShuffling: boolean
  isCardFocused: boolean
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
    :class="{ shuffling: isShuffling }"
  >
    <li
      v-for="(card, index) in deck"
      :key="card.id"
      class="card relative cursor-pointer rounded-xl shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg"
      :class="[
        isFlipped(card.id) ? 'card-front completed opacity-70' : 'card-back',
        isCardFocused && selectedCardId !== card.id ? 'blurred' : '',
      ]"
      :data-card-id="card.id"
      role="button"
      tabindex="0"
      :aria-label="`${cardBackLabel} ${index + 1}`"
      @click="emit('cardClick', card)"
      @keydown.enter="emit('cardClick', card)"
    >
      <span
        class="absolute left-2 top-2 z-10 rounded-lg bg-black/70 px-2 py-0.5 text-sm font-semibold text-white"
      >
        {{ index + 1 }}
      </span>

      <CardFace v-if="isFlipped(card.id)" :card="card" :mode="mode" size="grid" />

      <div
        v-else
        class="card-back-face absolute inset-0 flex items-center justify-center rounded-xl"
        aria-hidden="true"
      >
        <span class="text-3xl opacity-80 sm:text-4xl">🌉</span>
      </div>
    </li>
  </ul>
</template>
