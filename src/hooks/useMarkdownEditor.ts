import { useCallback, RefObject } from "react"
import { markdownToHtml, htmlToMarkdown } from "../utils/markdownConverter"

/**
 * A custom hook for managing a rich text editor with specific Markdown-related features.
 * @param editorRef A React ref object for the content editable div.
 * @param editorType The current editor type, either 'markdown' or 'html'.
 * @param onContentChange A function to call when the editor's content changes.
 */
const useMarkdownEditor = (
  editorRef: RefObject<HTMLDivElement>,
  editorType: "html" | "markdown",
  onContentChange: (ref: RefObject<HTMLDivElement>) => void
) => {
  const isMarkdown = editorType === "markdown"

  /**
   * Inserts text at the current cursor position.
   */
  const insertAtCursor = useCallback(
    (text: string) => {
      const selection = window.getSelection()
      if (!selection || !selection.rangeCount) return

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
    [onContentChange, editorRef]
  )

  /**
   * Inserts markdown formatting around a selected text or at the cursor.
   */
  const insertMarkdownFormatting = useCallback(
    (before: string, after: string) => {
      const selection = window.getSelection()
      if (!selection || !selection.rangeCount) return

      const range = selection.getRangeAt(0)
      const selectedText = range.toString()
      const formattedText = before + selectedText + after

      range.deleteContents()
      range.insertNode(document.createTextNode(formattedText))

      if (selectedText) {
        range.setStart(range.endContainer, range.endOffset)
      } else {
        range.setStart(range.endContainer, range.endOffset - after.length)
      }

      selection.removeAllRanges()
      selection.addRange(range)

      if (onContentChange) {
        onContentChange(editorRef)
      }
    },
    [onContentChange, editorRef]
  )

  /**
   * Inserts a markdown link, selecting the URL part for easy editing.
   */
  const insertMarkdownLink = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || !selection.rangeCount) return

    const range = selection.getRangeAt(0)
    const selectedText = range.toString()

    const linkText = selectedText || "Link text"
    const linkMarkdown = `[${linkText}](url)`

    range.deleteContents()
    range.insertNode(document.createTextNode(linkMarkdown))

    const textNode = range.endContainer
    const startOffset = range.endOffset - 4
    const endOffset = range.endOffset - 1

    range.setStart(textNode, startOffset)
    range.setEnd(textNode, endOffset)
    selection.removeAllRanges()
    selection.addRange(range)

    if (onContentChange) {
      onContentChange(editorRef)
    }
  }, [onContentChange, editorRef])

  /**
   * Handles Enter key for list continuation in Markdown mode.
   */
  const handleMarkdownEnter = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const selection = window.getSelection()
      const currentEditor = editorRef.current
      if (!selection || !selection.rangeCount || !currentEditor) return

      const range = selection.getRangeAt(0)
      const textContent = currentEditor.textContent || ""
      const cursorPosition = range.startOffset

      const beforeCursor = textContent.substring(0, cursorPosition)
      const currentLineStart = beforeCursor.lastIndexOf("\n") + 1
      const currentLine = textContent.substring(
        currentLineStart,
        cursorPosition
      )

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
    [insertAtCursor, editorRef]
  )

  /**
   * Handle markdown-specific key shortcuts
   */
  const handleMarkdownKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isMarkdown || !editorRef.current) return

      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault()
        insertMarkdownFormatting("**", "**")
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "i") {
        e.preventDefault()
        insertMarkdownFormatting("*", "*")
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        insertMarkdownLink()
        return
      }

      if (e.key === "Tab") {
        e.preventDefault()
        insertAtCursor("  ")
        return
      }

      if (e.key === "Enter") {
        handleMarkdownEnter(e)
      }
    },
    [
      isMarkdown,
      editorRef,
      insertMarkdownFormatting,
      insertMarkdownLink,
      insertAtCursor,
      handleMarkdownEnter,
    ]
  )

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

  const convertContent = useCallback(
    (
      content: string,
      fromType: "html" | "markdown",
      toType: "html" | "markdown"
    ) => {
      if (fromType === toType) return content
      if (fromType === "html" && toType === "markdown") {
        return htmlToMarkdown(content)
      }
      if (fromType === "markdown" && toType === "html") {
        return markdownToHtml(content)
      }
      return content
    },
    []
  )

  const getCurrentContent = useCallback(() => {
    if (!editorRef.current) return ""
    return isMarkdown
      ? editorRef.current.textContent || ""
      : editorRef.current.innerHTML || ""
  }, [isMarkdown, editorRef])

  const setContent = useCallback(
    (content: string) => {
      if (!editorRef.current) return
      if (isMarkdown) {
        editorRef.current.textContent = content
      } else {
        editorRef.current.innerHTML = content
      }
    },
    [isMarkdown, editorRef]
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
