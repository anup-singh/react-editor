import React, { forwardRef, Ref, ChangeEvent } from "react"

// Define the shape of a single file object
interface UploadedFile {
  name: string
  type: string
  size?: number // The '?' makes this property optional
  url?: string // This is also optional
}

// Define the component's props using an interface
interface FileUploadProps {
  uploadedFiles: UploadedFile[]
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ uploadedFiles, onFileUpload }, ref: Ref<HTMLInputElement>) => {
    return (
      <>
        {/* Hidden File Input */}
        <input
          ref={ref}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={onFileUpload}
          style={{ display: "none" }}
          data-testid="file-upload-input"
        />

        {/* File List */}
        {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            <h4>Uploaded Files:</h4>
            <ul>
              {uploadedFiles.map(file => (
                <li key={`${file.name}-${file.size || Date.now()}`}>
                  <span className="file-icon">
                    {file.type === "image" ? "🖼️" : "📄"}
                  </span>
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
)

FileUpload.displayName = "FileUpload"

export default FileUpload
