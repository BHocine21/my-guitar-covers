import { getTracks } from './tracks'

describe('getTracks', () => {
  it('returns one track per audio file', () => {
    expect(getTracks()).toHaveLength(5)
  })

  it('strips the .mp3 extension from titles', () => {
    const tracks = getTracks()
    expect(tracks.every((track) => !track.title.endsWith('.mp3'))).toBe(true)
  })

  it('generates unique, url-safe ids', () => {
    const tracks = getTracks()
    const ids = tracks.map((track) => track.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.every((id) => /^[a-z0-9-]+$/.test(id))).toBe(true)
  })

  it('points src at the public audio folder', () => {
    const tracks = getTracks()
    expect(tracks.every((track) => track.src.startsWith('/audio/'))).toBe(true)
  })

  it('sorts tracks alphabetically by title', () => {
    const titles = getTracks().map((track) => track.title)
    const sorted = [...titles].sort((a, b) => a.localeCompare(b))
    expect(titles).toEqual(sorted)
  })
})
