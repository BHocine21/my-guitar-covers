import { usePlayerContext } from '../../../contexts/usePlayerContext'
import { useTrackDurations } from '../../../hooks/useTrackDurations'

// Matches the MUI default `md` breakpoint used for the mobile/desktop layout
// switch elsewhere (e.g. home-page.tsx's xs/md columns).
const MOBILE_BREAKPOINT = 900

export function useTrackList() {
  const { tracks, currentTrack, isPlaying, selectTrack } = usePlayerContext()
  const durations = useTrackDurations(tracks)

  const handleSelectTrack = (trackId: string) => {
    selectTrack(trackId)
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return { tracks, currentTrack, isPlaying, selectTrack: handleSelectTrack, durations }
}
