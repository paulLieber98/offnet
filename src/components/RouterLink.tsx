import { Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { forwardRef } from 'react'

export const RouterLink = forwardRef((props: any, ref) => (
  <ChakraLink as={ReactRouterLink} ref={ref} {...props} />
)) 