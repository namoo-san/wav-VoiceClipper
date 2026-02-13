<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <button
      @click="emit('play')"
      class="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all font-medium flex items-center gap-2 shadow-sm"
    >
      <Icon name="mdi:play" class="text-xl" />
      全体再生
    </button>
    
    <button
      @click="emit('pause')"
      class="px-6 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all font-medium flex items-center gap-2 shadow-sm"
    >
      <Icon name="mdi:pause" class="text-xl" />
      一時停止
    </button>
    
    <button
      :disabled="!hasSelection"
      @click="emit('playSelection')"
      class="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Icon name="mdi:play-circle" class="text-xl" />
      選択範囲を再生
    </button>
    
    <button
      :disabled="!hasSelection"
      @click="emit('addToQueue')"
      class="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Icon name="mdi:playlist-plus" class="text-xl" />
      キューに追加
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hasSelection: boolean
}>()

const emit = defineEmits<{
  play: []
  pause: []
  playSelection: []
  addToQueue: []
}>()
</script>
