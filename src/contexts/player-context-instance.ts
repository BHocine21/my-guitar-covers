import { createContext } from 'react'
import type { Track } from '../types/track'

export interface PlayerContextValue {
  tracks: Track[]
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  selectTrack: (trackId: string) => void
  togglePlay: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  playNext: () => void
  playPrevious: () => void
}

export const PlayerContext = createContext<PlayerContextValue | undefined>(undefined)
