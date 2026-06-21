import { usePlayerContext } from '../../../contexts/usePlayerContext'

export function useTurntablePlayer() {
  const { isPlaying, volume, setVolume } = usePlayerContext()

  return { isPlaying, volume, setVolume }
}
