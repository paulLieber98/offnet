import { Box, Container, Heading, Text, Spinner, SimpleGrid, Badge, Icon } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import { useLearningContent } from '../hooks/useLearningContent'
import { RouterLink } from '../components/RouterLink'
import { ChevronRightIcon } from '@chakra-ui/icons'

const Dashboard = () => {
  const { colorMode } = useColorMode()
  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'
  const { modules, isLoading, error } = useLearningContent()

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center">
          <Spinner size="xl" color="brand.500" />
          <Text mt={4}>Loading your learning content...</Text>
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center">
          <Heading size="md" color="red.500" mb={4}>Error</Heading>
          <Text>{error}</Text>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Welcome to Offnet</Heading>
      
      <Box mb={8}>
        <Heading size="md" mb={4}>Available Modules</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {modules.map(module => (
            <Box
              key={module.id}
              as={RouterLink}
              to={`/learn/${module.id}`}
              p={6}
              bg={bgColor}
              borderRadius="lg"
              boxShadow="sm"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'md',
                borderColor: 'brand.500',
                borderWidth: '1px',
              }}
              transition="all 0.2s"
              position="relative"
              overflow="hidden"
            >
              <Badge colorScheme="brand" mb={2}>
                {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
              </Badge>
              <Heading size="md" mb={2}>{module.title}</Heading>
              <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'} mb={4}>
                {module.description}
              </Text>
              <Text color="brand.500" fontSize="sm" fontWeight="medium">
                Start Learning <Icon as={ChevronRightIcon} ml={1} />
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          boxShadow="sm"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
          transition="all 0.2s"
        >
          <Heading size="md" mb={4}>Continue Learning</Heading>
          <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
            Pick up where you left off in your learning journey.
          </Text>
        </Box>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          boxShadow="sm"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
          transition="all 0.2s"
        >
          <Heading size="md" mb={4}>Practice Exercises</Heading>
          <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
            Test your knowledge with AI-generated exercises.
          </Text>
        </Box>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          boxShadow="sm"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
          transition="all 0.2s"
        >
          <Heading size="md" mb={4}>Knowledge Base</Heading>
          <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
            Access your offline learning resources.
          </Text>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default Dashboard 