<script setup lang="ts">
import type { MessageSet } from '@/types/game'

defineProps<{
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
      class="mx-4 max-w-lg rounded-2xl bg-white p-8 text-center shadow-2xl"
      @click.stop
    >
      <h1 class="mb-6 text-2xl font-bold">{{ messages.timesUp }}</h1>
      <button
        type="button"
        class="rounded-full bg-gray-200 px-8 py-2 font-medium transition hover:bg-gray-300"
        @click="emit('close')"
      >
        {{ messages.close }}
      </button>
    </div>
  </div>
</template>
