import { render, screen } from '@testing-library/react'
import { EqualizerBars } from './equalizer-bars'

describe('EqualizerBars', () => {
  it('renders 3 bars', () => {
    render(<EqualizerBars />)
    const eq = screen.getByLabelText(/en cours de lecture/i)
    expect(eq.children).toHaveLength(3)
  })
})
