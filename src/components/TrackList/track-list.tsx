import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FONT_SILKSCREEN } from '../../theme/fonts'
import { TrackRow } from '../TrackRow/track-row'
import { useTrackList } from './hooks/useTrackList'

export const TrackList = (): React.JSX.Element => {
  const { tracks, currentTrack, isPlaying, selectTrack, durations } = useTrackList()

  return (
    <section aria-label="Liste des covers guitare">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '6px',
        }}
      >
        <Typography variant="h2" sx={{ fontSize: { xs: '26px', md: '34px' }, lineHeight: 1 }}>
          My tracks
        </Typography>
        <Typography sx={{ fontFamily: FONT_SILKSCREEN, fontSize: 12, color: '#9a9892' }}>
          {tracks.length} tracks
        </Typography>
      </Box>

      {tracks.length === 0 ? (
        <Typography color="text.secondary">Aucune cover disponible pour le moment.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {tracks.map((track, index) => (
            <TrackRow
              key={track.id}
              track={track}
              index={index}
              duration={durations[track.id] ?? 0}
              isActive={track.id === currentTrack?.id}
              isPlaying={isPlaying}
              onSelect={selectTrack}
            />
          ))}
        </Box>
      )}
    </section>
  )
}
