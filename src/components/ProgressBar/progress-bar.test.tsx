import { render, screen } from '@testing-library/react'
import { ProgressBar } from './progress-bar'

describe('ProgressBar', () => {
  it('displays formatted current time and duration', () => {
    render(<ProgressBar currentTime={65} duration={185} onSeek={jest.fn()} />)
    expect(screen.getByText('1:05')).toBeInTheDocument()
    expect(screen.getByText('3:05')).toBeInTheDocument()
  })

  it('disables the slider when duration is unknown', () => {
    render(<ProgressBar currentTime={0} duration={0} onSeek={jest.fn()} />)
    expect(screen.getByRole('slider')).toBeDisabled()
  })

  it('exposes an accessible slider label', () => {
    render(<ProgressBar currentTime={0} duration={100} onSeek={jest.fn()} />)
    expect(screen.getByRole('slider', { name: /progression/i })).toBeInTheDocument()
  })
})
