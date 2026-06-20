import { render, screen } from '@testing-library/react'
import { VinylDisc } from './vinyl-disc'

describe('VinylDisc', () => {
  it('exposes an accessible label with the track title', () => {
    render(<VinylDisc isSpinning={false} title="Wicked Game" />)
    expect(screen.getByRole('img', { name: /Wicked Game/i })).toBeInTheDocument()
  })

  it('applies a spin animation when playing', () => {
    render(<VinylDisc isSpinning title="Wicked Game" />)
    const disc = screen.getByRole('img')
    expect(disc).toHaveStyle({ animation: 'spin 3s linear infinite' })
  })

  it('does not spin when paused', () => {
    render(<VinylDisc isSpinning={false} title="Wicked Game" />)
    const disc = screen.getByRole('img')
    expect(disc).toHaveStyle({ animation: 'none' })
  })
})
