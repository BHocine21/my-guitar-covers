import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'

export interface VolumeControlProps {
  volume: number
  onVolumeChange: (volume: number) => void
}

export function VolumeControl({ volume, onVolumeChange }: VolumeControlProps): React.JSX.Element {
  const Icon = volume === 0 ? VolumeOffIcon : VolumeUpIcon

  return (
    <Stack component="div" direction="row" spacing={1} sx={{ alignItems: 'center', width: 140 }}>
      <Icon fontSize="small" aria-hidden="true" />
      <Slider
        aria-label="Volume"
        size="small"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(_, value) => onVolumeChange(value as number)}
      />
    </Stack>
  )
}
