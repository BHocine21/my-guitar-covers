import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TrackRow } from './track-row'
import type { Track } from '../../types/track'

const track: Track = { id: 'a', title: 'Wicked Game', src: '/audio/wicked-game.mp3' }

describe('TrackRow', () => {
  it('renders the track title, number and formatted duration', () => {
    render(
      <TrackRow
        track={track}
        index={2}
        duration={125}
        isActive={false}
        isPlaying={false}
        onSelect={jest.fn()}
      />,
    )
    expect(screen.getByText('Wicked Game')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
    expect(screen.getByText('2:05')).toBeInTheDocument()
  })

  it('calls onSelect with the track id when clicked', async () => {
    const onSelect = jest.fn()
    render(
      <TrackRow
        track={track}
        index={0}
        duration={0}
        isActive={false}
        isPlaying={false}
        onSelect={onSelect}
      />,
    )
    await userEvent.click(screen.getByText('Wicked Game'))
    expect(onSelect).toHaveBeenCalledWith('a')
  })

  it('shows equalizer bars instead of the number when active and playing', () => {
    render(
      <TrackRow track={track} index={0} duration={0} isActive isPlaying onSelect={jest.fn()} />,
    )
    expect(screen.queryByText('01')).not.toBeInTheDocument()
    expect(screen.getByLabelText(/en cours de lecture/i)).toBeInTheDocument()
  })

  it('marks the row as selected when active', () => {
    render(
      <TrackRow
        track={track}
        index={0}
        duration={0}
        isActive
        isPlaying={false}
        onSelect={jest.fn()}
      />,
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-selected', 'true')
  })

  it('selects the track on Enter key', async () => {
    const onSelect = jest.fn()
    render(
      <TrackRow
        track={track}
        index={0}
        duration={0}
        isActive={false}
        isPlaying={false}
        onSelect={onSelect}
      />,
    )
    screen.getByRole('button').focus()
    await userEvent.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledWith('a')
  })
})
