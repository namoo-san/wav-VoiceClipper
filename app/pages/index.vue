<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Header -->
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
        <Icon name="mdi:waveform" class="text-primary-500" />
        WAVボイス素材切り抜きツール
      </h1>
      <p class="text-gray-600 text-lg">長時間のWAVファイルから必要な部分を簡単に切り抜き</p>
    </header>

    <!-- Main Content -->
    <div class="space-y-6">
      <AudioUploader @file-loaded="handleFileLoaded" />
      
      <template v-if="audioBuffer">
        <DetectionPanel
          @detect="handleDetect"
          @clear="handleClearDetection"
        />
        
        <WaveformViewer
          :audio-buffer="audioBuffer"
          :detected-regions="detectedRegions"
          :current-region-index="currentRegionIndex"
          @region-selected="handleRegionSelected"
          @selection-changed="handleSelectionChanged"
        />
        
        <RegionNavigation
          v-if="detectedRegions.length > 0"
          :current-index="currentRegionIndex"
          :total-regions="detectedRegions.length"
          @navigate="handleNavigate"
          @add-all="handleAddAllRegions"
        />
        
        <AudioControls
          :has-selection="hasSelection"
          @play="handlePlay"
          @pause="handlePause"
          @play-selection="handlePlaySelection"
          @add-to-queue="handleAddToQueue"
        />
        
        <TimeDisplay
          :start-time="selectionStart"
          :end-time="selectionEnd"
          @update="handleTimeUpdate"
        />
        
        <ExportQueue
          :queue="exportQueue"
          @play-item="handlePlayQueueItem"
          @remove-item="handleRemoveFromQueue"
          @clear-queue="handleClearQueue"
          @export-all="handleExportAll"
        />
      </template>
    </div>

    <!-- Footer -->
    <footer class="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
      <p class="mb-2">完全ブラウザ内で動作 - ファイルはサーバーにアップロードされません</p>
      <div class="flex items-center justify-center gap-4">
        <a href="https://github.com" target="_blank" rel="noopener" class="text-primary-500 hover:text-primary-600 transition">
          <Icon name="mdi:github" class="inline" /> GitHub
        </a>
        <button @click="showHelp = true" class="text-primary-500 hover:text-primary-600 transition">
          <Icon name="mdi:help-circle" class="inline" /> 使い方
        </button>
      </div>
    </footer>

    <!-- Help Modal -->
    <HelpModal v-model="showHelp" />
    
    <!-- Loading Overlay -->
    <LoadingOverlay v-model="isLoading" :message="loadingMessage" />
  </div>
</template>

<script setup lang="ts">
const audioBuffer = ref<AudioBuffer | null>(null)
const detectedRegions = ref<Array<{ start: number; end: number }>>([])
const currentRegionIndex = ref(-1)
const selectionStart = ref(0)
const selectionEnd = ref(0)
const hasSelection = ref(false)
const exportQueue = ref<Array<any>>([])
const showHelp = ref(false)
const isLoading = ref(false)
const loadingMessage = ref('')

const { detectVoiceRegions } = useAudioDetection()
const { playAudio, playSelection, stopAudio } = useAudioPlayback()
const { exportToZip } = useAudioExport()

function handleFileLoaded(buffer: AudioBuffer) {
  audioBuffer.value = buffer
  detectedRegions.value = []
  currentRegionIndex.value = -1
  exportQueue.value = []
}

async function handleDetect(options: any) {
  if (!audioBuffer.value) return
  
  isLoading.value = true
  loadingMessage.value = '音声区間を検出しています...'
  
  try {
    const regions = await detectVoiceRegions(audioBuffer.value, options)
    detectedRegions.value = regions
    
    if (regions.length > 0) {
      currentRegionIndex.value = 0
      handleRegionSelected(0)
    }
  } finally {
    isLoading.value = false
  }
}

function handleClearDetection() {
  detectedRegions.value = []
  currentRegionIndex.value = -1
}

function handleRegionSelected(index: number) {
  currentRegionIndex.value = index
  const region = detectedRegions.value[index]
  if (region) {
    selectionStart.value = region.start
    selectionEnd.value = region.end
    hasSelection.value = true
  }
}

function handleSelectionChanged(selection: { start: number; end: number }) {
  selectionStart.value = selection.start
  selectionEnd.value = selection.end
  hasSelection.value = true
}

function handleNavigate(direction: number) {
  if (detectedRegions.value.length === 0) return
  
  let newIndex = currentRegionIndex.value + direction
  if (newIndex < 0) newIndex = detectedRegions.value.length - 1
  if (newIndex >= detectedRegions.value.length) newIndex = 0
  
  handleRegionSelected(newIndex)
}

function handlePlay() {
  if (audioBuffer.value) {
    playAudio(audioBuffer.value)
  }
}

function handlePause() {
  stopAudio()
}

function handlePlaySelection() {
  if (audioBuffer.value && hasSelection.value) {
    playSelection(audioBuffer.value, selectionStart.value, selectionEnd.value)
  }
}

function handleAddToQueue() {
  if (!hasSelection.value) return
  
  const queueItem = {
    id: Date.now(),
    name: `voice_${exportQueue.value.length + 1}`,
    startTime: selectionStart.value,
    endTime: selectionEnd.value,
    duration: selectionEnd.value - selectionStart.value
  }
  
  exportQueue.value.push(queueItem)
  
  // 次の区間に自動移動
  if (detectedRegions.value.length > 0 && currentRegionIndex.value >= 0) {
    handleNavigate(1)
  }
}

function handleAddAllRegions() {
  detectedRegions.value.forEach((region, index) => {
    const queueItem = {
      id: Date.now() + index,
      name: `voice_${exportQueue.value.length + index + 1}`,
      startTime: region.start,
      endTime: region.end,
      duration: region.end - region.start
    }
    exportQueue.value.push(queueItem)
  })
}

function handlePlayQueueItem(item: any) {
  if (audioBuffer.value) {
    playSelection(audioBuffer.value, item.startTime, item.duration)
  }
}

function handleRemoveFromQueue(id: number) {
  exportQueue.value = exportQueue.value.filter(item => item.id !== id)
}

function handleClearQueue() {
  if (confirm('キューを全てクリアしますか？')) {
    exportQueue.value = []
  }
}

async function handleExportAll() {
  if (!audioBuffer.value || exportQueue.value.length === 0) return
  
  isLoading.value = true
  loadingMessage.value = 'エクスポート中...'
  
  try {
    await exportToZip(audioBuffer.value, exportQueue.value, (progress) => {
      loadingMessage.value = `エクスポート中... (${progress.current}/${progress.total})`
    })
  } finally {
    isLoading.value = false
  }
}

function handleTimeUpdate(times: { start: number; end: number }) {
  selectionStart.value = times.start
  selectionEnd.value = times.end
  hasSelection.value = true
}
</script>
