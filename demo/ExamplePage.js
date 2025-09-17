import * as React from 'react';
import { useState, useRef } from 'react';
import Editor from '../src/index';

const ExamplePage = () => {
  const [editorContent, setEditorContent] = useState('<p>Welcome to your custom content editor!</p><p>Try these features:</p><ul><li>Select text to see the floating toolbar</li><li>Use the main toolbar for formatting</li><li>Upload images and files</li><li>Add links and change colors</li></ul>');
  const [minimalEditorContent, setMinimalEditorContent] = useState('<p>This is a minimal editor with basic formatting.</p>');
  const [markdownEditorContent, setMarkdownEditorContent] = useState('# Welcome to Markdown Mode!\n\nThis editor supports **Markdown** syntax:\n\n- Use **bold** and *italic* text\n- Create [links](https://example.com)\n- Add `inline code` and\n\n```\ncode blocks\n```\n\n## Try these shortcuts:\n- **Ctrl+B** for bold\n- **Ctrl+I** for italic\n- **Ctrl+K** for links');
  const [typographyEditorContent, setTypographyEditorContent] = useState('<p>This is a <strong>typography-focused editor</strong> with custom font options. Try selecting different fonts from the dropdown menu!</p>');

  // Editor refs to access methods
  const fullEditorRef = useRef(null);
  const minimalEditorRef = useRef(null);
  const markdownEditorRef = useRef(null);
  const typographyEditorRef = useRef(null);

  const handleContentChange = (content) => {
    setEditorContent(content);
    console.log('Content changed:', content);
  };

  const handleMinimalContentChange = (content) => {
    setMinimalEditorContent(content);
    console.log('Minimal editor content changed:', content);
  };

  const handleMarkdownContentChange = (content) => {
    setMarkdownEditorContent(content);
    console.log('Markdown editor content changed:', content);
  };

  const handleTypographyContentChange = (content) => {
    setTypographyEditorContent(content);
    console.log('Typography editor content changed:', content);
  };

  // Editor control methods
  const focusFullEditor = () => {
    fullEditorRef.current?.focus();
  };

  const blurFullEditor = () => {
    fullEditorRef.current?.blur();
  };

  const checkFullEditorFocus = () => {
    const hasFocus = fullEditorRef.current?.hasFocus();
    alert(`Full editor has focus: ${hasFocus}`);
  };

  const enableFullEditor = () => {
    fullEditorRef.current?.enable();
  };

  const disableFullEditor = () => {
    fullEditorRef.current?.disable();
  };

  const clearFullEditor = () => {
    fullEditorRef.current?.clear();
  };

  const setFullEditorContent = () => {
    fullEditorRef.current?.setContent('<p>Content set programmatically!</p>');
  };

  const getFullEditorContents = () => {
    const contents = fullEditorRef.current?.getContents();
    const editorType = fullEditorRef.current?.getEditorType();
    alert(`Editor Type: ${editorType}\n\nContents:\n${contents}`);
  };

  const getMarkdownEditorContents = () => {
    const contents = markdownEditorRef.current?.getContents();
    const editorType = markdownEditorRef.current?.getEditorType();
    alert(`Editor Type: ${editorType}\n\nContents:\n${contents}`);
  };

  // Configuration for minimal editor
  const minimalConfig = {
    toolbar: {
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
  };

  // Configuration for markdown editor
  const markdownConfig = {
    toolbar: {
      items: {
        bold: true,
        italic: true,
        strikethrough: true,
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
        // Disable HTML-specific features
        underline: false,
        alignLeft: false,
        alignCenter: false,
        alignRight: false,
        alignJustify: false,
        fontFamily: false,
        fontSize: false,
        textColor: false,
        backgroundColor: false,
        fileUpload: false
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
      preview: true,
      fileUpload: false
    },
    settings: {
      placeholder: 'Write in Markdown syntax...',
      editorType: 'markdown'
    }
  };

  // Configuration with custom typography options
  const customTypographyConfig = {
    toolbar: {
      items: {
        bold: true,
        italic: true,
        underline: true,
        fontFamily: true,
        fontSize: true,
        textColor: true,
        backgroundColor: true,
        link: true,
        // Disable other features to focus on typography
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
        inlineCode: false,
        codeBlock: false,
        fileUpload: false,
        preview: false,
        previewLayout: false
      }
    },
    typography: {
      fontFamilies: [
        { label: 'Default', value: '' },
        { label: 'Roboto', value: 'Roboto, sans-serif' },
        { label: 'Open Sans', value: 'Open Sans, sans-serif' },
        { label: 'Lato', value: 'Lato, sans-serif' },
        { label: 'Montserrat', value: 'Montserrat, sans-serif' },
        { label: 'Playfair Display', value: 'Playfair Display, serif' },
        { label: 'Source Code Pro', value: 'Source Code Pro, monospace' }
      ],
      fontSizes: [
        { label: 'Default', value: '' },
        { label: 'Small', value: '1' },
        { label: 'Normal', value: '3' },
        { label: 'Large', value: '5' },
        { label: 'Extra Large', value: '7' }
      ]
    },
    settings: {
      placeholder: 'Typography-focused editor with custom font options...'
    }
  };

  return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Custom React Content Editor
        </h1>

        {/* Navigation as */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Examples & Documentation</h3>
          <div className="flex flex-wrap gap-4">
            <a
              href="/api-example"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              📡 API Integration Example
            </a>
            <a
              href="/page-2"
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              📖 More Examples
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Learn how to integrate the editor with server APIs, send content in multiple formats, and handle file uploads.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Full Featured Editor</h2>

          {/* Editor Control Buttons */}
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={focusFullEditor}
              className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Focus
            </button>
            <button
              onClick={blurFullEditor}
              className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Blur
            </button>
            <button
              onClick={checkFullEditorFocus}
              className="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Check Focus
            </button>
            <button
              onClick={enableFullEditor}
              className="px-3 py-2 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600"
            >
              Enable
            </button>
            <button
              onClick={disableFullEditor}
              className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Disable
            </button>
            <button
              onClick={clearFullEditor}
              className="px-3 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
            >
              Clear
            </button>
            <button
              onClick={setFullEditorContent}
              className="px-3 py-2 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
            >
              Set Content
            </button>
            <button
              onClick={getFullEditorContents}
              className="px-3 py-2 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600"
            >
              Get Contents
            </button>
          </div>

          <Editor
            ref={fullEditorRef}
            initialContent={editorContent}
            placeholder="Start writing your content here..."
            onContentChange={handleContentChange}
            className="mb-6"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Minimal Editor (Custom Config)</h2>
          <Editor
            ref={minimalEditorRef}
            config={minimalConfig}
            initialContent={minimalEditorContent}
            onContentChange={handleMinimalContentChange}
            className="mb-6"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Markdown Editor</h2>
          <p className="text-sm text-gray-600 mb-3">
            This editor supports Markdown syntax. Try keyboard shortcuts: <strong>Ctrl+B</strong> (bold), <strong>Ctrl+I</strong> (italic), <strong>Ctrl+K</strong> (link)
          </p>

          {/* Markdown Editor Control Button */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={getMarkdownEditorContents}
              className="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Get Markdown Contents
            </button>
          </div>

          <Editor
            ref={markdownEditorRef}
            config={markdownConfig}
            initialContent={markdownEditorContent}
            onContentChange={handleMarkdownContentChange}
            className="mb-6"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Typography Editor (Custom Font Options)</h2>
          <p className="text-sm text-gray-600 mb-3">
            This editor demonstrates custom typography configuration with different font families and sizes.
          </p>

          <Editor
            ref={typographyEditorRef}
            config={customTypographyConfig}
            initialContent={typographyEditorContent}
            onContentChange={handleTypographyContentChange}
            className="mb-6"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Features:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800">Text Formatting:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Bold, Italic, Underline, Strikethrough</li>
                <li>Headings (H1, H2, H3)</li>
                <li>Text alignment (Left, Center, Right)</li>
                <li>Text and highlight colors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Content Features:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Bullet and numbered lists</li>
                <li>a insertion</li>
                <li>Image and file uploads</li>
                <li>Floating toolbar on text selection</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">How to Use:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use the toolbar above the editor for formatting options</li>
            <li>• Select text to reveal the floating formatting toolbar</li>
            <li>• Click the 📎 button to upload images and files</li>
            <li>• Click the 🔗 button to add links</li>
            <li>• Use color pickers to change text and background colors</li>
          </ul>
        </div>
      </div>
  );
};

export default ExamplePage;
