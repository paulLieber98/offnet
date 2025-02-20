import { useState, useEffect } from 'react'
import { ContentModule } from '../services/storageService'
import { storageService } from '../services/storageService'
import { sampleModules } from '../data/sampleContent'

export const useLearningContent = () => {
  const [modules, setModules] = useState<ContentModule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeContent = async () => {
      try {
        // Try to load modules from storage
        const storedModules = await storageService.getAllModules()
        
        if (storedModules.length === 0) {
          // If no modules are stored, initialize with sample content
          await Promise.all(
            sampleModules.map(module => storageService.saveModule(module))
          )
          setModules(sampleModules)
        } else {
          setModules(storedModules)
        }
      } catch (err) {
        setError('Failed to load learning content')
        console.error('Error loading content:', err)
      } finally {
        setIsLoading(false)
      }
    }

    initializeContent()
  }, [])

  const getModule = async (moduleId: string): Promise<ContentModule | null> => {
    try {
      const module = await storageService.getModule(moduleId)
      return module
    } catch (err) {
      console.error('Error loading module:', err)
      return null
    }
  }

  return {
    modules,
    isLoading,
    error,
    getModule,
  }
} 