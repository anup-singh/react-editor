// Markdown to HTML and HTML to Markdown converter utilities using marked and turndown libraries
import { marked } from "marked"
import TurndownService from "turndown"

// Initialize turndown service for HTML to Markdown conversion
const turndownService = new TurndownService({
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

// Convert HTML to Markdown using turndown
export const htmlToMarkdown = html => {
  if (!html || typeof html !== "string") return ""

  try {
    return turndownService.turndown(html)
  } catch (error) {
    console.warn("Error converting HTML to Markdown:", error)
    return html // Return original HTML if conversion fails
  }
}

// Convert Markdown to HTML using marked
export const markdownToHtml = markdown => {
  if (!markdown || typeof markdown !== "string") return ""

  try {
    return marked.parse(markdown)
  } catch (error) {
    console.warn("Error converting Markdown to HTML:", error)
    return markdown // Return original markdown if conversion fails
  }
}

// Get appropriate placeholder text based on editor type
export const getPlaceholderText = (editorType, customPlaceholder) => {
  if (customPlaceholder) return customPlaceholder

  return editorType === "markdown"
    ? "Start writing in Markdown..."
    : "Start writing..."
}

// Convert content based on editor type transition
export const convertContent = (content, fromType, toType) => {
  if (fromType === toType) return content

  if (fromType === "html" && toType === "markdown") {
    return htmlToMarkdown(content)
  }

  if (fromType === "markdown" && toType === "html") {
    return markdownToHtml(content)
  }

  return content
}
