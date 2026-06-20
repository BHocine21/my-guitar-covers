import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import type { Track } from '../../types/track'

export interface TrackItemProps {
  track: Track
  isActive: boolean
  isPlaying: boolean
  onSelect: (trackId: string) => void
}

export function TrackItem({
  track,
  isActive,
  isPlaying,
  onSelect,
}: TrackItemProps): React.JSX.Element {
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={isActive}
        aria-selected={isActive}
        onClick={() => onSelect(track.id)}
      >
        <ListItemIcon>
          {isActive && isPlaying ? (
            <PauseIcon color="primary" />
          ) : isActive ? (
            <PlayArrowIcon color="primary" />
          ) : (
            <MusicNoteIcon />
          )}
        </ListItemIcon>
        <ListItemText primary={track.title} />
      </ListItemButton>
    </ListItem>
  )
}
