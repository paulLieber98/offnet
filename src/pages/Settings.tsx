import { Box, Container, Heading, Text, VStack, Badge, Flex } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/switch'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useColorMode } from '@chakra-ui/color-mode'
import { aiService } from '../services/aiService'

const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const modelInfo = aiService.getModelInfo()

  return (
    <Container maxW="container.xl" py={8}>
      <Box bg={colorMode === 'light' ? 'white' : 'gray.800'} p={8} borderRadius="lg" boxShadow="sm">
        <VStack align="stretch" spacing={8}>
          <Box>
            <Heading size="lg" mb={6}>Settings</Heading>
            <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'} mb={4}>
              Configure your learning experience
            </Text>
          </Box>

          <Box>
            <Heading size="md" mb={4}>Display</Heading>
            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel mb="0">Dark Mode</FormLabel>
              <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
            </FormControl>
          </Box>

          <Box>
            <Heading size="md" mb={4}>AI Model</Heading>
            <VStack align="stretch" spacing={3}>
              <FormControl display="flex" alignItems="center" mb={4}>
                <FormLabel mb="0">Enable AI Assistance</FormLabel>
                <Switch defaultChecked />
              </FormControl>
              <Box p={4} bg={colorMode === 'light' ? 'gray.50' : 'gray.700'} borderRadius="md">
                <Text fontWeight="medium" mb={3}>Local Model Information</Text>
                <VStack align="stretch" spacing={2}>
                  <Flex justify="space-between" align="center">
                    <Text>Model Name</Text>
                    <Badge colorScheme="brand">{modelInfo.name}</Badge>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Text>Size</Text>
                    <Badge colorScheme="purple">{modelInfo.size}</Badge>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Text>Status</Text>
                    <Badge colorScheme={modelInfo.status === 'loaded' ? 'green' : 'yellow'}>
                      {modelInfo.status}
                    </Badge>
                  </Flex>
                </VStack>
              </Box>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">High Performance Mode</FormLabel>
                <Switch />
              </FormControl>
            </VStack>
          </Box>

          <Box>
            <Heading size="md" mb={4}>Storage</Heading>
            <Text mb={2}>Used Storage: 245 MB</Text>
            <Text mb={2}>Available Storage: 1.2 GB</Text>
          </Box>

          <Box>
            <Heading size="md" mb={4}>Data Management</Heading>
            <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
              Your data is stored locally on your device. No internet connection is required.
            </Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  )
}

export default Settings 