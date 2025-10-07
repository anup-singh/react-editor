// Test file to verify TypeScript conversion of markdownConverter
import {
  htmlToMarkdown,
  markdownToHtml,
  getPlaceholderText,
  convertContent,
  isValidHtml,
  isValidMarkdown,
  detectContentType,
  cleanContent,
  EditorType,
} from "./markdownConverter"

// Test the TypeScript types
const testHtml: string = "<p>Hello <strong>world</strong>!</p>"
const testMarkdown: string = "Hello **world**!"
const editorType: EditorType = "markdown"

// Test function calls with proper typing
const convertedMarkdown: string = htmlToMarkdown(testHtml)
const convertedHtml: string = markdownToHtml(testMarkdown)
const placeholder: string = getPlaceholderText(editorType, "Custom placeholder")
const content: string = convertContent(testHtml, "html", "markdown")

// Test validation functions
const isHtml: boolean = isValidHtml(testHtml)
const isMd: boolean = isValidMarkdown(testMarkdown)
const detectedType: EditorType = detectContentType(testHtml)
const cleanedContent: string = cleanContent(testHtml, "markdown")

// Log results to verify functionality
console.log("TypeScript conversion test results:")
console.log("Original HTML:", testHtml)
console.log("Converted to Markdown:", convertedMarkdown)
console.log("Original Markdown:", testMarkdown)
console.log("Converted to HTML:", convertedHtml)
console.log("Placeholder text:", placeholder)
console.log("Content conversion result:", content)
console.log("Is valid HTML:", isHtml)
console.log("Is valid Markdown:", isMd)
console.log("Detected content type:", detectedType)
console.log("Cleaned content:", cleanedContent)

export default {
  convertedMarkdown,
  convertedHtml,
  placeholder,
  content,
  isHtml,
  isMd,
  detectedType,
  cleanedContent,
}
