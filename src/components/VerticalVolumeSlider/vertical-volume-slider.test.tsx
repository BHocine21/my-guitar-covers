import { render, screen, fireEvent } from '@testing-library/react'
import { VerticalVolumeSlider } from './vertical-volume-slider'

describe('VerticalVolumeSlider', () => {
  it('renders a slider with the current value', () => {
    render(<VerticalVolumeSlider volume={0.5} onVolumeChange={jest.fn()} />)
    expect(screen.getByRole('slider', { name: /volume/i })).toHaveAttribute('aria-valuenow', '0.5')
  })

  it('sets the volume based on the click position (top = louder)', () => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 10,
      height: 88,
      bottom: 88,
      right: 10,
      x: 0,
      y: 0,
      toJSON: () => {},
    } as DOMRect)

    const onVolumeChange = jest.fn()
    render(<VerticalVolumeSlider volume={0.5} onVolumeChange={onVolumeChange} />)
    const slider = screen.getByRole('slider', { name: /volume/i })

    fireEvent(
      slider,
      new MouseEvent('pointerdown', { clientY: 22, bubbles: true, cancelable: true }),
    )

    expect(onVolumeChange).toHaveBeenCalledWith(0.75)

    jest.restoreAllMocks()
  })

  it('adjusts volume via arrow keys', () => {
    const onVolumeChange = jest.fn()
    render(<VerticalVolumeSlider volume={0.5} onVolumeChange={onVolumeChange} />)
    const slider = screen.getByRole('slider', { name: /volume/i })

    fireEvent.keyDown(slider, { key: 'ArrowUp' })
    expect(onVolumeChange).toHaveBeenCalledWith(0.55)

    fireEvent.keyDown(slider, { key: 'ArrowDown' })
    expect(onVolumeChange).toHaveBeenCalledWith(0.45)
  })
})
