<script setup lang="ts">
import type { Card } from '@/types/game'

defineProps<{
  deck: Card[]
  isShuffling: boolean
  isCardFocused: boolean
  selectedCardId: number | null
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
      :aria-label="`카드 ${index + 1}`"
      @click="emit('cardClick', card)"
      @keydown.enter="emit('cardClick', card)"
    >
      <span
        class="absolute left-2 top-2 z-10 rounded-lg bg-black/70 px-2 py-0.5 text-sm font-semibold text-white"
      >
        {{ index + 1 }}
      </span>
      <img
        v-if="isFlipped(card.id)"
        :src="card.img"
        :alt="`카드 ${index + 1}`"
        class="absolute inset-0 h-full w-full rounded-xl object-cover"
        loading="lazy"
      />
    </li>
  </ul>
</template>
