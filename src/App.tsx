import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { HomePage } from './pages/home/home-page'
import { PlayerProvider } from './contexts/PlayerContext'
import { getTracks } from './utils/tracks'
import { FONT_PIXELIFY } from './theme/fonts'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#cf7a2c' },
    background: { default: '#e9e7e3' },
    text: { primary: '#1a1917' },
  },
  typography: {
    h1: { fontFamily: FONT_PIXELIFY, fontWeight: 600 },
    h2: { fontFamily: FONT_PIXELIFY, fontWeight: 600 },
  },
})

export function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PlayerProvider tracks={getTracks()}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </ThemeProvider>
  )
}
