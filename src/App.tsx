import { ChakraProvider, Box, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import theme from './theme'
import Navigation from './components/Navigation'
import { AIProvider } from './contexts/AIContext'
import { ProgressProvider } from './contexts/ProgressContext'

// Import pages (to be created)
import Dashboard from './pages/Dashboard'
import LearningModule from './pages/LearningModule'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // Monitor online/offline status
  window.addEventListener('online', () => setIsOnline(true))
  window.addEventListener('offline', () => setIsOnline(false))

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <AIProvider>
          <ProgressProvider>
            <Box minH="100vh" display="flex" flexDirection="column">
              <Router>
                <Navigation />
                <Box 
                  flex="1" 
                  display="flex" 
                  flexDirection="column" 
                  width="100%" 
                  maxWidth="100vw"
                  overflow="hidden"
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/learn/:moduleId" element={<LearningModule />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </Box>
              </Router>
            </Box>
          </ProgressProvider>
        </AIProvider>
      </ChakraProvider>
    </>
  )
}

export default App
