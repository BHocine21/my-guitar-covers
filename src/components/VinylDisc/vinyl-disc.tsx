import Box from '@mui/material/Box'

export interface VinylDiscProps {
  isSpinning: boolean
  title: string
}

export function VinylDisc({ isSpinning, title }: VinylDiscProps): React.JSX.Element {
  return (
    <Box
      role="img"
      aria-label={`Disque vinyle de ${title}`}
      sx={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        flexShrink: 0,
        background:
          'radial-gradient(circle at center, #444 0%, #444 12%, #111 13%, #111 60%, #000 61%, #000 100%)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
        animation: isSpinning ? 'spin 3s linear infinite' : 'none',
        '@keyframes spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      }}
    />
  )
}
