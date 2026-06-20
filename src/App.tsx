import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { HomePage } from './pages/home/home-page'
import { PlayerProvider } from './contexts/PlayerContext'
import { getTracks } from './utils/tracks'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1db954' },
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
