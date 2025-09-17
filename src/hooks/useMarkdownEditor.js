import { useCallback } from "react"
import { markdownToHtml, htmlToMarkdown } from "../utils/markdownConverter"

const useMarkdownEditor = (editorRef, editorType, onContentChange) => {
  const isMarkdown = editorType === "markdown"
  // const lastHtmlContent = useRef("")

  // Handle markdown-specific key shortcuts
  const handleMarkdownKeyDown = useCallback(
    e => {
      if (!isMarkdown || !editorRef.current) return

      // Ctrl/Cmd + B for bold
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault()
        insertMarkdownFormatting("**", "**")
        return
      }

      // Ctrl/Cmd + I for italic
      if ((e.ctrlKey || e.metaKey) && e.key === "i") {
        e.preventDefault()
        insertMarkdownFormatting("*", "*")
        return
      }

      // Ctrl/Cmd + K for link
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        insertMarkdownLink()
        return
      }

      // Tab for code block indentation
      if (e.key === "Tab") {
        e.preventDefault()
        insertAtCursor("  ") // 2 spaces for indentation
        return
      }

      // Enter key handling for lists
      if (e.key === "Enter") {
        handleMarkdownEnter(e)
      }
    },
    [isMarkdown]
  )

  // Insert markdown formatting around selection
  const insertMarkdownFormatting = useCallback(
    (before, after) => {
      const selection = window.getSelection()
      if (!selection.rangeCount) return

      const range = selection.getRangeAt(0)
      const selectedText = range.toString()

      const formattedText = before + selectedText + after
      range.deleteContents()
      range.insertNode(document.createTextNode(formattedText))

      // Position cursor
      if (selectedText) {
        // If text was selected, place cursor after the formatting
        range.setStart(range.endContainer, range.endOffset)
      } else {
        // If no text was selected, place cursor between the formatting
        range.setStart(range.endContainer, range.endOffset - after.length)
      }

      selection.removeAllRanges()
      selection.addRange(range)

      // Trigger content change
      if (onContentChange) {
        onContentChange(editorRef)
      }
    },
    [onContentChange]
  )

  // Insert markdown link
  const insertMarkdownLink = useCallback(() => {
    const selection = window.getSelection()
    if (!selection.rangeCount) return

    const range = selection.getRangeAt(0)
    const selectedText = range.toString()

    const linkText = selectedText || "Link text"
    const linkMarkdown = `[${linkText}](url)`

    range.deleteContents()
    range.insertNode(document.createTextNode(linkMarkdown))

    // Select the URL part for easy editing
    const textNode = range.endContainer
    const startOffset = range.endOffset - 4 // Position before 'url)'
    const endOffset = range.endOffset - 1 // Position after 'url'

    range.setStart(textNode, startOffset)
    range.setEnd(textNode, endOffset)
    selection.removeAllRanges()
    selection.addRange(range)

    if (onContentChange) {
      onContentChange(editorRef)
    }
  }, [onContentChange])

  // Insert text at cursor position
  const insertAtCursor = useCallback(
    text => {
      const selection = window.getSelection()
      if (!selection.rangeCount) return

      const range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(document.createTextNode(text))
      range.setStart(range.endContainer, range.endOffset)
      selection.removeAllRanges()
      selection.addRange(range)

      if (onContentChange) {
        onContentChange(editorRef)
      }
    },
    [onContentChange]
  )

  // Handle Enter key for markdown lists
  const handleMarkdownEnter = useCallback(
    e => {
      const selection = window.getSelection()
      if (!selection.rangeCount) return

      const range = selection.getRangeAt(0)
      const textContent = editorRef.current.textContent
      const cursorPosition = range.startOffset

      // Find the current line
      const beforeCursor = textContent.substring(0, cursorPosition)
      const currentLineStart = beforeCursor.lastIndexOf("\n") + 1
      const currentLine = textContent.substring(
        currentLineStart,
        cursorPosition
      )

      // Check if current line is a list item
      const unorderedListMatch = currentLine.match(/^(\s*)([-*+])\s/)
      const orderedListMatch = currentLine.match(/^(\s*)(\d+)\.\s/)

      if (unorderedListMatch) {
        e.preventDefault()
        const [, indent, bullet] = unorderedListMatch
        const newListItem = `\n${indent}${bullet} `
        insertAtCursor(newListItem)
      } else if (orderedListMatch) {
        e.preventDefault()
        const [, indent, number] = orderedListMatch
        const nextNumber = parseInt(number) + 1
        const newListItem = `\n${indent}${nextNumber}. `
        insertAtCursor(newListItem)
      }
    },
    [insertAtCursor]
  )

  // Markdown command handlers
  const markdownCommands = {
    bold: () => insertMarkdownFormatting("**", "**"),
    italic: () => insertMarkdownFormatting("*", "*"),
    strikeThrough: () => insertMarkdownFormatting("~~", "~~"),
    link: insertMarkdownLink,
    heading1: () => insertMarkdownFormatting("# ", ""),
    heading2: () => insertMarkdownFormatting("## ", ""),
    heading3: () => insertMarkdownFormatting("### ", ""),
    insertUnorderedList: () => insertMarkdownFormatting("- ", ""),
    insertOrderedList: () => insertMarkdownFormatting("1. ", ""),
    inlineCode: () => insertMarkdownFormatting("`", "`"),
    codeBlock: () => insertMarkdownFormatting("\n```\n", "\n```\n"),
  }

  // Convert content when editor type changes
  const convertContent = useCallback((content, fromType, toType) => {
    if (fromType === toType) return content

    if (fromType === "html" && toType === "markdown") {
      return htmlToMarkdown(content)
    }

    if (fromType === "markdown" && toType === "html") {
      return markdownToHtml(content)
    }

    return content
  }, [])

  // Get current content in appropriate format
  const getCurrentContent = useCallback(() => {
    if (!editorRef.current) return ""

    if (isMarkdown) {
      return editorRef.current.textContent || ""
    } else {
      return editorRef.current.innerHTML || ""
    }
  }, [isMarkdown])

  // Set content in appropriate format
  const setContent = useCallback(
    content => {
      if (!editorRef.current) return

      if (isMarkdown) {
        editorRef.current.textContent = content
      } else {
        editorRef.current.innerHTML = content
      }
    },
    [isMarkdown]
  )

  return {
    isMarkdown,
    handleMarkdownKeyDown,
    markdownCommands,
    convertContent,
    getCurrentContent,
    setContent,
    insertMarkdownFormatting,
    insertMarkdownLink,
  }
}

export default useMarkdownEditor
