import { useContext } from 'react'
import { PlayerContext, type PlayerContextValue } from './player-context-instance'

export function usePlayerContext(): PlayerContextValue {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider')
  }
  return context
}
