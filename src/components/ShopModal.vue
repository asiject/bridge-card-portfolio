<script setup lang="ts">
import type { MessageSet } from '@/types/game'
import { SHOP_URL } from '@/constants/gameConfig'

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

      <a
        :href="SHOP_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="relative mb-6 block overflow-hidden rounded-xl"
      >
        <img
          src="/img/1958shop1.png"
          :alt="messages.buyBridgeCards"
          class="w-full"
        />
        <span
          class="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white"
        >
          {{ messages.adLabel }}
        </span>
      </a>

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
