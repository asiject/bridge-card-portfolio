<script setup lang="ts">
import type { GameMode, MessageSet } from '@/types/game'
import { YOUTUBE_URL } from '@/constants/gameConfig'

defineProps<{
  messages: MessageSet
  mode: GameMode
}>()

const emit = defineEmits<{
  close: []
  selectMode: [mode: GameMode]
  openReviewWrite: []
  openReviewBoard: []
}>()
</script>

<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-label="게임 설정"
    @click="emit('close')"
  >
    <div
      class="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      @click.stop
    >
      <button
        type="button"
        class="absolute right-4 top-4 rounded-lg p-1 transition hover:bg-gray-100"
        aria-label="닫기"
        @click="emit('close')"
      >
        <img src="/img/menu-close.png" alt="" class="h-6 w-6" />
      </button>

      <h2 class="mb-6 text-center text-2xl font-bold">{{ messages.gameSelection }}</h2>

      <div class="mb-8 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          class="rounded-xl border-2 p-4 text-center transition hover:shadow-md"
          :class="mode === 'light' ? 'border-bridge-purple bg-bridge-light' : 'border-gray-200'"
          @click="emit('selectMode', 'light')"
        >
          <img src="/img/light.png" alt="" class="mx-auto mb-3 h-16 w-16" />
          <h3 class="font-bold">{{ messages.lightMode }}</h3>
          <p class="text-sm text-gray-600">{{ messages.lightModeDesc }}</p>
          <p class="text-sm text-gray-600">{{ messages.lightModeDesc2 }}</p>
        </button>

        <button
          type="button"
          class="rounded-xl border-2 p-4 text-center transition hover:shadow-md"
          :class="mode === 'deep' ? 'border-bridge-purple bg-gray-900 text-white' : 'border-gray-200'"
          @click="emit('selectMode', 'deep')"
        >
          <img src="/img/deep.png" alt="" class="mx-auto mb-3 h-16 w-16" />
          <h3 class="font-bold">{{ messages.deepMode }}</h3>
          <p class="text-sm opacity-80">{{ messages.deepModeDesc }}</p>
          <p class="text-sm opacity-80">{{ messages.deepModeDesc2 }}</p>
        </button>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          :href="YOUTUBE_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-medium transition hover:bg-gray-200"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M6.039,2h.067a33.179,33.179,0,0,1,4.583.251,1.508,1.508,0,0,1,1.061,1.065,6.792,6.792,0,0,1,.165,1.052l.007.078.017.2.006.078C11.993,5.4,12,6.046,12,6.186v.056c0,.146-.008.831-.062,1.545l-.006.079-.007.078a7.43,7.43,0,0,1-.176,1.169,1.505,1.505,0,0,1-1.061,1.065,33.982,33.982,0,0,1-4.635.251H5.946c-.232,0-1.19,0-2.2-.039l-.128,0-.065,0-.128-.005L3.3,10.372a12.057,12.057,0,0,1-1.991-.2A1.505,1.505,0,0,1,.25,9.112,7.416,7.416,0,0,1,.074,7.944L.068,7.865.062,7.787Q.006,7.025,0,6.26V6.169c0-.161.008-.719.048-1.334l.005-.077,0-.039.006-.078.017-.2.008-.078A6.777,6.777,0,0,1,.251,3.316,1.505,1.505,0,0,1,1.312,2.251a12.312,12.312,0,0,1,1.991-.2l.128-.005.129,0,.065,0,.128-.005Q4.822,2,5.894,2h.145ZM4.8,4.407V8.02L7.918,6.214Z"
              fill="#ed6468"
            />
          </svg>
          YouTube
        </a>

        <button
          type="button"
          class="flex items-center justify-center gap-2 rounded-xl bg-green-50 px-6 py-3 font-medium text-green-700 transition hover:bg-green-100"
          @click="emit('openReviewWrite')"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M7.229,4.75v.285A5.311,5.311,0,0,0,5.271,4.66a5.238,5.238,0,0,0-3.038.968.752.752,0,0,0-.1,1.147L4.064,8.7H4.9v.833a3.506,3.506,0,0,0,2.332,1.02v1.7h-1.5a.752.752,0,0,0-.75.75v1.5a1.5,1.5,0,0,0,1.5,1.5h7.5a2.247,2.247,0,0,0,2.25-2.25v-9a.752.752,0,0,0-.75-.75h-7.5A.752.752,0,0,0,7.229,4.75ZM6.4,8.807V7.2H4.686l-.78-.78A3.8,3.8,0,0,1,5.271,6.16a3.745,3.745,0,0,1,2.655,1.1L8.984,8.313l-.15.15a2.026,2.026,0,0,1-1.44.6A2.076,2.076,0,0,1,6.4,8.807Zm8.333,4.943a.756.756,0,0,1-.878.743.791.791,0,0,1-.622-.788V13a.752.752,0,0,0-.75-.75H8.729V10.307A3.494,3.494,0,0,0,9.9,9.535l.15-.15,1.9,1.9a.738.738,0,0,0,.525.217h0a.752.752,0,0,0,.75-.75h0a.775.775,0,0,0-.218-.533L8.729,5.965V5.5h6Z"
              fill="#5bb074"
            />
          </svg>
          {{ messages.writeReview }}
        </button>
      </div>
    </div>
  </div>
</template>
