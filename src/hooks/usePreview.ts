import { useState, useCallback } from "react"

// Define a union type for the possible layout values.
export type PreviewLayout = "vertical" | "horizontal"

/**
 * A custom hook for managing the state of a preview component.
 */
export const usePreview = () => {
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false)
  const [previewLayout, setPreviewLayout] = useState<PreviewLayout>("vertical")

  const togglePreview = useCallback(() => {
    setIsPreviewVisible(prev => !prev)
  }, [])

  const toggleLayout = useCallback(() => {
    setPreviewLayout(prev => (prev === "vertical" ? "horizontal" : "vertical"))
  }, [])

  const hidePreview = useCallback(() => {
    setIsPreviewVisible(false)
  }, [])

  const showPreview = useCallback(() => {
    setIsPreviewVisible(true)
  }, [])

  return {
    isPreviewVisible,
    previewLayout,
    togglePreview,
    toggleLayout,
    hidePreview,
    showPreview,
  }
}
