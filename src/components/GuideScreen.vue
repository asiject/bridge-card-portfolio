<script setup lang="ts">
import type { MessageSet } from '@/types/game'

defineProps<{
  messages: MessageSet
}>()

const emit = defineEmits<{
  start: []
}>()
</script>

<template>
  <div
    class="fixed inset-0 z-[900] flex items-center justify-center bg-gradient-to-br from-bridge-purple to-bridge-violet"
  >
    <div class="max-w-lg px-8 text-center text-white">
      <h1 class="mb-4 text-3xl font-bold">{{ messages.gameTitle }}</h1>
      <p class="mb-8 text-lg opacity-90">{{ messages.setTimeAndStart }}</p>
      <button
        type="button"
        class="rounded-full bg-white px-10 py-3 text-lg font-semibold text-bridge-purple shadow-lg transition-transform duration-300 hover:scale-105"
        @click="emit('start')"
      >
        {{ messages.start }}
      </button>
    </div>
  </div>
</template>
