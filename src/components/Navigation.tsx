import { Box, Flex, Button, useColorMode, IconButton, Container, HStack } from '@chakra-ui/react'
import { RouterLink } from './RouterLink'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.700'
  const activeColor = 'brand.500'

  const NavButton = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Button
      as={RouterLink}
      to={to}
      variant="ghost"
      size="md"
      px={4}
      fontWeight="medium"
      _hover={{
        bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
        color: activeColor,
      }}
      _active={{
        bg: colorMode === 'light' ? 'gray.200' : 'gray.600',
        color: activeColor,
      }}
    >
      {children}
    </Button>
  )

  return (
    <Box
      w="100%"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
      backgroundColor={colorMode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(26, 32, 44, 0.8)'}
    >
      <Container maxW="8xl" mx="auto" py={3} px={4}>
        <Flex justify="space-between" align="center">
          <Flex gap={8} align="center">
            <RouterLink
              to="/"
              fontSize="2xl"
              fontWeight="bold"
              color={colorMode === 'light' ? 'brand.600' : 'brand.300'}
              _hover={{
                textDecoration: 'none',
                color: 'brand.500',
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s"
            >
              Offnet
            </RouterLink>
            
            <HStack spacing={2}>
              <NavButton to="/">Dashboard</NavButton>
              <NavButton to="/learn/intro">Learn</NavButton>
              <NavButton to="/profile">Profile</NavButton>
              <NavButton to="/settings">Settings</NavButton>
            </HStack>
          </Flex>
          
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="md"
            _hover={{
              bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
              transform: 'rotate(360deg)',
            }}
            transition="all 0.5s"
          />
        </Flex>
      </Container>
    </Box>
  )
}

export default Navigation 