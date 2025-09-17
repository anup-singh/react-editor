# Editor Component Architecture

This editor component has been refactored following the single responsibility principle. Each component and hook has a specific purpose.

## Features

✨ **Rich Text Formatting**: Bold, italic, underline, strikethrough, headings, alignment
🔗 **Link Insertion**: Easy link creation with URL prompts
💻 **Code Support**: Inline code and code blocks with syntax highlighting
📁 **File Upload**: Image and document upload with preview
👁️ **Live Preview**: Real-time preview with split-screen layouts
🎨 **Custom Styling**: Professional editor appearance with responsive design

## Structure

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

## Components

### Editor.js (Main Component)

- Orchestrates all sub-components
- Manages refs and event listeners
- Clean and focused on composition

### Toolbar.js

- Renders main formatting toolbar
- Text formatting buttons (bold, italic, etc.)
- Link and code insertion buttons
- Live preview toggle controls
- Color pickers and format dropdowns

### FloatingToolbar.js

- Selection-based toolbar
- Appears when text is selected
- Minimal formatting options

### FileUpload.js

- File input handling
- Displays uploaded files list
- Supports images and documents

### EditorContent.js

- ContentEditable implementation
- Content initialization
- Input event handling

### PreviewPane.js

- Real-time content preview
- Split layout support (vertical/horizontal)
- Formatted HTML rendering

## Hooks

### useEditorContent

- Content state management
- Change detection and callbacks
- Content synchronization

### useFloatingToolbar

- Text selection detection
- Toolbar positioning logic
- Show/hide state management

### useEditorCommands

- Document.execCommand wrapper
- Text formatting command execution
- Link insertion with URL prompts
- Inline code and code block insertion
- Language-specific code highlighting
- Cursor preservation

### useFileUpload

- File processing logic
- FileReader API handling
- Uploaded files tracking

### usePreview

- Live preview state management
- Layout switching (vertical/horizontal)
- Preview visibility control

## Benefits of This Architecture

1. **Single Responsibility**: Each component has one clear purpose
2. **Reusability**: Components can be used independently
3. **Testability**: Small, focused units are easier to test
4. **Maintainability**: Changes are isolated to specific components
5. **Readability**: Clean separation of concerns
6. **Composition**: Easy to add/remove features

## Usage

### Basic Usage

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

### Configuration System

The editor supports extensive customization through a configuration object. By default, all features are enabled, but you can customize the toolbar, features, and settings to match your needs.

```jsx
import Editor from "./components/Editor"

// Minimal editor with only basic formatting
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

// Writer-focused editor
const writerConfig = {
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
  settings: {
    placeholder: "Start writing your story...",
    spellCheck: true,
  },
}

// Code-focused editor
const codeConfig = {
  toolbar: {
    items: {
      inlineCode: true,
      codeBlock: true,
      fileUpload: true,
      preview: true,
      // Text formatting disabled
      bold: false,
      italic: false,
    },
  },
  floatingToolbar: { show: false },
  settings: { spellCheck: false },
}

const MyComponent = () => {
  return (
    <div>
      <h3>Minimal Editor</h3>
      <Editor config={minimalConfig} />

      <h3>Writer Editor</h3>
      <Editor config={writerConfig} />

      <h3>Code Editor</h3>
      <Editor config={codeConfig} />
    </div>
  )
}
```

### Configuration Options

- **Toolbar Items**: Control which buttons appear in the toolbar

  - Text formatting: `bold`, `italic`, `underline`, `strikethrough`
  - Alignment: `alignLeft`, `alignCenter`, `alignRight`, `alignJustify`
  - Lists: `orderedList`, `unorderedList`
  - Headings: `heading1`, `heading2`, `heading3`
  - Typography: `fontFamily`, `fontSize`
  - Colors: `textColor`, `backgroundColor`
  - Code: `inlineCode`, `codeBlock`
  - Media: `link`, `fileUpload`
  - View: `preview`, `previewLayout`

- **Features**: Enable/disable major functionality

  - `toolbar.show`: Show/hide entire toolbar
  - `floatingToolbar.show`: Show/hide floating toolbar
  - `features.preview`: Enable preview functionality
  - `features.fileUpload`: Enable file upload
  - `features.customModals`: Use custom modals vs browser prompts

- **Settings**: Configure editor behavior
  - `settings.placeholder`: Placeholder text
  - `settings.spellCheck`: Enable/disable spell checking
  - `settings.initialContent`: Default content

📖 **For complete configuration documentation, see [CONFIG.md](./CONFIG.md)**

### Props

| Prop              | Type       | Default              | Description                                 |
| ----------------- | ---------- | -------------------- | ------------------------------------------- |
| `config`          | `Object`   | `{}`                 | Configuration object for customizing editor |
| `initialContent`  | `string`   | `''`                 | Initial HTML content                        |
| `placeholder`     | `string`   | `'Start writing...'` | Placeholder text                            |
| `onContentChange` | `function` | -                    | Callback when content changes               |
| `className`       | `string`   | `''`                 | Additional CSS classes                      |
