<script setup lang="ts">
import type { MessageSet } from '@/types/game'

defineProps<{
  messages: MessageSet
}>()

const emit = defineEmits<{
  close: []
  restart: []
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
      class="mx-4 max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
      @click.stop
    >
      <h1 class="mb-3 text-2xl font-bold text-bridge-purple">{{ messages.journeyCompleted }}</h1>
      <p class="mb-8 text-gray-600">{{ messages.allCardsCompleted }}</p>
      <button
        type="button"
        class="rounded-full bg-bridge-purple px-6 py-3 font-semibold text-white transition hover:bg-bridge-violet"
        @click="emit('restart')"
      >
        {{ messages.restart }}
      </button>
    </div>
  </div>
</template>
