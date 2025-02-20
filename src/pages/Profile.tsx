import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { Progress } from '@chakra-ui/progress'

const Profile = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="sm">
        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="lg" mb={2}>Student Profile</Heading>
            <Text color="gray.600">Your learning journey</Text>
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
            <Text>Total Study Time: 24 hours</Text>
            <Text>Completed Exercises: 48</Text>
            <Text>Average Score: 85%</Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  )
}

export default Profile 