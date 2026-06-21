import { act, renderHook } from '@testing-library/react'
import { useTrackDurations } from './useTrackDurations'
import type { Track } from '../types/track'

const tracks: Track[] = [
  { id: 'a', title: 'Track A', src: '/audio/a.mp3' },
  { id: 'b', title: 'Track B', src: '/audio/b.mp3' },
]

describe('useTrackDurations', () => {
  it('starts with no known durations', () => {
    const { result } = renderHook(() => useTrackDurations(tracks))
    expect(result.current).toEqual({})
  })

  it('populates durations as metadata loads, keyed by track id', () => {
    const created: HTMLAudioElement[] = []
    const OriginalAudio = window.Audio
    window.Audio = class extends OriginalAudio {
      constructor() {
        super()
        created.push(this)
      }
    } as unknown as typeof Audio

    const { result } = renderHook(() => useTrackDurations(tracks))

    expect(created).toHaveLength(2)

    Object.defineProperty(created[0], 'duration', { value: 123, configurable: true })
    act(() => {
      created[0].dispatchEvent(new Event('loadedmetadata'))
    })

    expect(result.current).toEqual({ a: 123 })

    Object.defineProperty(created[1], 'duration', { value: 45, configurable: true })
    act(() => {
      created[1].dispatchEvent(new Event('loadedmetadata'))
    })

    expect(result.current).toEqual({ a: 123, b: 45 })

    window.Audio = OriginalAudio
  })
})
