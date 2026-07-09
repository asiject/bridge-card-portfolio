<script setup lang="ts">
import type { Card, MessageSet } from '@/types/game'

defineProps<{
  card: Card
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
    @click="emit('close')"
  >
    <div
      class="relative mx-4 max-h-[90vh] max-w-3xl rounded-2xl bg-white p-6 shadow-2xl"
      @click.stop
    >
      <img
        :src="card.img"
        :alt="`카드 ${card.id}`"
        class="max-h-[70vh] w-full rounded-xl object-contain"
      />
      <button
        type="button"
        class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-2xl transition hover:bg-black/20"
        :title="messages.close"
        aria-label="닫기"
        @click="emit('close')"
      >
        ×
      </button>
    </div>
  </div>
</template>
