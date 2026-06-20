import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { formatDuration } from '../../utils/format'

export interface ProgressBarProps {
  currentTime: number
  duration: number
  onSeek: (time: number) => void
}

export function ProgressBar({
  currentTime,
  duration,
  onSeek,
}: ProgressBarProps): React.JSX.Element {
  return (
    <Stack component="div" direction="row" spacing={1} sx={{ alignItems: 'center', width: '100%' }}>
      <Typography variant="caption" sx={{ minWidth: 36 }}>
        {formatDuration(currentTime)}
      </Typography>
      <Slider
        aria-label="Progression de la lecture"
        size="small"
        min={0}
        max={duration || 0}
        value={Math.min(currentTime, duration || 0)}
        onChange={(_, value) => onSeek(value as number)}
        disabled={duration === 0}
      />
      <Typography variant="caption" sx={{ minWidth: 36 }}>
        {formatDuration(duration)}
      </Typography>
    </Stack>
  )
}
