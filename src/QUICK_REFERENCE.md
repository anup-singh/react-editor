# Editor Configuration Quick Reference

## Import

```jsx
import Editor from "./components/Editor"
```

## Basic Usage

```jsx
// Default editor (all features enabled)
<Editor />

// With custom config
<Editor config={myConfig} />
```

## Configuration Object Structure

```jsx
const config = {
  toolbar: {
    show: boolean, // Show/hide toolbar
    items: {
      // Text Formatting
      bold: boolean,
      italic: boolean,
      underline: boolean,
      strikethrough: boolean,

      // Alignment
      alignLeft: boolean,
      alignCenter: boolean,
      alignRight: boolean,
      alignJustify: boolean,

      // Lists
      orderedList: boolean,
      unorderedList: boolean,

      // Headings
      heading1: boolean,
      heading2: boolean,
      heading3: boolean,

      // Typography
      fontFamily: boolean,
      fontSize: boolean,

      // Colors
      textColor: boolean,
      backgroundColor: boolean,

      // Links & Code
      link: boolean,
      inlineCode: boolean,
      codeBlock: boolean,

      // Media
      fileUpload: boolean,

      // View
      preview: boolean,
      previewLayout: boolean,
    },
  },
  floatingToolbar: {
    show: boolean,
    items: {
      bold: boolean,
      italic: boolean,
      underline: boolean,
      link: boolean,
    },
  },
  features: {
    preview: boolean,
    fileUpload: boolean,
    inlineLinkInsert: boolean,
    customModals: boolean,
    dragAndDrop: boolean,
  },
  settings: {
    placeholder: string,
    initialContent: string,
    autoFocus: boolean,
    spellCheck: boolean,
  },
}
```

## Quick Configs

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

## All Props

```jsx
<Editor
  config={configObject} // Configuration object
  initialContent="<p>Hi</p>" // Initial HTML content
  placeholder="Type here..." // Placeholder text
  onContentChange={handleChange} // Content change callback
  className="my-editor" // CSS classes
/>
```

## Tips

- Only specify options you want to change (smart defaults)
- `config.settings.placeholder` overrides `placeholder` prop
- All toolbar items default to `true` if not specified
- Use `show: false` to hide entire sections
