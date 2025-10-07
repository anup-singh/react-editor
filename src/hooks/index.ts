// Hook exports for React Content Editor
// This file serves as the main entry point for all custom hooks

import {
  HookName,
  HookCategory,
  HookMigrationStatus,
  HookMetadata,
} from "@/types"

// Core editor hooks - currently JavaScript files
// Note: These hooks are still in JavaScript format and may be converted later

/**
 * Re-export hooks for easier consumption
 * Using dynamic imports to handle JavaScript files safely in TypeScript environment
 */

/**
 * Hook registry with metadata
 */
export const hookRegistry: Record<HookName, HookMetadata> = {
  useEditorContent: {
    name: "useEditorContent",
    category: "content",
    status: "javascript",
    description: "Manages editor content state and operations",
    returnType: "EditorContentState",
    parameters: ["initialContent?", "config?"],
  },
  useFloatingToolbar: {
    name: "useFloatingToolbar",
    category: "ui",
    status: "javascript",
    description: "Handles floating toolbar positioning and visibility",
    returnType: "FloatingToolbarState",
    parameters: ["targetRef", "options?"],
  },
  useEditorCommands: {
    name: "useEditorCommands",
    category: "commands",
    status: "javascript",
    description: "Provides editor command functions (bold, italic, etc.)",
    returnType: "EditorCommands",
    parameters: ["editorRef"],
  },
  useFileUpload: {
    name: "useFileUpload",
    category: "file",
    status: "javascript",
    description: "Manages file upload functionality",
    returnType: "FileUploadState",
    parameters: ["uploadConfig?"],
  },
  usePreview: {
    name: "usePreview",
    category: "preview",
    status: "javascript",
    description: "Controls preview pane functionality",
    returnType: "PreviewState",
    parameters: ["content", "editorType"],
  },
} as const

// Helper functions for hook management

/**
 * Get all available hook names
 */
export const getAllHookNames = (): HookName[] => {
  return Object.keys(hookRegistry) as HookName[]
}

/**
 * Get hooks by category
 */
export const getHooksByCategory = (category: HookCategory): HookName[] => {
  return Object.entries(hookRegistry)
    .filter(([, metadata]) => metadata.category === category)
    .map(([name]) => name as HookName)
}

/**
 * Get hooks by migration status
 */
export const getHooksByStatus = (status: HookMigrationStatus): HookName[] => {
  return Object.entries(hookRegistry)
    .filter(([, metadata]) => metadata.status === status)
    .map(([name]) => name as HookName)
}

/**
 * Check if a hook name is valid
 */
export const isValidHookName = (name: string): name is HookName => {
  return getAllHookNames().includes(name as HookName)
}

/**
 * Get hook metadata by name
 */
export const getHookMetadata = (hookName: HookName): HookMetadata => {
  return hookRegistry[hookName]
}

/**
 * Get migration progress for hooks
 */
export const getHookMigrationProgress = (): {
  total: number
  converted: number
  percentage: number
  remaining: HookName[]
} => {
  const total = getAllHookNames().length
  const converted = getHooksByStatus("typescript").length
  const percentage = Math.round((converted / total) * 100)
  const remaining = getHooksByStatus("javascript")

  return {
    total,
    converted,
    percentage,
    remaining,
  }
}

/**
 * Get hooks organized by category
 */
export const getHooksOrganizedByCategory = (): Record<
  HookCategory,
  HookName[]
> => {
  return {
    content: getHooksByCategory("content"),
    ui: getHooksByCategory("ui"),
    commands: getHooksByCategory("commands"),
    file: getHooksByCategory("file"),
    preview: getHooksByCategory("preview"),
  }
}

/**
 * Dynamic import helper for JavaScript hooks
 * Note: Removed direct exports to avoid TypeScript compilation issues
 * Import hooks directly from their individual files until they're converted to TypeScript
 */

// Note: Dynamic imports removed due to TypeScript export complexity
// Use direct imports from individual hook files instead:
// import { useEditorContent } from './useEditorContent';
// import { useFloatingToolbar } from './useFloatingToolbar';
// etc.

// Usage instructions for mixed JS/TS environment
export const HOOK_USAGE_NOTES = {
  javascript:
    "These hooks are still in JavaScript and should be imported from their individual files.",
  typescript:
    "These hooks are converted to TypeScript and can be imported safely with full type support.",
} as const

// Export usage example
export const HOOK_USAGE_EXAMPLE = `
// Current usage (JavaScript hooks):
import { useEditorContent } from '@/hooks/useEditorContent';
import { useFloatingToolbar } from '@/hooks/useFloatingToolbar';

// Check hook information:
import { getHookMetadata, getHookMigrationProgress } from '@/hooks';
console.log(getHookMetadata('useEditorContent'));
console.log(getHookMigrationProgress());

// Get hooks by category:
import { getHooksByCategory } from '@/hooks';
const contentHooks = getHooksByCategory('content'); // ['useEditorContent']
const uiHooks = getHooksByCategory('ui'); // ['useFloatingToolbar']
` as const

// Hook categories description
export const HOOK_CATEGORIES = {
  content:
    "Hooks for managing editor content, state, and content-related operations",
  ui: "Hooks for UI interactions, positioning, and visual feedback",
  commands: "Hooks providing editor command functions and shortcuts",
  file: "Hooks for file handling, upload, and media management",
  preview: "Hooks for preview functionality and content rendering",
} as const
