import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { TrackItem } from '../TrackItem/track-item'
import { useTrackList } from './hooks/useTrackList'

export function TrackList(): React.JSX.Element {
  const { tracks, currentTrack, isPlaying, selectTrack } = useTrackList()

  if (tracks.length === 0) {
    return <Typography color="text.secondary">Aucune cover disponible pour le moment.</Typography>
  }

  return (
    <List aria-label="Liste des covers guitare">
      {tracks.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          isActive={track.id === currentTrack?.id}
          isPlaying={isPlaying}
          onSelect={selectTrack}
        />
      ))}
    </List>
  )
}
