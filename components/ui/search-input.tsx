"use client"

import { Search } from "lucide-react"
import {
  Input,
  InputElement,
} from "@chakra-ui/react"

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  maxWidth?: string
}

export function SearchInput({ 
  placeholder = "Search...", 
  value, 
  onChange,
  maxWidth = "md"
}: SearchInputProps) {
  return (
    <>
      <InputElement pointerEvents="none">
        <Search color="gray.400" size={16} />
      </InputElement>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        pl={10}
        maxW={maxWidth}
      />
    </>
  )
}