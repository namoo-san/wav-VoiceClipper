<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex flex-wrap items-center justify-center gap-4">
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

function handleDetect() {
  emit('detect', {
    threshold: threshold.value,
    minDuration: minDuration.value
  })
}
</script>
