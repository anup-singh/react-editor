# React Content Editor

A modern, feature-rich content editor built with **React and TypeScript**. This editor provides a comprehensive rich text editing experience with customizable configurations for different use cases.

🚀 **[Live Demo on CodeSandbox](https://codesandbox.io/p/devbox/distracted-snowflake-kn38z5?workspaceId=ws_GPfy7MZUG3485SYHQTd1LM)**

## Features

✨ **Rich Text Formatting**: Bold, italic, underline, strikethrough, headings, alignment

🔗 **Link Insertion**: Easy link creation with URL prompts and inline link insertion

💻 **Code Support**: Inline code and code blocks with syntax highlighting

📝 **Markdown Support**: Native markdown input/output with live preview

⌨️ **Keyboard Shortcuts**: Full keyboard shortcuts support in both HTML and Markdown modes

📁 **File Upload**: Image and document upload with preview

👁️ **Live Preview**: Real-time preview with vertical/horizontal split-screen layouts

🎨 **Custom Styling**: Professional editor appearance with responsive design

🎛️ **Floating Toolbar**: Context-sensitive floating toolbar on text selection

⚙️ **Fully Configurable**: Extensive customization options for different use cases

🔧 **TypeScript Ready**: Built with TypeScript, comprehensive type definitions included

🎯 **ES Module Support**: Modern ES module architecture with tree-shaking support

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

### Keyboard Shortcuts

The editor supports keyboard shortcuts in both HTML and Markdown modes:

#### Universal Shortcuts (Both Modes)
- **Ctrl+B** (or Cmd+B on Mac) - Bold formatting
- **Ctrl+I** (or Cmd+I on Mac) - Italic formatting
- **Ctrl+U** (or Cmd+U on Mac) - Underline formatting (HTML mode)
- **Ctrl+K** (or Cmd+K on Mac) - Insert link
- **Ctrl+Shift+X** (or Cmd+Shift+X on Mac) - Strikethrough formatting (HTML mode)

#### Markdown Mode Specific
- **Tab** - Insert 2 spaces for indentation
- **Enter** - Smart list continuation for numbered and bulleted lists

#### HTML Mode Specific
- Full `document.execCommand` support for rich text formatting
- All toolbar functions accessible via keyboard

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

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `focus()` | Focuses the editor | - | `void` |
| `blur()` | Removes focus from the editor | - | `void` |
| `hasFocus()` | Checks if editor currently has focus | - | `boolean` |
| `enable()` | Enables the editor (makes it editable) | - | `void` |
| `disable()` | Disables the editor (makes it read-only) | - | `void` |
| `clear()` | Clears all content from the editor | - | `void` |
| `setContent(content)` | Sets editor content programmatically | `content: string` | `void` |
| `getContent()` | Gets processed editor content | - | `string` |
| `getContents()` | Gets raw editor content from DOM | - | `string` |
| `getEditorType()` | Gets the current editor type | - | `'html' \| 'markdown'` |
| `convertContent()` | Convert content between formats | `content: string, from: EditorType, to: EditorType` | `string` |
| `isEnabled()` | Checks if editor is currently enabled | - | `boolean` |
| `maximize()` | Maximizes the editor to fullscreen | - | `void` |
| `minimize()` | Minimizes the editor from fullscreen | - | `void` |
| `toggleMaximize()` | Toggles editor maximize state | - | `void` |
| `isMaximized()` | Checks if editor is currently maximized | - | `boolean` |

## Configuration Tips

- Only specify options you want to change (smart defaults apply)
- `config.settings.placeholder` overrides the `placeholder` prop
- All toolbar items default to `true` if not specified
- Use `show: false` to hide entire sections
- Configuration is merged with defaults, so partial configs work perfectly
- Enable `preview: true` in features for the best markdown editing experience
- The editor automatically detects and handles both HTML and Markdown content

## Project Architecture

This package is built with modern TypeScript and follows best practices for maintainability and type safety.

### File Structure
```
src/
├── components/          # React components (TypeScript)
│   ├── Editor.tsx      # Main editor component
│   ├── Toolbar.tsx     # Toolbar component with full styling
│   ├── FloatingToolbar.tsx
│   ├── PreviewPane.tsx # Live preview component
│   └── ...
├── hooks/              # Custom React hooks (TypeScript)
│   ├── useEditorCommands.ts
│   ├── useMarkdownEditor.ts
│   ├── useEditorContent.ts
│   └── ...
├── utils/              # Utility functions (TypeScript)
│   └── markdownConverter.ts  # Markdown/HTML conversion
├── types/              # TypeScript type definitions
│   ├── index.ts        # Main type exports
│   └── editor.d.ts     # Module declarations
├── index.ts           # Main entry point
└── editorConfig.ts    # Default configuration
```

### TypeScript Migration Benefits
- 🔒 **Type Safety**: Full compile-time type checking
- 📝 **IntelliSense**: Rich IDE support with autocomplete
- 🔧 **Refactoring**: Safe code refactoring with confidence
- 📚 **Self-Documenting**: Types serve as documentation
- 🎯 **Modern ES Modules**: Tree-shaking support for smaller bundles

## TypeScript Support

This package includes comprehensive TypeScript definitions. All types are automatically available when using TypeScript.

### Type Imports

```typescript
import Editor, {
  EditorProps,
  EditorRef,
  EditorConfig,
  ToolbarConfig,
  SettingsConfig,
  EditorType,
  PreviewLayout
} from '@tech-library/react-editor';
```

### TypeScript Usage Example

```typescript
import React, { useRef } from 'react';
import Editor, { EditorRef, EditorConfig } from '@tech-library/react-editor';

const MyTypedComponent: React.FC = () => {
  const editorRef = useRef<EditorRef>(null);

  const config: EditorConfig = {
    toolbar: {
      show: true,
      items: {
        bold: true,
        italic: true,
        heading1: true
      }
    },
    settings: {
      editorType: 'markdown',
      placeholder: 'Start writing in Markdown...'
    }
  };

  const handleContentChange = (content: string): void => {
    console.log('Content changed:', content);
  };

  const focusEditor = (): void => {
    editorRef.current?.focus();
  };

  return (
    <div>
      <button onClick={focusEditor}>Focus Editor</button>
      <Editor
        ref={editorRef}
        config={config}
        onContentChange={handleContentChange}
        className="my-typed-editor"
      />
    </div>
  );
};
```

### Available Types

- `EditorProps` - Main component props interface
- `EditorRef` - Component ref methods interface
- `EditorConfig` - Configuration object interface
- `ToolbarConfig` - Toolbar configuration interface
- `SettingsConfig` - Settings configuration interface
- `EditorType` - Union type: `'html' | 'markdown'`
- `PreviewLayout` - Union type: `'vertical' | 'horizontal'`

### Utility Functions

The package exports several utility functions for content conversion and manipulation:

```typescript
import {
  markdownToHtml,
  htmlToMarkdown,
  getPlaceholderText,
  convertContent,
  isValidHtml,
  isValidMarkdown,
  detectContentType,
  cleanContent
} from '@tech-library/react-editor';

// Basic conversion
const html: string = markdownToHtml('**bold text**');
const markdown: string = htmlToMarkdown('<strong>bold text</strong>');

// Advanced content handling
const placeholder: string = getPlaceholderText('markdown', 'Custom placeholder');
const converted: string = convertContent(content, 'html', 'markdown');
const isHtml: boolean = isValidHtml('<p>Valid HTML</p>');
const isMd: boolean = isValidMarkdown('# Valid Markdown');
const contentType: 'html' | 'markdown' = detectContentType(content);
const cleaned: string = cleanContent(content, 'markdown');
```

### Available Utility Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `markdownToHtml` | Convert Markdown to HTML | `markdown: string` | `string` |
| `htmlToMarkdown` | Convert HTML to Markdown | `html: string` | `string` |
| `getPlaceholderText` | Get appropriate placeholder text | `editorType: EditorType, custom?: string` | `string` |
| `convertContent` | Convert content between formats | `content: string, from: EditorType, to: EditorType` | `string` |
| `isValidHtml` | Validate HTML content | `content: string` | `boolean` |
| `isValidMarkdown` | Validate Markdown content | `content: string` | `boolean` |
| `detectContentType` | Detect content type (HTML/Markdown) | `content: string` | `EditorType` |
| `cleanContent` | Clean and normalize content | `content: string, editorType: EditorType` | `string` |

## Latest Updates (v0.1.7)

### TypeScript Migration ✨
- **Complete TypeScript Conversion**: All source files migrated to TypeScript
- **Enhanced Type Safety**: Comprehensive type definitions for all components and hooks
- **Better Developer Experience**: Full IntelliSense support and compile-time error checking

### Keyboard Shortcuts Enhancement ⌨️
- **HTML Mode Shortcuts**: Added full keyboard shortcut support for HTML editing mode
- **Universal Shortcuts**: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K now work in both HTML and Markdown modes
- **Improved Accessibility**: Better keyboard navigation and focus management

### UI/UX Improvements 🎨
- **Enhanced Toolbar Styling**: Fixed CSS styling issues with proper Tailwind CSS implementation
- **Better Button Design**: Improved button layouts with logical grouping and visual hierarchy
- **Responsive Design**: Enhanced mobile and desktop responsiveness

### Core Functionality 🔧
- **ES Module Support**: Modern ES module architecture with tree-shaking support
- **Improved Error Handling**: Better error handling in markdown conversion utilities
- **Enhanced Configuration**: More flexible configuration options with better defaults

### Developer Experience 🛠️
- **Type Exports**: All types properly exported for external use
- **Utility Functions**: Extended utility functions for content manipulation
- **Better Documentation**: Comprehensive README with TypeScript examples

## Migration Guide

If you're upgrading from a previous version:

1. **TypeScript**: Types are now included by default - remove any `@types` packages
2. **Imports**: All imports remain the same - no breaking changes to the API
3. **Configuration**: All existing configurations continue to work unchanged
4. **Methods**: New methods added, all existing methods preserved

## License

MIT License