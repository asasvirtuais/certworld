"use client"

import { useState } from "react"
import { Check, FileText, BookOpen } from "lucide-react"
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Circle,
  List,
} from "@chakra-ui/react"

interface Lesson {
  id: string
  titleEn: string
  titleEs: string
  completed: boolean
  type: "lesson" | "quiz"
}

interface Section {
  id: string
  titleEn: string
  titleEs: string
  lessons: Lesson[]
}

const courseData: Section[] = [
  {
    id: "intro",
    titleEn: "INTRODUCTION TO LEARNING",
    titleEs: "INTRODUCCIÓN AL APRENDIZAJE",
    lessons: [
      {
        id: "what-is-learning",
        titleEn: "What is Learning?",
        titleEs: "¿Qué es el Aprendizaje?",
        completed: true,
        type: "lesson",
      },
      {
        id: "learning-styles",
        titleEn: "Learning Styles and Preferences",
        titleEs: "Estilos y Preferencias de Aprendizaje",
        completed: true,
        type: "lesson",
      },
      {
        id: "module-quiz-1",
        titleEn: "Module Quiz",
        titleEs: "Examen del Módulo",
        completed: true,
        type: "quiz",
      },
    ],
  },
  {
    id: "memory",
    titleEn: "MEMORY AND RETENTION",
    titleEs: "MEMORIA Y RETENCIÓN",
    lessons: [
      {
        id: "how-memory-works",
        titleEn: "How Memory Works",
        titleEs: "Cómo Funciona la Memoria",
        completed: true,
        type: "lesson",
      },
      {
        id: "retention-techniques",
        titleEn: "Techniques for Better Retention",
        titleEs: "Técnicas para Mejor Retención",
        completed: false,
        type: "lesson",
      },
      {
        id: "module-quiz-2",
        titleEn: "Module Quiz",
        titleEs: "Examen del Módulo",
        completed: false,
        type: "quiz",
      },
    ],
  },
]

