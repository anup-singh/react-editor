import React from "react"
import PropTypes from "prop-types"
import { markdownToHtml } from "../utils/markdownConverter"

const PreviewPane = ({ content, isVisible, layout, editorType = "html" }) => {
  if (!isVisible) return null

  // Convert markdown to HTML for preview if needed
  const previewContent =
    editorType === "markdown" ? markdownToHtml(content) : content

  return (
    <div className={`preview-pane ${layout}`} data-testid="preview-pane">
      <div className="preview-header">
        <h4>Live Preview</h4>
        <span className="preview-layout-indicator">
          {layout === "vertical" ? "Side by Side" : "Top & Bottom"}
        </span>
        {editorType === "markdown" && (
          <span className="preview-mode-indicator">Markdown → HTML</span>
        )}
      </div>
      <div
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: previewContent }}
      />
    </div>
  )
}

PreviewPane.propTypes = {
  content: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  layout: PropTypes.oneOf(["vertical", "horizontal"]).isRequired,
  editorType: PropTypes.oneOf(["html", "markdown"]),
}

PreviewPane.defaultProps = {
  editorType: "html",
}

export default PreviewPane
