import { useState, useRef, useEffect } from 'react'
import {
  Box,
  VStack,
  HStack,
  Input,
  IconButton,
  Text,
  useColorMode,
  Flex,
  Avatar,
  Spinner,
  Badge,
  Tooltip,
} from '@chakra-ui/react'
import { ArrowUpIcon, WarningIcon } from '@chakra-ui/icons'
import { useAI } from '../contexts/AIContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AITutorProps {
  context?: string
  placeholder?: string
}

const AITutor = ({ context = '', placeholder = 'Ask your question...' }: AITutorProps) => {
  const { colorMode } = useColorMode()
  const { generateResponse, isLoading } = useAI()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const response = await generateResponse(input)
      const aiMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error generating response:', error)
    }
  }

  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700'

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      boxShadow="sm"
      overflow="hidden"
      border="1px solid"
      borderColor={borderColor}
    >
      <Box position="relative">
        {isOffline && (
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bg="orange.500"
            color="white"
            py={2}
            px={4}
            alignItems="center"
            gap={2}
          >
            <WarningIcon />
            <Text fontSize="sm">Offline Mode - Using local AI model</Text>
          </Flex>
        )}
        
        <VStack
          height="400px"
          overflowY="auto"
          p={4}
          spacing={4}
          align="stretch"
          mt={isOffline ? 12 : 0}
        >
          {context && (
            <Box
              p={4}
              bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
              borderRadius="md"
              fontSize="sm"
            >
              <Text fontWeight="medium" mb={1}>Current Context:</Text>
              <Text>{context}</Text>
            </Box>
          )}
          
          {messages.map((message, index) => (
            <Flex
              key={index}
              gap={3}
              alignItems="flex-start"
              justify={message.role === 'user' ? 'flex-end' : 'flex-start'}
            >
              {message.role === 'assistant' && (
                <Avatar
                  size="sm"
                  name="AI Tutor"
                  bg="brand.500"
                  color="white"
                  icon={<Text fontSize="xs">AI</Text>}
                />
              )}
              <Box
                maxW="80%"
                bg={message.role === 'user' ? 'brand.500' : colorMode === 'light' ? 'gray.100' : 'gray.700'}
                color={message.role === 'user' ? 'white' : undefined}
                borderRadius="lg"
                px={4}
                py={3}
              >
                <Text>{message.content}</Text>
                <Text
                  fontSize="xs"
                  color={message.role === 'user' ? 'whiteAlpha.700' : 'gray.500'}
                  mt={1}
                >
                  {message.timestamp.toLocaleTimeString()}
                </Text>
              </Box>
              {message.role === 'user' && (
                <Avatar
                  size="sm"
                  name="User"
                  bg={colorMode === 'light' ? 'gray.300' : 'gray.600'}
                />
              )}
            </Flex>
          ))}
          <div ref={messagesEndRef} />
        </VStack>

        <Box p={4} borderTop="1px solid" borderColor={borderColor}>
          <form onSubmit={handleSubmit}>
            <HStack>
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                disabled={isLoading}
              />
              <IconButton
                aria-label="Send message"
                icon={isLoading ? <Spinner size="sm" /> : <ArrowUpIcon />}
                colorScheme="brand"
                type="submit"
                disabled={isLoading || !input.trim()}
              />
            </HStack>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default AITutor 