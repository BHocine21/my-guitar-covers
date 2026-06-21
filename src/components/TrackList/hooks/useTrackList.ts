import { usePlayerContext } from '../../../contexts/usePlayerContext'
import { useTrackDurations } from '../../../hooks/useTrackDurations'

export function useTrackList() {
  const { tracks, currentTrack, isPlaying, selectTrack } = usePlayerContext()
  const durations = useTrackDurations(tracks)
  return { tracks, currentTrack, isPlaying, selectTrack, durations }
}
