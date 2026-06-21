import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

const BARS = [
  { duration: '0.7s', delay: '0s' },
  { duration: '0.55s', delay: '0.15s' },
  { duration: '0.8s', delay: '0.3s' },
]

export const EqualizerBars = (): React.JSX.Element => {
  const theme = useTheme()

  return (
    <Box
      aria-label="En cours de lecture"
      sx={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '18px' }}
    >
      {BARS.map((bar, i) => (
        <Box
          key={i}
          sx={{
            width: '3px',
            height: '100%',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '2px',
            transformOrigin: 'bottom',
            animation: `eqb ${bar.duration} ease-in-out infinite`,
            animationDelay: bar.delay,
            '@keyframes eqb': {
              '0%, 100%': { transform: 'scaleY(0.25)' },
              '50%': { transform: 'scaleY(1)' },
            },
          }}
        />
      ))}
    </Box>
  )
}
