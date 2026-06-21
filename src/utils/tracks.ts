import type { Track } from '../types/track'

const CLOUDINARY_CLOUD_NAME = 'dk7q6lsw9'

const AUDIO_FILENAMES = [
  'Boulevard of Broken dreams.mp3',
  "Lumière à l'Aube.mp3",
  "Sweet Child O'Mine.mp3",
  "What's Up.mp3",
  'Wicked Game.mp3',
] as const

// Cloudinary public_id (without extension) each file was uploaded under —
// includes the random suffix Cloudinary generated, so it can't be derived
// from the filename alone.
const CLOUDINARY_PUBLIC_IDS: Record<(typeof AUDIO_FILENAMES)[number], string> = {
  'Boulevard of Broken dreams.mp3': 'Boulevard_of_Broken_dreams_tlvoc6',
  "Lumière à l'Aube.mp3": 'Lumière_à_l_Aube_fo5lmr',
  "Sweet Child O'Mine.mp3": 'Sweet_Child_O_Mine_h4u8ky',
  "What's Up.mp3": 'What_s_Up_qb0uzk',
  'Wicked Game.mp3': 'Wicked_Game_vqa4co',
}

const cloudinaryAudioUrl = (publicId: string): string => {
  // The version segment (e.g. /v1782072888/) is optional for delivery and
  // only needed to bust the CDN cache after overwriting a public_id.
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${encodeURIComponent(publicId)}.mp3`
}

const filenameToTitle = (filename: string): string => {
  return filename.replace(/\.mp3$/i, '')
}

const filenameToId = (filename: string): string => {
  return filenameToTitle(filename)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const getTracks = (): Track[] => {
  return AUDIO_FILENAMES.map((filename) => ({
    id: filenameToId(filename),
    title: filenameToTitle(filename),
    src: cloudinaryAudioUrl(CLOUDINARY_PUBLIC_IDS[filename]),
  })).sort((a, b) => a.title.localeCompare(b.title))
}
