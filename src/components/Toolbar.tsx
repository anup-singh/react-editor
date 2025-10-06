import React, { FC, ChangeEvent } from "react"

// Define the shape for the configuration object
interface ToolbarConfig {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  heading1?: boolean
  heading2?: boolean
  heading3?: boolean
  fontFamily?: boolean
  fontSize?: boolean
  alignLeft?: boolean
  alignCenter?: boolean
  alignRight?: boolean
  alignJustify?: boolean
  orderedList?: boolean
  unorderedList?: boolean
  link?: boolean
  inlineCode?: boolean
  codeBlock?: boolean
  fileUpload?: boolean
  textColor?: boolean
  backgroundColor?: boolean
  preview?: boolean
  previewLayout?: boolean
  maximize?: boolean
  undo?: boolean
  redo?: boolean
  clearFormatting?: boolean
}

// Define typography configuration
interface Typography {
  fontFamilies: Array<{ label: string; value: string }>
  fontSizes: Array<{ label: string; value: string }>
}

// Define the component's props
interface ToolbarProps {
  config: ToolbarConfig
  typography: Typography
  execCommand: (command: string, value?: string) => void
  insertLink: () => void
  insertInlineCode: () => void
  insertCodeBlock: () => void
  onFileUploadClick: () => void
  isPreviewVisible: boolean
  previewLayout: "vertical" | "horizontal"
  onTogglePreview: () => void
  onToggleLayout: () => void
  isMaximized: boolean
  onToggleMaximize: () => void
  disabled: boolean
  editorType: "html" | "markdown"
}

