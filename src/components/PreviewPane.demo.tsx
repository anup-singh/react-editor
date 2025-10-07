// Test file to verify TypeScript conversion of PreviewPane
import React from "react"
import PreviewPane, { PreviewPaneProps } from "./PreviewPane"
import { EditorType, PreviewLayout } from "../types"

// Test TypeScript interfaces and types
const testProps: PreviewPaneProps = {
  content: "<p>Hello <strong>world</strong>!</p>",
  isVisible: true,
  layout: "vertical",
  editorType: "html",
}

const markdownTestProps: PreviewPaneProps = {
  content: "# Hello **world**!",
  isVisible: true,
  layout: "horizontal",
  editorType: "markdown",
}

// Test type safety
const validLayouts: PreviewLayout[] = ["vertical", "horizontal"]
const validEditorTypes: EditorType[] = ["html", "markdown"]

// Test component instantiation with proper typing
const TestComponent: React.FC = () => {
  const [layout, setLayout] = React.useState<PreviewLayout>("vertical")
  const [editorType, setEditorType] = React.useState<EditorType>("html")
  const [content, setContent] = React.useState<string>("Test content")
  const [isVisible, setIsVisible] = React.useState<boolean>(true)

  const handleLayoutChange = (newLayout: PreviewLayout): void => {
    setLayout(newLayout)
  }

  const handleEditorTypeChange = (newType: EditorType): void => {
    setEditorType(newType)
  }

  const handleContentChange = (newContent: string): void => {
    setContent(newContent)
  }

  const toggleVisibility = (): void => {
    setIsVisible(!isVisible)
  }

  return (
    <div>
      <h2>PreviewPane TypeScript Test</h2>

      <div className="controls">
        <button onClick={() => handleLayoutChange("vertical")}>
          Vertical Layout
        </button>
        <button onClick={() => handleLayoutChange("horizontal")}>
          Horizontal Layout
        </button>
        <button onClick={() => handleEditorTypeChange("html")}>
          HTML Mode
        </button>
        <button onClick={() => handleEditorTypeChange("markdown")}>
          Markdown Mode
        </button>
        <button onClick={toggleVisibility}>Toggle Visibility</button>
      </div>

      <div className="content-controls">
        <textarea
          value={content}
          onChange={e => handleContentChange(e.target.value)}
          placeholder="Enter content to preview..."
          rows={5}
          cols={50}
        />
      </div>

      <PreviewPane
        content={content}
        isVisible={isVisible}
        layout={layout}
        editorType={editorType}
      />
    </div>
  )
}

// Test default props behavior
const MinimalPreviewPane: React.FC = () => {
  const minimalProps: Omit<PreviewPaneProps, "editorType"> = {
    content: "<p>Minimal example</p>",
    isVisible: true,
    layout: "vertical",
  }

  return (
    <PreviewPane
      {...minimalProps}
      // editorType will default to 'html'
    />
  )
}

// Export test data for verification
export const testData = {
  testProps,
  markdownTestProps,
  validLayouts,
  validEditorTypes,
}

export { TestComponent, MinimalPreviewPane }
export default TestComponent
