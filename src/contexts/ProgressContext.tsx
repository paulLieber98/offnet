import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { LearningProgress, storageService } from '../services/storageService'

interface ProgressContextType {
  progress: LearningProgress[]
  isLoading: boolean
  error: string | null
  saveProgress: (progress: LearningProgress) => Promise<void>
  getModuleProgress: (moduleId: string) => LearningProgress | null
}

const ProgressContext = createContext<ProgressContextType | null>(null)

// Temporary user ID for demo purposes
const DEMO_USER_ID = 'demo-user'

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<LearningProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load all progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const userProgress = await storageService.getAllProgress(DEMO_USER_ID)
        setProgress(userProgress)
      } catch (err) {
        setError('Failed to load learning progress')
        console.error('Error loading progress:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadProgress()
  }, [])

  const saveProgress = useCallback(async (newProgress: LearningProgress) => {
    try {
      await storageService.saveProgress(newProgress)
      setProgress(prev => {
        const index = prev.findIndex(p => 
          p.userId === newProgress.userId && p.moduleId === newProgress.moduleId
        )
        if (index >= 0) {
          const updated = [...prev]
          updated[index] = newProgress
          return updated
        }
        return [...prev, newProgress]
      })
    } catch (err) {
      setError('Failed to save progress')
      console.error('Error saving progress:', err)
    }
  }, [])

  const getModuleProgress = useCallback((moduleId: string): LearningProgress | null => {
    return progress.find(p => p.moduleId === moduleId && p.userId === DEMO_USER_ID) || null
  }, [progress])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isLoading,
        error,
        saveProgress,
        getModuleProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
} 