const Toolbar: FC<ToolbarProps> = ({
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
  disabled,
  editorType: _editorType,
}) => {
  const handleFormatChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      execCommand("formatBlock", value)
    }
    e.target.value = "" // Reset selection
  }

  const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      execCommand("fontName", value)
    }
  }

  const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      execCommand("fontSize", value)
    }
  }

  const handleTextColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    execCommand("foreColor", e.target.value)
  }

  const handleBackgroundColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    execCommand("hiliteColor", e.target.value)
  }

  return (
    <div className="editor-toolbar" data-testid="toolbar">
      {/* Basic Formatting */}
      <div className="toolbar-group">
        {config.bold && (
          <button
            className="toolbar-btn"
            onClick={() => execCommand("bold", undefined)}
            data-testid="bold-btn"
            aria-label="Bold"
            disabled={disabled}
            title="Bold"
          >
            <strong>B</strong>
          </button>
        )}
        {config.italic && (
          <button
            className="toolbar-btn"
            onClick={() => execCommand("italic", undefined)}
            data-testid="italic-btn"
            aria-label="Italic"
            disabled={disabled}
            title="Italic"
          >
            <em>I</em>
          </button>
        )}
        {config.underline && (
          <button
            className="toolbar-btn"
            onClick={() => execCommand("underline", undefined)}
            data-testid="underline-btn"
            aria-label="Underline"
            disabled={disabled}
            title="Underline"
          >
            <u>U</u>
          </button>
        )}
        {config.strikethrough && (
          <button
            className="toolbar-btn"
            onClick={() => execCommand("strikeThrough", undefined)}
            data-testid="strikethrough-btn"
            aria-label="Strikethrough"
            disabled={disabled}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
        )}
      </div>

      {/* Headings */}
      {(config.heading1 || config.heading2 || config.heading3) && (
        <div className="toolbar-group">
          <select
            className="toolbar-select"
            onChange={handleFormatChange}
            data-testid="format-select"
            disabled={disabled}
            defaultValue=""
          >
            <option value="">Format</option>
            {config.heading1 && <option value="h1">Heading 1</option>}
            {config.heading2 && <option value="h2">Heading 2</option>}
            {config.heading3 && <option value="h3">Heading 3</option>}
            <option value="p">Normal</option>
          </select>
        </div>
      )}

      {/* Typography */}
      {config.fontFamily && (
        <div className="toolbar-group">
          <select
            className="toolbar-select"
            onChange={handleFontFamilyChange}
            data-testid="font-family-select"
            disabled={disabled}
            defaultValue=""
          >
            {typography.fontFamilies.map(font => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {config.fontSize && (
        <div className="toolbar-group">
          <select
            className="toolbar-select"
            onChange={handleFontSizeChange}
            data-testid="font-size-select"
            disabled={disabled}
            defaultValue=""
          >
            {typography.fontSizes.map(size => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Alignment */}
      {(config.alignLeft ||
        config.alignCenter ||
        config.alignRight ||
        config.alignJustify) && (
        <div className="toolbar-group">
          {config.alignLeft && (
            <button
              className="toolbar-btn"
              onClick={() => execCommand("justifyLeft", undefined)}
              data-testid="align-left-btn"
              aria-label="Align Left"
              disabled={disabled}
              title="Align Left"
            >
              ⬅️
            </button>
          )}
          {config.alignCenter && (
            <button
              className="toolbar-btn"
              onClick={() => execCommand("justifyCenter", undefined)}
              data-testid="align-center-btn"
              aria-label="Center"
              disabled={disabled}
              title="Center"
            >
              ↔️
            </button>
          )}
          {config.alignRight && (
            <button
              className="toolbar-btn"
              onClick={() => execCommand("justifyRight", undefined)}
              data-testid="align-right-btn"
              aria-label="Align Right"
              disabled={disabled}
              title="Align Right"
            >
              ➡️
            </button>
          )}
          {config.alignJustify && (
            <button
              className="toolbar-btn"
              onClick={() => execCommand("justifyFull", undefined)}
              data-testid="align-justify-btn"
              aria-label="Justify"
              disabled={disabled}
              title="Justify"
            >
              ⬌
            </button>
          )}
        </div>
      )}

      {/* Lists */}
      {(config.orderedList || config.unorderedList) && (
        <div className="toolbar-group">
          {config.orderedList && (
            <button
              className="toolbar-btn"
              onClick={() => execCommand("insertOrderedList", undefined)}
              data-testid="ordered-list-btn"
              aria-label="Numbered List"
              disabled={disabled}
              title="Numbered List"
            >
              1.
            </button>
          )}
          {config.unorderedList && (
            <button
              className="toolbar-btn"
              onClick={() => execCommand("insertUnorderedList", undefined)}
              data-testid="unordered-list-btn"
              aria-label="Bullet List"
              disabled={disabled}
              title="Bullet List"
            >
              •
            </button>
          )}
        </div>
      )}

      {/* Colors */}
      {(config.textColor || config.backgroundColor) && (
        <div className="toolbar-group">
          {config.textColor && (
            <input
              type="color"
              className="color-picker"
              onChange={handleTextColorChange}
              data-testid="text-color-picker"
              disabled={disabled}
              title="Text Color"
            />
          )}
          {config.backgroundColor && (
            <input
              type="color"
              className="color-picker"
              onChange={handleBackgroundColorChange}
              data-testid="background-color-picker"
              disabled={disabled}
              title="Background Color"
            />
          )}
        </div>
      )}

      {/* Links and Code */}
      {(config.link || config.inlineCode || config.codeBlock) && (
        <div className="toolbar-group">
          {config.link && (
            <button
              className="toolbar-btn"
              onClick={insertLink}
              data-testid="link-btn"
              aria-label="Insert Link"
              disabled={disabled}
              title="Insert Link"
            >
              🔗
            </button>
          )}
          {config.inlineCode && (
            <button
              className="toolbar-btn"
              onClick={insertInlineCode}
              data-testid="inline-code-btn"
              aria-label="Insert Inline Code"
              disabled={disabled}
              title="Insert Inline Code"
            >
              &lt;/&gt;
            </button>
          )}
          {config.codeBlock && (
            <button
              className="toolbar-btn"
              onClick={insertCodeBlock}
              data-testid="code-block-btn"
              aria-label="Insert Code Block"
              disabled={disabled}
              title="Insert Code Block"
            >
              {}
            </button>
          )}
        </div>
      )}

      {/* File Upload */}
      {config.fileUpload && (
        <div className="toolbar-group">
          <button
            className="toolbar-btn"
            onClick={onFileUploadClick}
            data-testid="file-upload-btn"
            aria-label="Upload File"
            disabled={disabled}
            title="Upload File"
          >
            📎
          </button>
        </div>
      )}

      {/* Preview */}
      {(config.preview || (config.previewLayout && isPreviewVisible)) && (
        <div className="toolbar-group">
          {config.preview && (
            <button
              className="toolbar-btn"
              onClick={onTogglePreview}
              data-testid="preview-btn"
              aria-label="Toggle Preview"
              disabled={disabled}
              title="Toggle Preview"
            >
              👁️
            </button>
          )}
          {config.previewLayout && isPreviewVisible && (
            <button
              className="toolbar-btn"
              onClick={onToggleLayout}
              data-testid="layout-btn"
              aria-label={`Switch to ${
                previewLayout === "vertical" ? "Horizontal" : "Vertical"
              } Layout`}
              disabled={disabled}
              title={`Switch to ${
                previewLayout === "vertical" ? "Horizontal" : "Vertical"
              } Layout`}
            >
              {previewLayout === "vertical" ? "↔️" : "↕️"}
            </button>
          )}
        </div>
      )}

      {/* Maximize */}
      {config.maximize && (
        <div className="toolbar-group">
          <button
            className="toolbar-btn"
            onClick={onToggleMaximize}
            data-testid="maximize-btn"
            aria-label={isMaximized ? "Minimize" : "Maximize"}
            disabled={disabled}
            title={isMaximized ? "Minimize" : "Maximize"}
          >
            {isMaximized ? "🗗" : "🗖"}
          </button>
        </div>
      )}

      {/* Advanced */}
      {(config.undo || config.redo || config.clearFormatting) && (
        <div className="toolbar-group">
          {config.undo && (
            <button
              className="toolbar-btn"
              onClick={() => execCommand("undo", undefined)}
              data-testid="undo-btn"
              aria-label="Undo"
              disabled={disabled}
              title="Undo"
            >
              ↶
            </button>
          )}
          {config.redo && (
            <button
              className="toolbar-btn"
              onClick={() => execCommand("redo", undefined)}
              data-testid="redo-btn"
              aria-label="Redo"
              disabled={disabled}
              title="Redo"
            >
              ↷
            </button>
          )}
          {config.clearFormatting && (
            <button
              className="toolbar-btn"
              onClick={() => execCommand("removeFormat", undefined)}
              data-testid="clear-formatting-btn"
              aria-label="Clear Formatting"
              disabled={disabled}
              title="Clear Formatting"
            >
              🧹
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Toolbar
