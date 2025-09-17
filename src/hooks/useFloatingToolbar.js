import { useState, useCallback } from "react"

export const useFloatingToolbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const handleTextSelection = useCallback(editorRef => {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      const selectedText = selection.toString().trim()

      if (selectedText.length > 0 && editorRef.current) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        const editorRect = editorRef.current.getBoundingClientRect()

        // Calculate position relative to the editor container
        // Position toolbar above the selection with proper centering
        const toolbarWidth = 200 // Approximate toolbar width
        const top = rect.top - editorRect.top - 45 // Position above selection
        const left = Math.max(
          0,
          Math.min(
            rect.left - editorRect.left + rect.width / 2 - toolbarWidth / 2,
            editorRect.width - toolbarWidth
          )
        )

        setPosition({
          top: top,
          left: left,
        })
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
  }, [])

  const hideToolbar = useCallback(() => {
    setIsVisible(false)
  }, [])

  return {
    isVisible,
    position,
    handleTextSelection,
    hideToolbar,
  }
}
