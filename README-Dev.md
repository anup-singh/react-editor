# React Content Editor

A modern, feature-rich content editor built with React. 
This editor provides a comprehensive rich text editing experience with customizable configurations for different use cases.

## Features

✨ **Rich Text Formatting**: Bold, italic, underline, strikethrough, headings, alignment
🔗 **Link Insertion**: Easy link creation with URL prompts
💻 **Code Support**: Inline code and code blocks with syntax highlighting
📁 **File Upload**: Image and document upload with preview
👁️ **Live Preview**: Real-time preview with split-screen layouts
🎨 **Custom Styling**: Professional editor appearance with responsive design
⚙️ **Configurable**: Extensive customization options for different use cases

## Quick Start

### Installation

```bash
npm install
```

## Basic Usage

### Default Editor (All Features Enabled)

```jsx
import Editor from "./components/Editor"

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

### Custom Configuration

```jsx
import Editor from "./components/Editor"

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

## Configuration Options

The editor supports extensive customization through a configuration object. Here are some common configurations:

### Minimal Editor
```jsx
const minimal = {
  toolbar: { items: { bold: true, italic: true, link: true } },
  features: { preview: false, fileUpload: false },
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

| Prop              | Type       | Default              | Description                                 |
| ----------------- | ---------- | -------------------- | ------------------------------------------- |
| `config`          | `Object`   | `{}`                 | Configuration object for customizing editor |
| `initialContent`  | `string`   | `''`                 | Initial HTML content                        |
| `placeholder`     | `string`   | `'Start writing...'` | Placeholder text                            |
| `onContentChange` | `function` | -                    | Callback when content changes               |
| `className`       | `string`   | `''`                 | Additional CSS classes                      |

## Architecture

### Component Structure

```
Editor/
├── components/
│   ├── Toolbar.js          # Main formatting toolbar with all controls
│   ├── FloatingToolbar.js  # Text selection toolbar
│   ├── FileUpload.js       # File upload and display
│   ├── EditorContent.js    # Contenteditable area
│   ├── PreviewPane.js      # Live preview with split layouts
│   └── index.js           # Component exports
├── hooks/
│   ├── useEditorContent.js    # Content state management
│   ├── useFloatingToolbar.js  # Selection toolbar logic
│   ├── useEditorCommands.js   # Format & code insertion commands
│   ├── useFileUpload.js       # File handling logic
│   ├── usePreview.js          # Live preview state management
│   └── index.js              # Hook exports
├── Editor.js              # Main editor component
├── index.js              # Main export
├── index.css            # Main styles with code highlighting
└── input.css           # Interactive styles and animations
```

### Key Components

- **Editor.js**: Main orchestrator component that manages refs and event listeners
- **Toolbar.js**: Renders main formatting toolbar with all controls
- **FloatingToolbar.js**: Selection-based toolbar that appears when text is selected
- **FileUpload.js**: Handles file input and displays uploaded files list
- **EditorContent.js**: ContentEditable implementation with content initialization
- **PreviewPane.js**: Real-time content preview with split layout support

### Hooks

- **useEditorContent**: Content state management and change detection
- **useFloatingToolbar**: Text selection detection and toolbar positioning
- **useEditorCommands**: Document.execCommand wrapper for formatting commands
- **useFileUpload**: File processing logic with FileReader API
- **usePreview**: Live preview state and layout management

## Technology Stack

- **React 18.2.0** - UI framework

## Development Commands

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run format` to format code
5. Test your changes
6. Submit a pull request

## License

MIT License - see LICENSE file for details