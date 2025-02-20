import { Box, Container, Heading, Text, VStack, Switch, FormControl, FormLabel, useColorMode, Badge, Flex } from '@chakra-ui/react'
import { useAI } from '../contexts/AIContext'

const Settings = () => {
  const { colorMode } = useColorMode()
  const { modelInfo } = useAI()
  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700'
  const textColor = colorMode === 'light' ? 'gray.600' : 'gray.400'

  return (
    <Box w="100%" py={8}>
      <Container maxW="8xl" mx="auto">
        <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="sm" border="1px solid" borderColor={borderColor}>
          <VStack align="stretch" spacing={8}>
            <Box>
              <Heading size="lg" mb={2}>Settings</Heading>
              <Text color={textColor}>Customize your learning experience</Text>
            </Box>

            <Box>
              <Heading size="md" mb={4}>AI Model Information</Heading>
              <VStack align="stretch" spacing={3}>
                <Flex align="center" justify="space-between">
                  <Text color={textColor}>Model Name</Text>
                  <Badge colorScheme="blue">{modelInfo?.name || 'Not Available'}</Badge>
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text color={textColor}>Model Size</Text>
                  <Badge colorScheme="purple">{modelInfo?.size || 'Unknown'}</Badge>
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text color={textColor}>Status</Text>
                  <Badge colorScheme={modelInfo?.isOnline ? 'green' : 'red'}>
                    {modelInfo?.isOnline ? 'Online' : 'Offline'}
                  </Badge>
                </Flex>
              </VStack>
            </Box>

            <Box>
              <Heading size="md" mb={4}>Learning Preferences</Heading>
              <VStack align="stretch" spacing={4}>
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel htmlFor="email-alerts" mb="0" color={textColor}>
                    Email Notifications
                  </FormLabel>
                  <Switch id="email-alerts" colorScheme="brand" />
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel htmlFor="ai-suggestions" mb="0" color={textColor}>
                    AI Learning Suggestions
                  </FormLabel>
                  <Switch id="ai-suggestions" colorScheme="brand" defaultChecked />
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel htmlFor="auto-progress" mb="0" color={textColor}>
                    Automatic Progress Tracking
                  </FormLabel>
                  <Switch id="auto-progress" colorScheme="brand" defaultChecked />
                </FormControl>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default Settings 