export function Course() {
  const [selectedLesson, setSelectedLesson] = useState("what-is-learning")

  const getCurrentLesson = () => {
    for (const section of courseData) {
      const lesson = section.lessons.find((l) => l.id === selectedLesson)
      if (lesson) return lesson
    }
    return courseData[0].lessons[0]
  }

  const currentLesson = getCurrentLesson()

  return (
    <Flex h="100vh" bg="gray.50">
      {/* Sidebar */}
      <Box w="80" bg="white" borderRight="1px" borderColor="gray.200" overflowY="auto">
        <Box p={4} borderBottom="1px" borderColor="gray.200">
          <Text fontSize="sm" color="gray.500" mb={1}>{"<Course Name English>"}</Text>
          <Text fontSize="sm" color="gray.500">{"<Course Name Spanish>"}</Text>
        </Box>

        <Box p={4}>
          {courseData.map((section) => (
            <Box key={section.id} mb={6}>
              <Heading
                size="sm"
                fontWeight="semibold"
                color="gray.700"
                mb={3}
                textTransform="uppercase"
                letterSpacing="wide"
              >
                {section.titleEn} | {section.titleEs}
              </Heading>

              <Stack gap={2}>
                {section.lessons.map((lesson) => (
                  <Button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson.id)}
                    variant="outline"
                    w="full"
                    textAlign="left"
                    p={3}
                    borderRadius="lg"
                    border="1px"
                    transition="colors"
                    bg={selectedLesson === lesson.id ? "blue.50" : "white"}
                    borderColor={selectedLesson === lesson.id ? "blue.200" : "gray.200"}
                    _hover={{ bg: selectedLesson === lesson.id ? "blue.50" : "gray.50" }}
                    height="auto"
                  >
                    <Flex align="start" gap={3} w="full">
                      <Box flexShrink={0} mt={0.5}>
                        {lesson.completed ? (
                          <Circle size={5} bg="green.500" color="white">
                            <Check size={12} />
                          </Circle>
                        ) : lesson.type === "quiz" ? (
                          <FileText size={20} color="gray.400" />
                        ) : (
                          <BookOpen size={20} color="gray.400" />
                        )}
                      </Box>
                      <Box flex={1} minW={0} textAlign="left">
                        <Text fontSize="sm" fontWeight="medium" color="gray.900" mb={1}>
                          {lesson.titleEn}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {lesson.titleEs}
                        </Text>
                      </Box>
                    </Flex>
                  </Button>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex={1} overflowY="auto">
        <Container maxW="4xl" p={8}>
          {selectedLesson === "what-is-learning" && (
            <Box>
              <Heading size="xl" fontWeight="bold" color="gray.900" mb={2}>
                What is Learning?
              </Heading>
              <Heading size="lg" fontWeight="semibold" color="blue.600" mb={6}>
                ¿Qué es el Aprendizaje?
              </Heading>

              <Heading size="md" fontWeight="semibold" color="gray.900" mb={2}>
                Understanding the Learning Process
              </Heading>
              <Heading size="sm" fontWeight="medium" color="blue.600" mb={6}>
                Entendiendo el Proceso de Aprendizaje
              </Heading>

              <Stack gap={4} mb={8}>
                <Text color="gray.700" lineHeight="relaxed">
                  Learning is a fundamental human process that allows us to acquire new knowledge, skills, and behaviors
                  through experience, study, or instruction.
                </Text>
                <Text color="blue.600" lineHeight="relaxed">
                  El aprendizaje es un proceso humano fundamental que nos permite adquirir nuevos conocimientos,
                  habilidades y comportamientos a través de la experiencia, el estudio o la instrucción.
                </Text>
              </Stack>

              <List.Root gap={4} mb={8}>
                <List.Item>
                  <Flex align="start" gap={3}>
                    <Circle size={2} bg="gray.400" mt={2} flexShrink={0} />
                    <Box>
                      <Text color="gray.700">Active engagement with material</Text>
                      <Text color="blue.600">Participación activa con el material</Text>
                    </Box>
                  </Flex>
                </List.Item>
                <List.Item>
                  <Flex align="start" gap={3}>
                    <Circle size={2} bg="gray.400" mt={2} flexShrink={0} />
                    <Box>
                      <Text color="gray.700">Practice and repetition</Text>
                      <Text color="blue.600">Práctica y repetición</Text>
                    </Box>
                  </Flex>
                </List.Item>
                <List.Item>
                  <Flex align="start" gap={3}>
                    <Circle size={2} bg="gray.400" mt={2} flexShrink={0} />
                    <Box>
                      <Text color="gray.700">Feedback and reflection</Text>
                      <Text color="blue.600">Retroalimentación y reflexión</Text>
                    </Box>
                  </Flex>
                </List.Item>
                <List.Item>
                  <Flex align="start" gap={3}>
                    <Circle size={2} bg="gray.400" mt={2} flexShrink={0} />
                    <Box>
                      <Text color="gray.700">Application of knowledge</Text>
                      <Text color="blue.600">Aplicación del conocimiento</Text>
                    </Box>
                  </Flex>
                </List.Item>
              </List.Root>

              <Text color="gray.700" lineHeight="relaxed">
                Effective learning requires both cognitive engagement and emotional connection to the subject matter.
              </Text>
            </Box>
          )}

          {selectedLesson !== "what-is-learning" && (
            <Box textAlign="center" py={12}>
              <Heading size="lg" fontWeight="bold" color="gray.900" mb={4}>
                {currentLesson.titleEn}
              </Heading>
              <Heading size="md" color="blue.600" mb={6}>
                {currentLesson.titleEs}
              </Heading>
              <Text color="gray.500">Content for this lesson would be displayed here.</Text>
            </Box>
          )}
        </Container>
      </Box>
    </Flex>
  )
}
