// Default Editor Configuration
export const defaultEditorConfig = {
  // Toolbar Configuration
  toolbar: {
    show: true,
    items: {
      // Text Formatting
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,

      // Text Alignment
      alignLeft: true,
      alignCenter: true,
      alignRight: true,
      alignJustify: true,

      // Lists
      orderedList: true,
      unorderedList: true,

      // Headings
      heading1: true,
      heading2: true,
      heading3: true,

      // Typography
      fontFamily: true,
      fontSize: true,

      // Colors
      textColor: true,
      backgroundColor: true,

      // Links and Code
      link: true,
      inlineCode: true,
      codeBlock: true,

      // File Operations
      fileUpload: true,

      // View Options
      preview: true,
      previewLayout: true,
      maximize: true,

      // Advanced
      undo: true,
      redo: true,
      clearFormatting: true,
    },
  },

  // Floating Toolbar Configuration
  floatingToolbar: {
    show: true,
    items: {
      bold: true,
      italic: true,
      underline: true,
      link: true,
    },
  },

  // Editor Features
  features: {
    preview: true,
    fileUpload: true,
    inlineLinkInsert: true,
    customModals: true,
    dragAndDrop: true,
  },

  // Typography Configuration
  typography: {
    fontFamilies: [
      { label: "Default", value: "" },
      { label: "Arial", value: "Arial, sans-serif" },
      { label: "Helvetica", value: "Helvetica, sans-serif" },
      { label: "Times New Roman", value: "Times New Roman, serif" },
      { label: "Georgia", value: "Georgia, serif" },
      { label: "Courier New", value: "Courier New, monospace" },
      { label: "Verdana", value: "Verdana, sans-serif" },
      { label: "Comic Sans MS", value: "Comic Sans MS, cursive" },
      { label: "Impact", value: "Impact, fantasy" },
      { label: "Lucida Console", value: "Lucida Console, monospace" },
    ],
    fontSizes: [
      { label: "Default", value: "" },
      { label: "8pt", value: "1" },
      { label: "10pt", value: "2" },
      { label: "12pt", value: "3" },
      { label: "14pt", value: "4" },
      { label: "18pt", value: "5" },
      { label: "24pt", value: "6" },
      { label: "36pt", value: "7" },
    ],
  },

  // Default Settings
  settings: {
    placeholder: "Start writing...",
    initialContent: "",
    autoFocus: false,
    spellCheck: true,
    editorType: "html", // 'html' or 'markdown'
  },
}

// Helper function to merge user config with default config
export const mergeEditorConfig = (userConfig = {}) => {
  const merge = (target, source) => {
    const result = { ...target }

    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        result[key] = merge(target[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    }

    return result
  }

  return merge(defaultEditorConfig, userConfig)
}
