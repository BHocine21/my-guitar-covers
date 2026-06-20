import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TrackItem } from './track-item'
import type { Track } from '../../types/track'

const track: Track = { id: 'a', title: 'Wicked Game', src: '/audio/wicked-game.mp3' }

describe('TrackItem', () => {
  it('renders the track title', () => {
    render(<TrackItem track={track} isActive={false} isPlaying={false} onSelect={jest.fn()} />)
    expect(screen.getByText('Wicked Game')).toBeInTheDocument()
  })

  it('calls onSelect with the track id when clicked', async () => {
    const onSelect = jest.fn()
    render(<TrackItem track={track} isActive={false} isPlaying={false} onSelect={onSelect} />)

    await userEvent.click(screen.getByText('Wicked Game'))

    expect(onSelect).toHaveBeenCalledWith('a')
  })

  it('marks the item as selected when active', () => {
    render(<TrackItem track={track} isActive isPlaying={false} onSelect={jest.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-selected', 'true')
  })
})
