<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
    <div class="text-center">
      <input
        ref="fileInput"
        type="file"
        accept=".wav,audio/wav"
        class="hidden"
        @change="handleFileSelect"
      />
      
      <button
        @click="fileInput?.click()"
        class="inline-flex items-center gap-3 px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg"
      >
        <Icon name="mdi:file-music" class="text-2xl" />
        WAVファイルを選択
      </button>
      
      <p v-if="fileName" class="mt-4 text-gray-600 flex items-center justify-center gap-2">
        <Icon name="mdi:check-circle" class="text-green-500" />
        {{ fileName }}
      </p>
      
      <p v-if="audioInfo" class="mt-2 text-sm text-gray-500">
        {{ audioInfo }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  fileLoaded: [buffer: AudioBuffer]
}>()

const fileInput = ref<HTMLInputElement>()
const fileName = ref('')
const audioInfo = ref('')

async function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  fileName.value = file.name

  try {
    const arrayBuffer = await file.arrayBuffer()
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const buffer = await audioContext.decodeAudioData(arrayBuffer)
    
    const duration = buffer.duration.toFixed(2)
    const sampleRate = buffer.sampleRate
    const channels = buffer.numberOfChannels
    const sizeMB = (buffer.length * channels * 2 / 1024 / 1024).toFixed(2)
    
    audioInfo.value = `${duration}秒 | ${sampleRate}Hz | ${channels}ch | ${sizeMB}MB`
    
    emit('fileLoaded', buffer)
  } catch (error) {
    alert('WAVファイルの読み込みに失敗しました: ' + (error as Error).message)
  }
}
</script>
