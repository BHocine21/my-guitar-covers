# Architecture — my-guitar-covers

## 1. Analyse des inputs

Le dossier `Inputs` contient 5 fichiers audio `.mp3` (covers guitare), sans métadonnées
additionnelles (pas de pochettes, pas de fichier de description, pas de durées fournies) :

- Boulevard of Broken Dreams.mp3
- Lumière à l'Aube.mp3
- Sweet Child O'Mine.mp3
- What's Up.mp3
- Wicked Game.mp3

### Besoin métier déduit

Application personnelle mono-utilisateur (le propriétaire des covers) permettant de :

1. Lister tous les morceaux dont une cover guitare existe.
2. Les écouter via un lecteur audio complet (play/pause, seek, volume, piste précédente/suivante).
3. Visualiser une animation de disque vinyle qui tourne pendant la lecture.

### Persona

Un seul persona : le guitariste lui-même, consultant sa propre liste de covers. Pas
d'authentification, pas de multi-utilisateur (non justifié par les inputs).

### Cas d'usage

- Parcourir la playlist.
- Sélectionner un morceau → il devient le morceau actif et démarre la lecture.
- Contrôler la lecture (play/pause, seek, volume, piste suivante/précédente, mode shuffle/repeat).
- Voir l'état "en cours de lecture" visuellement (disque qui tourne, mise en surbrillance du morceau actif).

### Données manipulées

Un morceau (`Track`) = fichier audio + métadonnées minimales déductibles du nom de fichier
(titre). Artiste/auteur de la cover et durée ne sont pas fournis : la durée est lue dynamiquement
depuis le fichier audio (métadonnée `loadedmetadata` du tag `<audio>`), et l'artiste/cover-art
ne sont pas affichés faute de données (hypothèse documentée ci-dessous).

### Contraintes fonctionnelles / UX

- Lecteur "moderne", proche de Spotify/Apple Music : barre de progression, contrôle du volume,
  piste suivante/précédente, affichage titre + temps écoulé/restant.
- Animation de disque vinyle tournant uniquement quand `isPlaying === true` (pause = arrêt de
  la rotation, pas de reset de position pour un effet naturel).
- Liste de lecture affichant l'intégralité des morceaux du dossier `Inputs`.

### Hypothèses retenues (informations manquantes)

| Information manquante        | Hypothèse                                                                                     | Convention appliquée              |
| ---------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------- |
| Artiste / auteur de la cover | Non affiché (un seul guitariste, named "covers")                                              | Convention apps perso single-user |
| Durée des morceaux           | Lue dynamiquement via `HTMLAudioElement.duration`                                             | Standard lecteurs web             |
| Pochette d'album             | Pas de pochette fournie → utilisation d'une icône/disque vinyle générique illustré en SVG/CSS | Convention lecteurs sans artwork  |
| Ordre de la playlist         | Ordre alphabétique des fichiers                                                               | Convention liste de fichiers      |
| Authentification             | Aucune (app locale mono-utilisateur)                                                          | Hors périmètre des inputs         |

## 2. Stack technique

- React 18 (TypeScript strict) + Vite + pnpm
- react-router-dom (une seule route principale `/`, prévue extensible pour page de détail morceau)
- MUI (Material UI) comme design system
- ESLint + Prettier + cspell
- Jest + React Testing Library

## 3. Découpage applicatif

### Pages

- `pages/home` — Page unique : playlist + lecteur (le besoin n'en justifie pas davantage).

### Contexts

- `contexts/PlayerContext` — État global du lecteur audio (piste active, lecture en cours,
  progression, volume, file de lecture, navigation suivant/précédent). Centralisé en contexte
  car consommé à la fois par la liste de morceaux (sélection) et par la barre de lecteur
  (contrôles), deux zones de l'UI non parentes directement.

### Components (chacun : `.tsx` + `.test.tsx` + `hooks/useX.ts` si logique propre)

- `TrackList` — Liste des morceaux (container).
- `TrackItem` — Une ligne de la playlist (titre, durée, état actif/lecture).
- `PlayerBar` — Barre de lecteur fixe en bas (titre courant, contrôles, progression, volume).
- `VinylDisc` — Disque vinyle animé (rotation CSS pilotée par `isPlaying`).
- `ProgressBar` — Barre de progression/seek réutilisable.
- `VolumeControl` — Slider de volume réutilisable.

### Hooks

- `hooks/useAudioPlayer` — Encapsule l'élément `<audio>` natif (play/pause/seek/volume/events),
  isolé du Context pour rester testable indépendamment du DOM React.

### Utils

- `utils/tracks.ts` — Source des morceaux (dérivée des fichiers du dossier `public/audio`) et
  génération de l'identifiant/titre à partir du nom de fichier.
- `utils/format.ts` — Formatage des durées (`mm:ss`).

### Modèle de données TypeScript

```ts
interface Track {
  id: string
  title: string
  src: string // chemin vers le fichier audio dans /public/audio
}

interface PlayerState {
  currentTrackId: string | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
}
```

## 4. Tests

Chaque composant, hook et util possède sa couverture (rendu, interactions, cas limites :
volume à 0/1, absence de piste sélectionnée, fin de morceau → piste suivante).
