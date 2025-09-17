import React, { forwardRef, useEffect } from "react"
import PropTypes from "prop-types"

const EditorContent = forwardRef(
  (
    {
      placeholder,
      initialContent,
      onContentChange,
      spellCheck = true,
      disabled = false,
      editorType = "html",
    },
    ref
  ) => {
    // Initialize content only once
    useEffect(() => {
      if (ref.current && initialContent && !ref.current.hasChildNodes()) {
        if (editorType === "markdown") {
          ref.current.textContent = initialContent
        } else {
          ref.current.innerHTML = initialContent
        }
      }
    }, [initialContent, ref, editorType])

    const handleKeyDown = e => {
      if (e.key === "Enter") {
        setTimeout(() => onContentChange(ref), 0)
      }
    }

    return (
      <div
        ref={ref}
        className={`editor-content ${disabled ? "disabled" : ""}`}
        contentEditable={!disabled}
        suppressContentEditableWarning
        spellCheck={spellCheck}
        onInput={disabled ? undefined : () => onContentChange(ref)}
        onKeyDown={disabled ? undefined : handleKeyDown}
        data-placeholder={placeholder}
        data-testid="editor-content"
        role="textbox"
        aria-label={placeholder}
        style={{
          opacity: disabled ? "0.6" : "1",
          pointerEvents: disabled ? "none" : "auto",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
    )
  }
)

EditorContent.displayName = "EditorContent"

EditorContent.propTypes = {
  placeholder: PropTypes.string.isRequired,
  initialContent: PropTypes.string,
  onContentChange: PropTypes.func.isRequired,
  spellCheck: PropTypes.bool,
  disabled: PropTypes.bool,
  editorType: PropTypes.oneOf(["html", "markdown"]),
}

EditorContent.defaultProps = {
  spellCheck: true,
  disabled: false,
  editorType: "html",
  initialContent: "",
}

export default EditorContent
