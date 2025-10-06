import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from "react"
import "./index.css"
import "./input.css"

// Type imports
import { EditorProps, EditorRef, EditorConfig, EditorType } from "./types/index"

// Components - TypeScript converted components from index
import { PreviewPane, Toolbar } from "./components"

// Components - JavaScript components imported directly
import FloatingToolbar from "./components/FloatingToolbar"
import FileUpload from "./components/FileUpload"
import EditorContent from "./components/EditorContent"
import InputModal from "./components/InputModal"
import InlineLinkInsert from "./components/InlineLinkInsert"

// Hooks - JavaScript hooks imported directly
import { useEditorContent } from "./hooks/useEditorContent"
import { useFloatingToolbar } from "./hooks/useFloatingToolbar"
import { useEditorCommands } from "./hooks/useEditorCommands"
import { useFileUpload } from "./hooks/useFileUpload"
import { usePreview } from "./hooks/usePreview"
import { useInputModal } from "./hooks/useInputModal"
import { useInlineLinkInsert } from "./hooks/useInlineLinkInsert"
import useMarkdownEditor from "./hooks/useMarkdownEditor"

// Configuration
import { mergeEditorConfig } from "./editorConfig"

const Editor = forwardRef<EditorRef, EditorProps>(
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
    const editorConfig: EditorConfig = mergeEditorConfig(config)

    // Extract commonly used config values
    const finalPlaceholder = editorConfig.settings?.placeholder || placeholder
    const finalInitialContent =
      editorConfig.settings?.initialContent || initialContent
    const editorType: EditorType = editorConfig.settings?.editorType || "html"

    // State for enable/disable functionality
    const [isEnabled, setIsEnabled] = useState<boolean>(true)

    // State for maximize/minimize functionality
    const [isMaximized, setIsMaximized] = useState<boolean>(false)

    // Refs
    const editorRef = useRef<HTMLDivElement>(null)
    const toolbarRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

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
    const toggleMaximize = useCallback((): void => {
      setIsMaximized(prev => !prev)
    }, [])

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
      (): EditorRef => ({
        // Focus the editor
        focus: (): void => {
          if (editorRef.current) {
            editorRef.current.focus()
          }
        },

        // Remove focus from the editor
        blur: (): void => {
          if (editorRef.current) {
            editorRef.current.blur()
          }
        },

        // Check if editor has focus
        hasFocus: (): boolean => {
          return document.activeElement === editorRef.current
        },

        // Enable the editor
        enable: (): void => {
          setIsEnabled(true)
          if (editorRef.current) {
            editorRef.current.contentEditable = "true"
            editorRef.current.style.opacity = "1"
            editorRef.current.style.pointerEvents = "auto"
          }
        },

        // Disable the editor
        disable: (): void => {
          setIsEnabled(false)
          if (editorRef.current) {
            editorRef.current.contentEditable = "false"
            editorRef.current.style.opacity = "0.6"
            editorRef.current.style.pointerEvents = "none"
            editorRef.current.blur() // Remove focus when disabling
          }
        },

        // Get current content (legacy method, returns processed content)
        getContent: (): string => content,

        // Get contents based on editor type (raw content from DOM)
        getContents: (): string => {
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
        setContent: (newContent: string): void => {
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
        isEnabled: (): boolean => isEnabled,

        // Clear all content
        clear: (): void => {
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
        getEditorType: (): string => editorType,

        // Convert content between formats
        convertContent: (
          content: string,
          fromType: EditorType,
          toType: EditorType
        ): string => convertContent(content, fromType, toType),

        // Maximize/minimize editor
        maximize: (): void => setIsMaximized(true),
        minimize: (): void => setIsMaximized(false),
        toggleMaximize: (): void => toggleMaximize(),
        isMaximized: (): boolean => isMaximized,
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

      const handleMouseUp = (): void => {
        setTimeout(() => handleTextSelection(editorRef), 10)
      }
      const handleKeyUp = (): void => {
        setTimeout(() => handleTextSelection(editorRef), 10)
      }
      const handleKeyDown = (e: Event): void => {
        if (isMarkdown) {
          handleMarkdownKeyDown(e as KeyboardEvent)
        }
      }
      const handleClick = (e: MouseEvent): void => {
        if (!toolbarRef.current?.contains(e.target as Node)) {
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
        {editorConfig.toolbar?.show && (
          <Toolbar
            config={editorConfig.toolbar.items || {}}
            typography={
              editorConfig.typography || { fontFamilies: [], fontSizes: [] }
            }
            execCommand={
              isMarkdown
                ? (markdownCommands as unknown as typeof execCommand)
                : execCommand
            }
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

        {editorConfig.floatingToolbar?.show && (
          <FloatingToolbar
            ref={toolbarRef}
            config={editorConfig.floatingToolbar.items || {}}
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
              spellCheck={editorConfig.settings?.spellCheck ?? true}
              disabled={!isEnabled}
              editorType={editorType}
            />

            <InlineLinkInsert
              isVisible={linkInsertState.isVisible}
              position={linkInsertState.position}
              selectedText={linkInsertState.selectedText}
              onInsertLink={(url: string) =>
                handleInlineLinkInsert(url, execCommand)
              }
              onCancel={hideLinkInsert}
            />
          </div>

          {editorConfig.features?.preview && (
            <PreviewPane
              content={content}
              isVisible={isPreviewVisible}
              layout={previewLayout}
              editorType={editorType}
            />
          )}
        </div>

        {editorConfig.features?.fileUpload && (
          <FileUpload
            ref={fileInputRef}
            uploadedFiles={
              uploadedFiles as unknown as Array<{
                id: string
                name: string
                size: number
                type: string
                url: string
                uploadedAt: Date
              }>
            }
            onFileUpload={handleFileUpload}
          />
        )}

        {editorConfig.features?.customModals && (
          <InputModal
            isVisible={modalState.isVisible}
            title={modalState.title}
            placeholder={modalState.placeholder}
            defaultValue={modalState.defaultValue}
            buttonText={modalState.buttonText}
            inputType={
              modalState.inputType as
                | "text"
                | "email"
                | "password"
                | "url"
                | "number"
            }
            onSubmit={modalState.onSubmit}
            onCancel={modalState.onCancel}
          />
        )}
      </div>
    )
  }
)

Editor.displayName = "Editor"

export default Editor
