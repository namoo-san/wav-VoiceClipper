let sharedAudioContext: AudioContext | null = null

export function useSharedAudioContext(): AudioContext {
  if (!sharedAudioContext) {
    // AudioContext を 1 つだけ生成して全体で共有する
    // eslint-disable-next-line compat/compat
    sharedAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }

  if (sharedAudioContext.state === 'suspended') {
    // ユーザー操作後の再生時などに自動で再開を試みる
    sharedAudioContext.resume().catch(() => {
      // 再開できなくても致命的ではないので握りつぶす
    })
  }

  return sharedAudioContext
}

