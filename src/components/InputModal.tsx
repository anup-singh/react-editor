import React, {
  useState,
  useRef,
  useEffect,
  FC,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react"

// Define the component's props with a clear interface.
interface InputModalProps {
  isVisible: boolean
  title: string
  placeholder: string
  defaultValue?: string
  onSubmit?: (value: string) => void
  onCancel?: () => void
  buttonText?: string
  inputType?: "text" | "password" | "email" | "url" | "number" // Using a union type for better safety.
}

const InputModal: FC<InputModalProps> = ({
  isVisible,
  title,
  placeholder,
  defaultValue = "",
  onSubmit,
  onCancel,
  buttonText = "Add",
  inputType = "text",
}) => {
  const [value, setValue] = useState<string>(defaultValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isVisible) {
      setValue(defaultValue)
      setTimeout(() => {
        // Use optional chaining for safety.
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 100)
    }
  }, [isVisible, defaultValue])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleCancel()
    }
  }

  if (!isVisible) {
    return null
  }

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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
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

export default InputModal
