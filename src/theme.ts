import { extendTheme, type ThemeConfig, type ThemeComponents } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const styles = {
  global: (props: { colorMode: 'light' | 'dark' }) => ({
    'html, body': {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    body: {
      bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
      color: props.colorMode === 'light' ? 'gray.900' : 'white',
    },
    '#root': {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
  }),
}

const components: ThemeComponents = {
  Container: {
    baseStyle: {
      maxW: '8xl',
      px: { base: 4, md: 6, lg: 8 },
    },
  },
  Button: {
    defaultProps: {
      colorScheme: 'brand',
    },
  },
}

const colors = {
  brand: {
    50: '#E6F6FF',
    100: '#BAE3FF',
    200: '#7CC4FA',
    300: '#47A3F3',
    400: '#2186EB',
    500: '#0967D2',
    600: '#0552B5',
    700: '#03449E',
    800: '#01337D',
    900: '#002159',
  },
}

const theme = extendTheme({
  config,
  styles,
  colors,
  components,
})

export default theme 