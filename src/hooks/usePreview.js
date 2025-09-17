import { useState, useCallback } from "react"

export const usePreview = () => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const [previewLayout, setPreviewLayout] = useState("vertical") // 'vertical' or 'horizontal'

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
