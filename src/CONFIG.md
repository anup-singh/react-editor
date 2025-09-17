# Editor Configuration Guide

The editor supports extensive customization through a configuration object. This guide shows you how to use the config system when initializing the editor.

## Basic Usage

### Default Editor (All Features Enabled)

```jsx
import Editor from './components/Editor';

// Default configuration - all features enabled
<Editor />

// Or explicitly pass empty config (same result)
<Editor config={{}} />
```

### Custom Configuration

```jsx
import Editor from "./components/Editor"

const myConfig = {
  toolbar: {
    show: true,
    items: {
      bold: true,
      italic: false,
      // ... other options
    },
  },
}

;<Editor config={myConfig} />
```

## Configuration Structure

### Complete Configuration Object

```jsx
const editorConfig = {
  // Toolbar Configuration
  toolbar: {
    show: true, // Show/hide entire toolbar
    items: {
      // Text Formatting
      bold: true, // Bold button
      italic: true, // Italic button
      underline: true, // Underline button
      strikethrough: true, // Strikethrough button

      // Text Alignment
      alignLeft: true, // Align left button
      alignCenter: true, // Align center button
      alignRight: true, // Align right button
      alignJustify: true, // Justify alignment button

      // Lists
      orderedList: true, // Numbered list button
      unorderedList: true, // Bullet list button

      // Headings
      heading1: true, // H1 option in format dropdown
      heading2: true, // H2 option in format dropdown
      heading3: true, // H3 option in format dropdown

      // Typography
      fontFamily: true, // Font family dropdown
      fontSize: true, // Font size dropdown

      // Colors
      textColor: true, // Text color picker
      backgroundColor: true, // Background/highlight color picker

      // Links and Code
      link: true, // Link insertion button
      inlineCode: true, // Inline code button
      codeBlock: true, // Code block button

      // File Operations
      fileUpload: true, // File upload button

      // View Options
      preview: true, // Preview toggle button
      previewLayout: true, // Layout switch button (vertical/horizontal)

      // Advanced (not yet implemented but reserved)
      undo: true, // Undo button
      redo: true, // Redo button
      clearFormatting: true, // Clear formatting button
    },
  },

  // Floating Toolbar Configuration (appears on text selection)
  floatingToolbar: {
    show: true, // Show/hide floating toolbar
    items: {
      bold: true, // Bold button in floating toolbar
      italic: true, // Italic button in floating toolbar
      underline: true, // Underline button in floating toolbar
      link: true, // Link button in floating toolbar
    },
  },

  // Editor Features
  features: {
    preview: true, // Enable preview functionality
    fileUpload: true, // Enable file upload capability
    inlineLinkInsert: true, // Enable inline link insertion for selected text
    customModals: true, // Use custom modals instead of browser prompts
    dragAndDrop: true, // Enable drag & drop (not yet implemented)
  },

  // Default Settings
  settings: {
    placeholder: "Start writing...", // Placeholder text
    initialContent: "", // Initial HTML content
    autoFocus: false, // Auto-focus editor on mount
    spellCheck: true, // Enable browser spell checking
  },
}

;<Editor config={editorConfig} />
```

## Common Configuration Examples

### 1. Minimal Editor (Basic Text Editing Only)

```jsx
const minimalConfig = {
  toolbar: {
    show: true,
    items: {
      bold: true,
      italic: true,
      underline: false,
      strikethrough: false,
      alignLeft: false,
      alignCenter: false,
      alignRight: false,
      alignJustify: false,
      orderedList: false,
      unorderedList: false,
      heading1: false,
      heading2: false,
      heading3: false,
      fontFamily: false,
      fontSize: false,
      textColor: false,
      backgroundColor: false,
      link: true,
      inlineCode: false,
      codeBlock: false,
      fileUpload: false,
      preview: false,
      previewLayout: false,
    },
  },
  floatingToolbar: {
    show: true,
    items: {
      bold: true,
      italic: true,
      underline: false,
      link: false,
    },
  },
  features: {
    preview: false,
    fileUpload: false,
    customModals: true,
  },
}

;<Editor config={minimalConfig} />
```

### 2. Writer-Focused Editor (Content Creation)

```jsx
const writerConfig = {
  toolbar: {
    show: true,
    items: {
      bold: true,
      italic: true,
      underline: true,
      strikethrough: false,
      alignLeft: true,
      alignCenter: true,
      alignRight: false,
      alignJustify: true,
      orderedList: true,
      unorderedList: true,
      heading1: true,
      heading2: true,
      heading3: true,
      textColor: false,
      backgroundColor: false,
      link: true,
      inlineCode: false,
      codeBlock: false,
      fileUpload: false,
      preview: true,
      previewLayout: true,
    },
  },
  settings: {
    placeholder: "Start writing your story...",
    spellCheck: true,
  },
}

;<Editor config={writerConfig} />
```

