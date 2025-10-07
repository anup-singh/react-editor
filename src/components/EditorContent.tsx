import React, { forwardRef, useEffect, RefObject } from "react"

// 1. Define the types for the component's props
interface EditorContentProps {
  placeholder: string
  initialContent?: string
  onContentChange: (ref: RefObject<HTMLDivElement>) => void
  spellCheck?: boolean
  disabled?: boolean
  editorType?: "html" | "markdown"
}

const EditorContent = forwardRef<HTMLDivElement, EditorContentProps>(
  (
    {
      placeholder,
      initialContent = "", // 3. Use a default value here instead of defaultProps
      onContentChange,
      spellCheck = true,
      disabled = false,
      editorType = "html",
    },
    ref
  ) => {
    // Initialize content only once
    useEffect(() => {
      if (
        ref &&
        typeof ref !== "function" &&
        ref.current &&
        initialContent &&
        !ref.current.hasChildNodes()
      ) {
        if (editorType === "markdown") {
          ref.current.textContent = initialContent
        } else {
          ref.current.innerHTML = initialContent
        }
      }
    }, [initialContent, ref, editorType])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        setTimeout(() => onContentChange(ref as RefObject<HTMLDivElement>), 0)
      }
    }

    return (
      <div
        ref={ref}
        className={`editor-content ${disabled ? "disabled" : ""}`}
        contentEditable={!disabled}
        suppressContentEditableWarning
        spellCheck={spellCheck}
        onInput={
          disabled
            ? undefined
            : () => onContentChange(ref as RefObject<HTMLDivElement>)
        }
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

export default EditorContent
