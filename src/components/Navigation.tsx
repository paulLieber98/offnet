import { Box, Flex, Button, useColorMode, IconButton } from '@chakra-ui/react'
import { RouterLink } from './RouterLink'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700'

  return (
    <Box bg={bgColor} borderBottom="1px" borderColor={borderColor} py={2} position="sticky" top={0} zIndex={1000}>
      <Flex maxW="container.xl" mx="auto" px={4} justify="space-between" align="center">
        <Flex gap={8} align="center">
          <RouterLink
            to="/"
            fontSize="xl"
            fontWeight="bold"
            color={colorMode === 'light' ? 'brand.600' : 'brand.300'}
            _hover={{ textDecoration: 'none', color: 'brand.500' }}
          >
            Offnet
          </RouterLink>
          <Flex gap={4}>
            <Button as={RouterLink} to="/" variant="ghost" size="sm">
              Dashboard
            </Button>
            <Button as={RouterLink} to="/learn/intro" variant="ghost" size="sm">
              Learn
            </Button>
            <Button as={RouterLink} to="/profile" variant="ghost" size="sm">
              Profile
            </Button>
            <Button as={RouterLink} to="/settings" variant="ghost" size="sm">
              Settings
            </Button>
          </Flex>
        </Flex>
        
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          size="sm"
        />
      </Flex>
    </Box>
  )
}

export default Navigation 