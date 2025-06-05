// stories/Course.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs'
import { Certificate, Course, Courses, Dashboard, Landing, Welcome } from '@/components/layout'
import { Box, Badge, Progress } from '@chakra-ui/react'

const meta: Meta = {
  title: 'Cert World/Layout',
  component: Welcome,
}

type Story = StoryObj<typeof meta>

export default meta

// Method 1: Using render function
export const WelcomeStory: Story = {
  render: () => (
    <Welcome/>
  )
}

// Method 2: More complex dynamic content
export const LandingPage: Story = {
  render: () => (
    <Landing/>
  )
}

export const DashboardStory: Story = {
  render: () => {
    return (
      <Dashboard/>
    )
  }
}

export const CoursesStory: Story = {
  render: () => (
    <Courses/>
  )
}

export const CourseStory: Story = {
  render: () => (
    <Course/>
  )
}

export const CertificateStory: Story = {
  render: () => (
    <Certificate/>
  )
}