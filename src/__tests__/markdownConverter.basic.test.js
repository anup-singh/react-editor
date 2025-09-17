import {
  markdownToHtml,
  htmlToMarkdown,
  convertContent,
} from "../utils/markdownConverter"

describe("Markdown Converter Utilities - Basic Tests", () => {
  describe("markdownToHtml", () => {
    test("converts bold markdown to HTML", () => {
      const markdown = "**bold text**"
      const result = markdownToHtml(markdown)

      // marked wraps content in <p> tags by default
      expect(result).toContain("<strong>bold text</strong>")
      expect(result).toContain("<p>")
    })

    test("handles empty input", () => {
      expect(markdownToHtml("")).toBe("")
      expect(markdownToHtml(null)).toBe("")
      expect(markdownToHtml(undefined)).toBe("")
    })

    test("converts headings correctly", () => {
      const markdown = "# Heading 1"
      const result = markdownToHtml(markdown)

      expect(result).toContain("<h1")
      expect(result).toContain("Heading 1")
      expect(result).toContain("</h1>")
    })

    test("converts italic markdown to HTML", () => {
      const markdown = "*italic text*"
      const result = markdownToHtml(markdown)

      expect(result).toContain("<em>italic text</em>")
    })

    test("converts lists correctly", () => {
      const markdown = "- Item 1\n- Item 2"
      const result = markdownToHtml(markdown)

      expect(result).toContain("<ul>")
      expect(result).toContain("<li>Item 1</li>")
      expect(result).toContain("<li>Item 2</li>")
      expect(result).toContain("</ul>")
    })
  })

  describe("htmlToMarkdown", () => {
    test("converts basic HTML to markdown", () => {
      const html = "<strong>bold</strong> and <em>italic</em>"
      const result = htmlToMarkdown(html)

      expect(result).toContain("**bold**")
      expect(result).toContain("*italic*")
    })

    test("converts headings correctly", () => {
      const html = "<h1>Heading 1</h1>"
      const result = htmlToMarkdown(html)

      expect(result).toContain("# Heading 1")
    })

    test("converts lists correctly", () => {
      const html = "<ul><li>Item 1</li><li>Item 2</li></ul>"
      const result = htmlToMarkdown(html)

      expect(result).toContain("Item 1")
      expect(result).toContain("Item 2")
      expect(result).toContain("-")
    })

    test("handles empty input", () => {
      expect(htmlToMarkdown("")).toBe("")
      expect(htmlToMarkdown(null)).toBe("")
      expect(htmlToMarkdown(undefined)).toBe("")
    })
  })

  describe("convertContent", () => {
    test("converts from markdown to HTML", () => {
      const markdown = "**bold text**"
      const result = convertContent(markdown, "markdown", "html")

      expect(result).toContain("<strong>bold text</strong>")
    })

    test("converts from HTML to markdown", () => {
      const html = "<strong>bold text</strong>"
      const result = convertContent(html, "html", "markdown")

      expect(result).toContain("**bold text**")
    })

    test("returns same content when converting to same type", () => {
      const content = "**bold text**"
      const result = convertContent(content, "markdown", "markdown")

      expect(result).toBe(content)
    })

    test("handles empty content", () => {
      expect(convertContent("", "markdown", "html")).toBe("")
      expect(convertContent(null, "html", "markdown")).toBe("")
    })

    test("handles invalid conversion types", () => {
      const content = "test content"
      const result = convertContent(content, "invalid", "html")

      expect(result).toBe(content)
    })
  })

  describe("Error Handling", () => {
    test("handles malformed markdown gracefully", () => {
      const malformedMarkdown = "**unclosed bold"
      const result = markdownToHtml(malformedMarkdown)

      expect(result).toBeDefined()
      expect(typeof result).toBe("string")
    })

    test("handles malformed HTML gracefully", () => {
      const malformedHtml = "<strong>unclosed bold"
      const result = htmlToMarkdown(malformedHtml)

      expect(result).toBeDefined()
      expect(typeof result).toBe("string")
    })
  })

  describe("Bidirectional Conversion", () => {
    test("maintains content integrity through round-trip conversion", () => {
      const originalMarkdown = "# Title\n\n**Bold** and *italic* text"

      // Convert to HTML and back to markdown
      const html = convertContent(originalMarkdown, "markdown", "html")
      const backToMarkdown = convertContent(html, "html", "markdown")

      // Check that key elements are preserved
      expect(backToMarkdown).toContain("Title")
      expect(backToMarkdown).toContain("**Bold**")
      expect(backToMarkdown).toContain("*italic*")
    })
  })
})
