import { render, screen } from '@testing-library/react'
import { HomePage } from './home-page'
import { PlayerProvider } from '../../contexts/PlayerContext'
import type { Track } from '../../types/track'

const tracks: Track[] = [{ id: 'a', title: 'Track A', src: '/audio/a.mp3' }]

describe('HomePage', () => {
  it('renders the page title and the track list', () => {
    render(
      <PlayerProvider tracks={tracks}>
        <HomePage />
      </PlayerProvider>,
    )

    expect(screen.getByRole('heading', { name: /mes covers guitare/i })).toBeInTheDocument()
    expect(screen.getByText('Track A')).toBeInTheDocument()
  })
})
