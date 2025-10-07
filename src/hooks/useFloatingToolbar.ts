import { useState, useCallback, RefObject } from "react"

// Define the shape of the position state
interface ToolbarPosition {
  top: number
  left: number
}

/**
 * A custom hook to manage the visibility and position of a floating toolbar.
 */
export const useFloatingToolbar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [position, setPosition] = useState<ToolbarPosition>({ top: 0, left: 0 })

  const handleTextSelection = useCallback(
    (editorRef: RefObject<HTMLDivElement>) => {
      const selection = window.getSelection()

      // Check if there's an active selection and if it's within the editor
      if (
        selection &&
        selection.rangeCount > 0 &&
        editorRef.current?.contains(selection.anchorNode)
      ) {
        const selectedText = selection.toString().trim()

        if (selectedText.length > 0) {
          const range = selection.getRangeAt(0)
          const rect = range.getBoundingClientRect()
          const editorRect = editorRef.current.getBoundingClientRect()

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
      } else {
        setIsVisible(false)
      }
    },
    []
  )

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
