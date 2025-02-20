import { Box, Container, Heading, Text, Button, Flex, useColorMode, IconButton, VStack, HStack, Progress } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, ChatIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ContentModule } from '../services/storageService'
import { useLearningContent } from '../hooks/useLearningContent'
import { useAI } from '../contexts/AIContext'
import AITutor from '../components/AITutor'
import ReactMarkdown from 'react-markdown'

const LearningModule = () => {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { getModule } = useLearningContent()
  const { generateExercise } = useAI()
  const [module, setModule] = useState<ContentModule | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showAITutor, setShowAITutor] = useState(false)
  const { colorMode } = useColorMode()

  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700'
  const textColor = colorMode === 'light' ? 'gray.600' : 'gray.300'

  useEffect(() => {
    const loadModule = async () => {
      if (moduleId) {
        const loadedModule = await getModule(moduleId)
        setModule(loadedModule)
        setIsLoading(false)
      }
    }
    loadModule()
  }, [moduleId, getModule])

  if (isLoading || !module) {
    return (
      <Box w="100%" py={8}>
        <Container maxW="8xl" mx="auto">
          <VStack spacing={4} align="center">
            <Progress size="xs" isIndeterminate w="200px" colorScheme="brand" />
            <Text color={textColor}>Loading your learning content...</Text>
          </VStack>
        </Container>
      </Box>
    )
  }

  const currentLesson = module.lessons[currentLessonIndex]
  const progress = ((currentLessonIndex + 1) / module.lessons.length) * 100

  return (
    <Box w="100%" py={8}>
      <Container maxW="8xl" mx="auto">
        <VStack spacing={6} align="stretch">
          <Box>
            <Flex justify="space-between" align="center" mb={2}>
              <VStack align="start" spacing={1}>
                <Heading size="lg">{module.title}</Heading>
                <Text color={textColor}>{module.description}</Text>
              </VStack>
              <IconButton
                aria-label="Toggle AI Tutor"
                icon={<ChatIcon />}
                onClick={() => setShowAITutor(!showAITutor)}
                colorScheme={showAITutor ? 'brand' : 'gray'}
                variant={showAITutor ? 'solid' : 'ghost'}
                size="lg"
                _hover={{
                  transform: 'scale(1.05)',
                }}
                transition="all 0.2s"
              />
            </Flex>
            <Progress
              value={progress}
              size="sm"
              colorScheme="brand"
              borderRadius="full"
              bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            />
          </Box>

          <Flex gap={6} align="start">
            <Box
              flex={1}
              bg={bgColor}
              borderRadius="xl"
              boxShadow="xl"
              overflow="hidden"
              border="1px solid"
              borderColor={borderColor}
            >
              <Box p={8} minH="calc(100vh - 300px)" overflowY="auto">
                <Heading size="md" mb={6}>{currentLesson.title}</Heading>
                <Box
                  className="markdown-content"
                  sx={{
                    'h1, h2, h3': {
                      fontWeight: 'bold',
                      mb: 4,
                      mt: 6,
                    },
                    'h1': { fontSize: '2xl' },
                    'h2': { fontSize: 'xl' },
                    'h3': { fontSize: 'lg' },
                    'p': { mb: 4, lineHeight: 1.8 },
                    'ul, ol': { mb: 4, pl: 6 },
                    'li': { mb: 2 },
                    'code': {
                      bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
                      px: 2,
                      py: 0.5,
                      borderRadius: 'md',
                      fontSize: 'sm',
                    },
                    'pre': {
                      bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
                      p: 4,
                      borderRadius: 'md',
                      overflowX: 'auto',
                      mb: 4,
                    },
                    'blockquote': {
                      borderLeftWidth: 4,
                      borderLeftColor: 'brand.500',
                      pl: 4,
                      py: 2,
                      my: 4,
                      fontStyle: 'italic',
                    },
                  }}
                >
                  <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
                </Box>
              </Box>

              <Box
                p={6}
                borderTop="1px solid"
                borderColor={borderColor}
                bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
                position="sticky"
                bottom={0}
                width="100%"
              >
                <HStack justify="space-between" spacing={4}>
                  <Button
                    leftIcon={<ChevronLeftIcon />}
                    onClick={() => setCurrentLessonIndex(i => Math.max(0, i - 1))}
                    isDisabled={currentLessonIndex === 0}
                    variant="ghost"
                    size="lg"
                  >
                    Previous Lesson
                  </Button>
                  <Button
                    rightIcon={<ChevronRightIcon />}
                    onClick={() => setCurrentLessonIndex(i => Math.min(module.lessons.length - 1, i + 1))}
                    isDisabled={currentLessonIndex === module.lessons.length - 1}
                    colorScheme="brand"
                    size="lg"
                  >
                    Next Lesson
                  </Button>
                </HStack>
              </Box>
            </Box>

            {showAITutor && (
              <Box
                width="400px"
                position="sticky"
                top="24px"
                maxH="calc(100vh - 200px)"
                overflowY="auto"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: colorMode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                    borderRadius: '24px',
                  },
                }}
              >
                <AITutor
                  context={`Current lesson: ${currentLesson.title}\n${module.title} - ${module.description}`}
                  placeholder="Ask about this lesson..."
                />
              </Box>
            )}
          </Flex>
        </VStack>
      </Container>
    </Box>
  )
}

export default LearningModule 