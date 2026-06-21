import { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { TurntablePlayer } from './turntable-player'
import { PlayerProvider } from '../../contexts/PlayerContext'
import { usePlayerContext } from '../../contexts/usePlayerContext'
import type { Track } from '../../types/track'

const tracks: Track[] = [{ id: 'a', title: 'Track A', src: '/audio/a.mp3' }]

function SelectFirstTrack() {
  const { selectTrack } = usePlayerContext()
  useEffect(() => selectTrack('a'), [selectTrack])
  return null
}

describe('TurntablePlayer', () => {
  it('renders the record paused when nothing is playing', () => {
    render(
      <PlayerProvider tracks={tracks}>
        <TurntablePlayer />
      </PlayerProvider>,
    )
    expect(screen.getByTestId('vinyl-record')).toHaveStyle({ animationPlayState: 'paused' })
  })

  it('spins the record once a track is playing', () => {
    const originalPlay = window.HTMLMediaElement.prototype.play
    window.HTMLMediaElement.prototype.play = function play(this: HTMLMediaElement) {
      this.dispatchEvent(new Event('play'))
      return Promise.resolve()
    }

    function Wrapper() {
      return (
        <PlayerProvider tracks={tracks}>
          <SelectFirstTrack />
          <TurntablePlayer />
        </PlayerProvider>
      )
    }
    render(<Wrapper />)
    expect(screen.getByTestId('vinyl-record')).toHaveStyle({ animationPlayState: 'running' })

    window.HTMLMediaElement.prototype.play = originalPlay
  })

  it('renders the volume slider', () => {
    render(
      <PlayerProvider tracks={tracks}>
        <TurntablePlayer />
      </PlayerProvider>,
    )
    expect(screen.getByRole('slider', { name: /volume/i })).toBeInTheDocument()
  })
})
