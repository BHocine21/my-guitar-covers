import { act, renderHook } from '@testing-library/react'
import { useAudioPlayer } from './useAudioPlayer'

describe('useAudioPlayer', () => {
  it('starts paused with zero time and full volume', () => {
    const { result } = renderHook(() => useAudioPlayer())

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.currentTime).toBe(0)
    expect(result.current.volume).toBe(1)
  })

  it('clamps volume between 0 and 1', () => {
    const { result } = renderHook(() => useAudioPlayer())

    act(() => result.current.setVolume(2))
    expect(result.current.volume).toBe(1)

    act(() => result.current.setVolume(-1))
    expect(result.current.volume).toBe(0)
  })

  it('updates currentTime when seeking', () => {
    const { result } = renderHook(() => useAudioPlayer())

    act(() => result.current.seek(42))
    expect(result.current.currentTime).toBe(42)
  })

  it('loads a new source and resets time/duration', () => {
    const { result } = renderHook(() => useAudioPlayer())

    act(() => result.current.seek(10))
    act(() => result.current.load('/audio/test.mp3', false))

    expect(result.current.currentTime).toBe(0)
    expect(result.current.duration).toBe(0)
  })
})
