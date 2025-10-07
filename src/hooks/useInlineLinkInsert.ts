import { useState, useCallback, RefObject } from "react"

// Define the shape of the position object.
interface Position {
  top: number
  left: number
}

// Define the shape of the entire link insert state.
interface LinkInsertState {
  isVisible: boolean
  position: Position
  selectedText: string
  range: Range | null
}

/**
 * A custom hook to manage the state and logic for an inline link insertion UI.
 */
export const useInlineLinkInsert = () => {
  const [linkInsertState, setLinkInsertState] = useState<LinkInsertState>({
    isVisible: false,
    position: { top: 0, left: 0 },
    selectedText: "",
    range: null,
  })

  const showLinkInsert = useCallback(
    (selection: Selection, editorRef: RefObject<HTMLDivElement>) => {
      if (!selection || selection.rangeCount === 0) return

      const range = selection.getRangeAt(0)
      const selectedText = selection.toString().trim()

      if (!selectedText) return

      if (editorRef.current) {
        // Get the bounding rect of the selection
        const rect = range.getBoundingClientRect()
        const editorRect = editorRef.current.getBoundingClientRect()

        // Position the link insert below the selected text
        const position = {
          top: rect.bottom - editorRect.top + 8,
          left: rect.left - editorRect.left,
        }

        setLinkInsertState({
          isVisible: true,
          position,
          selectedText,
          range: range.cloneRange(),
        })
      }
    },
    []
  )

  const hideLinkInsert = useCallback(() => {
    setLinkInsertState(prev => ({
      ...prev,
      isVisible: false,
    }))
  }, [])

  const insertLink = useCallback(
    (url: string, execCommand: (command: string, value: string) => void) => {
      if (linkInsertState.range) {
        // Restore the selection
        const selection = window.getSelection()
        if (selection) {
          selection.removeAllRanges()
          selection.addRange(linkInsertState.range)
        }

        // Insert the link
        execCommand("createLink", url)
      }

      hideLinkInsert()
    },
    [linkInsertState.range, hideLinkInsert]
  )

  return {
    linkInsertState,
    showLinkInsert,
    hideLinkInsert,
    insertLink,
  }
}
