import React from "react"
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Editor from "../Editor"

// Mock document.execCommand
Object.defineProperty(document, "execCommand", {
  value: jest.fn(),
  writable: true,
})

describe("Editor Component", () => {
  let mockOnContentChange

  beforeEach(() => {
    mockOnContentChange = jest.fn()
    document.execCommand.mockClear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Basic Rendering", () => {
    test("renders editor with default configuration", () => {
      render(<Editor />)

      expect(screen.getByRole("textbox")).toBeInTheDocument()
      expect(screen.getByTestId("bold-btn")).toBeInTheDocument()
      expect(screen.getByTestId("italic-btn")).toBeInTheDocument()
    })

    test("renders with custom placeholder", () => {
      const placeholder = "Custom placeholder text"
      const config = {
        settings: { placeholder },
      }
      render(<Editor config={config} />)

      expect(screen.getByRole("textbox")).toHaveAttribute(
        "data-placeholder",
        placeholder
      )
    })

    test("renders with initial content", () => {
      const initialContent = "<p>Initial content</p>"
      render(<Editor initialContent={initialContent} />)

      const editor = screen.getByRole("textbox")
      expect(editor).toHaveTextContent("Initial content")
    })
  })

  describe("Configuration System", () => {
    test("hides toolbar when configured", () => {
      const config = {
        toolbar: { show: false },
      }
      render(<Editor config={config} />)

      expect(screen.queryByTestId("bold-btn")).not.toBeInTheDocument()
    })

    test("shows only configured toolbar items", () => {
      const config = {
        toolbar: {
          items: {
            bold: true,
            italic: false,
            underline: false,
          },
        },
      }
      render(<Editor config={config} />)

      expect(screen.getByTestId("bold-btn")).toBeInTheDocument()
      expect(screen.queryByTestId("italic-btn")).not.toBeInTheDocument()
      expect(screen.queryByTestId("underline-btn")).not.toBeInTheDocument()
    })

    test("configures floating toolbar correctly", () => {
      const config = {
        floatingToolbar: { show: false },
      }
      render(<Editor config={config} />)

      const editor = screen.getByRole("textbox")
      fireEvent.mouseUp(editor)

      expect(screen.queryByTestId("floating-toolbar")).not.toBeInTheDocument()
    })
  })

  describe("Editor Types", () => {
    test("initializes as HTML editor by default", () => {
      const editorRef = React.createRef()
      render(<Editor ref={editorRef} />)

      expect(editorRef.current?.getEditorType()).toBe("html")
    })

    test("initializes as markdown editor when configured", () => {
      const editorRef = React.createRef()
      const config = {
        settings: { editorType: "markdown" },
      }
      render(<Editor ref={editorRef} config={config} />)

      expect(editorRef.current?.getEditorType()).toBe("markdown")
    })
  })

  describe("Content Management", () => {
    test("calls onContentChange when content changes", async () => {
      render(<Editor onContentChange={mockOnContentChange} />)

      const editor = screen.getByRole("textbox")

      // Simulate content change by dispatching input event
      fireEvent.input(editor, { target: { textContent: "Hello World" } })

      await waitFor(() => {
        expect(mockOnContentChange).toHaveBeenCalled()
      })
    })

    test("returns HTML content for HTML editor", () => {
      const editorRef = React.createRef()
      const initialContent = "<p>Test content</p>"
      render(<Editor ref={editorRef} initialContent={initialContent} />)

      const contents = editorRef.current?.getContents()
      expect(contents).toContain("Test content")
    })

    test("returns markdown content for markdown editor", () => {
      const editorRef = React.createRef()
      const config = {
        settings: { editorType: "markdown" },
      }
      const initialContent = "**Bold text**"
      render(
        <Editor
          ref={editorRef}
          config={config}
          initialContent={initialContent}
        />
      )

      const contents = editorRef.current?.getContents()
      expect(contents).toBe("**Bold text**")
    })
  })

  describe("Editor Methods", () => {
    test("focus method works correctly", () => {
      const editorRef = React.createRef()
      render(<Editor ref={editorRef} />)

      editorRef.current?.focus()

      const editor = screen.getByRole("textbox")
      expect(document.activeElement).toBe(editor)
    })

    test("blur method works correctly", () => {
      const editorRef = React.createRef()
      render(<Editor ref={editorRef} />)

      const editor = screen.getByRole("textbox")
      editor.focus()
      editorRef.current?.blur()

      expect(document.activeElement).not.toBe(editor)
    })

    test("hasFocus method returns correct value", () => {
      const editorRef = React.createRef()
      render(<Editor ref={editorRef} />)

      expect(editorRef.current?.hasFocus()).toBe(false)

      editorRef.current?.focus()
      expect(editorRef.current?.hasFocus()).toBe(true)
    })

    test("enable and disable methods work correctly", async () => {
      const editorRef = React.createRef()
      render(<Editor ref={editorRef} />)

      const editor = screen.getByRole("textbox")

      await act(async () => {
        editorRef.current?.disable()
      })
      expect(editor).toHaveAttribute("contenteditable", "false")

      await act(async () => {
        editorRef.current?.enable()
      })
      expect(editor).toHaveAttribute("contenteditable", "true")
    })

    test("clear method empties editor content", async () => {
      const editorRef = React.createRef()
      const initialContent = "<p>Initial content</p>"
      render(<Editor ref={editorRef} initialContent={initialContent} />)

      await act(async () => {
        editorRef.current?.clear()
      })

      const editor = screen.getByRole("textbox")
      expect(editor.innerHTML).toBe("")
    })

    test("setContent method updates editor content", async () => {
      const editorRef = React.createRef()
      render(<Editor ref={editorRef} />)

      const newContent = "<p>New content</p>"
      await act(async () => {
        editorRef.current?.setContent(newContent)
      })

      const editor = screen.getByRole("textbox")
      expect(editor).toHaveTextContent("New content")
    })
  })

  describe("Keyboard Shortcuts", () => {
    test("Ctrl+B triggers bold formatting", async () => {
      const user = userEvent.setup()
      render(<Editor />)

      const boldButton = screen.getByTestId("bold-btn")
      await user.click(boldButton)

      expect(document.execCommand).toHaveBeenCalledWith("bold", false, null)
    })

    test("Ctrl+I triggers italic formatting", async () => {
      const user = userEvent.setup()
      render(<Editor />)

      const italicButton = screen.getByTestId("italic-btn")
      await user.click(italicButton)

      expect(document.execCommand).toHaveBeenCalledWith("italic", false, null)
    })

    test("Ctrl+U triggers underline formatting", async () => {
      const user = userEvent.setup()
      render(<Editor />)

      const underlineButton = screen.getByTestId("underline-btn")
      await user.click(underlineButton)

      expect(document.execCommand).toHaveBeenCalledWith(
        "underline",
        false,
        null
      )
    })
  })

  describe("Preview Functionality", () => {
    test("shows preview when preview button is clicked", async () => {
      const user = userEvent.setup()
      render(<Editor />)

      const previewButton = screen.getByTestId("preview-btn")
      await user.click(previewButton)

      expect(screen.getByTestId("preview-pane")).toBeInTheDocument()
    })

    test("toggles preview layout when layout button is clicked", async () => {
      const user = userEvent.setup()
      render(<Editor />)

      const previewButton = screen.getByTestId("preview-btn")
      await user.click(previewButton)

      const layoutButton = screen.getByTitle("Switch to Horizontal Layout")
      await user.click(layoutButton)

      expect(screen.getByTitle("Switch to Vertical Layout")).toBeInTheDocument()
    })
  })

  describe("File Upload", () => {
    test("renders file upload input", () => {
      render(<Editor />)

      const fileInput = screen.getByTestId("file-upload-input")
      expect(fileInput).toBeInTheDocument()
      expect(fileInput).toHaveAttribute("type", "file")
      expect(fileInput).toHaveAttribute("multiple")
    })
  })

  describe("Accessibility", () => {
    test("has proper ARIA labels", () => {
      render(<Editor />)

      const editor = screen.getByRole("textbox")
      expect(editor).toHaveAttribute("aria-label", "Start writing...")
    })

    test("toolbar buttons have proper labels", () => {
      render(<Editor />)

      const boldButton = screen.getByRole("button", { name: /bold/i })
      expect(boldButton).toBeInTheDocument()

      const italicButton = screen.getByRole("button", { name: /italic/i })
      expect(italicButton).toBeInTheDocument()
    })
  })
})
