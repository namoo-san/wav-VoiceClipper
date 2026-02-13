<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <!-- Zoom Controls -->
    <div class="flex flex-wrap items-center justify-center gap-4 mb-4">
      <span class="text-sm font-medium text-gray-700">波形表示:</span>
      <button @click="zoomIn" class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
        <Icon name="mdi:magnify-plus" /> 拡大
      </button>
      <button @click="zoomOut" class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
        <Icon name="mdi:magnify-minus" /> 縮小
      </button>
      <button @click="resetZoom" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
        リセット
      </button>
      <span class="text-primary-600 font-semibold">{{ Math.round(zoomLevel * 100) }}%</span>
      
      <label class="flex items-center gap-2 cursor-pointer">
        <input v-model="compressSilence" type="checkbox" class="w-4 h-4 text-primary-600 rounded" />
        <span class="text-sm text-gray-700">無音を圧縮表示</span>
      </label>
    </div>
    
    <!-- Waveform Canvas -->
    <div ref="waveformWrapper" class="overflow-x-auto rounded-lg border border-gray-200">
      <div ref="waveformContainer" class="relative bg-gray-50" :style="{ width: canvasWidth + 'px', height: '250px' }">
        <canvas
          ref="canvas"
          class="cursor-crosshair"
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
          @mouseleave="handleMouseUp"
        />
        <div ref="detectedRegionsContainer" class="absolute inset-0 pointer-events-none" />
        <div v-if="showSelection" class="absolute top-0 h-full bg-primary-500/30 border-2 border-primary-500 pointer-events-none" :style="selectionStyle" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  audioBuffer: AudioBuffer
  detectedRegions: Array<{ start: number; end: number }>
  currentRegionIndex: number
}>()

const emit = defineEmits<{
  regionSelected: [index: number]
  selectionChanged: [selection: { start: number; end: number }]
}>()

const canvas = ref<HTMLCanvasElement>()
const waveformContainer = ref<HTMLDivElement>()
const waveformWrapper = ref<HTMLDivElement>()
const detectedRegionsContainer = ref<HTMLDivElement>()

const zoomLevel = ref(1)
const compressSilence = ref(false)
const canvasWidth = ref(800)
const isDragging = ref(false)
const selectionStart = ref(0)
const selectionEnd = ref(0)
const showSelection = ref(false)

const selectionStyle = computed(() => {
  const left = Math.min(selectionStart.value, selectionEnd.value)
  const width = Math.abs(selectionEnd.value - selectionStart.value)
  return {
    left: `${left}px`,
    width: `${width}px`
  }
})

watch(() => props.audioBuffer, () => {
  nextTick(() => drawWaveform())
})

watch([zoomLevel, compressSilence], () => {
  nextTick(() => drawWaveform())
})

onMounted(() => {
  if (props.audioBuffer) {
    drawWaveform()
  }
})

function zoomIn() {
  zoomLevel.value = Math.min(zoomLevel.value * 1.5, 50)
}

function zoomOut() {
  zoomLevel.value = Math.max(zoomLevel.value * 0.67, 1)
}

function resetZoom() {
  zoomLevel.value = 1
}

function drawWaveform() {
  if (!canvas.value || !waveformWrapper.value) return
  
  const baseWidth = waveformWrapper.value.offsetWidth
  const width = Math.floor(baseWidth * zoomLevel.value)
  const height = 250
  
  canvasWidth.value = width
  canvas.value.width = width
  canvas.value.height = height
  canvas.value.style.width = width + 'px'
  canvas.value.style.height = height + 'px'
  
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return
  
  const data = props.audioBuffer.getChannelData(0)
  const step = Math.ceil(data.length / width)
  const amp = height / 2
  
  ctx.fillStyle = '#f9fafb'
  ctx.fillRect(0, 0, width, height)
  ctx.strokeStyle = '#667eea'
  ctx.lineWidth = 1
  ctx.beginPath()
  
  for (let i = 0; i < width; i++) {
    let min = 1.0
    let max = -1.0
    
    for (let j = 0; j < step; j++) {
      const datum = data[(i * step) + j]
      if (datum !== undefined) {
        if (datum < min) min = datum
        if (datum > max) max = datum
      }
    }
    
    ctx.moveTo(i, (1 + min) * amp)
    ctx.lineTo(i, (1 + max) * amp)
  }
  
  ctx.stroke()
}

function handleMouseDown(event: MouseEvent) {
  if (!canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  
  isDragging.value = true
  selectionStart.value = x
  selectionEnd.value = x
  showSelection.value = true
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging.value || !canvas.value) return
  
  const rect = canvas.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  selectionEnd.value = Math.max(0, Math.min(x, rect.width))
}

function handleMouseUp() {
  if (!isDragging.value) return
  isDragging.value = false
  
  if (Math.abs(selectionEnd.value - selectionStart.value) > 5) {
    const duration = props.audioBuffer.duration
    const width = canvasWidth.value
    
    const left = Math.min(selectionStart.value, selectionEnd.value)
    const right = Math.max(selectionStart.value, selectionEnd.value)
    
    const start = (left / width) * duration
    const end = (right / width) * duration
    
    emit('selectionChanged', { start, end })
  }
}
</script>
