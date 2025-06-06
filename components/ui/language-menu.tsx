"use client"

import { Globe } from "lucide-react"
import {
  Button,
  Text,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItemCommand,
} from "@chakra-ui/react"

interface LanguageMenuProps {
  currentLanguage?: "EN" | "ES"
  onLanguageChange?: (language: "EN" | "ES") => void
}

export function LanguageMenu({ 
  currentLanguage = "EN", 
  onLanguageChange 
}: LanguageMenuProps) {
  return (
    <MenuRoot>
      <MenuTrigger>
        <Button variant="ghost" size="sm">
          <Globe size={20} />
          <Text ml={2} fontSize="sm">{currentLanguage}</Text>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItemCommand 
          cursor="pointer"
          onClick={() => onLanguageChange?.("EN")}
        >
          EN
        </MenuItemCommand>
        <MenuItemCommand 
          cursor="pointer"
          onClick={() => onLanguageChange?.("ES")}
        >
          ES
        </MenuItemCommand>
      </MenuContent>
    </MenuRoot>
  )
}