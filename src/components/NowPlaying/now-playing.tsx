import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import { Waveform } from '../Waveform/waveform'
import { useNowPlaying } from './hooks/useNowPlaying'

export const NowPlaying = (): React.JSX.Element => {
  const theme = useTheme()
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    seek,
    playNext,
    playPrevious,
  } = useNowPlaying()

  return (
    <Box sx={{ width: '100%', margin: '30px auto 0', allignItems: 'center', textAlign: 'center' }}>
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: '30px', md: '38px' }, lineHeight: 1.04, letterSpacing: '0.5px' }}
      >
        {currentTrack?.title ?? 'Sélectionnez un morceau'}
      </Typography>

      <Waveform currentTime={currentTime} duration={duration} onSeek={seek} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '36px',
          marginTop: '26px',
        }}
      >
        <IconButton aria-label="Morceau précédent" onClick={playPrevious} disabled={!currentTrack}>
          <SkipPreviousIcon sx={{ fontSize: 28 }} />
        </IconButton>
        <IconButton
          aria-label={isPlaying ? 'Mettre en pause' : 'Lire'}
          onClick={togglePlay}
          disabled={!currentTrack}
          sx={{
            width: '78px',
            height: '78px',
            backgroundColor: '#1a1917',
            color: '#fff',
            boxShadow: '0 10px 22px rgba(0,0,0,0.28)',
            transition: 'background-color 0.15s',
            '&:hover': { backgroundColor: theme.palette.primary.main },
            '&.Mui-disabled': { backgroundColor: '#1a1917', opacity: 0.4, color: '#fff' },
          }}
        >
          {isPlaying ? (
            <PauseIcon sx={{ fontSize: 28 }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: 28 }} />
          )}
        </IconButton>
        <IconButton aria-label="Morceau suivant" onClick={playNext} disabled={!currentTrack}>
          <SkipNextIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>
    </Box>
  )
}
