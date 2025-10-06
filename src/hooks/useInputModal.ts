import { useState, useCallback } from "react"

// Define the shape for the modal's configuration options
interface ModalOptions {
  title: string
  placeholder: string
  defaultValue?: string
  buttonText?: string
  inputType?: "text" | "password" | "email" | "url" | "number"
}

// Define the shape for the state managed by the hook
interface ModalState {
  isVisible: boolean
  title: string
  placeholder: string
  defaultValue: string
  buttonText: string
  inputType: string
  onSubmit: ((value: string) => void) | null
  onCancel: (() => void) | null
}

/**
 * A custom hook to manage the state and logic for a generic input modal.
 */
export const useInputModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isVisible: false,
    title: "",
    placeholder: "",
    defaultValue: "",
    buttonText: "Add",
    inputType: "text",
    onSubmit: null,
    onCancel: null,
  })

  const showModal = useCallback(
    ({
      title,
      placeholder,
      defaultValue = "",
      buttonText = "Add",
      inputType = "text",
    }: ModalOptions): Promise<string> => {
      return new Promise((resolve, reject) => {
        setModalState({
          isVisible: true,
          title,
          placeholder,
          defaultValue,
          buttonText,
          inputType,
          onSubmit: (value: string) => {
            setModalState(prev => ({ ...prev, isVisible: false }))
            resolve(value)
          },
          onCancel: () => {
            setModalState(prev => ({ ...prev, isVisible: false }))
            reject(new Error("Cancelled"))
          },
        })
      })
    },
    []
  )

  const hideModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isVisible: false }))
  }, [])

  return {
    modalState,
    showModal,
    hideModal,
  }
}
