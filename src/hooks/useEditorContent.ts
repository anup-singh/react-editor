import { useState, useCallback, RefObject } from "react"

/**
 * A custom hook for managing content of a rich text editor.
 * @param initialContent The initial content string.
 * @param onContentChange A callback function to be invoked when the content changes.
 * @param editorType The type of editor content, either 'html' or 'markdown'.
 */
export const useEditorContent = (
  initialContent = "",
  onContentChange: (content: string) => void,
  editorType: "html" | "markdown" = "html"
) => {
  const [content, setContent] = useState<string>(initialContent)

  const handleContentChange = useCallback(
    (editorRef: RefObject<HTMLDivElement>) => {
      if (editorRef.current) {
        // Get content based on editor type
        const newContent =
          editorType === "markdown"
            ? editorRef.current.textContent || ""
            : editorRef.current.innerHTML || ""

        if (newContent !== content) {
          setContent(newContent)
          onContentChange?.(newContent)
        }
      }
    },
    [content, onContentChange, editorType]
  )

  return {
    content,
    setContent,
    handleContentChange,
  }
}
