import { usePlayerContext } from '../../../contexts/usePlayerContext'

export function usePlayerBar() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    seek,
    setVolume,
    playNext,
    playPrevious,
  } = usePlayerContext()

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    seek,
    setVolume,
    playNext,
    playPrevious,
  }
}
