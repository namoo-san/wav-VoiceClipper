export function useAudioDetection() {
  async function detectVoiceRegions(
    audioBuffer: AudioBuffer,
    options: { threshold: number; minDuration: number }
  ): Promise<Array<{ start: number; end: number }>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const threshold = Math.pow(10, options.threshold / 20)
        const minDurationSec = options.minDuration
        const data = audioBuffer.getChannelData(0)
        const sampleRate = audioBuffer.sampleRate
        const minSamples = Math.floor(minDurationSec * sampleRate)
        
        const windowSize = Math.floor(sampleRate * 0.01)
        const regions: Array<{ start: number; end: number }> = []
        let inVoice = false
        let startSample = 0
        
        for (let i = 0; i < data.length; i += windowSize) {
          let rms = 0
          const end = Math.min(i + windowSize, data.length)
          
          for (let j = i; j < end; j++) {
            rms += data[j] * data[j]
          }
          rms = Math.sqrt(rms / (end - i))
          
          if (rms > threshold) {
            if (!inVoice) {
              startSample = Math.max(0, i - windowSize * 2)
              inVoice = true
            }
          } else {
            if (inVoice) {
              const endSample = Math.min(i + windowSize * 2, data.length)
              if (endSample - startSample >= minSamples) {
                regions.push({
                  start: startSample / sampleRate,
                  end: endSample / sampleRate
                })
              }
              inVoice = false
            }
          }
        }
        
        if (inVoice) {
          regions.push({
            start: startSample / sampleRate,
            end: data.length / sampleRate
          })
        }
        
        resolve(regions)
      }, 100)
    })
  }

  return {
    detectVoiceRegions
  }
}
