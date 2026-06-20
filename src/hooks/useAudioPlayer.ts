import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseAudioPlayerResult {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  load: (src: string, autoPlay?: boolean) => void
  play: () => void
  pause: () => void
  toggle: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  onEnded: (callback: () => void) => void
}

export function useAudioPlayer(): UseAudioPlayerResult {
  const audioRef = useRef<HTMLAudioElement>(new Audio())
  const endedCallbackRef = useRef<() => void>(() => {})

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(1)

  useEffect(() => {
    const audio = audioRef.current

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration || 0)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      setIsPlaying(false)
      endedCallbackRef.current()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const load = useCallback((src: string, autoPlay = true) => {
    const audio = audioRef.current
    audio.src = src
    setCurrentTime(0)
    setDuration(0)
    if (autoPlay) {
      void audio.play()
    }
  }, [])

  const play = useCallback(() => {
    void audioRef.current.play()
  }, [])

  const pause = useCallback(() => {
    audioRef.current.pause()
  }, [])

  const toggle = useCallback(() => {
    if (audioRef.current.paused) {
      void audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [])

  const seek = useCallback((time: number) => {
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }, [])

  const setVolume = useCallback((nextVolume: number) => {
    const clamped = Math.min(1, Math.max(0, nextVolume))
    audioRef.current.volume = clamped
    setVolumeState(clamped)
  }, [])

  const onEnded = useCallback((callback: () => void) => {
    endedCallbackRef.current = callback
  }, [])

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    load,
    play,
    pause,
    toggle,
    seek,
    setVolume,
    onEnded,
  }
}
