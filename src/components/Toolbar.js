import React from "react"
import PropTypes from "prop-types"

const Toolbar = ({
  config,
  typography,
  execCommand,
  insertLink,
  insertInlineCode,
  insertCodeBlock,
  onFileUploadClick,
  isPreviewVisible,
  previewLayout,
  onTogglePreview,
  onToggleLayout,
  isMaximized,
  onToggleMaximize,
  disabled = false,
  // editorType = "html",
}) => {
  // Handle both function and object execCommand
  const handleExecCommand = (command, value) => {
    if (typeof execCommand === "function") {
      execCommand(command, value)
    } else if (execCommand && typeof execCommand[command] === "function") {
      execCommand[command](value)
    }
  }
  return (
    <div
      className={`editor-toolbar ${disabled ? "disabled" : ""}`}
      data-testid="editor-toolbar"
    >
      {/* Text Formatting Group */}
      {(config.bold ||
        config.italic ||
        config.underline ||
        config.strikethrough) && (
        <div className="toolbar-group">
          {config.bold && (
            <button
              className="toolbar-btn"
              onClick={() => handleExecCommand("bold")}
              title="Bold"
              disabled={disabled}
              data-testid="bold-btn"
              aria-label="Bold"
            >
              <strong>B</strong>
            </button>
          )}
          {config.italic && (
            <button
              className="toolbar-btn"
              onClick={() => handleExecCommand("italic")}
              title="Italic"
              disabled={disabled}
              data-testid="italic-btn"
              aria-label="Italic"
            >
              <em>I</em>
            </button>
          )}
          {config.underline && (
            <button
              className="toolbar-btn"
              onClick={() => handleExecCommand("underline")}
              title="Underline"
              disabled={disabled}
              data-testid="underline-btn"
              aria-label="Underline"
            >
              <u>U</u>
            </button>
          )}
          {config.strikethrough && (
            <button
              className="toolbar-btn"
              onClick={() => handleExecCommand("strikeThrough")}
              title="Strike"
              disabled={disabled}
              data-testid="strikethrough-btn"
              aria-label="Strikethrough"
            >
              <s>S</s>
            </button>
          )}
        </div>
      )}

      {/* Format Group */}
      {(config.heading1 || config.heading2 || config.heading3) && (
        <div className="toolbar-group">
          <select
            className="toolbar-select"
            onChange={e => handleExecCommand("formatBlock", e.target.value)}
            defaultValue=""
            disabled={disabled}
            data-testid="format-select"
            aria-label="Text Format"
          >
            <option value="">Format</option>
            {config.heading1 && <option value="h1">Heading 1</option>}
            {config.heading2 && <option value="h2">Heading 2</option>}
            {config.heading3 && <option value="h3">Heading 3</option>}
            <option value="p">Paragraph</option>
          </select>
        </div>
      )}

      {/* Font Family Group */}
      {config.fontFamily && (
        <div className="toolbar-group">
          <select
            className="toolbar-select"
            onChange={e => handleExecCommand("fontName", e.target.value)}
            defaultValue=""
            disabled={disabled}
            data-testid="font-family-select"
            aria-label="Font Family"
          >
            {typography?.fontFamilies?.map(font => (
              <option
                key={`font-${font.value || font.label}`}
                value={font.value}
              >
                {font.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Font Size Group */}
      {config.fontSize && (
        <div className="toolbar-group">
          <select
            className="toolbar-select"
            onChange={e => handleExecCommand("fontSize", e.target.value)}
            defaultValue=""
            disabled={disabled}
            data-testid="font-size-select"
            aria-label="Font Size"
          >
            {typography?.fontSizes?.map(size => (
              <option
                key={`size-${size.value || size.label}`}
                value={size.value}
              >
                {size.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Alignment Group */}
      {(config.alignLeft ||
        config.alignCenter ||
        config.alignRight ||
        config.alignJustify) && (
        <div className="toolbar-group">
          {config.alignLeft && (
            <button
              className="toolbar-btn"
              onClick={() => handleExecCommand("justifyLeft")}
              title="Align Left"
              disabled={disabled}
            >
              ⫷
            </button>
          )}
          {config.alignCenter && (
            <button
              className="toolbar-btn"
              onClick={() => handleExecCommand("justifyCenter")}
              title="Center"
              disabled={disabled}
            >
              ⫸
            </button>
          )}
          {config.alignRight && (
            <button
              className="toolbar-btn"
              onClick={() => handleExecCommand("justifyRight")}
              title="Align Right"
              disabled={disabled}
            >
              ⫹
            </button>
          )}
          {config.alignJustify && (
            <button
              className="toolbar-btn"
              onClick={() => handleExecCommand("justifyFull")}
              title="Justify"
              disabled={disabled}
            >
              ≡
            </button>
          )}
        </div>
      )}

      {/* List Group */}
      {(config.unorderedList || config.orderedList) && (
        <div className="toolbar-group">
          {config.unorderedList && (
            <button
              className="toolbar-btn"
              onClick={() => handleExecCommand("insertUnorderedList")}
              title="Bullet List"
              disabled={disabled}
            >
              • List
            </button>
          )}
          {config.orderedList && (
            <button
              className="toolbar-btn"
              onClick={() => handleExecCommand("insertOrderedList")}
              title="Numbered List"
              disabled={disabled}
            >
              1. List
            </button>
          )}
        </div>
      )}

      {/* Insert Group */}
      {(config.link ||
        config.inlineCode ||
        config.codeBlock ||
        config.fileUpload) && (
        <div className="toolbar-group">
          {config.link && (
            <button
              className="toolbar-btn"
              onClick={insertLink}
              title="Insert Link"
              disabled={disabled}
              data-testid="link-btn"
              aria-label="Insert Link"
            >
              🔗
            </button>
          )}
          {config.inlineCode && (
            <button
              className="toolbar-btn"
              onClick={insertInlineCode}
              title="Insert Inline Code"
              disabled={disabled}
            >
              {"</>"}
            </button>
          )}
          {config.codeBlock && (
            <button
              className="toolbar-btn"
              onClick={insertCodeBlock}
              title="Insert Code Block"
              disabled={disabled}
            >
              ⧉
            </button>
          )}
          {config.fileUpload && (
            <button
              className="toolbar-btn"
              onClick={onFileUploadClick}
              title="Upload File"
              disabled={disabled}
              data-testid="file-upload-btn"
              aria-label="Upload File"
            >
              📎
            </button>
          )}
        </div>
      )}

      {/* Color Group */}
      {(config.textColor || config.backgroundColor) && (
        <div className="toolbar-group">
          {config.textColor && (
            <input
              type="color"
              className="color-picker"
              onChange={e => handleExecCommand("foreColor", e.target.value)}
              title="Text Color"
              disabled={disabled}
              data-testid="text-color-picker"
              aria-label="Text Color"
            />
          )}
          {config.backgroundColor && (
            <input
              type="color"
              className="color-picker"
              onChange={e => handleExecCommand("hiliteColor", e.target.value)}
              title="Highlight Color"
              disabled={disabled}
              data-testid="background-color-picker"
              aria-label="Highlight Color"
            />
          )}
        </div>
      )}

      {/* Preview Group */}
      {(config.preview || config.previewLayout || config.maximize) && (
        <div className="toolbar-group">
          {config.preview && (
            <button
              className={`toolbar-btn ${isPreviewVisible ? "active" : ""}`}
              onClick={onTogglePreview}
              title="Toggle Preview"
              disabled={disabled}
              data-testid="preview-btn"
              aria-label="Toggle Preview"
            >
              👁️
            </button>
          )}
          {config.previewLayout && isPreviewVisible && (
            <button
              className="toolbar-btn"
              onClick={onToggleLayout}
              title={`Switch to ${
                previewLayout === "vertical" ? "Horizontal" : "Vertical"
              } Layout`}
              disabled={disabled}
            >
              {previewLayout === "vertical" ? "⬌" : "⬍"}
            </button>
          )}
          {config.maximize && (
            <button
              className={`toolbar-btn ${isMaximized ? "active" : ""}`}
              onClick={onToggleMaximize}
              title={isMaximized ? "Minimize Editor" : "Maximize Editor"}
              disabled={disabled}
              data-testid="maximize-btn"
              aria-label={isMaximized ? "Minimize Editor" : "Maximize Editor"}
            >
              {isMaximized ? "🗗" : "🗖"}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Toolbar.propTypes = {
  config: PropTypes.shape({
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    underline: PropTypes.bool,
    strikethrough: PropTypes.bool,
    heading1: PropTypes.bool,
    heading2: PropTypes.bool,
    heading3: PropTypes.bool,
    fontFamily: PropTypes.bool,
    fontSize: PropTypes.bool,
    alignLeft: PropTypes.bool,
    alignCenter: PropTypes.bool,
    alignRight: PropTypes.bool,
    alignJustify: PropTypes.bool,
    unorderedList: PropTypes.bool,
    orderedList: PropTypes.bool,
    link: PropTypes.bool,
    inlineCode: PropTypes.bool,
    codeBlock: PropTypes.bool,
    fileUpload: PropTypes.bool,
    textColor: PropTypes.bool,
    backgroundColor: PropTypes.bool,
    preview: PropTypes.bool,
    previewLayout: PropTypes.bool,
    maximize: PropTypes.bool,
  }).isRequired,
  typography: PropTypes.shape({
    fontFamilies: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    fontSizes: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
  }),
  execCommand: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      bold: PropTypes.func,
      italic: PropTypes.func,
      underline: PropTypes.func,
      strikethrough: PropTypes.func,
    }),
  ]).isRequired,
  insertLink: PropTypes.func.isRequired,
  insertInlineCode: PropTypes.func.isRequired,
  insertCodeBlock: PropTypes.func.isRequired,
  onFileUploadClick: PropTypes.func.isRequired,
  isPreviewVisible: PropTypes.bool.isRequired,
  previewLayout: PropTypes.string.isRequired,
  onTogglePreview: PropTypes.func.isRequired,
  onToggleLayout: PropTypes.func.isRequired,
  isMaximized: PropTypes.bool,
  onToggleMaximize: PropTypes.func,
  disabled: PropTypes.bool,
  editorType: PropTypes.oneOf(["html", "markdown"]),
}

Toolbar.defaultProps = {
  disabled: false,
  editorType: "html",
  isMaximized: false,
  onToggleMaximize: () => {},
  typography: {
    fontFamilies: [],
    fontSizes: [],
  },
}

export default Toolbar
