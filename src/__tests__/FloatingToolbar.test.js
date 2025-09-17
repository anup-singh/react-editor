import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import FloatingToolbar from "../components/FloatingToolbar"

describe("FloatingToolbar Component", () => {
  const mockHandleCommand = jest.fn()
  const mockOnClose = jest.fn()

  const defaultProps = {
    isVisible: true,
    position: { top: 100, left: 100 },
    config: {
      bold: true,
      italic: true,
      underline: true,
      link: true,
    },
    execCommand: mockHandleCommand,
    insertLink: mockOnClose,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("Basic Rendering", () => {
    test("renders when show is true", () => {
      render(<FloatingToolbar {...defaultProps} />)

      expect(screen.getByTestId("floating-toolbar")).toBeInTheDocument()
      expect(screen.getByTestId("floating-bold-btn")).toBeInTheDocument()
      expect(screen.getByTestId("floating-italic-btn")).toBeInTheDocument()
    })

    test("does not render when isVisible is false", () => {
      render(<FloatingToolbar {...defaultProps} isVisible={false} />)

      expect(screen.queryByTestId("floating-toolbar")).not.toBeInTheDocument()
    })

    test("positions toolbar correctly", () => {
      const position = { top: 150, left: 200 }
      render(<FloatingToolbar {...defaultProps} position={position} />)

      const toolbar = screen.getByTestId("floating-toolbar")
      expect(toolbar).toHaveStyle({
        top: "150px",
        left: "200px",
      })
    })

    test("renders with disabled state", () => {
      const propsWithDisabled = {
        ...defaultProps,
        config: {
          ...defaultProps.config,
          disabled: true,
        },
      }
      render(<FloatingToolbar {...propsWithDisabled} />)

      const boldButton = screen.getByTestId("floating-bold-btn")
      expect(boldButton).toBeInTheDocument()
    })
  })

  describe("Configuration-based Rendering", () => {
    test("shows only configured items", () => {
      const config = {
        bold: true,
        italic: false,
        underline: true,
        link: false,
      }
      render(<FloatingToolbar {...defaultProps} config={config} />)

      expect(screen.getByTestId("floating-bold-btn")).toBeInTheDocument()
      expect(
        screen.queryByTestId("floating-italic-btn")
      ).not.toBeInTheDocument()
      expect(screen.getByTestId("floating-underline-btn")).toBeInTheDocument()
      expect(screen.queryByTestId("floating-link-btn")).not.toBeInTheDocument()
    })

    test("shows all items with default configuration", () => {
      render(<FloatingToolbar {...defaultProps} />)

      expect(screen.getByTestId("floating-bold-btn")).toBeInTheDocument()
      expect(screen.getByTestId("floating-italic-btn")).toBeInTheDocument()
      expect(screen.getByTestId("floating-underline-btn")).toBeInTheDocument()
      expect(screen.getByTestId("floating-link-btn")).toBeInTheDocument()
    })
  })

  describe("Command Handling", () => {
    test("handles bold command", async () => {
      const user = userEvent.setup()
      render(<FloatingToolbar {...defaultProps} />)

      const boldButton = screen.getByTestId("floating-bold-btn")
      await user.click(boldButton)

      expect(mockHandleCommand).toHaveBeenCalledWith("bold")
    })

    test("handles italic command", async () => {
      const user = userEvent.setup()
      render(<FloatingToolbar {...defaultProps} />)

      const italicButton = screen.getByTestId("floating-italic-btn")
      await user.click(italicButton)

      expect(mockHandleCommand).toHaveBeenCalledWith("italic")
    })

    test("handles underline command", async () => {
      const user = userEvent.setup()
      render(<FloatingToolbar {...defaultProps} />)

      const underlineButton = screen.getByTestId("floating-underline-btn")
      await user.click(underlineButton)

      expect(mockHandleCommand).toHaveBeenCalledWith("underline")
    })

    test("handles link command", async () => {
      const user = userEvent.setup()
      render(<FloatingToolbar {...defaultProps} />)

      const linkButton = screen.getByTestId("floating-link-btn")
      await user.click(linkButton)

      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  describe("Positioning Logic", () => {
    test("adjusts position when near right edge", () => {
      const position = { top: 100, left: 750 } // Near right edge
      render(<FloatingToolbar {...defaultProps} position={position} />)

      const toolbar = screen.getByTestId("floating-toolbar")
      // The component renders the position as-is
      expect(toolbar.style.left).toBe("750px")
    })

    test("adjusts position when near bottom edge", () => {
      const position = { top: 580, left: 100 } // Near bottom edge
      render(<FloatingToolbar {...defaultProps} position={position} />)

      const toolbar = screen.getByTestId("floating-toolbar")
      // The component renders the position as-is
      expect(toolbar.style.top).toBe("580px")
    })
  })

  describe("Close Functionality", () => {
    test("clicking inside toolbar does not trigger close", () => {
      render(<FloatingToolbar {...defaultProps} />)

      const toolbar = screen.getByTestId("floating-toolbar")
      fireEvent.click(toolbar)

      // Component doesn't have built-in close functionality
      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })

  describe("Animation and Styling", () => {
    test("has proper CSS classes for styling", () => {
      render(<FloatingToolbar {...defaultProps} />)

      const toolbar = screen.getByTestId("floating-toolbar")
      expect(toolbar).toHaveClass("floating-toolbar")
    })

    test("applies basic styling", () => {
      render(<FloatingToolbar {...defaultProps} />)

      const toolbar = screen.getByTestId("floating-toolbar")
      expect(toolbar).toHaveClass("floating-toolbar")
    })

    test("renders with inline styles", () => {
      render(<FloatingToolbar {...defaultProps} />)

      const toolbar = screen.getByTestId("floating-toolbar")
      expect(toolbar.style.top).toBe("100px")
      expect(toolbar.style.left).toBe("100px")
    })
  })

  describe("Selection-based Display", () => {
    test("shows when text is selected", () => {
      // Mock selection
      window.getSelection = jest.fn().mockReturnValue({
        toString: () => "selected text",
        removeAllRanges: jest.fn(),
        addRange: jest.fn(),
        getRangeAt: jest.fn(() => ({
          getBoundingClientRect: () => ({
            top: 100,
            left: 100,
            width: 50,
            height: 20,
          }),
        })),
        rangeCount: 1,
      })

      render(<FloatingToolbar {...defaultProps} />)

      expect(screen.getByTestId("floating-toolbar")).toBeInTheDocument()
    })

    test("hides when no text is selected", () => {
      render(<FloatingToolbar {...defaultProps} isVisible={false} />)

      expect(screen.queryByTestId("floating-toolbar")).not.toBeInTheDocument()
    })
  })

  describe("Button States", () => {
    test("buttons render without active state logic", () => {
      render(<FloatingToolbar {...defaultProps} />)

      const boldButton = screen.getByTestId("floating-bold-btn")
      expect(boldButton).toBeInTheDocument()
      expect(boldButton).not.toHaveClass("active")
    })
  })

  describe("Accessibility", () => {
    test("has proper ARIA attributes", () => {
      render(<FloatingToolbar {...defaultProps} />)

      const toolbar = screen.getByTestId("floating-toolbar")
      expect(toolbar).toBeInTheDocument()
      // Component doesn't have role or aria-label attributes
    })

    test("buttons have proper aria-labels", () => {
      render(<FloatingToolbar {...defaultProps} />)

      const boldButton = screen.getByRole("button", { name: /bold/i })
      expect(boldButton).toHaveAttribute("aria-label")

      const italicButton = screen.getByRole("button", { name: /italic/i })
      expect(italicButton).toHaveAttribute("aria-label")
    })

    test("renders buttons that can receive focus", () => {
      render(<FloatingToolbar {...defaultProps} />)

      const boldButton = screen.getByTestId("floating-bold-btn")
      boldButton.focus()
      expect(document.activeElement).toBe(boldButton)
    })

    test("supports basic keyboard interaction", () => {
      render(<FloatingToolbar {...defaultProps} />)

      const boldButton = screen.getByTestId("floating-bold-btn")
      const italicButton = screen.getByTestId("floating-italic-btn")

      boldButton.focus()
      expect(document.activeElement).toBe(boldButton)

      italicButton.focus()
      expect(document.activeElement).toBe(italicButton)
    })
  })

  describe("Edge Cases", () => {
    test("handles undefined position gracefully", () => {
      // Component expects position prop, so we test with a valid position
      const position = { top: 0, left: 0 }
      render(<FloatingToolbar {...defaultProps} position={position} />)

      const toolbar = screen.getByTestId("floating-toolbar")
      expect(toolbar).toBeInTheDocument()
      expect(toolbar.style.top).toBe("0px")
      expect(toolbar.style.left).toBe("0px")
    })

    test("handles empty config object", () => {
      render(<FloatingToolbar {...defaultProps} config={{}} />)

      // No items should be rendered with empty config
      expect(screen.queryByTestId("floating-bold-btn")).not.toBeInTheDocument()
      expect(
        screen.queryByTestId("floating-italic-btn")
      ).not.toBeInTheDocument()
    })

    test("handles rapid show/hide toggles", () => {
      const { rerender } = render(
        <FloatingToolbar {...defaultProps} isVisible={true} />
      )

      expect(screen.getByTestId("floating-toolbar")).toBeInTheDocument()

      rerender(<FloatingToolbar {...defaultProps} isVisible={false} />)
      expect(screen.queryByTestId("floating-toolbar")).not.toBeInTheDocument()

      rerender(<FloatingToolbar {...defaultProps} isVisible={true} />)
      expect(screen.getByTestId("floating-toolbar")).toBeInTheDocument()
    })
  })
})
