import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Toolbar from "../components/Toolbar"

describe("Toolbar Component", () => {
  const mockHandleCommand = jest.fn()
  const mockOnFileUpload = jest.fn()
  const mockOnPreviewToggle = jest.fn()
  const mockOnLayoutToggle = jest.fn()

  const defaultProps = {
    config: {
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      heading1: true,
      heading2: true,
      heading3: true,
      fontFamily: true,
      fontSize: true,
      alignLeft: true,
      alignCenter: true,
      alignRight: true,
      alignJustify: true,
      orderedList: true,
      unorderedList: true,
      link: true,
      inlineCode: true,
      codeBlock: true,
      fileUpload: true,
      textColor: true,
      backgroundColor: true,
      preview: true,
      previewLayout: true,
    },
    typography: {
      fontFamilies: [
        { label: "Default", value: "" },
        { label: "Arial", value: "Arial, sans-serif" },
      ],
      fontSizes: [
        { label: "Default", value: "" },
        { label: "Small", value: "1" },
        { label: "Normal", value: "3" },
      ],
    },
    execCommand: mockHandleCommand,
    insertLink: jest.fn(),
    insertInlineCode: jest.fn(),
    insertCodeBlock: jest.fn(),
    onFileUploadClick: mockOnFileUpload,
    isPreviewVisible: false,
    previewLayout: "vertical",
    onTogglePreview: mockOnPreviewToggle,
    onToggleLayout: mockOnLayoutToggle,
    disabled: false,
    editorType: "html",
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("Basic Rendering", () => {
    test("renders toolbar with default configuration", () => {
      render(<Toolbar {...defaultProps} />)

      expect(screen.getByTestId("bold-btn")).toBeInTheDocument()
      expect(screen.getByTestId("italic-btn")).toBeInTheDocument()
      expect(screen.getByTestId("underline-btn")).toBeInTheDocument()
    })

    test("renders toolbar when disabled", () => {
      render(<Toolbar {...defaultProps} disabled={true} />)

      const boldButton = screen.getByTestId("bold-btn")
      expect(boldButton).toBeDisabled()
    })

    test("does not render when show is false", () => {
      const config = {
        ...defaultProps.config,
        bold: false,
        italic: false,
        underline: false,
      }
      render(<Toolbar {...defaultProps} config={config} />)

      expect(screen.queryByTestId("bold-btn")).not.toBeInTheDocument()
    })
  })

  describe("Configuration-based Rendering", () => {
    test("shows only configured toolbar items", () => {
      const config = {
        bold: true,
        italic: false,
        underline: true,
        strikethrough: false,
      }
      render(<Toolbar {...defaultProps} config={config} />)

      expect(screen.getByTestId("bold-btn")).toBeInTheDocument()
      expect(screen.queryByTestId("italic-btn")).not.toBeInTheDocument()
      expect(screen.getByTestId("underline-btn")).toBeInTheDocument()
      expect(screen.queryByTestId("strikethrough-btn")).not.toBeInTheDocument()
    })

    test("renders all configured options regardless of editor type", () => {
      const config = {
        bold: true,
        italic: true,
        underline: true,
        fontFamily: true,
        fontSize: true,
      }
      render(
        <Toolbar {...defaultProps} config={config} editorType="markdown" />
      )

      expect(screen.getByTestId("bold-btn")).toBeInTheDocument()
      expect(screen.getByTestId("italic-btn")).toBeInTheDocument()
      expect(screen.getByTestId("underline-btn")).toBeInTheDocument()
      expect(screen.getByTestId("font-family-select")).toBeInTheDocument()
      expect(screen.getByTestId("font-size-select")).toBeInTheDocument()
    })

    test("shows heading options when configured", () => {
      const config = {
        heading1: true,
        heading2: true,
        heading3: true,
      }
      render(<Toolbar {...defaultProps} config={config} />)

      expect(screen.getByTestId("format-select")).toBeInTheDocument()
      expect(screen.getByText("Heading 1")).toBeInTheDocument()
      expect(screen.getByText("Heading 2")).toBeInTheDocument()
      expect(screen.getByText("Heading 3")).toBeInTheDocument()
    })

    test("shows alignment options when configured", () => {
      const config = {
        alignLeft: true,
        alignCenter: true,
        alignRight: true,
        alignJustify: true,
      }
      render(<Toolbar {...defaultProps} config={config} />)

      expect(screen.getByTitle("Align Left")).toBeInTheDocument()
      expect(screen.getByTitle("Center")).toBeInTheDocument()
      expect(screen.getByTitle("Align Right")).toBeInTheDocument()
      expect(screen.getByTitle("Justify")).toBeInTheDocument()
    })

    test("shows list options when configured", () => {
      const config = {
        orderedList: true,
        unorderedList: true,
      }
      render(<Toolbar {...defaultProps} config={config} />)

      expect(screen.getByTitle("Numbered List")).toBeInTheDocument()
      expect(screen.getByTitle("Bullet List")).toBeInTheDocument()
    })
  })

  describe("Command Handling", () => {
    test("handles bold command", async () => {
      const user = userEvent.setup()
      render(<Toolbar {...defaultProps} />)

      const boldButton = screen.getByTestId("bold-btn")
      await user.click(boldButton)

      expect(mockHandleCommand).toHaveBeenCalledWith("bold", undefined)
    })

    test("handles italic command", async () => {
      const user = userEvent.setup()
      render(<Toolbar {...defaultProps} />)

      const italicButton = screen.getByTestId("italic-btn")
      await user.click(italicButton)

      expect(mockHandleCommand).toHaveBeenCalledWith("italic", undefined)
    })

    test("handles heading commands", async () => {
      const config = { heading1: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const formatSelect = screen.getByTestId("format-select")
      fireEvent.change(formatSelect, { target: { value: "h1" } })

      expect(mockHandleCommand).toHaveBeenCalledWith("formatBlock", "h1")
    })

    test("handles alignment commands", async () => {
      const user = userEvent.setup()
      const config = { alignCenter: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const alignButton = screen.getByTitle("Center")
      await user.click(alignButton)

      expect(mockHandleCommand).toHaveBeenCalledWith("justifyCenter", undefined)
    })

    test("handles list commands", async () => {
      const user = userEvent.setup()
      const config = { orderedList: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const listButton = screen.getByTitle("Numbered List")
      await user.click(listButton)

      expect(mockHandleCommand).toHaveBeenCalledWith(
        "insertOrderedList",
        undefined
      )
    })
  })

  describe("Font Selection", () => {
    test("renders font family dropdown when configured", () => {
      const config = { fontFamily: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const fontSelect = screen.getByTestId("font-family-select")
      expect(fontSelect).toBeInTheDocument()
    })

    test("handles font family selection", async () => {
      const config = { fontFamily: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const fontSelect = screen.getByTestId("font-family-select")
      fireEvent.change(fontSelect, { target: { value: "Arial, sans-serif" } })

      expect(mockHandleCommand).toHaveBeenCalledWith(
        "fontName",
        "Arial, sans-serif"
      )
    })

    test("renders font size dropdown when configured", () => {
      const config = { fontSize: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const sizeSelect = screen.getByTestId("font-size-select")
      expect(sizeSelect).toBeInTheDocument()
    })

    test("handles font size selection", async () => {
      const config = { fontSize: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const sizeSelect = screen.getByTestId("font-size-select")
      fireEvent.change(sizeSelect, { target: { value: "3" } })

      expect(mockHandleCommand).toHaveBeenCalledWith("fontSize", "3")
    })
  })

  describe("Color Selection", () => {
    test("renders text color picker when configured", () => {
      const config = { textColor: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const colorPicker = screen.getByTestId("text-color-picker")
      expect(colorPicker).toBeInTheDocument()
    })

    test("handles text color selection", async () => {
      const config = { textColor: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const colorPicker = screen.getByTestId("text-color-picker")
      fireEvent.change(colorPicker, { target: { value: "#ff0000" } })

      expect(mockHandleCommand).toHaveBeenCalledWith("foreColor", "#ff0000")
    })

    test("renders background color picker when configured", () => {
      const config = { backgroundColor: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const colorPicker = screen.getByTestId("background-color-picker")
      expect(colorPicker).toBeInTheDocument()
    })

    test("handles background color selection", async () => {
      const config = { backgroundColor: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const colorPicker = screen.getByTestId("background-color-picker")
      fireEvent.change(colorPicker, { target: { value: "#00ff00" } })

      expect(mockHandleCommand).toHaveBeenCalledWith("hiliteColor", "#00ff00")
    })
  })

  describe("Code Features", () => {
    test("renders code buttons when configured", () => {
      const config = {
        inlineCode: true,
        codeBlock: true,
      }
      render(<Toolbar {...defaultProps} config={config} />)

      expect(screen.getByTitle("Insert Inline Code")).toBeInTheDocument()
      expect(screen.getByTitle("Insert Code Block")).toBeInTheDocument()
    })

    test("handles inline code command", async () => {
      const user = userEvent.setup()
      const config = { inlineCode: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const codeButton = screen.getByTitle("Insert Inline Code")
      await user.click(codeButton)

      expect(defaultProps.insertInlineCode).toHaveBeenCalled()
    })

    test("handles code block command", async () => {
      const user = userEvent.setup()
      const config = { codeBlock: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const codeBlockButton = screen.getByTitle("Insert Code Block")
      await user.click(codeBlockButton)

      expect(defaultProps.insertCodeBlock).toHaveBeenCalled()
    })
  })

  describe("File Upload", () => {
    test("renders file upload button when configured", () => {
      const config = { fileUpload: true }
      render(<Toolbar {...defaultProps} config={config} />)

      expect(screen.getByTestId("file-upload-btn")).toBeInTheDocument()
    })

    test("handles file upload click", async () => {
      const user = userEvent.setup()
      const config = { fileUpload: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const fileUploadButton = screen.getByTestId("file-upload-btn")
      await user.click(fileUploadButton)

      expect(mockOnFileUpload).toHaveBeenCalled()
    })
  })

  describe("Preview Features", () => {
    test("renders preview button when configured", () => {
      const config = { preview: true }
      render(<Toolbar {...defaultProps} config={config} />)

      expect(screen.getByTestId("preview-btn")).toBeInTheDocument()
    })

    test("handles preview toggle", async () => {
      const user = userEvent.setup()
      const config = { preview: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const previewButton = screen.getByTestId("preview-btn")
      await user.click(previewButton)

      expect(mockOnPreviewToggle).toHaveBeenCalled()
    })

    test("renders layout toggle when preview is shown", () => {
      const config = { previewLayout: true }
      render(
        <Toolbar {...defaultProps} config={config} isPreviewVisible={true} />
      )

      expect(
        screen.getByTitle("Switch to Horizontal Layout")
      ).toBeInTheDocument()
    })

    test("handles layout toggle", async () => {
      const user = userEvent.setup()
      const config = { previewLayout: true }
      render(
        <Toolbar {...defaultProps} config={config} isPreviewVisible={true} />
      )

      const layoutButton = screen.getByTitle("Switch to Horizontal Layout")
      await user.click(layoutButton)

      expect(mockOnLayoutToggle).toHaveBeenCalled()
    })

    test("shows correct layout button text based on current layout", () => {
      const config = { previewLayout: true }
      render(
        <Toolbar
          {...defaultProps}
          config={config}
          isPreviewVisible={true}
          previewLayout="horizontal"
        />
      )

      expect(screen.getByTitle("Switch to Vertical Layout")).toBeInTheDocument()
    })
  })

  describe("Link Features", () => {
    test("renders link button when configured", () => {
      const config = { link: true }
      render(<Toolbar {...defaultProps} config={config} />)

      expect(screen.getByTestId("link-btn")).toBeInTheDocument()
    })

    test("handles link command", async () => {
      const user = userEvent.setup()
      const config = { link: true }
      render(<Toolbar {...defaultProps} config={config} />)

      const linkButton = screen.getByTestId("link-btn")
      await user.click(linkButton)

      expect(defaultProps.insertLink).toHaveBeenCalled()
    })
  })

  describe("Accessibility", () => {
    test("all buttons have proper aria-labels", () => {
      render(<Toolbar {...defaultProps} />)

      const boldButton = screen.getByTestId("bold-btn")
      expect(boldButton).toHaveAttribute("aria-label")

      const italicButton = screen.getByTestId("italic-btn")
      expect(italicButton).toHaveAttribute("aria-label")
    })

    test("disabled buttons are not focusable", () => {
      render(<Toolbar {...defaultProps} disabled={true} />)

      const boldButton = screen.getByTestId("bold-btn")
      expect(boldButton).toBeDisabled()
    })
  })
})
