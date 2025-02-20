import { Box, Container, Heading, Text, Spinner, Button, Flex, useColorMode, IconButton, Collapse } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/layout'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ContentModule } from '../services/storageService'
import { useLearningContent } from '../hooks/useLearningContent'
import { useAI } from '../contexts/AIContext'
import AITutor from '../components/AITutor'
import ReactMarkdown from 'react-markdown'
import { ChevronLeftIcon, ChevronRightIcon, ChatIcon } from '@chakra-ui/icons'

const LearningModule = () => {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { getModule } = useLearningContent()
  const { generateExercise } = useAI()
  const [module, setModule] = useState<ContentModule | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showAITutor, setShowAITutor] = useState(false)
  const { colorMode } = useColorMode()

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

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text>Loading module...</Text>
        </VStack>
      </Container>
    )
  }

  if (!module) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Module not found</Text>
      </Container>
    )
  }

  const currentLesson = module.lessons[currentLessonIndex]
  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center">
          <Box>
            <Heading mb={2}>{module.title}</Heading>
            <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
              {module.description}
            </Text>
          </Box>
          <IconButton
            aria-label="Toggle AI Tutor"
            icon={<ChatIcon />}
            onClick={() => setShowAITutor(!showAITutor)}
            colorScheme={showAITutor ? 'brand' : 'gray'}
            variant={showAITutor ? 'solid' : 'ghost'}
          />
        </Flex>

        <Flex gap={6} align="start">
          <Box flex={1}>
            <Box
              p={6}
              bg={bgColor}
              borderRadius="lg"
              boxShadow="sm"
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
                'p': { mb: 4 },
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
                },
              }}
            >
              <Heading size="md" mb={4}>{currentLesson.title}</Heading>
              <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
            </Box>

            <Flex justify="space-between" mt={6} gap={4}>
              <Button
                leftIcon={<ChevronLeftIcon />}
                onClick={() => setCurrentLessonIndex(i => Math.max(0, i - 1))}
                isDisabled={currentLessonIndex === 0}
                variant="ghost"
              >
                Previous Lesson
              </Button>
              <Button
                rightIcon={<ChevronRightIcon />}
                onClick={() => setCurrentLessonIndex(i => Math.min(module.lessons.length - 1, i + 1))}
                isDisabled={currentLessonIndex === module.lessons.length - 1}
                colorScheme="brand"
              >
                Next Lesson
              </Button>
            </Flex>
          </Box>

          <Collapse in={showAITutor} style={{ flex: '0 0 400px' }}>
            <Box width="400px">
              <AITutor
                context={`Current lesson: ${currentLesson.title}\n${module.title} - ${module.description}`}
                placeholder="Ask about this lesson..."
              />
            </Box>
          </Collapse>
        </Flex>
      </VStack>
    </Container>
  )
}

export default LearningModule 