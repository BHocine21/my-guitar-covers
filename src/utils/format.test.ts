import { formatDuration } from './format'

describe('formatDuration', () => {
  it('formats whole minutes and seconds', () => {
    expect(formatDuration(125)).toBe('2:05')
  })

  it('formats zero seconds', () => {
    expect(formatDuration(0)).toBe('0:00')
  })

  it('pads seconds below ten', () => {
    expect(formatDuration(61)).toBe('1:01')
  })

  it('floors fractional seconds', () => {
    expect(formatDuration(59.9)).toBe('0:59')
  })

  it('returns 0:00 for negative input', () => {
    expect(formatDuration(-5)).toBe('0:00')
  })

  it('returns 0:00 for non-finite input', () => {
    expect(formatDuration(NaN)).toBe('0:00')
  })
})
