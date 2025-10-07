// Markdown to HTML and HTML to Markdown converter utilities using marked and turndown libraries
// eslint-disable-next-line @typescript-eslint/no-require-imports
const marked = require("marked")
// eslint-disable-next-line @typescript-eslint/no-require-imports
const TurndownService = require("turndown").default || require("turndown")

// Editor types
export type EditorType = "html" | "markdown"

// Converter options interface
export interface ConverterOptions {
  headingStyle?: "atx" | "setext"
  hr?: string
  bulletListMarker?: "-" | "*" | "+"
  codeBlockStyle?: "indented" | "fenced"
  fence?: string
  emDelimiter?: "_" | "*"
  strongDelimiter?: "**" | "__"
  linkStyle?: "inlined" | "referenced"
  linkReferenceStyle?: "full" | "collapsed" | "shortcut"
}

// Marked configuration options
export interface MarkedOptions {
  breaks?: boolean
  gfm?: boolean
  sanitize?: boolean
  smartLists?: boolean
  smartypants?: boolean
  xhtml?: boolean
}

// Initialize turndown service for HTML to Markdown conversion
const turndownService = new (TurndownService.default || TurndownService)({
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  fence: "```",
  emDelimiter: "*",
  strongDelimiter: "**",
  linkStyle: "inlined",
  linkReferenceStyle: "full",
})

// Configure marked options for better HTML output
marked.setOptions({
  breaks: true,
  gfm: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: true,
})

/**
 * Convert HTML to Markdown using turndown
 * @param html - The HTML string to convert
 * @returns The converted Markdown string
 */
export const htmlToMarkdown = (html: string): string => {
  if (!html || typeof html !== "string") return ""

  try {
    return turndownService.turndown(html)
  } catch (error) {
    console.warn("Error converting HTML to Markdown:", error)
    return html // Return original HTML if conversion fails
  }
}

/**
 * Convert Markdown to HTML using marked
 * @param markdown - The Markdown string to convert
 * @returns The converted HTML string
 */
export const markdownToHtml = (markdown: string): string => {
  if (!markdown || typeof markdown !== "string") return ""

  try {
    return marked.parse(markdown) as string
  } catch (error) {
    console.warn("Error converting Markdown to HTML:", error)
    return markdown // Return original markdown if conversion fails
  }
}

/**
 * Get appropriate placeholder text based on editor type
 * @param editorType - The type of editor (html or markdown)
 * @param customPlaceholder - Optional custom placeholder text
 * @returns The appropriate placeholder text
 */
export const getPlaceholderText = (
  editorType: EditorType,
  customPlaceholder?: string
): string => {
  if (customPlaceholder) return customPlaceholder

  return editorType === "markdown"
    ? "Start writing in Markdown..."
    : "Start writing..."
}

/**
 * Convert content based on editor type transition
 * @param content - The content to convert
 * @param fromType - The source editor type
 * @param toType - The target editor type
 * @returns The converted content
 */
export const convertContent = (
  content: string,
  fromType: EditorType,
  toType: EditorType
): string => {
  if (fromType === toType) return content

  if (fromType === "html" && toType === "markdown") {
    return htmlToMarkdown(content)
  }

  if (fromType === "markdown" && toType === "html") {
    return markdownToHtml(content)
  }

  return content
}

/**
 * Validate if content is valid HTML
 * @param content - The content to validate
 * @returns Boolean indicating if the content is valid HTML
 */
export const isValidHtml = (content: string): boolean => {
  if (!content || typeof content !== "string") return false

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, "text/html")
    return !doc.querySelector("parsererror")
  } catch {
    return false
  }
}

/**
 * Validate if content is valid Markdown
 * @param content - The content to validate
 * @returns Boolean indicating if the content is valid Markdown
 */
export const isValidMarkdown = (content: string): boolean => {
  if (!content || typeof content !== "string") return false

  try {
    // Try to parse the markdown
    marked.parse(content)
    return true
  } catch {
    return false
  }
}

/**
 * Detect the probable content type based on content analysis
 * @param content - The content to analyze
 * @returns The detected editor type
 */
export const detectContentType = (content: string): EditorType => {
  if (!content || typeof content !== "string") return "html"

  // Check for common HTML tags
  const htmlTagRegex = /<\/?[a-z][\s\S]*>/i
  const hasHtmlTags = htmlTagRegex.test(content)

  // Check for common Markdown syntax
  const markdownRegex = /^(#{1,6}\s|[*\-+]\s|\d+\.\s|>\s|```|\*\*|\*|____|~~)/m
  const hasMarkdownSyntax = markdownRegex.test(content)

  // If content has HTML tags but no markdown syntax, it's likely HTML
  if (hasHtmlTags && !hasMarkdownSyntax) {
    return "html"
  }

  // If content has markdown syntax but no HTML tags, it's likely Markdown
  if (hasMarkdownSyntax && !hasHtmlTags) {
    return "markdown"
  }

  // Default to HTML for mixed or unclear content
  return "html"
}

/**
 * Clean and normalize content for the specified editor type
 * @param content - The content to clean
 * @param editorType - The target editor type
 * @returns The cleaned content
 */
export const cleanContent = (
  content: string,
  editorType: EditorType
): string => {
  if (!content || typeof content !== "string") return ""

  if (editorType === "markdown") {
    // Clean HTML and convert to markdown if needed
    return htmlToMarkdown(content)
  } else {
    // For HTML, ensure it's properly formatted
    return content.trim()
  }
}

// Default export with all utilities
export default {
  htmlToMarkdown,
  markdownToHtml,
  getPlaceholderText,
  convertContent,
  isValidHtml,
  isValidMarkdown,
  detectContentType,
  cleanContent,
} as const
