// Main type definitions entry point for @tech-library/react-editor
// This file serves as the primary declaration file for TypeScript consumers

// Re-export all types from the main types file
export * from './src/types/index';

// Import required types
import * as React from 'react';
import { EditorProps, EditorRef } from './src/types/index';

// Main Editor component declaration
declare const Editor: React.ForwardRefExoticComponent<
  EditorProps & React.RefAttributes<EditorRef>
>;

// Default export - the main Editor component
export default Editor;

// Named utility exports
export declare function markdownToHtml(markdown: string): string;
export declare function htmlToMarkdown(html: string): string;

// Component type declarations
export declare const PreviewPane: React.FC<any>;
export declare const Toolbar: React.FC<any>;

// Future hook exports (commented out until implementation is complete)
// export declare function useEditorContent(): any;
// export declare function useFloatingToolbar(): any;
// export declare function useEditorCommands(): any;
// export declare function useFileUpload(): any;
// export declare function usePreview(): any;

// Version information (optional)
// export declare const version: string;