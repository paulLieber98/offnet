import { ChakraProvider, Box } from '@chakra-ui/react'
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
    <ChakraProvider theme={theme}>
      <AIProvider>
        <ProgressProvider>
          <Box minH="100vh" bg="gray.50">
            <Router>
              <Navigation />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/learn/:moduleId" element={<LearningModule />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Router>
          </Box>
        </ProgressProvider>
      </AIProvider>
    </ChakraProvider>
  )
}

export default App
