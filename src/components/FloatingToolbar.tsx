import React, { forwardRef, Ref } from "react"

// Define the shape for the configuration object
interface ToolbarConfig {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  link?: boolean
}

// Define the shape for the position object
interface ToolbarPosition {
  top: number
  left: number
}

// Define the component's props
interface FloatingToolbarProps {
  config: ToolbarConfig
  isVisible: boolean
  position: ToolbarPosition
  execCommand: (command: string) => void
  insertLink: () => void
}

const FloatingToolbar = forwardRef<HTMLDivElement, FloatingToolbarProps>(
  (
    { config, isVisible, position, execCommand, insertLink },
    ref: Ref<HTMLDivElement>
  ) => {
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

export default FloatingToolbar
