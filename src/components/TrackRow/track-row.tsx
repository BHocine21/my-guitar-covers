import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import type { Track } from '../../types/track'
import { formatDuration } from '../../utils/format'
import { FONT_PIXELIFY, FONT_SILKSCREEN, FONT_VT323 } from '../../theme/fonts'
import { EqualizerBars } from '../EqualizerBars/equalizer-bars'

export interface TrackRowProps {
  track: Track
  index: number
  duration: number
  isActive: boolean
  isPlaying: boolean
  onSelect: (trackId: string) => void
}

export const TrackRow = ({
  track,
  index,
  duration,
  isActive,
  isPlaying,
  onSelect,
}: TrackRowProps): React.JSX.Element => {
  const theme = useTheme()
  const accent = theme.palette.primary.main
  const showEqualizer = isActive && isPlaying

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(track.id)
    }
  }

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-selected={isActive}
      onClick={() => onSelect(track.id)}
      onKeyDown={handleKeyDown}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: { xs: '14px', md: '18px' },
        padding: { xs: '14px', md: '16px 18px' },
        borderRadius: '14px',
        cursor: 'pointer',
        backgroundColor: isActive ? `${accent}24` : 'rgba(255,255,255,0.45)',
        border: isActive ? `1px solid ${accent}66` : '1px solid rgba(0,0,0,0.05)',
        transition: 'background-color 0.15s',
        '&:hover': {
          backgroundColor: isActive ? `${accent}33` : 'rgba(0,0,0,0.06)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: '14px',
          bottom: '14px',
          width: '3px',
          borderRadius: '0 3px 3px 0',
          backgroundColor: isActive ? accent : 'transparent',
        }}
      />

      <Box
        sx={{
          width: '34px',
          flex: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {showEqualizer ? (
          <EqualizerBars />
        ) : (
          <Typography
            sx={{
              fontFamily: FONT_SILKSCREEN,
              fontSize: 13,
              color: isActive ? accent : '#9a9892',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          width: { xs: '44px', md: '48px' },
          height: { xs: '44px', md: '48px' },
          flex: 'none',
          borderRadius: '10px',
          background: 'linear-gradient(135deg,#2c2a27,#5a5650)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accent,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2.3" />
        </svg>
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: FONT_PIXELIFY,
            fontWeight: 600,
            fontSize: 18,
            lineHeight: 1.1,
            color: isActive ? '#1a1917' : '#26241f',
          }}
        >
          {track.title}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontFamily: FONT_VT323,
          fontSize: 20,
          color: isActive ? accent : '#8a887f',
          width: '46px',
          textAlign: 'right',
          flex: 'none',
        }}
      >
        {formatDuration(duration)}
      </Typography>
    </Box>
  )
}
