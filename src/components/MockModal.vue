<script setup lang="ts">
import type { MessageSet } from '@/types/game'

defineProps<{
  messages: MessageSet
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div
    class="fixed inset-0 z-[1001] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-label="포트폴리오 데모 안내"
    @click="emit('close')"
  >
    <div
      class="mx-4 max-w-md rounded-2xl bg-white p-8 shadow-2xl"
      @click.stop
    >
      <div class="mb-4 flex items-center gap-2">
        <span class="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          MOCK
        </span>
        <h2 class="text-xl font-bold">{{ title }}</h2>
      </div>
      <p class="mb-6 leading-relaxed text-gray-600">{{ messages.mockReviewDesc }}</p>
      <button
        type="button"
        class="w-full rounded-full bg-bridge-purple py-3 font-semibold text-white transition hover:bg-bridge-violet"
        @click="emit('close')"
      >
        {{ messages.close }}
      </button>
    </div>
  </div>
</template>
