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
        <div class="absolute top-0 h-full w-0.5 bg-red-500 pointer-events-none z-10" :style="playbackStyle">
          <div class="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  audioBuffer: AudioBuffer
  detectedRegions: Array<{ start: number; end: number }>
  currentRegionIndex: number
  playbackPosition?: number
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

// 親コンポーネントから呼び出せるようにする
defineExpose({
  zoomIn,
  zoomOut,
  resetZoom
})

const selectionStyle = computed(() => {
  const left = Math.min(selectionStart.value, selectionEnd.value)
  const width = Math.abs(selectionEnd.value - selectionStart.value)
  return {
    left: `${left}px`,
    width: `${width}px`
  }
})

const playbackStyle = computed(() => {
  if (!props.playbackPosition || !props.audioBuffer) return { display: 'none' }
  
  const duration = props.audioBuffer.duration
  const position = (props.playbackPosition / duration) * canvasWidth.value
  
  return {
    left: `${position}px`,
    display: 'block'
  }
})

watch(() => props.audioBuffer, () => {
  nextTick(() => drawWaveform())
})

watch([zoomLevel, compressSilence], () => {
  nextTick(() => drawWaveform())
})

watch(() => props.detectedRegions, () => {
  nextTick(() => drawDetectedRegions())
}, { deep: true })

watch(() => props.currentRegionIndex, () => {
  nextTick(() => drawDetectedRegions())
})

onMounted(() => {
  if (props.audioBuffer) {
    drawWaveform()
    drawDetectedRegions()
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
  
  // デバイスピクセル比を取得（Retinaディスプレイ対応）
  const dpr = window.devicePixelRatio || 1
  
  canvasWidth.value = width
  
  // 高解像度対応：実際のピクセル数を増やす
  canvas.value.width = width * dpr
  canvas.value.height = height * dpr
  
  // CSSサイズは元のまま
  canvas.value.style.width = width + 'px'
  canvas.value.style.height = height + 'px'
  
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return
  
  // スケーリングを適用
  ctx.scale(dpr, dpr)
  
  const data = props.audioBuffer.getChannelData(0)
  const step = Math.ceil(data.length / width)
  const amp = height / 2
  
  // 背景
  ctx.fillStyle = '#f9fafb'
  ctx.fillRect(0, 0, width, height)
  
  // 波形を描画（より滑らかに）
  ctx.strokeStyle = '#667eea'
  ctx.lineWidth = 1.5
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  
  ctx.beginPath()
  
  for (let i = 0; i < width; i++) {
    let min = 1.0
    let max = -1.0
    
    // より多くのサンプルを見て平均化
    for (let j = 0; j < step; j++) {
      const datum = data[(i * step) + j]
      if (datum !== undefined) {
        if (datum < min) min = datum
        if (datum > max) max = datum
      }
    }
    
    const y1 = (1 + min) * amp
    const y2 = (1 + max) * amp
    
    if (i === 0) {
      ctx.moveTo(i, y1)
    }
    
    ctx.lineTo(i, y1)
    ctx.lineTo(i, y2)
  }
  
  ctx.stroke()
  
  // 中央線を描画
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, amp)
  ctx.lineTo(width, amp)
  ctx.stroke()
  
  // 検出された区間も再描画
  drawDetectedRegions()
}

function drawDetectedRegions() {
  if (!detectedRegionsContainer.value || !props.audioBuffer) return
  
  // コンテナをクリア
  detectedRegionsContainer.value.innerHTML = ''
  
  const duration = props.audioBuffer.duration
  const width = canvasWidth.value
  
  props.detectedRegions.forEach((region, index) => {
    const left = (region.start / duration) * width
    const regionWidth = ((region.end - region.start) / duration) * width
    
    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.left = `${left}px`
    div.style.width = `${regionWidth}px`
    div.style.top = '0'
    div.style.height = '100%'
    div.style.cursor = 'pointer'
    
    // 現在選択中の区間は強調表示
    if (index === props.currentRegionIndex) {
      div.style.backgroundColor = 'rgba(34, 197, 94, 0.3)'
      div.style.border = '2px solid rgb(34, 197, 94)'
    } else {
      div.style.backgroundColor = 'rgba(251, 146, 60, 0.2)'
      div.style.border = '1px solid rgba(251, 146, 60, 0.5)'
    }
    
    div.addEventListener('click', () => {
      emit('regionSelected', index)
    })
    
    detectedRegionsContainer.value?.appendChild(div)
  })
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
