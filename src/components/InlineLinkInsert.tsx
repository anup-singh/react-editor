import React, {
  useState,
  useRef,
  useEffect,
  FC,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react"

// Define the shape for the position prop
interface Position {
  top: number
  left: number
}

// Define the component's props using an interface
interface InlineLinkInsertProps {
  isVisible: boolean
  position: Position
  selectedText: string
  onInsertLink: (url: string) => void
  onCancel: () => void
}

const InlineLinkInsert: FC<InlineLinkInsertProps> = ({
  isVisible,
  position,
  selectedText,
  onInsertLink,
  onCancel,
}) => {
  const [url, setUrl] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isVisible) {
      setUrl("")
      // Using a timeout to ensure the element is in the DOM and focusable
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isVisible])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (url.trim()) {
      onInsertLink(url.trim())
      setUrl("")
    }
  }

  const handleCancel = () => {
    setUrl("")
    onCancel()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleCancel()
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      className="inline-link-insert"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 1001,
      }}
    >
      <div className="inline-link-content">
        <div className="inline-link-header">
          <span className="inline-link-text">&quot;{selectedText}&quot;</span>
        </div>
        <form onSubmit={handleSubmit} className="inline-link-form">
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Enter URL (e.g., https://example.com)"
            className="inline-link-input"
          />
          <div className="inline-link-buttons">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-link-btn inline-link-btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-link-btn inline-link-btn-submit"
              disabled={!url.trim()}
            >
              Add Link
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InlineLinkInsert
