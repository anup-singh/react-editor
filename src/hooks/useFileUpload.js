import { useState, useCallback } from "react"

export const useFileUpload = execCommand => {
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleFileUpload = useCallback(
    event => {
      const files = Array.from(event.target.files)

      files.forEach(file => {
        const reader = new FileReader()

        if (file.type.startsWith("image/")) {
          reader.onload = e => {
            const img = `<img src="${e.target.result}" alt="${file.name}" class="editor-image" />`
            execCommand("insertHTML", img)
            setUploadedFiles(prev => [
              ...prev,
              {
                name: file.name,
                type: "image",
                url: e.target.result,
              },
            ])
          }
          reader.readAsDataURL(file)
        } else {
          reader.onload = e => {
            const link = `<a href="${e.target.result}" download="${file.name}" class="editor-file-link">${file.name}</a>`
            execCommand("insertHTML", link)
            setUploadedFiles(prev => [
              ...prev,
              {
                name: file.name,
                type: "file",
                url: e.target.result,
              },
            ])
          }
          reader.readAsDataURL(file)
        }
      })

      event.target.value = ""
    },
    [execCommand]
  )

  return {
    uploadedFiles,
    handleFileUpload,
  }
}
