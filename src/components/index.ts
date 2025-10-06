// Component exports for React Content Editor
// This file serves as the main entry point for TypeScript-converted components

// TypeScript-converted components
export { default as PreviewPane } from "./PreviewPane"
export type { PreviewPaneProps } from "./PreviewPane"

export { default as Toolbar } from "./Toolbar"

// TypeScript examples and utilities
export { default as TypeScriptExample } from "./TypeScriptExample"

// Component names that are available (both JS and TS)
export type ComponentName =
  | "Toolbar"
  | "FloatingToolbar"
  | "FileUpload"
  | "EditorContent"
  | "PreviewPane"
  | "TypeScriptExample"

// TypeScript-safe component names (only TS converted components)
export type TypeScriptComponentName =
  | "PreviewPane"
  | "Toolbar"
  | "TypeScriptExample"

// JavaScript component names (not yet converted)
export type JavaScriptComponentName =
  | "FloatingToolbar"
  | "FileUpload"
  | "EditorContent"

// Helper function to get TypeScript component names
export const getTypeScriptComponentNames = (): TypeScriptComponentName[] => {
  return ["PreviewPane", "Toolbar", "TypeScriptExample"]
}

// Helper function to get JavaScript component names
export const getJavaScriptComponentNames = (): JavaScriptComponentName[] => {
  return ["FloatingToolbar", "FileUpload", "EditorContent"]
}

// Helper function to get all component names
export const getAllComponentNames = (): ComponentName[] => {
  return [...getJavaScriptComponentNames(), ...getTypeScriptComponentNames()]
}

// Helper function to check if a component is TypeScript-converted
export const isTypeScriptComponent = (
  name: string
): name is TypeScriptComponentName => {
  return getTypeScriptComponentNames().includes(name as TypeScriptComponentName)
}

// Helper function to check if a component is JavaScript
export const isJavaScriptComponent = (
  name: string
): name is JavaScriptComponentName => {
  return getJavaScriptComponentNames().includes(name as JavaScriptComponentName)
}

// Helper function to check if a component name is valid
export const isValidComponentName = (name: string): name is ComponentName => {
  return getAllComponentNames().includes(name as ComponentName)
}

// Note: Component registry removed due to TypeScript export complexity
// Components can be imported directly from their respective files

/**
 * Migration status tracker for components
 */
export const componentMigrationStatus = {
  Toolbar: "typescript", // ✅ Converted (was js-with-ts-syntax)
  FloatingToolbar: "javascript",
  FileUpload: "javascript",
  EditorContent: "javascript",
  PreviewPane: "typescript", // ✅ Converted
  TypeScriptExample: "typescript", // ✅ Native TS
} as const

export type MigrationStatus = "javascript" | "typescript" | "js-with-ts-syntax"

// Helper to check migration status
export const getComponentMigrationStatus = (
  componentName: ComponentName
): MigrationStatus => {
  return componentMigrationStatus[componentName]
}

// Get components by migration status
export const getComponentsByStatus = (
  status: MigrationStatus
): ComponentName[] => {
  return Object.entries(componentMigrationStatus)
    .filter(([, componentStatus]) => componentStatus === status)
    .map(([name]) => name as ComponentName)
}

// Helper to get migration progress
export const getMigrationProgress = (): {
  total: number
  converted: number
  percentage: number
  remaining: ComponentName[]
} => {
  const total = getAllComponentNames().length
  const converted = getTypeScriptComponentNames().length
  const percentage = Math.round((converted / total) * 100)
  const remaining = getComponentsByStatus("javascript").concat(
    getComponentsByStatus("js-with-ts-syntax")
  )

  return {
    total,
    converted,
    percentage,
    remaining,
  }
}

// Usage instructions for mixed JS/TS environment
export const MIGRATION_NOTES = {
  typescript:
    "These components are fully converted to TypeScript and can be imported safely.",
  javascript:
    "These components are still in JavaScript and should be imported from their individual files.",
  "js-with-ts-syntax":
    "These components have TypeScript syntax but .js extensions and may cause compilation issues.",
} as const

// Export usage example
export const USAGE_EXAMPLE = `
// Import TypeScript components safely:
import { PreviewPane, TypeScriptExample } from '@/components';

// Import JavaScript components directly:
import Toolbar from '@/components/Toolbar';
import FileUpload from '@/components/FileUpload';

// Check migration status:
import { getMigrationProgress, getComponentMigrationStatus } from '@/components';
console.log(getMigrationProgress());
console.log(getComponentMigrationStatus('PreviewPane')); // 'typescript'
` as const
