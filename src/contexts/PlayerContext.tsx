import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Track } from '../types/track'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import { PlayerContext, type PlayerContextValue } from './player-context-instance'

export interface PlayerProviderProps {
  tracks: Track[]
  children: ReactNode
}

export const PlayerProvider = ({ tracks, children }: PlayerProviderProps): React.JSX.Element => {
  const player = useAudioPlayer()
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null)

  const currentIndex = useMemo(
    () => tracks.findIndex((track) => track.id === currentTrackId),
    [tracks, currentTrackId],
  )
  const currentTrack = currentIndex >= 0 ? tracks[currentIndex] : null

  const selectTrack = useCallback(
    (trackId: string) => {
      const track = tracks.find((candidate) => candidate.id === trackId)
      if (!track) return
      setCurrentTrackId(trackId)
      player.load(track.src)
    },
    [tracks, player],
  )

  const playNext = useCallback(() => {
    if (tracks.length === 0) return
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % tracks.length
    selectTrack(tracks[nextIndex].id)
  }, [tracks, currentIndex, selectTrack])

  const playPrevious = useCallback(() => {
    if (tracks.length === 0) return
    const previousIndex = currentIndex <= 0 ? tracks.length - 1 : currentIndex - 1
    selectTrack(tracks[previousIndex].id)
  }, [tracks, currentIndex, selectTrack])

  useEffect(() => {
    player.onEnded(playNext)
  }, [player, playNext])

  const value: PlayerContextValue = {
    tracks,
    currentTrack,
    isPlaying: player.isPlaying,
    currentTime: player.currentTime,
    duration: player.duration,
    volume: player.volume,
    selectTrack,
    togglePlay: player.toggle,
    seek: player.seek,
    setVolume: player.setVolume,
    playNext,
    playPrevious,
  }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}
