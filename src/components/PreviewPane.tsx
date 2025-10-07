import React from "react"
import { markdownToHtml } from "../utils/markdownConverter"
import { EditorType, PreviewLayout } from "@/types"

// Props interface for PreviewPane component
export interface PreviewPaneProps {
  /** The content to preview */
  content: string
  /** Whether the preview pane should be visible */
  isVisible: boolean
  /** The layout orientation for the preview pane */
  layout: PreviewLayout
  /** The type of editor content (html or markdown) */
  editorType?: EditorType
}

/**
 * PreviewPane component for displaying live preview of editor content
 *
 * @param props - The component props
 * @returns JSX element or null if not visible
 */
const PreviewPane: React.FC<PreviewPaneProps> = ({
  content,
  isVisible,
  layout,
  editorType = "html",
}) => {
  if (!isVisible) return null

  // Convert markdown to HTML for preview if needed
  const previewContent: string =
    editorType === "markdown" ? markdownToHtml(content) : content

  /**
   * Get layout indicator text based on layout prop
   * @param layout - The current layout setting
   * @returns Human-readable layout description
   */
  const getLayoutIndicator = (layout: PreviewLayout): string => {
    return layout === "vertical" ? "Side by Side" : "Top & Bottom"
  }

  /**
   * Get editor mode indicator text
   * @param editorType - The current editor type
   * @returns Human-readable editor mode description
   */
  const getEditorModeIndicator = (editorType: EditorType): string | null => {
    return editorType === "markdown" ? "Markdown → HTML" : null
  }

  const layoutIndicator = getLayoutIndicator(layout)
  const editorModeIndicator = getEditorModeIndicator(editorType)

  return (
    <div
      className={`preview-pane ${layout}`}
      data-testid="preview-pane"
      role="complementary"
      aria-label="Live preview of editor content"
    >
      <div className="preview-header">
        <h4>Live Preview</h4>
        <span
          className="preview-layout-indicator"
          aria-label={`Preview layout: ${layoutIndicator}`}
        >
          {layoutIndicator}
        </span>
        {editorModeIndicator && (
          <span
            className="preview-mode-indicator"
            aria-label="Content conversion mode"
          >
            {editorModeIndicator}
          </span>
        )}
      </div>
      <div
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: previewContent }}
        role="document"
        aria-label="Preview content"
      />
    </div>
  )
}

export default PreviewPane
