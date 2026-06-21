import { useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import { FONT_VT323 } from '../../theme/fonts'

export interface VerticalVolumeSliderProps {
  volume: number
  onVolumeChange: (volume: number) => void
}

export const VerticalVolumeSlider = ({
  volume,
  onVolumeChange,
}: VerticalVolumeSliderProps): React.JSX.Element => {
  const trackRef = useRef<HTMLDivElement>(null)
  const Icon = volume === 0 ? VolumeOffIcon : VolumeUpIcon

  const setVolumeFromClientY = (clientY: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const fraction = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height))
    onVolumeChange(1 - fraction)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setVolumeFromClientY(event.clientY)
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Not implemented in some test environments (e.g. jsdom); safe to ignore.
    }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.buttons !== 1) return
    setVolumeFromClientY(event.clientY)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowUp') {
      onVolumeChange(Math.min(1, volume + 0.05))
    } else if (event.key === 'ArrowDown') {
      onVolumeChange(Math.max(0, volume - 0.05))
    }
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        // Anchored as a percentage of the device panel (like the power switch and
        // start button below) so it scales with the panel instead of staying pinned
        // at a fixed pixel offset when the panel is resized. Anchored higher up
        // (50% instead of the design's 55.5%) to leave clear space above the
        // power switch, which sits near the bottom of the panel.
        top: '45%',
        left: '81%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Icon sx={{ fontSize: 13, color: '#7a7a7a' }} aria-hidden="true" />
        <Typography
          sx={{
            fontFamily: FONT_VT323,
            fontSize: 13,
            lineHeight: 1,
            color: '#7a7a7a',
            letterSpacing: '1px',
          }}
        >
          VOL
        </Typography>
      </Box>
      <Typography sx={{ fontSize: 12, lineHeight: 1, color: '#8a8a8a' }}>+</Typography>
      <Box
        ref={trackRef}
        role="slider"
        aria-label="Volume"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={volume}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onKeyDown={handleKeyDown}
        sx={{
          position: 'relative',
          width: '10px',
          height: { xs: '74px', md: '88px' },
          borderRadius: '6px',
          background: 'linear-gradient(90deg,#9c9c9c,#cfcfcf)',
          boxShadow: 'inset 0 0 3px rgba(0,0,0,0.4)',
          cursor: 'pointer',
          overflow: 'hidden',
          // Prevent touch drags on the slider from also panning/scrolling the
          // page on mobile (desktop is unaffected since it has no touch panning).
          touchAction: { xs: 'none', md: 'auto' },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: `${volume * 100}%`,
            backgroundColor: 'primary.main',
            transition: 'height 0.1s',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: `${(1 - volume) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: '24px',
            height: '14px',
            borderRadius: '3px',
            background: 'linear-gradient(180deg,#f0f0f0,#bcbcbc)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.8)',
            transition: 'top 0.1s',
          }}
        />
      </Box>
      <Typography sx={{ fontSize: 14, lineHeight: 1, color: '#8a8a8a' }}>–</Typography>
    </Box>
  )
}
