import { usePlayerContext } from '../../../contexts/usePlayerContext'

export const useNowPlaying = () => {
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
