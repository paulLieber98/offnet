import { Box, Container, Heading, Text, SimpleGrid, Badge, Icon, VStack, useColorMode, Flex, Spinner } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { RouterLink } from '../components/RouterLink'
import { useLearningContent } from '../hooks/useLearningContent'

const Dashboard = () => {
  const { colorMode } = useColorMode()
  const { modules, isLoading, error } = useLearningContent()

  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700'
  const textColor = colorMode === 'light' ? 'gray.600' : 'gray.300'

  if (isLoading) {
    return (
      <Box w="100%" py={8}>
        <Container maxW="8xl" mx="auto">
          <Box textAlign="center">
            <Spinner size="xl" color="brand.500" />
            <Text mt={4}>Loading your learning content...</Text>
          </Box>
        </Container>
      </Box>
    )
  }

  if (error) {
    return (
      <Box w="100%" py={8}>
        <Container maxW="8xl" mx="auto">
          <Box textAlign="center">
            <Heading size="md" color="red.500" mb={4}>Error</Heading>
            <Text>{error}</Text>
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <Box w="100%" py={8}>
      <Container maxW="8xl" mx="auto">
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="2xl" mb={2}>Welcome to Offnet</Heading>
            <Text fontSize="lg" color={textColor}>Your personalized learning journey begins here</Text>
          </Box>

          <Box>
            <Heading size="lg" mb={6}>Available Modules</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
              {modules.map(module => (
                <Box
                  key={module.id}
                  as={RouterLink}
                  to={`/learn/${module.id}`}
                  bg={bgColor}
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="lg"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    borderColor: 'brand.500',
                    borderWidth: '2px',
                  }}
                  transition="all 0.3s ease"
                  position="relative"
                >
                  <Box p={6}>
                    <Badge
                      colorScheme="brand"
                      fontSize="sm"
                      px={3}
                      py={1}
                      borderRadius="full"
                      mb={4}
                    >
                      {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
                    </Badge>
                    <Heading size="md" mb={3}>{module.title}</Heading>
                    <Text color={textColor} mb={4} noOfLines={2}>
                      {module.description}
                    </Text>
                    <Flex
                      align="center"
                      color="brand.500"
                      fontWeight="semibold"
                      fontSize="sm"
                    >
                      Start Learning
                      <Icon as={ChevronRightIcon} ml={2} />
                    </Flex>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={8}>
            <Box
              p={6}
              bg={bgColor}
              borderRadius="xl"
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
              transition="all 0.3s ease"
            >
              <VStack align="start" spacing={4}>
                <Heading size="md">Continue Learning</Heading>
                <Text color={textColor}>
                  Pick up where you left off in your learning journey.
                </Text>
              </VStack>
            </Box>

            <Box
              p={6}
              bg={bgColor}
              borderRadius="xl"
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
              transition="all 0.3s ease"
            >
              <VStack align="start" spacing={4}>
                <Heading size="md">Practice Exercises</Heading>
                <Text color={textColor}>
                  Test your knowledge with AI-generated exercises.
                </Text>
              </VStack>
            </Box>

            <Box
              p={6}
              bg={bgColor}
              borderRadius="xl"
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
              transition="all 0.3s ease"
            >
              <VStack align="start" spacing={4}>
                <Heading size="md">Knowledge Base</Heading>
                <Text color={textColor}>
                  Access your offline learning resources.
                </Text>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Dashboard 