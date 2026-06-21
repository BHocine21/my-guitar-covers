import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TrackList } from './track-list'
import { PlayerProvider } from '../../contexts/PlayerContext'
import type { Track } from '../../types/track'

const tracks: Track[] = [
  { id: 'a', title: 'Track A', src: '/audio/a.mp3' },
  { id: 'b', title: 'Track B', src: '/audio/b.mp3' },
]

const renderTrackList = (trackData: Track[] = tracks) => {
  return render(
    <PlayerProvider tracks={trackData}>
      <TrackList />
    </PlayerProvider>,
  )
}

describe('TrackList', () => {
  it('renders every track', () => {
    renderTrackList()
    expect(screen.getByText('Track A')).toBeInTheDocument()
    expect(screen.getByText('Track B')).toBeInTheDocument()
  })

  it('shows an empty state when there are no tracks', () => {
    renderTrackList([])
    expect(screen.getByText(/aucune cover disponible/i)).toBeInTheDocument()
  })

  it('marks the clicked track as selected', async () => {
    renderTrackList()

    await userEvent.click(screen.getByText('Track B'))

    expect(screen.getByText('Track B').closest('[role="button"]')).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })
})
