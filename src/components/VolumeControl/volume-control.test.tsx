import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VolumeControl } from './volume-control'

describe('VolumeControl', () => {
  it('renders a volume slider with the current value', () => {
    render(<VolumeControl volume={0.5} onVolumeChange={jest.fn()} />)
    expect(screen.getByRole('slider', { name: /volume/i })).toHaveAttribute('aria-valuenow', '0.5')
  })

  it('notifies when the volume changes via keyboard', async () => {
    const onVolumeChange = jest.fn()
    render(<VolumeControl volume={0.5} onVolumeChange={onVolumeChange} />)

    const slider = screen.getByRole('slider', { name: /volume/i })
    slider.focus()
    await userEvent.keyboard('{ArrowRight}')

    expect(onVolumeChange).toHaveBeenCalled()
  })
})
