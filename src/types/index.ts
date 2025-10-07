// Main type definitions for React Content Editor
import * as React from "react"

export interface Typography {
  fontFamilies: Array<{ label: string; value: string }>
  fontSizes: Array<{ label: string; value: string }>
}

export interface EditorConfig {
  toolbar?: ToolbarConfig
  floatingToolbar?: FloatingToolbarConfig
  features?: FeaturesConfig
  typography?: Typography
  settings?: SettingsConfig
}

export interface ToolbarConfig {
  show?: boolean
  items?: ToolbarItems
}

export interface ToolbarItems {
  // Text Formatting
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean

  // Alignment
  alignLeft?: boolean
  alignCenter?: boolean
  alignRight?: boolean
  alignJustify?: boolean

  // Lists
  orderedList?: boolean
  unorderedList?: boolean

  // Headings
  heading1?: boolean
  heading2?: boolean
  heading3?: boolean

  // Typography
  fontFamily?: boolean
  fontSize?: boolean

  // Colors
  textColor?: boolean
  backgroundColor?: boolean

  // Links & Code
  link?: boolean
  inlineCode?: boolean
  codeBlock?: boolean

  // Media
  fileUpload?: boolean

  // View
  preview?: boolean
  previewLayout?: boolean
  maximize?: boolean

  // Advanced
  undo?: boolean
  redo?: boolean
  clearFormatting?: boolean
}

export interface FloatingToolbarConfig {
  show?: boolean
  items?: Pick<ToolbarItems, "bold" | "italic" | "underline" | "link">
}

export interface FeaturesConfig {
  preview?: boolean
  fileUpload?: boolean
  inlineLinkInsert?: boolean
  customModals?: boolean
  dragAndDrop?: boolean
}

export interface SettingsConfig {
  placeholder?: string
  initialContent?: string
  autoFocus?: boolean
  spellCheck?: boolean
  editorType?: "html" | "markdown"
}

export interface EditorProps {
  config?: EditorConfig
  initialContent?: string
  placeholder?: string
  onContentChange?: (content: string) => void
  className?: string
}

export interface EditorRef {
  focus: () => void
  blur: () => void
  hasFocus: () => boolean
  enable: () => void
  disable: () => void
  clear: () => void
  setContent: (content: string) => void
  getContent: () => string
  getContents: () => string
  getEditorType: () => string
  convertContent: (
    content: string,
    fromType: EditorType,
    toType: EditorType
  ) => string
  maximize: () => void
  minimize: () => void
  toggleMaximize: () => void
  isMaximized: () => boolean
  isEnabled: () => boolean
}

// Component prop types
export interface EditorComponentProps extends EditorProps {
  ref?: React.Ref<EditorRef>
}

// Event types
export interface ContentChangeEvent {
  content: string
  editorType: "html" | "markdown"
}

// Utility types
export type EditorMode = "edit" | "preview" | "split"
export type EditorType = "html" | "markdown"
export type PreviewLayout = "vertical" | "horizontal"
export type ThemeVariant = "light" | "dark"
export type FileType = "image" | "document" | "video" | "audio"

// Markdown converter types
export interface ConverterOptions {
  headingStyle?: "atx" | "setext"
  hr?: string
  bulletListMarker?: "-" | "*" | "+"
  codeBlockStyle?: "indented" | "fenced"
  fence?: string
  emDelimiter?: "_" | "*"
  strongDelimiter?: "**" | "__"
  linkStyle?: "inlined" | "referenced"
  linkReferenceStyle?: "full" | "collapsed" | "shortcut"
}

export interface MarkedOptions {
  breaks?: boolean
  gfm?: boolean
  sanitize?: boolean
  smartLists?: boolean
  smartypants?: boolean
  xhtml?: boolean
}

// Hook types
export type HookName =
  | "useEditorContent"
  | "useFloatingToolbar"
  | "useEditorCommands"
  | "useFileUpload"
  | "usePreview"

export type HookCategory = "content" | "ui" | "commands" | "file" | "preview"

export type HookMigrationStatus = "javascript" | "typescript"

export interface HookMetadata {
  name: HookName
  category: HookCategory
  status: HookMigrationStatus
  description: string
  returnType?: string
  parameters?: string[]
}

// Hook return types (placeholders for when hooks are converted)
export interface EditorContentState {
  content: string
  setContent: (content: string) => void
  isDirty: boolean
  wordCount: number
  characterCount: number
}

export interface FloatingToolbarState {
  isVisible: boolean
  position: { top: number; left: number }
  show: () => void
  hide: () => void
  updatePosition: () => void
}

export interface EditorCommands {
  bold: () => void
  italic: () => void
  underline: () => void
  strikethrough: () => void
  heading: (level: 1 | 2 | 3) => void
  link: (url: string, text?: string) => void
  insertText: (text: string) => void
  formatSelection: (format: string) => void
}

export interface FileUploadState {
  isUploading: boolean
  uploadProgress: number
  uploadedFiles: FileInfo[]
  uploadFile: (file: File) => Promise<string>
  removeFile: (fileId: string) => void
}

export interface FileInfo {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: Date
}

export interface PreviewState {
  isVisible: boolean
  content: string
  layout: PreviewLayout
  toggleVisibility: () => void
  setLayout: (layout: PreviewLayout) => void
  refreshPreview: () => void
}
