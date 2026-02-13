export function useAudioPlayback() {
  let audioContext: AudioContext | null = null
  let source: AudioBufferSourceNode | null = null
  let startTime = 0
  let pauseTime = 0
  let duration = 0
  let animationFrameId: number | null = null

  function playAudio(audioBuffer: AudioBuffer, onProgress?: (currentTime: number) => void) {
    stopAudio()
    
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    source = audioContext.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioContext.destination)
    
    startTime = audioContext.currentTime
    duration = audioBuffer.duration
    
    source.start(0)
    
    if (onProgress) {
      const updateProgress = () => {
        if (audioContext && source) {
          const currentTime = audioContext.currentTime - startTime
          if (currentTime < duration) {
            onProgress(currentTime)
            animationFrameId = requestAnimationFrame(updateProgress)
          } else {
            onProgress(duration)
          }
        }
      }
      updateProgress()
    }
    
    source.onended = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }
  }

  function playSelection(
    audioBuffer: AudioBuffer, 
    startOffset: number, 
    endOffset: number,
    onProgress?: (currentTime: number) => void
  ) {
    stopAudio()
    
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    source = audioContext.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioContext.destination)
    
    const playDuration = endOffset - startOffset
    startTime = audioContext.currentTime
    duration = playDuration
    
    source.start(0, startOffset, playDuration)
    
    if (onProgress) {
      const updateProgress = () => {
        if (audioContext && source) {
          const elapsed = audioContext.currentTime - startTime
          if (elapsed < playDuration) {
            onProgress(startOffset + elapsed)
            animationFrameId = requestAnimationFrame(updateProgress)
          } else {
            onProgress(endOffset)
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId)
              animationFrameId = null
            }
          }
        }
      }
      updateProgress()
    }
    
    source.onended = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
      if (onProgress) {
        onProgress(endOffset)
      }
    }
  }

  function stopAudio() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
    
    if (source) {
      try {
        source.stop()
      } catch (e) {
        // Already stopped
      }
      source = null
    }
  }

  return {
    playAudio,
    playSelection,
    stopAudio
  }
}