### 3. Code-Focused Editor (Technical Documentation)

```jsx
const codeConfig = {
  toolbar: {
    show: true,
    items: {
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      alignLeft: false,
      alignCenter: false,
      alignRight: false,
      alignJustify: false,
      orderedList: false,
      unorderedList: false,
      heading1: false,
      heading2: false,
      heading3: false,
      fontFamily: false,
      fontSize: false,
      textColor: false,
      backgroundColor: false,
      link: false,
      inlineCode: true,
      codeBlock: true,
      fileUpload: true,
      preview: true,
      previewLayout: true,
    },
  },
  floatingToolbar: {
    show: false,
  },
  settings: {
    placeholder: "Paste your code here...",
    spellCheck: false,
  },
}

;<Editor config={codeConfig} />
```

### 4. Comment System Editor (Simple & Clean)

```jsx
const commentConfig = {
  toolbar: {
    show: true,
    items: {
      bold: true,
      italic: true,
      underline: false,
      strikethrough: false,
      alignLeft: false,
      alignCenter: false,
      alignRight: false,
      alignJustify: false,
      orderedList: false,
      unorderedList: false,
      heading1: false,
      heading2: false,
      heading3: false,
      fontFamily: false,
      fontSize: false,
      textColor: false,
      backgroundColor: false,
      link: true,
      inlineCode: true,
      codeBlock: false,
      fileUpload: false,
      preview: false,
      previewLayout: false,
    },
  },
  floatingToolbar: {
    show: true,
    items: {
      bold: true,
      italic: true,
      underline: false,
      link: true,
    },
  },
  features: {
    preview: false,
    fileUpload: false,
  },
  settings: {
    placeholder: "Write your comment...",
    spellCheck: true,
  },
}

;<Editor config={commentConfig} />
```

### 5. No Toolbar Editor (Pure Content Editing)

```jsx
const noToolbarConfig = {
  toolbar: {
    show: false, // Hide entire toolbar
  },
  floatingToolbar: {
    show: false, // Hide floating toolbar too
  },
  features: {
    preview: false,
    fileUpload: false,
  },
  settings: {
    placeholder: "Type here...",
    spellCheck: true,
  },
}

;<Editor config={noToolbarConfig} />
```

## Configuration Tips

### 1. Partial Configuration

You don't need to specify every option. The system uses smart defaults:

```jsx
// This works - only overrides what you specify
const partialConfig = {
  toolbar: {
    items: {
      bold: true,
      italic: false,
      // All other items keep their default values
    },
  },
  settings: {
    placeholder: "Custom placeholder",
    // Other settings keep defaults
  },
}

;<Editor config={partialConfig} />
```

### 2. Dynamic Configuration

You can change configuration based on user roles, context, etc:

```jsx
const EditorComponent = ({ userRole, context }) => {
  const config =
    userRole === "admin"
      ? {
          // Full-featured config for admins
          toolbar: { show: true },
        }
      : {
          // Limited config for regular users
          toolbar: {
            items: {
              bold: true,
              italic: true,
              fileUpload: false,
            },
          },
        }

  return <Editor config={config} />
}
```

### 3. Environment-Based Configuration

```jsx
const config = {
  toolbar: {
    items: {
      preview: process.env.NODE_ENV === "development",
      fileUpload: process.env.ENABLE_FILE_UPLOAD === "true",
    },
  },
}

;<Editor config={config} />
```

## Advanced Usage

### Combining with Other Props

```jsx
<Editor
  config={myConfig}
  initialContent="<p>Welcome!</p>"
  placeholder="Start typing..." // Note: config.settings.placeholder takes precedence
  onContentChange={content => console.log(content)}
  className="my-custom-editor"
/>
```

### TypeScript Usage

```tsx
import { EditorConfig } from "./editorConfig"

const config: EditorConfig = {
  toolbar: {
    show: true,
    items: {
      bold: true,
      italic: false,
    },
  },
}

;<Editor config={config} />
```

## Troubleshooting

### Common Issues

1. **Toolbar items not hiding**: Make sure you're setting the item to `false`, not just omitting it
2. **Config not taking effect**: Ensure you're passing the config as a prop: `<Editor config={myConfig} />`
3. **Partial updates**: The system merges your config with defaults, so you only need to specify what you want to change

### Debugging Configuration

```jsx
import { mergeEditorConfig } from "./editorConfig"

const myConfig = {
  /* your config */
}
const finalConfig = mergeEditorConfig(myConfig)
// console.log("Final configuration:", finalConfig)

;<Editor config={myConfig} />
```

This documentation covers all aspects of configuring the editor. The configuration system is designed to be flexible while maintaining sensible defaults for ease of use.
