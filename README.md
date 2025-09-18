# React Content Editor

A modern, feature-rich content editor built with React. This editor provides a comprehensive rich text editing experience with customizable configurations for different use cases.

🚀 **[Live Demo on CodeSandbox](https://codesandbox.io/p/devbox/distracted-snowflake-kn38z5?workspaceId=ws_GPfy7MZUG3485SYHQTd1LM)**

## Features

✨ **Rich Text Formatting**: Bold, italic, underline, strikethrough, headings, alignment

🔗 **Link Insertion**: Easy link creation with URL prompts

💻 **Code Support**: Inline code and code blocks with syntax highlighting

📝 **Markdown Support**: Native markdown input and output capabilities

📁 **File Upload**: Image and document upload with preview

👁️ **Live Preview**: Real-time preview with split-screen layouts

🎨 **Custom Styling**: Professional editor appearance with responsive design

⚙️ **Configurable**: Extensive customization options for different use cases

## Installation

```bash
npm i @tech-library/react-editor
```

## Basic Usage

### Default Editor (All Features Enabled)

```jsx
import Editor from "@tech-library/react-editor"

const MyComponent = () => {
  const handleContentChange = content => {
    console.log("Content changed:", content)
  }

  return (
    <Editor
      initialContent="<p>Hello World!</p>"
      placeholder="Start writing..."
      onContentChange={handleContentChange}
      className="my-editor"
    />
  )
}
```
![Default Editor (All Features Enabled)](https://github.com/anup-singh/react-editor/blob/feature/improved-readme/screens/full-editor.png)


### Custom Configuration

```jsx
import Editor from "@tech-library/react-editor"

const minimalConfig = {
  toolbar: {
    items: {
      bold: true,
      italic: true,
      link: true,
      // All other items will default to false
    },
  },
  features: {
    preview: false,
    fileUpload: false,
  },
}

const MyComponent = () => {
  return <Editor config={minimalConfig} />
}
```

![Default Editor (All Features Enabled)](https://github.com/anup-singh/react-editor/blob/feature/improved-readme/screens/minimal-custom-config.png)


## Markdown Support

The editor provides full markdown support, allowing you to work with markdown content seamlessly.

### Using Markdown Content

```jsx
import Editor from "@tech-library/react-editor"
import { useState } from "react"

const MarkdownEditor = () => {
  const [markdownContent, setMarkdownContent] = useState(
    '# Welcome to Markdown Mode!\n\n' +
    'This editor supports **Markdown** syntax:\n\n' +
    '- Use **bold** and *italic* text\n' +
    '- Create [links](https://example.com)\n' +
    '- Add `inline code` and\n\n' +
    '```\ncode blocks\n```\n\n' +
    '## Try these shortcuts:\n' +
    '- **Ctrl+B** for bold\n' +
    '- **Ctrl+I** for italic\n' +
    '- **Ctrl+K** for links'
  )

  const handleMarkdownContentChange = (content) => {
    setMarkdownContent(content)
    console.log("Markdown content:", content)
  }

  return (
    <Editor
      initialContent={markdownContent}
      onContentChange={handleMarkdownContentChange}
      config={{
        settings: {
          placeholder: "Write in Markdown syntax...",
          editorType: "markdown"
        }
      }}
    />
  )
}
```

### Markdown-Optimized Configuration

For the best markdown editing experience, use this configuration from our demo:

```jsx
const markdownConfig = {
  features: {
    preview: true,
    fileUpload: false
  },
  settings: {
    placeholder: 'Write in Markdown syntax...',
    editorType: 'markdown'
  }
}

const MarkdownEditor = () => {
  return (
    <Editor
      config={markdownConfig}
      initialContent="# Welcome to Markdown Mode!\n\nThis editor supports **Markdown** syntax..."
    />
  )
}
```
![Alt text](https://github.com/anup-singh/react-editor/blob/feature/improved-readme/screens/markdown-editor-preview.png)

### Supported Markdown Features

- **Headers**: `# H1`, `## H2`, `### H3`
- **Emphasis**: `**bold**`, `*italic*`, `~~strikethrough~~`
- **Lists**: Ordered (`1. item`) and unordered (`- item`)
- **Links**: `[text](url)` and `<url>`
- **Code**: Inline `` `code` `` and code blocks ``` ``` ```
- **Blockquotes**: `> quote text`
- **Images**: `![alt](src)`
- **Line breaks**: Double space or double newline
- **Horizontal rules**: `---` or `***`

### Keyboard Shortcuts (Markdown Mode)

- **Ctrl+B** (or Cmd+B on Mac) - Bold formatting
- **Ctrl+I** (or Cmd+I on Mac) - Italic formatting
- **Ctrl+K** (or Cmd+K on Mac) - Insert link

## Configuration Options

The editor supports extensive customization through a configuration object. Here are some common configurations:

### Minimal Editor
```jsx
const minimalConfig = {
  toolbar: {
    show: true,
    items: {
      bold: true,
      italic: true,
      underline: true,
      link: true,
      // All other items will default to false
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
      inlineCode: false,
      codeBlock: false,
      fileUpload: false,
      preview: false,
      previewLayout: false
    }
  },
  floatingToolbar: {
    show: true,
    items: {
      bold: true,
      italic: true,
      underline: false,
      link: true
    }
  },
  features: {
    preview: false,
    fileUpload: false
  },
  settings: {
    placeholder: 'Minimal editor - basic formatting only...'
  }
}
```

### Writer Editor
```jsx
const writer = {
  toolbar: {
    items: {
      bold: true,
      italic: true,
      underline: true,
      heading1: true,
      heading2: true,
      heading3: true,
      orderedList: true,
      unorderedList: true,
      preview: true,
      previewLayout: true,
    },
  },
  settings: { placeholder: "Start writing..." },
}
```

### Code Editor
```jsx
const code = {
  toolbar: {
    items: {
      inlineCode: true,
      codeBlock: true,
      fileUpload: true,
      preview: true,
      bold: false,
      italic: false,
    },
  },
  floatingToolbar: { show: false },
  settings: { spellCheck: false },
}
```

### No Toolbar
```jsx
const noToolbar = {
  toolbar: { show: false },
  floatingToolbar: { show: false },
}
```

## Complete Configuration Structure

```jsx
const editorConfig = {
  toolbar: {
    show: true, // Show/hide entire toolbar
    items: {
      // Text Formatting
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,

      // Alignment
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

      // Links & Code
      link: true,
      inlineCode: true,
      codeBlock: true,

      // Media
      fileUpload: true,

      // View
      preview: true,
      previewLayout: true,
    },
  },
  floatingToolbar: {
    show: true,
    items: {
      bold: true,
      italic: true,
      underline: true,
      link: true,
    },
  },
  features: {
    preview: true,
    fileUpload: true,
    inlineLinkInsert: true,
    customModals: true,
    dragAndDrop: true,
  },
  settings: {
    placeholder: "Start writing...",
    initialContent: "",
    autoFocus: false,
    spellCheck: true,
  },
}
```

## Props

| Prop              | Type       | Default              | Description                                           |
| ----------------- | ---------- | -------------------- | ----------------------------------------------------- |
| `config`          | `Object`   | `{}`                 | Configuration object for customizing editor           |
| `initialContent`  | `string`   | `''`                 | Initial HTML or Markdown content                      |
| `placeholder`     | `string`   | `'Start writing...'` | Placeholder text                                      |
| `onContentChange` | `function` | -                    | Callback when content changes (receives HTML/Markdown) |
| `className`       | `string`   | `''`                 | Additional CSS classes                                |
| `ref`             | `ref`      | -                    | React ref to access editor methods                   |

## Editor Methods

When using a ref, you can access these methods to control the editor programmatically:

```jsx
import { useRef } from 'react'
import Editor from "@tech-library/react-editor"

const MyComponent = () => {
  const editorRef = useRef(null)

  // Focus the editor
  const focusEditor = () => {
    editorRef.current?.focus()
  }

  // Remove focus from the editor
  const blurEditor = () => {
    editorRef.current?.blur()
  }

  // Check if editor currently has focus
  const checkEditorFocus = () => {
    const hasFocus = editorRef.current?.hasFocus()
    console.log(`Editor has focus: ${hasFocus}`)
  }

  // Enable the editor (make it editable)
  const enableEditor = () => {
    editorRef.current?.enable()
  }

  // Disable the editor (make it read-only)
  const disableEditor = () => {
    editorRef.current?.disable()
  }

  // Clear all content from the editor
  const clearEditor = () => {
    editorRef.current?.clear()
  }

  // Set content programmatically
  const setEditorContent = () => {
    editorRef.current?.setContent('<p>New content set programmatically!</p>')
  }

  // Get current content and editor type
  const getEditorContents = () => {
    const contents = editorRef.current?.getContents()
    const editorType = editorRef.current?.getEditorType()
    console.log(`Editor Type: ${editorType}`)
    console.log(`Contents: ${contents}`)
  }

  return (
    <div>
      {/* Control buttons */}
      <div className="mb-4 flex gap-2">
        <button onClick={focusEditor}>Focus</button>
        <button onClick={blurEditor}>Blur</button>
        <button onClick={checkEditorFocus}>Check Focus</button>
        <button onClick={enableEditor}>Enable</button>
        <button onClick={disableEditor}>Disable</button>
        <button onClick={clearEditor}>Clear</button>
        <button onClick={setEditorContent}>Set Content</button>
        <button onClick={getEditorContents}>Get Contents</button>
      </div>

      {/* Editor with ref */}
      <Editor
        ref={editorRef}
        initialContent="<p>Initial content</p>"
        placeholder="Start writing..."
      />
    </div>
  )
}
```

### Available Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `focus()` | Focuses the editor | `void` |
| `blur()` | Removes focus from the editor | `void` |
| `hasFocus()` | Checks if editor currently has focus | `boolean` |
| `enable()` | Enables the editor (makes it editable) | `void` |
| `disable()` | Disables the editor (makes it read-only) | `void` |
| `clear()` | Clears all content from the editor | `void` |
| `setContent(content)` | Sets editor content programmatically | `void` |
| `getContents()` | Gets current editor content | `string` |
| `getEditorType()` | Gets the current editor type (e.g., 'markdown', 'html') | `string` |

## Configuration Tips

- Only specify options you want to change (smart defaults apply)
- `config.settings.placeholder` overrides the `placeholder` prop
- All toolbar items default to `true` if not specified
- Use `show: false` to hide entire sections
- Configuration is merged with defaults, so partial configs work perfectly
- Enable `preview: true` in features for the best markdown editing experience
- The editor automatically detects and handles both HTML and Markdown content

## License

MIT License