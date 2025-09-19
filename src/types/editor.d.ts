// Global type declarations for the editor module

declare module '@tech-library/react-editor' {
  import { EditorComponentProps, EditorRef } from './index';

  const Editor: React.ForwardRefExoticComponent<
    EditorComponentProps & React.RefAttributes<EditorRef>
  >;

  export default Editor;
  export * from './index';
}

// Extend global types if needed
declare global {
  interface Window {
    ReactContentEditor?: {
      version: string;
      config: any;
    };
  }
}

// Module augmentation for third-party libraries if needed
declare module 'marked' {
  interface MarkedOptions {
    // Add any custom options if needed
  }
}

declare module 'turndown' {
  interface Options {
    // Add any custom options if needed
  }
}