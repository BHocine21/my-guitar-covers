import { useEffect, useState } from 'react'
import type { Track } from '../types/track'

export const useTrackDurations = (tracks: Track[]): Record<string, number> => {
  const [durations, setDurations] = useState<Record<string, number>>({})

  useEffect(() => {
    const audios = tracks.map((track) => {
      const audio = new Audio()
      audio.preload = 'metadata'
      audio.addEventListener(
        'loadedmetadata',
        () => {
          setDurations((prev) => ({ ...prev, [track.id]: audio.duration || 0 }))
        },
        { once: true },
      )
      audio.src = track.src
      return audio
    })

    return () => {
      audios.forEach((audio) => {
        audio.src = ''
      })
    }
  }, [tracks])

  return durations
}
