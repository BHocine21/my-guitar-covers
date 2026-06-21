import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { formatDuration } from '../../utils/format'
import { FONT_VT323 } from '../../theme/fonts'

const BAR_COUNT = 52
const SEEK_STEP_SECONDS = 5

const getBarHeights = (): number[] => {
  const heights: number[] = []
  for (let i = 0; i < BAR_COUNT; i++) {
    const raw = Math.sin(i * 0.6) * 0.7 + Math.sin(i * 0.23) * 0.4 + Math.sin(i * 1.3) * 0.2
    const v = 0.3 + 0.7 * Math.abs(raw)
    heights.push(Math.max(0.18, Math.min(1, v)))
  }
  return heights
}

const BAR_HEIGHTS = getBarHeights()

export interface WaveformProps {
  currentTime: number
  duration: number
  onSeek: (time: number) => void
}

export const Waveform = ({ currentTime, duration, onSeek }: WaveformProps): React.JSX.Element => {
  const theme = useTheme()
  const trackRef = useRef<HTMLDivElement>(null)
  const isSeekable = duration > 0
  const [hoverFraction, setHoverFraction] = useState<number | null>(null)

  const progress = isSeekable ? Math.min(currentTime, duration) / duration : 0

  const fractionFromClientX = (clientX: number): number => {
    const track = trackRef.current
    if (!track) return 0
    const rect = track.getBoundingClientRect()
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
  }

  const seekToClientX = (clientX: number) => {
    if (!isSeekable) return
    onSeek(fractionFromClientX(clientX) * duration)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isSeekable) return
    seekToClientX(event.clientX)
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Not implemented in some test environments (e.g. jsdom); safe to ignore.
    }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isSeekable || event.buttons !== 1) return
    seekToClientX(event.clientX)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isSeekable) return
    setHoverFraction(fractionFromClientX(event.clientX))
  }

  const handleMouseLeave = () => setHoverFraction(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isSeekable) return
    if (event.key === 'ArrowRight') {
      onSeek(Math.min(duration, currentTime + SEEK_STEP_SECONDS))
    } else if (event.key === 'ArrowLeft') {
      onSeek(Math.max(0, currentTime - SEEK_STEP_SECONDS))
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
      <Typography sx={{ fontFamily: FONT_VT323, fontSize: 22, color: '#6b6a66', width: 48 }}>
        {formatDuration(currentTime)}
      </Typography>
      <Box
        ref={trackRef}
        role="slider"
        aria-label="Progression de la lecture"
        aria-valuemin={0}
        aria-valuemax={duration || 0}
        aria-valuenow={isSeekable ? Math.min(currentTime, duration) : 0}
        tabIndex={isSeekable ? 0 : -1}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2px',
          height: '42px',
          cursor: isSeekable ? 'pointer' : 'default',
        }}
      >
        {BAR_HEIGHTS.map((h, i) => {
          const fraction = i / BAR_COUNT
          const accent = theme.palette.primary.main
          let backgroundColor = '#c4c2bd'
          if (isSeekable && fraction <= progress) {
            backgroundColor = accent
          } else if (isSeekable && hoverFraction !== null && fraction <= hoverFraction) {
            // Lighter preview tint showing where a click would seek to.
            backgroundColor = `${accent}55`
          }
          return (
            <Box
              key={i}
              sx={{
                flex: 1,
                minWidth: 0,
                borderRadius: '2px',
                height: `${(6 + h * 30).toFixed(1)}px`,
                backgroundColor,
                transition: 'background-color 0.1s',
              }}
            />
          )
        })}
      </Box>
      <Typography
        sx={{
          fontFamily: FONT_VT323,
          fontSize: 22,
          color: '#6b6a66',
          width: 48,
          textAlign: 'right',
        }}
      >
        {formatDuration(duration)}
      </Typography>
    </Box>
  )
}
