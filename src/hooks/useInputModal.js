import { useState, useCallback } from "react"

export const useInputModal = () => {
  const [modalState, setModalState] = useState({
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
    }) => {
      return new Promise((resolve, reject) => {
        setModalState({
          isVisible: true,
          title,
          placeholder,
          defaultValue,
          buttonText,
          inputType,
          onSubmit: value => {
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
