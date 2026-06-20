import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { PlayerProvider } from './PlayerContext'
import { usePlayerContext } from './usePlayerContext'
import type { Track } from '../types/track'

const tracks: Track[] = [
  { id: 'a', title: 'Track A', src: '/audio/a.mp3' },
  { id: 'b', title: 'Track B', src: '/audio/b.mp3' },
  { id: 'c', title: 'Track C', src: '/audio/c.mp3' },
]

function wrapper({ children }: { children: ReactNode }) {
  return <PlayerProvider tracks={tracks}>{children}</PlayerProvider>
}

describe('PlayerContext', () => {
  it('throws when used outside a PlayerProvider', () => {
    const { result } = renderHook(() => {
      try {
        usePlayerContext()
        return null
      } catch (error) {
        return error
      }
    })
    expect(result.current).toBeInstanceOf(Error)
  })

  it('has no current track initially', () => {
    const { result } = renderHook(() => usePlayerContext(), { wrapper })
    expect(result.current.currentTrack).toBeNull()
  })

  it('selects a track by id', () => {
    const { result } = renderHook(() => usePlayerContext(), { wrapper })

    act(() => result.current.selectTrack('b'))

    expect(result.current.currentTrack?.id).toBe('b')
  })

  it('advances to the next track, wrapping around at the end', () => {
    const { result } = renderHook(() => usePlayerContext(), { wrapper })

    act(() => result.current.selectTrack('c'))
    act(() => result.current.playNext())

    expect(result.current.currentTrack?.id).toBe('a')
  })

  it('goes to the previous track, wrapping around at the start', () => {
    const { result } = renderHook(() => usePlayerContext(), { wrapper })

    act(() => result.current.selectTrack('a'))
    act(() => result.current.playPrevious())

    expect(result.current.currentTrack?.id).toBe('c')
  })

  it('ignores selecting an unknown track id', () => {
    const { result } = renderHook(() => usePlayerContext(), { wrapper })

    act(() => result.current.selectTrack('a'))
    act(() => result.current.selectTrack('unknown'))

    expect(result.current.currentTrack?.id).toBe('a')
  })
})
