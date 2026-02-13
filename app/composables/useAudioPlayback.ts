export function useAudioPlayback() {
  let audioContext: AudioContext | null = null
  let source: AudioBufferSourceNode | null = null

  function playAudio(audioBuffer: AudioBuffer) {
    stopAudio()
    
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    source = audioContext.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioContext.destination)
    source.start(0)
  }

  function playSelection(audioBuffer: AudioBuffer, startTime: number, duration: number) {
    stopAudio()
    
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    source = audioContext.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioContext.destination)
    source.start(0, startTime, duration)
  }

  function stopAudio() {
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
