<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">無音検出しきい値:</label>
          <input
            v-model="threshold"
            type="range"
            min="-60"
            max="-10"
            step="1"
            class="w-32"
          />
          <span class="text-primary-600 font-semibold min-w-[60px]">{{ threshold }} dB</span>
        </div>
        <p class="text-xs text-gray-500">
          値を小さくすると「静かな声」まで拾いやすくなり、大きくすると「はっきりした声」だけを検出します。
        </p>
      </div>
      
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">最小音声長:</label>
          <input
            v-model="minDuration"
            type="number"
            min="0.1"
            max="5"
            step="0.1"
            class="w-20 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <span class="text-gray-600">秒</span>
        </div>
        <p class="text-xs text-gray-500">
          この秒数より短い音は無視されます。短いセリフを細かく取りたい場合は小さくしてください。
        </p>
      </div>
      
      <div class="flex flex-col gap-2">
        <span class="text-xs font-medium text-gray-500 text-center">よく使う設定</span>
        <div class="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            class="px-3 py-1.5 text-xs rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            @click="applyPreset('rough')"
          >
            ざっくり（長めのセリフ）
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-xs rounded-full border border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100 transition"
            @click="applyPreset('normal')"
          >
            標準
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-xs rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            @click="applyPreset('detailed')"
          >
            細かく（短いボイス）
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-gray-100">
      <button
        @click="handleDetect"
        class="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium flex items-center gap-2 shadow-sm hover:shadow"
      >
        <Icon name="mdi:radar" />
        音声区間を自動検出
      </button>
      
      <button
        @click="emit('clear')"
        class="px-6 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all font-medium flex items-center gap-2 shadow-sm hover:shadow"
      >
        <Icon name="mdi:close" />
        検出クリア
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  detect: [options: { threshold: number; minDuration: number }]
  clear: []
}>()

const threshold = ref(-40)
const minDuration = ref(0.3)

type PresetType = 'rough' | 'normal' | 'detailed'

function applyPreset(preset: PresetType) {
  switch (preset) {
    case 'rough':
      threshold.value = -30
      minDuration.value = 0.8
      break
    case 'normal':
      threshold.value = -40
      minDuration.value = 0.3
      break
    case 'detailed':
      threshold.value = -50
      minDuration.value = 0.15
      break
  }
}

function handleDetect() {
  emit('detect', {
    threshold: threshold.value,
    minDuration: minDuration.value
  })
}
</script>
