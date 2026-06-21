import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FONT_SILKSCREEN } from '../../theme/fonts'
import { TurntablePlayer } from '../../components/TurntablePlayer/turntable-player'
import { NowPlaying } from '../../components/NowPlaying/now-playing'
import { TrackList } from '../../components/TrackList/track-list'

export function HomePage(): React.JSX.Element {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e9e7e3',
        backgroundImage:
          'radial-gradient(circle at 50% 0%, #efedea 0%, #e6e4e0 60%, #e0ded9 100%)',
        color: '#1a1917',
      }}
    >
      <Box
        component="main"
        sx={{
          maxWidth: { xs: '430px', md: 'none' },
          margin: '0 auto',
          padding: { xs: '22px 18px 40px', md: '26px 40px 40px' },
        }}
      >
        <Box
          component="header"
          sx={{
            marginBottom: { xs: '20px', md: '30px' },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontFamily: FONT_SILKSCREEN,
              fontWeight: 700,
              fontSize: { xs: 26, md: 36 },
              letterSpacing: '1px',
              whiteSpace: 'nowrap',
            }}
          >
            MY GUITAR COVERS
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0,1.15fr) minmax(0,0.85fr)' },
            gap: { xs: '32px', md: '48px' },
            alignItems: 'start',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TurntablePlayer />
            <NowPlaying />
          </Box>
          <TrackList />
        </Box>
      </Box>
    </Box>
  )
}
