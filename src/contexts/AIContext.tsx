import React, { createContext, useContext, useState, useCallback } from 'react'
import { aiService } from '../services/aiService'

interface AIContextType {
  isLoading: boolean
  generateResponse: (input: string) => Promise<string>
  generateExercise: (topic: string) => Promise<{
    question: string
    options?: string[]
    correctAnswer: string
  }>
}

const AIContext = createContext<AIContextType | null>(null)

export const useAI = () => {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within an AIProvider')
  }
  return context
}

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const generateResponse = useCallback(async (input: string) => {
    setIsLoading(true)
    try {
      return await aiService.generateResponse(input)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const generateExercise = useCallback(async (topic: string) => {
    setIsLoading(true)
    try {
      return await aiService.generateExercise(topic)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <AIContext.Provider
      value={{
        isLoading,
        generateResponse,
        generateExercise,
      }}
    >
      {children}
    </AIContext.Provider>
  )
} 