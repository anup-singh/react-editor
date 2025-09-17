import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"

const InputModal = ({
  isVisible,
  title,
  placeholder,
  defaultValue = "",
  onSubmit,
  onCancel,
  buttonText = "Add",
  inputType = "text",
}) => {
  const [value, setValue] = useState(defaultValue)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isVisible) {
      setValue(defaultValue)
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 100)
    }
  }, [isVisible, defaultValue])

  const handleSubmit = e => {
    e.preventDefault()
    if (value.trim() && onSubmit) {
      onSubmit(value.trim())
    }
    setValue("")
  }

  const handleCancel = () => {
    setValue("")
    if (onCancel) {
      onCancel()
    }
  }

  const handleKeyDown = e => {
    if (e.key === "Escape") {
      handleCancel()
    }
  }

  if (!isVisible) return null

  return (
    <div className="input-modal-overlay" onClick={handleCancel}>
      <div className="input-modal" onClick={e => e.stopPropagation()}>
        <div className="input-modal-header">
          <h4>{title}</h4>
          <button
            className="input-modal-close"
            onClick={handleCancel}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="input-modal-form">
          <div className="input-modal-body">
            <input
              ref={inputRef}
              type={inputType}
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="input-modal-input"
            />
          </div>

          <div className="input-modal-footer">
            <button
              type="button"
              onClick={handleCancel}
              className="input-modal-btn input-modal-btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="input-modal-btn input-modal-btn-submit"
              disabled={!value.trim()}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

InputModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  buttonText: PropTypes.string,
  inputType: PropTypes.string,
}

InputModal.defaultProps = {
  defaultValue: "",
  buttonText: "Add",
  inputType: "text",
  onSubmit: () => {},
  onCancel: () => {},
}

export default InputModal
