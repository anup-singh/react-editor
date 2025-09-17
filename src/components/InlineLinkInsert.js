import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"

const InlineLinkInsert = ({
  isVisible,
  position,
  selectedText,
  onInsertLink,
  onCancel,
}) => {
  const [url, setUrl] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    if (isVisible) {
      setUrl("")
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isVisible])

  const handleSubmit = e => {
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

  const handleKeyDown = e => {
    if (e.key === "Escape") {
      handleCancel()
    }
  }

  if (!isVisible) return null

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
            onChange={e => setUrl(e.target.value)}
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

InlineLinkInsert.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  selectedText: PropTypes.string.isRequired,
  onInsertLink: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default InlineLinkInsert
