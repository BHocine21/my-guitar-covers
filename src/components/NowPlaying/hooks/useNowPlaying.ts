import { usePlayerContext } from '../../../contexts/usePlayerContext'

export function useNowPlaying() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    seek,
    playNext,
    playPrevious,
  } = usePlayerContext()

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    seek,
    playNext,
    playPrevious,
  }
}
