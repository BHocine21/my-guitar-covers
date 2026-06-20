import type { Track } from '../types/track'

const AUDIO_FILENAMES = [
  'Boulevard of Broken dreams.mp3',
  "Lumière à l'Aube.mp3",
  "Sweet Child O'Mine.mp3",
  "What's Up.mp3",
  'Wicked Game.mp3',
] as const

function filenameToTitle(filename: string): string {
  return filename.replace(/\.mp3$/i, '')
}

function filenameToId(filename: string): string {
  return filenameToTitle(filename)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getTracks(): Track[] {
  return AUDIO_FILENAMES.map((filename) => ({
    id: filenameToId(filename),
    title: filenameToTitle(filename),
    src: `/audio/${encodeURIComponent(filename)}`,
  })).sort((a, b) => a.title.localeCompare(b.title))
}
