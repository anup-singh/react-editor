import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react"
import PropTypes from "prop-types"
import "./index.css"
import "./input.css"

// Components
import {
  Toolbar,
  FloatingToolbar,
  FileUpload,
  EditorContent,
  PreviewPane,
} from "./components"
import InputModal from "./components/InputModal"
import InlineLinkInsert from "./components/InlineLinkInsert"

// Hooks
import {
  useEditorContent,
  useFloatingToolbar,
  useEditorCommands,
  useFileUpload,
  usePreview,
} from "./hooks"
import { useInputModal } from "./hooks/useInputModal"
import { useInlineLinkInsert } from "./hooks/useInlineLinkInsert"
import useMarkdownEditor from "./hooks/useMarkdownEditor"

// Configuration
import { mergeEditorConfig } from "./editorConfig"

const Editor = forwardRef(
  (
    {
      initialContent = "",
      placeholder = "Start writing...",
      onContentChange,
      className = "",
      config = {},
    },
    ref
  ) => {
    // Merge user config with default config
    const editorConfig = mergeEditorConfig(config)

    // Extract commonly used config values
    const finalPlaceholder = editorConfig.settings.placeholder || placeholder
    const finalInitialContent =
      editorConfig.settings.initialContent || initialContent
    const editorType = editorConfig.settings.editorType || "html"

    // State for enable/disable functionality
    const [isEnabled, setIsEnabled] = useState(true)

    // State for maximize/minimize functionality
    const [isMaximized, setIsMaximized] = useState(false)

    // Refs
    const editorRef = useRef(null)
    const toolbarRef = useRef(null)
    const fileInputRef = useRef(null)

    // Custom hooks
    const { content, handleContentChange } = useEditorContent(
      finalInitialContent,
      onContentChange,
      editorType
    )
    const { isVisible, position, handleTextSelection, hideToolbar } =
      useFloatingToolbar()
    const { modalState, showModal } = useInputModal()
    const {
      linkInsertState,
      showLinkInsert,
      hideLinkInsert,
      insertLink: handleInlineLinkInsert,
    } = useInlineLinkInsert()
    const { execCommand, insertLink, insertInlineCode, insertCodeBlock } =
      useEditorCommands(editorRef, handleContentChange, showModal)
    const { uploadedFiles, handleFileUpload } = useFileUpload(execCommand)
    const { isPreviewVisible, previewLayout, togglePreview, toggleLayout } =
      usePreview()

    // Toggle maximize function
    const toggleMaximize = () => {
      setIsMaximized(prev => !prev)
    }
    const {
      isMarkdown,
      handleMarkdownKeyDown,
      markdownCommands,
      convertContent,
      // getCurrentContent: getMarkdownContent,
      // setContent: setMarkdownContent,
    } = useMarkdownEditor(editorRef, editorType, handleContentChange)

    // Expose editor methods via ref
    useImperativeHandle(
      ref,
      () => ({
        // Focus the editor
        focus: () => {
          if (editorRef.current) {
            editorRef.current.focus()
          }
        },

        // Remove focus from the editor
        blur: () => {
          if (editorRef.current) {
            editorRef.current.blur()
          }
        },

        // Check if editor has focus
        hasFocus: () => {
          return document.activeElement === editorRef.current
        },

        // Enable the editor
        enable: () => {
          setIsEnabled(true)
          if (editorRef.current) {
            editorRef.current.contentEditable = true
            editorRef.current.style.opacity = "1"
            editorRef.current.style.pointerEvents = "auto"
          }
        },

        // Disable the editor
        disable: () => {
          setIsEnabled(false)
          if (editorRef.current) {
            editorRef.current.contentEditable = false
            editorRef.current.style.opacity = "0.6"
            editorRef.current.style.pointerEvents = "none"
            editorRef.current.blur() // Remove focus when disabling
          }
        },

        // Get current content (legacy method, returns processed content)
        getContent: () => content,

        // Get contents based on editor type (raw content from DOM)
        getContents: () => {
          if (!editorRef.current) return ""

          if (isMarkdown) {
            // Return raw markdown text
            return editorRef.current.textContent || ""
          } else {
            // Return HTML content
            return editorRef.current.innerHTML || ""
          }
        },

        // Set content programmatically
        setContent: newContent => {
          if (editorRef.current) {
            if (isMarkdown) {
              editorRef.current.textContent = newContent
            } else {
              editorRef.current.innerHTML = newContent
            }
            handleContentChange(editorRef)
          }
        },

        // Check if editor is enabled
        isEnabled: () => isEnabled,

        // Clear all content
        clear: () => {
          if (editorRef.current) {
            if (isMarkdown) {
              editorRef.current.textContent = ""
            } else {
              editorRef.current.innerHTML = ""
            }
            handleContentChange(editorRef)
          }
        },

        // Get current editor type
        getEditorType: () => editorType,

        // Convert content between formats
        convertContent: (content, fromType, toType) =>
          convertContent(content, fromType, toType),

        // Maximize/minimize editor
        maximize: () => setIsMaximized(true),
        minimize: () => setIsMaximized(false),
        toggleMaximize: () => toggleMaximize(),
        isMaximized: () => isMaximized,
      }),
      [
        content,
        handleContentChange,
        isEnabled,
        isMarkdown,
        editorType,
        convertContent,
        isMaximized,
        toggleMaximize,
      ]
    )

    // Event listeners
    useEffect(() => {
      const editor = editorRef.current
      if (!editor) return

      const handleMouseUp = () =>
        setTimeout(() => handleTextSelection(editorRef), 10)
      const handleKeyUp = () =>
        setTimeout(() => handleTextSelection(editorRef), 10)
      const handleKeyDown = e => {
        if (isMarkdown) {
          handleMarkdownKeyDown(e)
        }
      }
      const handleClick = e => {
        if (!toolbarRef.current?.contains(e.target)) {
          hideToolbar()
        }
        // Also hide inline link insert if clicking outside
        if (linkInsertState.isVisible) {
          hideLinkInsert()
        }
      }

      // Only add event listeners if editor is enabled
      if (isEnabled) {
        editor.addEventListener("mouseup", handleMouseUp)
        editor.addEventListener("keyup", handleKeyUp)
        editor.addEventListener("keydown", handleKeyDown)
        document.addEventListener("click", handleClick)
      }

      return () => {
        editor.removeEventListener("mouseup", handleMouseUp)
        editor.removeEventListener("keyup", handleKeyUp)
        editor.removeEventListener("keydown", handleKeyDown)
        document.removeEventListener("click", handleClick)
      }
    }, [
      handleTextSelection,
      hideToolbar,
      linkInsertState.isVisible,
      hideLinkInsert,
      isEnabled,
      isMarkdown,
      handleMarkdownKeyDown,
    ])

    return (
      <div
        className={`custom-editor ${className} ${
          isMaximized ? "maximized" : ""
        }`}
        data-editor-type={editorType}
        data-testid="custom-editor"
      >
        {editorConfig.toolbar.show && (
          <Toolbar
            config={editorConfig.toolbar.items}
            typography={editorConfig.typography}
            execCommand={isMarkdown ? markdownCommands : execCommand}
            insertLink={
              isMarkdown
                ? markdownCommands.link
                : () => insertLink(showLinkInsert, editorRef)
            }
            insertInlineCode={
              isMarkdown ? markdownCommands.inlineCode : insertInlineCode
            }
            insertCodeBlock={
              isMarkdown ? markdownCommands.codeBlock : insertCodeBlock
            }
            onFileUploadClick={() => fileInputRef.current?.click()}
            isPreviewVisible={isPreviewVisible}
            previewLayout={previewLayout}
            onTogglePreview={togglePreview}
            onToggleLayout={toggleLayout}
            isMaximized={isMaximized}
            onToggleMaximize={toggleMaximize}
            disabled={!isEnabled}
            editorType={editorType}
          />
        )}

        {editorConfig.floatingToolbar.show && (
          <FloatingToolbar
            ref={toolbarRef}
            config={editorConfig.floatingToolbar.items}
            isVisible={isVisible}
            position={position}
            execCommand={execCommand}
            insertLink={insertLink}
          />
        )}

        <div
          className={`editor-container ${
            isPreviewVisible ? `split-${previewLayout}` : ""
          }`}
        >
          <div className="editor-section" style={{ position: "relative" }}>
            <EditorContent
              ref={editorRef}
              placeholder={finalPlaceholder}
              initialContent={finalInitialContent}
              onContentChange={handleContentChange}
              spellCheck={editorConfig.settings.spellCheck}
              disabled={!isEnabled}
              editorType={editorType}
            />

            <InlineLinkInsert
              isVisible={linkInsertState.isVisible}
              position={linkInsertState.position}
              selectedText={linkInsertState.selectedText}
              onInsertLink={url => handleInlineLinkInsert(url, execCommand)}
              onCancel={hideLinkInsert}
            />
          </div>

          {editorConfig.features.preview && (
            <PreviewPane
              content={content}
              isVisible={isPreviewVisible}
              layout={previewLayout}
              editorType={editorType}
            />
          )}
        </div>

        {editorConfig.features.fileUpload && (
          <FileUpload
            ref={fileInputRef}
            uploadedFiles={uploadedFiles}
            onFileUpload={handleFileUpload}
          />
        )}

        {editorConfig.features.customModals && (
          <InputModal
            isVisible={modalState.isVisible}
            title={modalState.title}
            placeholder={modalState.placeholder}
            defaultValue={modalState.defaultValue}
            buttonText={modalState.buttonText}
            inputType={modalState.inputType}
            onSubmit={modalState.onSubmit}
            onCancel={modalState.onCancel}
          />
        )}
      </div>
    )
  }
)

