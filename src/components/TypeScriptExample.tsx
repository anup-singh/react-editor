import React, { useState, useCallback } from 'react';
import { EditorConfig, EditorProps } from '@/types';

interface TypeScriptExampleProps {
  title?: string;
  onConfigChange?: (config: EditorConfig) => void;
}

const TypeScriptExample: React.FC<TypeScriptExampleProps> = ({
  title = "TypeScript Editor Example",
  onConfigChange
}) => {
  const [config, setConfig] = useState<EditorConfig>({
    toolbar: {
      show: true,
      items: {
        bold: true,
        italic: true,
        underline: true,
        link: true,
      }
    },
    features: {
      preview: true,
      fileUpload: false,
    },
    settings: {
      placeholder: "Start writing with TypeScript support...",
      editorType: "html",
      spellCheck: true,
    }
  });

  const [content, setContent] = useState<string>("");

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    console.log('Content changed:', newContent);
  }, []);

  const handleConfigUpdate = useCallback((newConfig: EditorConfig) => {
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  }, [onConfigChange]);

  const togglePreview = useCallback(() => {
    const newConfig: EditorConfig = {
      ...config,
      features: {
        ...config.features,
        preview: !config.features?.preview,
      }
    };
    handleConfigUpdate(newConfig);
  }, [config, handleConfigUpdate]);

  const toggleFileUpload = useCallback(() => {
    const newConfig: EditorConfig = {
      ...config,
      features: {
        ...config.features,
        fileUpload: !config.features?.fileUpload,
      }
    };
    handleConfigUpdate(newConfig);
  }, [config, handleConfigUpdate]);

  return (
    <div className="typescript-example">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="controls mb-4 space-x-4">
        <button
          onClick={togglePreview}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          type="button"
        >
          {config.features?.preview ? 'Disable' : 'Enable'} Preview
        </button>

        <button
          onClick={toggleFileUpload}
          className="px-4 py-2 bg-green-500 text-white rounded hover:green-600"
          type="button"
        >
          {config.features?.fileUpload ? 'Disable' : 'Enable'} File Upload
        </button>
      </div>

      <div className="editor-container border rounded-lg p-4">
        {/* This would be where the actual Editor component goes */}
        <div className="mock-editor bg-gray-100 p-4 rounded">
          <p className="text-gray-600">
            Editor would be rendered here with TypeScript support
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Preview: {config.features?.preview ? 'Enabled' : 'Disabled'} |
            File Upload: {config.features?.fileUpload ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Current Content:</h3>
        <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
          {content || 'No content yet...'}
        </pre>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Current Config:</h3>
        <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TypeScriptExample;