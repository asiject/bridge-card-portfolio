<script setup lang="ts">
import type { Card, GameMode, MessageSet } from '@/types/game'
import CardFace from '@/components/CardFace.vue'

defineProps<{
  card: Card
  mode: GameMode
  messages: MessageSet
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    :aria-label="card.question"
    @click="emit('close')"
  >
    <div
      class="relative mx-4 w-full max-w-lg"
      @click.stop
    >
      <div class="relative min-h-[320px] rounded-2xl shadow-2xl sm:min-h-[380px]">
        <CardFace :card="card" :mode="mode" size="modal" />
      </div>

      <button
        type="button"
        class="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-gray-700 shadow-lg transition hover:bg-gray-100"
        :title="messages.close"
        aria-label="닫기"
        @click="emit('close')"
      >
        ×
      </button>
    </div>
  </div>
</template>
