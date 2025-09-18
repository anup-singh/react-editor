# React Content Editor

A modern, feature-rich content editor built with React. This editor provides a comprehensive rich text editing experience with customizable configurations for different use cases.

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

## Markdown Support

The editor provides full markdown support, allowing you to work with markdown content seamlessly.

### Using Markdown Content

```jsx
import Editor from "@tech-library/react-editor"

const MarkdownEditor = () => {
  const markdownContent = `# Welcome to Markdown

This is a **bold** statement and this is *italic*.

## Code Example

Here's some inline \`code\` and a code block:

\`\`\`javascript
const greeting = "Hello, World!"
console.log(greeting)
\`\`\`

## Lists

- Item 1
- Item 2
  - Nested item
  - Another nested item

1. First item
2. Second item
3. Third item

## Links and Images

[Visit our website](https://example.com)

> This is a blockquote with **bold** text.
`

  const handleContentChange = (content) => {
    console.log("Markdown content:", content)
  }

  return (
    <Editor
      initialContent={markdownContent}
      placeholder="Write your markdown here..."
      onContentChange={handleContentChange}
      config={{
        features: {
          preview: true, // Enable preview to see rendered markdown
        },
        settings: {
          placeholder: "Start writing in markdown...",
        },
      }}
    />
  )
}
```

### Markdown-Optimized Configuration

For the best markdown editing experience, use this configuration:

```jsx
const markdownConfig = {
  toolbar: {
    items: {
      bold: true,
      italic: true,
      heading1: true,
      heading2: true,
      heading3: true,
      orderedList: true,
      unorderedList: true,
      link: true,
      inlineCode: true,
      codeBlock: true,
      preview: true,
      previewLayout: true,
    },
  },
  features: {
    preview: true,
    inlineLinkInsert: true,
  },
  settings: {
    placeholder: "Write your markdown here...",
    spellCheck: true,
  },
}

const MarkdownEditor = () => {
  return (
    <Editor
      config={markdownConfig}
      initialContent="# Start Writing\n\nYour **markdown** content here..."
    />
  )
}
```

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

| Prop              | Type       | Default              | Description                                           |
| ----------------- | ---------- | -------------------- | ----------------------------------------------------- |
| `config`          | `Object`   | `{}`                 | Configuration object for customizing editor           |
| `initialContent`  | `string`   | `''`                 | Initial HTML or Markdown content                      |
| `placeholder`     | `string`   | `'Start writing...'` | Placeholder text                                      |
| `onContentChange` | `function` | -                    | Callback when content changes (receives HTML/Markdown) |
| `className`       | `string`   | `''`                 | Additional CSS classes                                |

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