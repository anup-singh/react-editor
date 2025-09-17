import { useState, useCallback } from "react"

export const useInlineLinkInsert = () => {
  const [linkInsertState, setLinkInsertState] = useState({
    isVisible: false,
    position: { top: 0, left: 0 },
    selectedText: "",
    range: null,
  })

  const showLinkInsert = useCallback((selection, editorRef) => {
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    const selectedText = selection.toString().trim()

    if (!selectedText) return

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
  }, [])

  const hideLinkInsert = useCallback(() => {
    setLinkInsertState(prev => ({
      ...prev,
      isVisible: false,
    }))
  }, [])

  const insertLink = useCallback(
    (url, execCommand) => {
      if (linkInsertState.range) {
        // Restore the selection
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(linkInsertState.range)

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
