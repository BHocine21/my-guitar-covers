import { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { PlayerBar } from './player-bar'
import { PlayerProvider } from '../../contexts/PlayerContext'
import { usePlayerContext } from '../../contexts/usePlayerContext'
import type { Track } from '../../types/track'

const tracks: Track[] = [
  { id: 'a', title: 'Track A', src: '/audio/a.mp3' },
  { id: 'b', title: 'Track B', src: '/audio/b.mp3' },
]

function SelectFirstTrack() {
  const { selectTrack } = usePlayerContext()
  useEffect(() => selectTrack('a'), [selectTrack])
  return null
}

function renderPlayerBar() {
  return render(
    <PlayerProvider tracks={tracks}>
      <PlayerBar />
    </PlayerProvider>,
  )
}

describe('PlayerBar', () => {
  it('shows a placeholder when no track is selected', () => {
    renderPlayerBar()
    expect(screen.getByText(/Sélectionnez un morceau/i)).toBeInTheDocument()
  })

  it('disables transport controls when no track is selected', () => {
    renderPlayerBar()
    expect(screen.getByRole('button', { name: /lire/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /morceau suivant/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /morceau précédent/i })).toBeDisabled()
  })

  it('enables transport controls once a track is playing', () => {
    function Wrapper() {
      return (
        <PlayerProvider tracks={tracks}>
          <SelectFirstTrack />
          <PlayerBar />
        </PlayerProvider>
      )
    }
    render(<Wrapper />)

    expect(screen.getByRole('button', { name: /mettre en pause|lire/i })).toBeEnabled()
  })
})
