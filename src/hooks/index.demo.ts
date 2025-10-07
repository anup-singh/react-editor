// Test file to verify TypeScript conversion of hooks index
import {
  HookName,
  HookCategory,
  HookMigrationStatus,
  HookMetadata,
  getAllHookNames,
  getHooksByCategory,
  getHooksByStatus,
  isValidHookName,
  getHookMetadata,
  getHookMigrationProgress,
  getHooksOrganizedByCategory,
  hookRegistry,
  HOOK_USAGE_NOTES,
  // HOOK_USAGE_EXAMPLE,
  HOOK_CATEGORIES,
} from "./index"

// Test TypeScript types
const validHookName: HookName = "useEditorContent"
const hookCategory: HookCategory = "content"
const migrationStatus: HookMigrationStatus = "javascript"

// Test hook metadata
const editorContentMeta: HookMetadata = {
  name: "useEditorContent",
  category: "content",
  status: "javascript",
  description: "Test hook",
  returnType: "EditorContentState",
  parameters: ["initialContent?"],
}

// Test helper functions
const allHooks: HookName[] = getAllHookNames()
const contentHooks: HookName[] = getHooksByCategory("content")
const jsHooks: HookName[] = getHooksByStatus("javascript")
const tsHooks: HookName[] = getHooksByStatus("typescript")

// Test type guard functions
const isValidUseEditor: boolean = isValidHookName("useEditorContent") // true
const isValidInvalid: boolean = isValidHookName("useInvalidHook") // false

// Test metadata retrieval
const metadata: HookMetadata = getHookMetadata("useEditorContent")

// Test migration progress
const progress = getHookMigrationProgress()

// Test organized hooks
const organizedHooks = getHooksOrganizedByCategory()

// Test hook registry access
const registryKeys = Object.keys(hookRegistry) as HookName[]

// Demonstration function
const demonstrateHookUtils = () => {
  console.log("All Hooks:", allHooks)
  console.log("Content Hooks:", contentHooks)
  console.log("JavaScript Hooks:", jsHooks)
  console.log("TypeScript Hooks:", tsHooks)

  console.log("Hook Validation:")
  console.log("useEditorContent is valid:", isValidUseEditor)
  console.log("useInvalidHook is valid:", isValidInvalid)

  console.log("Hook Metadata:")
  console.log("useEditorContent metadata:", metadata)

  console.log("Migration Progress:", progress)

  console.log("Hooks by Category:")
  Object.entries(organizedHooks).forEach(([category, hooks]) => {
    console.log(`${category}:`, hooks)
  })

  console.log("Hook Categories Description:", HOOK_CATEGORIES)
  console.log("Usage Notes:", HOOK_USAGE_NOTES)
}

// Test hook categories
const testCategories: HookCategory[] = [
  "content",
  "ui",
  "commands",
  "file",
  "preview",
]
testCategories.forEach(category => {
  const categoryHooks = getHooksByCategory(category)
  console.log(`Category ${category} has ${categoryHooks.length} hooks`)
})

// Test validation of all hooks in registry
const allRegistryHooks = Object.keys(hookRegistry) as HookName[]
allRegistryHooks.forEach(hookName => {
  const isValid = isValidHookName(hookName)
  const metadata = getHookMetadata(hookName)
  console.log(
    `Hook ${hookName}: valid=${isValid}, category=${metadata.category}`
  )
})

// Export test data for verification
export const testData = {
  validHookName,
  hookCategory,
  migrationStatus,
  editorContentMeta,
  allHooks,
  contentHooks,
  jsHooks,
  tsHooks,
  isValidUseEditor,
  isValidInvalid,
  metadata,
  progress,
  organizedHooks,
  registryKeys,
  testCategories,
  allRegistryHooks,
}

export { demonstrateHookUtils }
export default testData
