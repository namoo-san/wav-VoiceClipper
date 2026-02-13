<template>
  <div class="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl shadow-sm border border-primary-200 p-6">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <button
        @click="emit('navigate', -1)"
        class="px-6 py-2.5 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-all font-medium flex items-center gap-2 shadow-sm border border-primary-200"
      >
        <Icon name="mdi:chevron-left" class="text-xl" />
        前の区間
      </button>
      
      <div class="px-6 py-2.5 bg-white rounded-lg font-semibold text-primary-600 shadow-sm border border-primary-200">
        {{ currentIndex + 1 }} / {{ totalRegions }}
      </div>
      
      <button
        @click="emit('navigate', 1)"
        class="px-6 py-2.5 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-all font-medium flex items-center gap-2 shadow-sm border border-primary-200"
      >
        次の区間
        <Icon name="mdi:chevron-right" class="text-xl" />
      </button>
      
      <button
        @click="emit('addAll')"
        class="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium flex items-center gap-2 shadow-sm"
      >
        <Icon name="mdi:playlist-plus" />
        全区間をキューに追加
      </button>
    </div>
    
    <div class="mt-4 text-center text-sm text-gray-600">
      <Icon name="mdi:keyboard" class="inline" />
      ショートカット: <kbd class="px-2 py-1 bg-white rounded border">←</kbd> 前へ
      <kbd class="px-2 py-1 bg-white rounded border ml-2">→</kbd> 次へ
      <kbd class="px-2 py-1 bg-white rounded border ml-2">Enter</kbd> キューに追加
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentIndex: number
  totalRegions: number
}>()

const emit = defineEmits<{
  navigate: [direction: number]
  addAll: []
}>()
</script>
