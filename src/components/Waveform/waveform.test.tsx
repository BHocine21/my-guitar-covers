import { render, screen, fireEvent } from '@testing-library/react'
import { Waveform } from './waveform'

describe('Waveform', () => {
  it('displays formatted current time and duration', () => {
    render(<Waveform currentTime={65} duration={185} onSeek={jest.fn()} />)
    expect(screen.getByText('1:05')).toBeInTheDocument()
    expect(screen.getByText('3:05')).toBeInTheDocument()
  })

  it('renders 52 bars', () => {
    const { container } = render(<Waveform currentTime={0} duration={100} onSeek={jest.fn()} />)
    const track = screen.getByRole('slider')
    expect(track.children).toHaveLength(52)
    expect(container).toBeInTheDocument()
  })

  it('exposes an accessible slider with the current value', () => {
    render(<Waveform currentTime={30} duration={100} onSeek={jest.fn()} />)
    const track = screen.getByRole('slider', { name: /progression/i })
    expect(track).toHaveAttribute('aria-valuenow', '30')
    expect(track).toHaveAttribute('aria-valuemax', '100')
  })

  it('seeks proportionally to the click position', () => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      width: 100,
      top: 0,
      bottom: 0,
      right: 100,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    } as DOMRect)

    const onSeek = jest.fn()
    render(<Waveform currentTime={0} duration={200} onSeek={onSeek} />)
    const track = screen.getByRole('slider')

    // jsdom's PointerEvent does not carry clientX through fireEvent's init dict;
    // dispatching a MouseEvent of the same type still reaches React's onPointerDown handler.
    fireEvent(
      track,
      new MouseEvent('pointerdown', { clientX: 50, bubbles: true, cancelable: true }),
    )

    expect(onSeek).toHaveBeenCalledWith(100)

    jest.restoreAllMocks()
  })

  it('seeks via arrow keys', () => {
    const onSeek = jest.fn()
    render(<Waveform currentTime={10} duration={200} onSeek={onSeek} />)
    const track = screen.getByRole('slider')

    fireEvent.keyDown(track, { key: 'ArrowRight' })
    expect(onSeek).toHaveBeenCalledWith(15)

    fireEvent.keyDown(track, { key: 'ArrowLeft' })
    expect(onSeek).toHaveBeenCalledWith(5)
  })

  it('is not interactive when duration is unknown', () => {
    const onSeek = jest.fn()
    render(<Waveform currentTime={0} duration={0} onSeek={onSeek} />)
    const track = screen.getByRole('slider')

    expect(track).toHaveAttribute('tabindex', '-1')

    fireEvent.pointerDown(track, { clientX: 50 })
    expect(onSeek).not.toHaveBeenCalled()
  })
})
