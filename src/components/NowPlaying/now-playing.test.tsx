import { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { NowPlaying } from './now-playing'
import { PlayerProvider } from '../../contexts/PlayerContext'
import { usePlayerContext } from '../../contexts/usePlayerContext'
import type { Track } from '../../types/track'

const tracks: Track[] = [
  { id: 'a', title: 'Track A', src: '/audio/a.mp3' },
  { id: 'b', title: 'Track B', src: '/audio/b.mp3' },
]

const SelectFirstTrack = () => {
  const { selectTrack } = usePlayerContext()
  useEffect(() => selectTrack('a'), [selectTrack])
  return null
}

const renderNowPlaying = () => {
  return render(
    <PlayerProvider tracks={tracks}>
      <NowPlaying />
    </PlayerProvider>,
  )
}

describe('NowPlaying', () => {
  it('shows a placeholder when no track is selected', () => {
    renderNowPlaying()
    expect(screen.getByText(/sélectionnez un morceau/i)).toBeInTheDocument()
  })

  it('disables transport controls when no track is selected', () => {
    renderNowPlaying()
    expect(screen.getByRole('button', { name: /lire/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /morceau suivant/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /morceau précédent/i })).toBeDisabled()
  })

  it('shows the track title and enables controls once a track is selected', () => {
    const Wrapper = () => {
      return (
        <PlayerProvider tracks={tracks}>
          <SelectFirstTrack />
          <NowPlaying />
        </PlayerProvider>
      )
    }
    render(<Wrapper />)

    expect(screen.getByText('Track A')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /mettre en pause|lire/i })).toBeEnabled()
  })
})
