// stories/Course.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs'
import * as Layouts from '@/components/layout'
import { Box, Badge, Progress } from '@chakra-ui/react'
import { Header as HeaderComponent } from '@/components/ui'

const meta: Meta = {
  title: 'Cert World/Layouts'
}

type Story = StoryObj<typeof meta>

export default meta

// Method 1: Using render function
export const Welcome: Story = {
  render: () => (
    <Layouts.WelcomeLayout>
      <Layouts.WelcomeContent name='Demo User' />
    </Layouts.WelcomeLayout>
  )
}

export const Header: Story = {
  render: () => (
    <HeaderComponent/>
  )
}

// Method 2: More complex dynamic content
export const Landing: Story = {
  render: () => (
    <Layouts.Landing/>
  )
}

export const Dashboard: Story = {
  render: () => {
    return (
      <Layouts.Dashboard/>
    )
  }
}

export const Courses: Story = {
  render: () => (
    <Layouts.CoursesLayout/>
  )
}

export const Certificate: Story = {
  render: () => (
    <Layouts.Certificate/>
  )
}