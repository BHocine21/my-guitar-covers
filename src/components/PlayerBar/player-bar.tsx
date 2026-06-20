import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import { VinylDisc } from '../VinylDisc/vinyl-disc'
import { ProgressBar } from '../ProgressBar/progress-bar'
import { VolumeControl } from '../VolumeControl/volume-control'
import { usePlayerBar } from './hooks/usePlayerBar'

export function PlayerBar(): React.JSX.Element {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    seek,
    setVolume,
    playNext,
    playPrevious,
  } = usePlayerBar()

  return (
    <Paper
      elevation={4}
      component="footer"
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 2 }}
    >
      <Stack component="div" direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <VinylDisc isSpinning={isPlaying} title={currentTrack?.title ?? 'Aucune piste'} />

        <Box sx={{ minWidth: 140 }}>
          <Typography variant="subtitle2" noWrap>
            {currentTrack?.title ?? 'Sélectionnez un morceau'}
          </Typography>
        </Box>

        <Stack component="div" direction="row" spacing={0.5}>
          <IconButton
            aria-label="Morceau précédent"
            onClick={playPrevious}
            disabled={!currentTrack}
          >
            <SkipPreviousIcon />
          </IconButton>
          <IconButton
            aria-label={isPlaying ? 'Mettre en pause' : 'Lire'}
            onClick={togglePlay}
            disabled={!currentTrack}
            color="primary"
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton aria-label="Morceau suivant" onClick={playNext} disabled={!currentTrack}>
            <SkipNextIcon />
          </IconButton>
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />
        </Box>

        <VolumeControl volume={volume} onVolumeChange={setVolume} />
      </Stack>
    </Paper>
  )
}
