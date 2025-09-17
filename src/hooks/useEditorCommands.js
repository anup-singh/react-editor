import { useCallback, useEffect } from "react"

export const useEditorCommands = (
  editorRef,
  handleContentChange,
  showModal
) => {
  const handleCodeBlockKeyDown = useCallback(e => {
    if (e.key === "Enter") {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      // Get the current selection
      const selection = window.getSelection()
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)

        // Create a text node with newline
        const newlineNode = document.createTextNode("\n")

        // Delete any selected content
        range.deleteContents()

        // Insert the newline
        range.insertNode(newlineNode)

        // Move cursor after the newline
        range.setStartAfter(newlineNode)
        range.setEndAfter(newlineNode)

        // Update selection
        selection.removeAllRanges()
        selection.addRange(range)
      }

      return false
    }
  }, [])

  // Set up event listeners for existing and new code blocks
  useEffect(() => {
    const currentEditor = editorRef.current

    const setupCodeBlockListeners = () => {
      if (!currentEditor) return

      const codeBlocks = currentEditor.querySelectorAll(".code-input")
      codeBlocks.forEach(codeBlock => {
        // Remove existing listeners to avoid duplicates
        codeBlock.removeEventListener("keydown", handleCodeBlockKeyDown, true)
        codeBlock.removeEventListener("keypress", handleCodeBlockKeyDown, true)

        // Add event listeners with capture phase to ensure they run first
        codeBlock.addEventListener("keydown", handleCodeBlockKeyDown, true)
        codeBlock.addEventListener("keypress", handleCodeBlockKeyDown, true)

        // Also add to the parent pre element for safety
        const preElement = codeBlock.closest(".code-block")
        if (preElement) {
          preElement.removeEventListener(
            "keydown",
            handleCodeBlockKeyDown,
            true
          )
          preElement.addEventListener("keydown", handleCodeBlockKeyDown, true)
        }
      })
    }

    // Set up listeners initially and on content changes
    setupCodeBlockListeners()

    // Use a MutationObserver to detect when new code blocks are added
    const observer = new MutationObserver(() => {
      setupCodeBlockListeners()
    })

    if (currentEditor) {
      observer.observe(currentEditor, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      observer.disconnect()
      // Clean up event listeners
      if (currentEditor) {
        const codeBlocks = currentEditor.querySelectorAll(".code-input")
        codeBlocks.forEach(codeBlock => {
          codeBlock.removeEventListener("keydown", handleCodeBlockKeyDown, true)
          codeBlock.removeEventListener(
            "keypress",
            handleCodeBlockKeyDown,
            true
          )

          const preElement = codeBlock.closest(".code-block")
          if (preElement) {
            preElement.removeEventListener(
              "keydown",
              handleCodeBlockKeyDown,
              true
            )
          }
        })
      }
    }
  }, [editorRef, handleCodeBlockKeyDown])

  const execCommand = useCallback(
    (command, value = null) => {
      editorRef.current?.focus()
      document.execCommand(command, false, value)

      setTimeout(() => {
        handleContentChange(editorRef)
      }, 0)
    },
    [editorRef, handleContentChange]
  )

  const insertLink = useCallback(
    async (showLinkInsert = null, editorRef = null) => {
      const selection = window.getSelection()
      const selectedText = selection.toString().trim()

      // If text is selected and inline link insert is available, use it
      if (selectedText && showLinkInsert && editorRef) {
        showLinkInsert(selection, editorRef)
        return
      }

      // Otherwise use the modal for regular link insertion
      try {
        const url = await showModal({
          title: "Insert Link",
          placeholder: "Enter URL (e.g., https://example.com)",
          buttonText: "Insert Link",
          inputType: "url",
        })
        if (url) {
          execCommand("createLink", url)
        }
      } catch {
        // User cancelled
      }
    },
    [execCommand, showModal]
  )

  const insertInlineCode = useCallback(() => {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      const selectedText = selection.toString()
      if (selectedText) {
        // Wrap selected text in code tags
        const codeHtml = `<code class="inline-code">${selectedText}</code>`
        execCommand("insertHTML", codeHtml)
      } else {
        // Insert empty code tags and position cursor inside
        const codeHtml = '<code class="inline-code">code</code>&nbsp;'
        execCommand("insertHTML", codeHtml)
      }
    }
  }, [execCommand])

  const insertCodeBlock = useCallback(() => {
    const selection = window.getSelection()
    let codeContent = "Paste your code here..."

    // If text is selected, use it as the initial code content
    if (selection.rangeCount > 0) {
      const selectedText = selection.toString().trim()
      if (selectedText) {
        codeContent = selectedText
      }
    }

    const codeBlockHtml = `
      <pre class="code-block">
        <code contenteditable="true" class="code-input" style="white-space: pre-wrap;">${codeContent}</code>
      </pre>
      <p><br></p>
    `

    execCommand("insertHTML", codeBlockHtml)

    // Focus the code block after insertion and add event listeners
    setTimeout(() => {
      const codeBlocks = editorRef.current?.querySelectorAll(".code-input")
      const lastCodeBlock = codeBlocks?.[codeBlocks.length - 1]
      if (lastCodeBlock) {
        // Add event listeners immediately
        lastCodeBlock.addEventListener("keydown", handleCodeBlockKeyDown, true)
        lastCodeBlock.addEventListener("keypress", handleCodeBlockKeyDown, true)

        const preElement = lastCodeBlock.closest(".code-block")
        if (preElement) {
          preElement.addEventListener("keydown", handleCodeBlockKeyDown, true)
        }

        lastCodeBlock.focus()
        // Select all text if it's the placeholder
        if (lastCodeBlock.textContent === "Paste your code here...") {
          const range = document.createRange()
          range.selectNodeContents(lastCodeBlock)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    }, 100)
  }, [execCommand, editorRef, handleCodeBlockKeyDown])

  return {
    execCommand,
    insertLink,
    insertInlineCode,
    insertCodeBlock,
  }
}
