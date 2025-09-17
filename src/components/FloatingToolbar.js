import React, { forwardRef } from "react"
import PropTypes from "prop-types"

const FloatingToolbar = forwardRef(
  ({ config, isVisible, position, execCommand, insertLink }, ref) => {
    if (!isVisible) return null

    return (
      <div
        ref={ref}
        className="floating-toolbar"
        data-testid="floating-toolbar"
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {config.bold && (
          <button
            onClick={() => execCommand("bold")}
            data-testid="floating-bold-btn"
            aria-label="Bold"
          >
            B
          </button>
        )}
        {config.italic && (
          <button
            onClick={() => execCommand("italic")}
            data-testid="floating-italic-btn"
            aria-label="Italic"
          >
            I
          </button>
        )}
        {config.underline && (
          <button
            onClick={() => execCommand("underline")}
            data-testid="floating-underline-btn"
            aria-label="Underline"
          >
            U
          </button>
        )}
        {config.link && (
          <button
            onClick={insertLink}
            data-testid="floating-link-btn"
            aria-label="Insert Link"
          >
            🔗
          </button>
        )}
      </div>
    )
  }
)

FloatingToolbar.displayName = "FloatingToolbar"

FloatingToolbar.propTypes = {
  config: PropTypes.shape({
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    underline: PropTypes.bool,
    link: PropTypes.bool,
  }).isRequired,
  isVisible: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  execCommand: PropTypes.func.isRequired,
  insertLink: PropTypes.func.isRequired,
}

export default FloatingToolbar
