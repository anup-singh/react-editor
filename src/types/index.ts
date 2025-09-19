// Main type definitions for React Content Editor

export interface EditorConfig {
  toolbar?: ToolbarConfig;
  floatingToolbar?: FloatingToolbarConfig;
  features?: FeaturesConfig;
  settings?: SettingsConfig;
}

export interface ToolbarConfig {
  show?: boolean;
  items?: ToolbarItems;
}

export interface ToolbarItems {
  // Text Formatting
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;

  // Alignment
  alignLeft?: boolean;
  alignCenter?: boolean;
  alignRight?: boolean;
  alignJustify?: boolean;

  // Lists
  orderedList?: boolean;
  unorderedList?: boolean;

  // Headings
  heading1?: boolean;
  heading2?: boolean;
  heading3?: boolean;

  // Typography
  fontFamily?: boolean;
  fontSize?: boolean;

  // Colors
  textColor?: boolean;
  backgroundColor?: boolean;

  // Links & Code
  link?: boolean;
  inlineCode?: boolean;
  codeBlock?: boolean;

  // Media
  fileUpload?: boolean;

  // View
  preview?: boolean;
  previewLayout?: boolean;
}

export interface FloatingToolbarConfig {
  show?: boolean;
  items?: Pick<ToolbarItems, 'bold' | 'italic' | 'underline' | 'link'>;
}

export interface FeaturesConfig {
  preview?: boolean;
  fileUpload?: boolean;
  inlineLinkInsert?: boolean;
  customModals?: boolean;
  dragAndDrop?: boolean;
}

export interface SettingsConfig {
  placeholder?: string;
  initialContent?: string;
  autoFocus?: boolean;
  spellCheck?: boolean;
  editorType?: 'html' | 'markdown';
}

export interface EditorProps {
  config?: EditorConfig;
  initialContent?: string;
  placeholder?: string;
  onContentChange?: (content: string) => void;
  className?: string;
}

export interface EditorRef {
  focus: () => void;
  blur: () => void;
  hasFocus: () => boolean;
  enable: () => void;
  disable: () => void;
  clear: () => void;
  setContent: (content: string) => void;
  getContents: () => string;
  getEditorType: () => string;
}

// Component prop types
export interface EditorComponentProps extends EditorProps {
  ref?: React.Ref<EditorRef>;
}

// Event types
export interface ContentChangeEvent {
  content: string;
  editorType: 'html' | 'markdown';
}

// Utility types
export type EditorMode = 'edit' | 'preview' | 'split';
export type ThemeVariant = 'light' | 'dark';
export type FileType = 'image' | 'document' | 'video' | 'audio';