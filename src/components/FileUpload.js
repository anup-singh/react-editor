import React, { forwardRef } from "react"
import PropTypes from "prop-types"

const FileUpload = forwardRef(({ uploadedFiles, onFileUpload }, ref) => {
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
})

FileUpload.displayName = "FileUpload"

FileUpload.propTypes = {
  uploadedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      size: PropTypes.number,
      url: PropTypes.string,
    })
  ).isRequired,
  onFileUpload: PropTypes.func.isRequired,
}

export default FileUpload
