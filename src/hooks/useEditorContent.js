import { useState, useCallback } from "react"

export const useEditorContent = (
  initialContent = "",
  onContentChange,
  editorType = "html"
) => {
  const [content, setContent] = useState(initialContent)

  const handleContentChange = useCallback(
    editorRef => {
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
