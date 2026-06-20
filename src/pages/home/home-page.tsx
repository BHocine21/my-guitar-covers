import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { TrackList } from '../../components/TrackList/track-list'
import { PlayerBar } from '../../components/PlayerBar/player-bar'

export function HomePage(): React.JSX.Element {
  return (
    <Box sx={{ pb: 12 }}>
      <Container maxWidth="sm" sx={{ pt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mes covers guitare
        </Typography>
        <TrackList />
      </Container>
      <PlayerBar />
    </Box>
  )
}
