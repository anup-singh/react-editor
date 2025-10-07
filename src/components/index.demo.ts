// Test file to verify TypeScript conversion of components index
import {
  PreviewPane,
  TypeScriptExample,
  ComponentName,
  TypeScriptComponentName,
  JavaScriptComponentName,
  MigrationStatus,
  getTypeScriptComponentNames,
  getJavaScriptComponentNames,
  getAllComponentNames,
  isTypeScriptComponent,
  isJavaScriptComponent,
  isValidComponentName,
  getComponentMigrationStatus,
  getComponentsByStatus,
  getMigrationProgress,
  MIGRATION_NOTES,
  USAGE_EXAMPLE,
} from "./index"

// Test TypeScript types
const validComponentName: ComponentName = "PreviewPane"
const tsComponentName: TypeScriptComponentName = "TypeScriptExample"
const jsComponentName: JavaScriptComponentName = "FloatingToolbar"
const migrationStatus: MigrationStatus = "typescript"

// Test component imports
const previewPane = PreviewPane
const tsExample = TypeScriptExample

// Test helper functions
const tsComponents: TypeScriptComponentName[] = getTypeScriptComponentNames()
const jsComponents: JavaScriptComponentName[] = getJavaScriptComponentNames()
const allComponents: ComponentName[] = getAllComponentNames()

// Test type guard functions
const isTs: boolean = isTypeScriptComponent("PreviewPane") // true
const isJs: boolean = isJavaScriptComponent("Toolbar") // true
const isValid: boolean = isValidComponentName("PreviewPane") // true
const isInvalid: boolean = isValidComponentName("InvalidComponent") // false

// Test migration status functions
const previewStatus: MigrationStatus =
  getComponentMigrationStatus("PreviewPane") // 'typescript'
const toolbarStatus: MigrationStatus = getComponentMigrationStatus("Toolbar") // 'js-with-ts-syntax'

// Test migration progress
const progress = getMigrationProgress()
console.log("Migration Progress:", progress)

// Test getting components by status
const typescriptComponents = getComponentsByStatus("typescript")
const javascriptComponents = getComponentsByStatus("javascript")
const mixedComponents = getComponentsByStatus("js-with-ts-syntax")

// Test migration notes and usage example
console.log("Migration Notes:", MIGRATION_NOTES)
console.log("Usage Example:", USAGE_EXAMPLE)

// Example usage demonstration
const demonstrateUsage = () => {
  console.log("TypeScript Components:", tsComponents)
  console.log("JavaScript Components:", jsComponents)
  console.log("All Components:", allComponents)

  console.log("Component Status Checks:")
  console.log("PreviewPane is TypeScript:", isTs)
  console.log("Toolbar is JavaScript:", isJavaScriptComponent("Toolbar"))

  console.log("Migration Status:")
  console.log("PreviewPane status:", previewStatus)
  console.log("Toolbar status:", toolbarStatus)

  console.log("Components by Status:")
  console.log("TypeScript:", typescriptComponents)
  console.log("JavaScript:", javascriptComponents)
  console.log("Mixed (TS syntax in JS files):", mixedComponents)

  console.log("Overall Progress:", progress)
}

// Export test data for verification
export const testData = {
  validComponentName,
  tsComponentName,
  jsComponentName,
  migrationStatus,
  previewPane,
  tsExample,
  tsComponents,
  jsComponents,
  allComponents,
  isTs,
  isJs,
  isValid,
  isInvalid,
  previewStatus,
  toolbarStatus,
  progress,
  typescriptComponents,
  javascriptComponents,
  mixedComponents,
}

export { demonstrateUsage }
export default testData