Editor.displayName = "Editor"

Editor.propTypes = {
  initialContent: PropTypes.string,
  placeholder: PropTypes.string,
  onContentChange: PropTypes.func,
  className: PropTypes.string,
  config: PropTypes.shape({
    toolbar: PropTypes.shape({
      show: PropTypes.bool,
      items: PropTypes.shape({
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        strikethrough: PropTypes.bool,
        alignLeft: PropTypes.bool,
        alignCenter: PropTypes.bool,
        alignRight: PropTypes.bool,
        alignJustify: PropTypes.bool,
        orderedList: PropTypes.bool,
        unorderedList: PropTypes.bool,
        heading1: PropTypes.bool,
        heading2: PropTypes.bool,
        heading3: PropTypes.bool,
        fontFamily: PropTypes.bool,
        fontSize: PropTypes.bool,
        textColor: PropTypes.bool,
        backgroundColor: PropTypes.bool,
        link: PropTypes.bool,
        inlineCode: PropTypes.bool,
        codeBlock: PropTypes.bool,
        fileUpload: PropTypes.bool,
        preview: PropTypes.bool,
        previewLayout: PropTypes.bool,
        maximize: PropTypes.bool,
        undo: PropTypes.bool,
        redo: PropTypes.bool,
        clearFormatting: PropTypes.bool,
      }),
    }),
    floatingToolbar: PropTypes.shape({
      show: PropTypes.bool,
      items: PropTypes.shape({
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        link: PropTypes.bool,
      }),
    }),
    features: PropTypes.shape({
      preview: PropTypes.bool,
      fileUpload: PropTypes.bool,
      inlineLinkInsert: PropTypes.bool,
      customModals: PropTypes.bool,
      dragAndDrop: PropTypes.bool,
    }),
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
    settings: PropTypes.shape({
      placeholder: PropTypes.string,
      initialContent: PropTypes.string,
      autoFocus: PropTypes.bool,
      spellCheck: PropTypes.bool,
      editorType: PropTypes.oneOf(["html", "markdown"]),
    }),
  }),
}

Editor.defaultProps = {
  initialContent: "",
  placeholder: "Start writing...",
  onContentChange: () => {},
  className: "",
  config: {},
}

export default Editor
