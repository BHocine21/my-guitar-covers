import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { FONT_VT323 } from '../../theme/fonts'
import { VerticalVolumeSlider } from '../VerticalVolumeSlider/vertical-volume-slider'
import { useTurntablePlayer } from './hooks/useTurntablePlayer'

const CORNER_SCREW_STYLE = {
  position: 'absolute',
  width: '11px',
  height: '11px',
  borderRadius: '50%',
  background: 'radial-gradient(circle at 35% 30%,#fafafa,#9c9c9c)',
  boxShadow: 'inset 0 0 2px rgba(0,0,0,0.4)',
} as const

export const TurntablePlayer = (): React.JSX.Element => {
  const theme = useTheme()
  const accent = theme.palette.primary.main
  const { isPlaying, volume, setVolume } = useTurntablePlayer()

  return (
    <Box
      role="img"
      aria-label="Platine vinyle"
      sx={{
        position: 'relative',
        // Shrinks to whichever is smallest: the column width, the 560px design
        // size, or whatever width keeps the panel's height within the viewport
        // (so the now-playing controls below it never get pushed off-screen).
        width: 'min(560px, 100%, calc((100vh - 400px) * 560 / 470))',
        aspectRatio: '560/470',
        margin: '0 auto',
        borderRadius: '20px',
        background:
          'linear-gradient(135deg,#ededed 0%,#cfcfcf 24%,#e2e2e2 50%,#c4c4c4 76%,#dadada 100%)',
        border: '2px solid #b6b6b6',
        boxShadow:
          'inset 0 2px 4px rgba(255,255,255,0.75), inset 0 -4px 12px rgba(0,0,0,0.22), 0 26px 50px rgba(0,0,0,0.18)',
      }}
    >
      <Box sx={{ ...CORNER_SCREW_STYLE, top: '14px', left: '14px' }} />
      <Box sx={{ ...CORNER_SCREW_STYLE, top: '14px', right: '14px' }} />
      <Box sx={{ ...CORNER_SCREW_STYLE, bottom: '14px', left: '14px' }} />
      <Box sx={{ ...CORNER_SCREW_STYLE, bottom: '14px', right: '14px' }} />

      {/* Platter */}
      <Box
        sx={{
          position: 'absolute',
          left: '4.5%',
          top: '5.5%',
          width: '71%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 50%, #9a9a9a 0 1.5%, #111 1.5% 100%)',
          boxShadow: 'inset 0 0 0 6px #1c1c1c, 0 8px 22px rgba(0,0,0,0.4)',
        }}
      >
        {/* Spinning record */}
        <Box
          data-testid="vinyl-record"
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'repeating-radial-gradient(circle at 50% 50%, #161616 0 1px, #0c0c0c 1px 2.5px)',
            animation: 'spin 3.6s linear infinite',
            animationPlayState: isPlaying ? 'running' : 'paused',
            '@keyframes spin': { to: { transform: 'rotate(360deg)' } },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: '5px',
              borderRadius: '50%',
              background:
                'repeating-conic-gradient(from 0deg, #b7b7b7 0deg 1.3deg, transparent 1.3deg 4.4deg)',
              mask: 'radial-gradient(circle, transparent 0 47.5%, #000 47.5% 49.5%, transparent 49.5%)',
              WebkitMask:
                'radial-gradient(circle, transparent 0 47.5%, #000 47.5% 49.5%, transparent 49.5%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: '5px',
              borderRadius: '50%',
              background: `repeating-conic-gradient(from 0deg, ${accent} 0deg 1.3deg, transparent 1.3deg 4.4deg)`,
              mask: 'radial-gradient(circle, transparent 0 47.5%, #000 47.5% 49.5%, transparent 49.5%), conic-gradient(from 196deg, #000 0deg 22deg, transparent 22deg 360deg)',
              WebkitMask:
                'radial-gradient(circle, transparent 0 47.5%, #000 47.5% 49.5%, transparent 49.5%), conic-gradient(from 196deg, #000 0deg 22deg, transparent 22deg 360deg)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '34%',
              aspectRatio: '1',
              transform: 'translate(-50%,-50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 40%, #efe9da, #d3cdbe)',
              boxShadow: '0 0 0 2px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: '1.5px',
                background: 'rgba(0,0,0,0.25)',
                transform: 'rotate(24deg)',
                transformOrigin: 'center',
              }}
            />
            <Typography
              sx={{
                fontFamily: FONT_VT323,
                fontSize: 13,
                color: '#7a6f55',
                letterSpacing: '1px',
                transform: 'rotate(-24deg)',
              }}
            >
              HB Covers
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '7px',
                height: '7px',
                transform: 'translate(-50%,-50%)',
                borderRadius: '50%',
                background: '#1a1917',
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            pointerEvents: 'none',
            background:
              'radial-gradient(circle at 34% 26%, rgba(255,255,255,0.16), transparent 42%)',
          }}
        />
      </Box>

      {/* Tonearm pivot */}
      <Box
        sx={{
          position: 'absolute',
          top: '7%',
          right: '7%',
          width: '18%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 32%, #f4f4f4, #b8b8b8)',
          boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.7), 0 3px 6px rgba(0,0,0,0.25)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '24px',
            height: '24px',
            transform: 'translate(-50%,-50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 35%, #fff, #9d9d9d)',
            boxShadow: 'inset 0 0 3px rgba(0,0,0,0.3)',
          }}
        />
      </Box>

      {/* Tonearm */}
      <Box
        sx={{
          position: 'absolute',
          top: '18%',
          right: '15.2%',
          width: '9px',
          height: '42%',
          transformOrigin: 'top center',
          transform: 'rotate(34deg)',
          borderRadius: '6px',
          background: 'linear-gradient(90deg,#9a9a9a,#e6e6e6 45%,#c2c2c2)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-12deg)',
            width: '26px',
            height: '24px',
            borderRadius: '4px',
            background: 'linear-gradient(160deg,#3a3a3a,#1a1a1a)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: '-6px',
              left: '5px',
              width: '16px',
              height: '8px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '1px',
            }}
          >
            <Box sx={{ background: accent }} />
            <Box sx={{ background: '#6b6b6b' }} />
            <Box sx={{ background: '#6b6b6b' }} />
            <Box sx={{ background: '#6b6b6b' }} />
            <Box sx={{ background: accent }} />
            <Box sx={{ background: '#6b6b6b' }} />
          </Box>
        </Box>
      </Box>

      <VerticalVolumeSlider volume={volume} onVolumeChange={setVolume} />

      {/* Start button (decorative) */}
      <Box
        sx={{
          position: 'absolute',
          left: '9%',
          bottom: '9%',
          width: '11%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, #f4f4f4, #aeaeae)',
          boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.8), 0 3px 6px rgba(0,0,0,0.25)',
        }}
      />
    </Box>
  )
}
