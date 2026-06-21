import { usePlayerContext } from '../../../contexts/usePlayerContext'

export const useTurntablePlayer = () => {
  const { isPlaying, volume, setVolume } = usePlayerContext()

  return { isPlaying, volume, setVolume }
}
