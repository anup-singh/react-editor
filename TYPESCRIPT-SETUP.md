# TypeScript Support

This project now supports TypeScript alongside JavaScript. You can write new components in TypeScript while keeping existing JavaScript files unchanged.

## 🚀 What's Included

### Dependencies Installed
- `typescript` - TypeScript compiler
- `@typescript-eslint/eslint-plugin` - ESLint plugin for TypeScript
- `@typescript-eslint/parser` - ESLint parser for TypeScript
- `ts-loader` - Webpack loader for TypeScript
- `@types/react` & `@types/react-dom` - Type definitions for React

### Configuration Files
- `tsconfig.json` - TypeScript compiler configuration
- Updated `webpack.config.js` - Added TypeScript file handling
- Updated `webpack.dev.server.js` - Added TypeScript support for development

## 📁 Project Structure

```
src/
├── components/
│   ├── ExistingComponent.js      # Keep existing JS files
│   └── TypeScriptExample.tsx     # New TS components
├── types/
│   ├── index.ts                  # Main type definitions
│   └── editor.d.ts              # Module declarations
└── utils/
    ├── helpers.js               # Keep existing JS files
    └── newHelper.ts             # New TS utilities
```

## 🎯 Usage Examples

### Creating TypeScript Components

```tsx
import React, { useState } from 'react';
import { EditorConfig, EditorProps } from '@/types';

interface MyComponentProps {
  title: string;
  config?: EditorConfig;
  onConfigChange?: (config: EditorConfig) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({
  title,
  config,
  onConfigChange
}) => {
  const [content, setContent] = useState<string>('');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div>
      <h2>{title}</h2>
      {/* Your component JSX */}
    </div>
  );
};

export default MyComponent;
```

### Using Type Definitions

```tsx
import { EditorConfig, ToolbarItems, FeaturesConfig } from '@/types';

// Fully typed configuration
const editorConfig: EditorConfig = {
  toolbar: {
    show: true,
    items: {
      bold: true,
      italic: true,
      link: true,
    }
  },
  features: {
    preview: true,
    fileUpload: false,
  },
  settings: {
    placeholder: "Start writing...",
    editorType: "markdown",
  }
};

// Partial configurations work too
const minimalConfig: Partial<EditorConfig> = {
  toolbar: {
    items: {
      bold: true,
      italic: true,
    }
  }
};
```

### Path Aliases

Use the configured path aliases for cleaner imports:

```tsx
// Instead of relative paths
import { EditorConfig } from '../../../types';
import MyComponent from '../../../components/MyComponent';

// Use aliases
import { EditorConfig } from '@/types';
import MyComponent from '@/components/MyComponent';
```

## 🛠 Available Scripts

### Type Checking
```bash
# Check types without emitting files
npm run type-check

# Watch mode for continuous type checking
npm run type-check:watch
```

### Development
```bash
# Start development server (supports both JS and TS)
npm start

# Build project (handles both JS and TS files)
npm run build
```

### Linting
```bash
# Lint both JS and TS files
npm run lint
```

## 🔧 Configuration Details

### TypeScript Configuration (`tsconfig.json`)
- **Target**: ES5 for broad compatibility
- **JSX**: react-jsx for modern React
- **Module**: ESNext for modern module syntax
- **Strict**: Disabled for gradual migration
- **Path aliases**: Configured for cleaner imports

### Webpack Configuration
- **ts-loader**: Handles `.ts` and `.tsx` files
- **Babel integration**: TypeScript + Babel for optimal output
- **Extensions**: Resolves `.ts`, `.tsx`, `.js`, `.jsx`
- **Aliases**: `@` points to `src/` directory

## 🎨 Migration Strategy

### For New Components
1. Create new files with `.tsx` extension
2. Use proper TypeScript interfaces
3. Leverage type definitions from `@/types`

### For Existing Components
1. **Keep existing `.js` files unchanged**
2. Gradually migrate by renaming to `.tsx`
3. Add type annotations incrementally

### Example Migration
```javascript
// Before (JavaScript)
const MyComponent = ({ title, onConfigChange }) => {
  const [config, setConfig] = useState({});
  // ...
};
```

```tsx
// After (TypeScript)
interface MyComponentProps {
  title: string;
  onConfigChange?: (config: EditorConfig) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onConfigChange }) => {
  const [config, setConfig] = useState<EditorConfig>({});
  // ...
};
```

## 📝 Type Definitions Available

### Core Types
- `EditorConfig` - Main editor configuration
- `EditorProps` - Component props interface
- `EditorRef` - Ref methods interface
- `ToolbarConfig` - Toolbar configuration
- `FeaturesConfig` - Features configuration
- `SettingsConfig` - Settings configuration

### Utility Types
- `EditorMode` - 'edit' | 'preview' | 'split'
- `ThemeVariant` - 'light' | 'dark'
- `FileType` - File type classifications

## 🔍 IDE Support

### VS Code
- Full IntelliSense support
- Automatic imports
- Type checking on save
- Error highlighting

### WebStorm/IntelliJ
- Native TypeScript support
- Advanced refactoring
- Type-aware code completion

## 🧪 Testing TypeScript Components

```tsx
// Example test file: MyComponent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';
import { EditorConfig } from '@/types';

const mockConfig: EditorConfig = {
  toolbar: { show: true },
  features: { preview: true },
};

test('renders TypeScript component', () => {
  render(<MyComponent title="Test" config={mockConfig} />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

## 🎯 Best Practices

1. **Start Small**: Begin with utility functions and new components
2. **Use Strict Types**: Prefer explicit types over `any`
3. **Leverage Inference**: Let TypeScript infer simple types
4. **Path Aliases**: Use `@/` for cleaner imports
5. **Gradual Migration**: Don't rush to convert everything at once

## 🚀 Next Steps

1. Create your first TypeScript component
2. Run `npm run type-check` to ensure no errors
3. Use the example in `src/components/TypeScriptExample.tsx`
4. Gradually migrate existing components as needed

Happy coding with TypeScript! 🎉