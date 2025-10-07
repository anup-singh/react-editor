import { useState, useCallback, ChangeEvent } from "react"

// Define the shape of a single file object in our state.
interface UploadedFile {
  name: string
  type: string
  url: string | ArrayBuffer | null
}

/**
 * A custom hook for handling file uploads within a rich text editor.
 * It inserts uploaded images or file links into the editor content.
 * @param execCommand A function to execute a rich text editor command.
 */
export const useFileUpload = (
  execCommand: (command: string, value: string) => void
) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files ? Array.from(event.target.files) : []

      files.forEach(file => {
        const reader = new FileReader()

        if (file.type.startsWith("image/")) {
          reader.onload = e => {
            const result = e.target?.result as string // Type assertion for result
            const img = `<img src="${result}" alt="${file.name}" class="editor-image" />`
            execCommand("insertHTML", img)
            setUploadedFiles(prev => [
              ...prev,
              {
                name: file.name,
                type: "image",
                url: result,
              },
            ])
          }
          reader.readAsDataURL(file)
        } else {
          reader.onload = e => {
            const result = e.target?.result as string
            const link = `<a href="${result}" download="${file.name}" class="editor-file-link">${file.name}</a>`
            execCommand("insertHTML", link)
            setUploadedFiles(prev => [
              ...prev,
              {
                name: file.name,
                type: "file",
                url: result,
              },
            ])
          }
          reader.readAsDataURL(file)
        }
      })

      // Reset the file input value to allow for subsequent uploads of the same file
      event.target.value = ""
    },
    [execCommand]
  )

  return {
    uploadedFiles,
    handleFileUpload,
  }
}
