<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Icon name="mdi:playlist-music" class="text-primary-500" />
        エクスポートキュー
        <span class="text-primary-600">({{ queue.length }})</span>
      </h2>
      
      <div class="flex gap-3">
        <button
          :disabled="queue.length === 0"
          @click="emit('clearQueue')"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="mdi:delete" />
          全てクリア
        </button>
        
        <button
          :disabled="queue.length === 0"
          @click="emit('exportAll')"
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="mdi:download" />
          一括エクスポート
        </button>
      </div>
    </div>
    
    <div v-if="queue.length === 0" class="text-center py-12 text-gray-400">
      <Icon name="mdi:playlist-remove" class="text-6xl mb-3" />
      <p>キューは空です</p>
    </div>
    
    <div v-else class="space-y-3 max-h-96 overflow-y-auto">
      <div
        v-for="(item, index) in queue"
        :key="item.id"
        class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border border-gray-200"
      >
        <div class="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
          {{ index + 1 }}
        </div>
        
        <div class="flex-1">
          <input
            :value="item.name"
            @input="updateName(item.id, ($event.target as HTMLInputElement).value)"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-medium"
          />
          <p class="text-sm text-gray-600 mt-1">
            {{ item.startTime.toFixed(2) }}s - {{ item.endTime.toFixed(2) }}s
            <span class="text-primary-600 font-medium">({{ item.duration.toFixed(2) }}s)</span>
          </p>
        </div>
        
        <div class="flex gap-2">
          <button
            @click="emit('playItem', item)"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-1"
          >
            <Icon name="mdi:play" />
            再生
          </button>
          
          <button
            @click="emit('removeItem', item.id)"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-1"
          >
            <Icon name="mdi:delete" />
            削除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  queue: Array<any>
}>()

const emit = defineEmits<{
  playItem: [item: any]
  removeItem: [id: number]
  clearQueue: []
  exportAll: []
}>()

function updateName(id: number, newName: string) {
  const item = props.queue.find(q => q.id === id)
  if (item) {
    item.name = newName
  }
}
</script>
