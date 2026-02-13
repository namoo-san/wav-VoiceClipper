<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex flex-wrap items-center justify-center gap-6">
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">開始:</label>
        <input
          :value="startTime.toFixed(2)"
          @input="handleStartChange"
          type="number"
          step="0.01"
          min="0"
          class="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <span class="text-gray-600">秒</span>
      </div>
      
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">終了:</label>
        <input
          :value="endTime.toFixed(2)"
          @input="handleEndChange"
          type="number"
          step="0.01"
          min="0"
          class="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <span class="text-gray-600">秒</span>
      </div>
      
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">長さ:</label>
        <span class="text-primary-600 font-semibold">{{ (endTime - startTime).toFixed(2) }}</span>
        <span class="text-gray-600">秒</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  startTime: number
  endTime: number
}>()

const emit = defineEmits<{
  update: [times: { start: number; end: number }]
}>()

function handleStartChange(event: Event) {
  const value = parseFloat((event.target as HTMLInputElement).value)
  if (!isNaN(value) && value < props.endTime) {
    emit('update', { start: value, end: props.endTime })
  }
}

function handleEndChange(event: Event) {
  const value = parseFloat((event.target as HTMLInputElement).value)
  if (!isNaN(value) && value > props.startTime) {
    emit('update', { start: props.startTime, end: value })
  }
}
</script>
