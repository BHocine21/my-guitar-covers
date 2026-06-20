import { usePlayerContext } from '../../../contexts/usePlayerContext'

export function useTrackList() {
  const { tracks, currentTrack, isPlaying, selectTrack } = usePlayerContext()
  return { tracks, currentTrack, isPlaying, selectTrack }
}
