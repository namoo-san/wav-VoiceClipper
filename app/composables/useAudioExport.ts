import { useSharedAudioContext } from '~/composables/useSharedAudioContext'

export function useAudioExport() {
  async function exportToZip(
    audioBuffer: AudioBuffer,
    queue: Array<any>,
    onProgress?: (progress: { current: number; total: number }) => void
  ) {
    const audioContext = useSharedAudioContext()
    const files: Array<{ name: string; data: Uint8Array }> = []
    
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i]
      onProgress?.({ current: i + 1, total: queue.length })
      
      const buffer = await extractAudioSegment(audioContext, audioBuffer, item.startTime, item.endTime)
      const wavBlob = bufferToWave(buffer)
      const arrayBuffer = await wavBlob.arrayBuffer()
      
      files.push({
        name: `${item.name}.wav`,
        data: new Uint8Array(arrayBuffer)
      })
      
      await new Promise(resolve => setTimeout(resolve, 10))
    }
    
    const zipBlob = await createZipFromFiles(files)
    const url = URL.createObjectURL(zipBlob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `voice_clips_${Date.now()}.zip`
    a.click()
    
    URL.revokeObjectURL(url)
  }

  async function extractAudioSegment(
    audioContext: AudioContext,
    audioBuffer: AudioBuffer,
    startTime: number,
    endTime: number
  ): Promise<AudioBuffer> {
    const startSample = Math.floor(startTime * audioBuffer.sampleRate)
    const endSample = Math.floor(endTime * audioBuffer.sampleRate)
    const length = endSample - startSample
    
    const numberOfChannels = audioBuffer.numberOfChannels
    const sampleRate = audioBuffer.sampleRate
    
    const newBuffer = audioContext.createBuffer(numberOfChannels, length, sampleRate)
    
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const oldData = audioBuffer.getChannelData(channel)
      const newData = newBuffer.getChannelData(channel)
      
      for (let i = 0; i < length; i++) {
        newData[i] = oldData[startSample + i]
      }
    }
    
    return newBuffer
  }

  function bufferToWave(buffer: AudioBuffer): Blob {
    const numberOfChannels = buffer.numberOfChannels
    const sampleRate = buffer.sampleRate
    const format = 1
    const bitDepth = 16
    
    const bytesPerSample = bitDepth / 8
    const blockAlign = numberOfChannels * bytesPerSample
    
    const data: number[] = []
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = buffer.getChannelData(channel)[i]
        const intSample = Math.max(-1, Math.min(1, sample))
        data.push(intSample < 0 ? intSample * 0x8000 : intSample * 0x7FFF)
      }
    }
    
    const dataLength = data.length * bytesPerSample
    const bufferLength = 44 + dataLength
    const arrayBuffer = new ArrayBuffer(bufferLength)
    const view = new DataView(arrayBuffer)
    
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }
    
    writeString(0, 'RIFF')
    view.setUint32(4, bufferLength - 8, true)
    writeString(8, 'WAVE')
    writeString(12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, format, true)
    view.setUint16(22, numberOfChannels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * blockAlign, true)
    view.setUint16(32, blockAlign, true)
    view.setUint16(34, bitDepth, true)
    writeString(36, 'data')
    view.setUint32(40, dataLength, true)
    
    let offset = 44
    for (let i = 0; i < data.length; i++) {
      view.setInt16(offset, data[i], true)
      offset += 2
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' })
  }

  async function createZipFromFiles(files: Array<{ name: string; data: Uint8Array }>): Promise<Blob> {
    const encoder = new TextEncoder()
    let offset = 0
    const localHeaders: Array<{ header: Uint8Array; data: Uint8Array; offset: number }> = []
    const centralHeaders: Uint8Array[] = []
    
    files.forEach(file => {
      const nameBytes = encoder.encode(file.name)
      const crc = crc32(file.data)
      
      const localHeader = new Uint8Array(30 + nameBytes.length)
      const localView = new DataView(localHeader.buffer)
      localView.setUint32(0, 0x04034b50, true)
      localView.setUint16(4, 20, true)
      localView.setUint16(8, 0, true)
      localView.setUint32(14, crc, true)
      localView.setUint32(18, file.data.length, true)
      localView.setUint32(22, file.data.length, true)
      localView.setUint16(26, nameBytes.length, true)
      localHeader.set(nameBytes, 30)
      
      localHeaders.push({ header: localHeader, data: file.data, offset })
      offset += localHeader.length + file.data.length
      
      const centralHeader = new Uint8Array(46 + nameBytes.length)
      const centralView = new DataView(centralHeader.buffer)
      centralView.setUint32(0, 0x02014b50, true)
      centralView.setUint16(4, 20, true)
      centralView.setUint16(6, 20, true)
      centralView.setUint16(12, 0, true)
      centralView.setUint32(16, crc, true)
      centralView.setUint32(20, file.data.length, true)
      centralView.setUint32(24, file.data.length, true)
      centralView.setUint16(28, nameBytes.length, true)
      centralView.setUint32(42, localHeaders[localHeaders.length - 1].offset, true)
      centralHeader.set(nameBytes, 46)
      
      centralHeaders.push(centralHeader)
    })
    
    const centralDirOffset = offset
    const centralDirSize = centralHeaders.reduce((sum, h) => sum + h.length, 0)
    
    const endRecord = new Uint8Array(22)
    const endView = new DataView(endRecord.buffer)
    endView.setUint32(0, 0x06054b50, true)
    endView.setUint16(8, files.length, true)
    endView.setUint16(10, files.length, true)
    endView.setUint32(12, centralDirSize, true)
    endView.setUint32(16, centralDirOffset, true)
    
    const totalSize = offset + centralDirSize + endRecord.length
    const zipData = new Uint8Array(totalSize)
    let pos = 0
    
    localHeaders.forEach(({ header, data }) => {
      zipData.set(header, pos)
      pos += header.length
      zipData.set(data, pos)
      pos += data.length
    })
    
    centralHeaders.forEach(header => {
      zipData.set(header, pos)
      pos += header.length
    })
    
    zipData.set(endRecord, pos)
    
    return new Blob([zipData], { type: 'application/zip' })
  }

  function crc32(data: Uint8Array): number {
    let crc = 0xFFFFFFFF
    for (let i = 0; i < data.length; i++) {
      crc ^= data[i]
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1))
      }
    }
    return (crc ^ 0xFFFFFFFF) >>> 0
  }

  return {
    exportToZip
  }
}
