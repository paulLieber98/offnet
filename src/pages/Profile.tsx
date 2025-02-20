import { Box, Container, Heading, Text, VStack, Progress, useColorMode } from '@chakra-ui/react'

const Profile = () => {
  const { colorMode } = useColorMode()
  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700'
  const textColor = colorMode === 'light' ? 'gray.600' : 'gray.400'

  return (
    <Box w="100%" py={8}>
      <Container maxW="8xl" mx="auto">
        <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="sm" border="1px solid" borderColor={borderColor}>
          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading size="lg" mb={2}>Student Profile</Heading>
              <Text color={textColor}>Your learning journey</Text>
            </Box>

            <Box>
              <Heading size="md" mb={4}>Progress Overview</Heading>
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text mb={2}>Mathematics</Text>
                  <Progress value={75} colorScheme="green" />
                </Box>
                <Box>
                  <Text mb={2}>Science</Text>
                  <Progress value={60} colorScheme="blue" />
                </Box>
                <Box>
                  <Text mb={2}>Language Arts</Text>
                  <Progress value={85} colorScheme="purple" />
                </Box>
              </VStack>
            </Box>

            <Box>
              <Heading size="md" mb={4}>Learning Stats</Heading>
              <Text color={textColor}>Total Study Time: 24 hours</Text>
              <Text color={textColor}>Completed Exercises: 48</Text>
              <Text color={textColor}>Average Score: 85%</Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default Profile 