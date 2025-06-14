import { Container as ChakraContainer, ContainerProps } from '@chakra-ui/react/container'
import { PropsWithChildren } from 'react'

export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({ children, ...props }) => (
    <ChakraContainer {...props}>{children}</ChakraContainer>
)