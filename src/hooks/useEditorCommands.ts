import { useCallback, useEffect, RefObject } from "react"

/**
 * A custom hook for managing rich text editor commands and functionality.
 * @param editorRef A React ref object for the content editable div.
 * @param handleContentChange A function to call when the editor's content changes.
 * @param showModal A function to display a modal and get a user's input.
 */
export const useEditorCommands = (
  editorRef: RefObject<HTMLDivElement>,
  handleContentChange: (ref: RefObject<HTMLDivElement>) => void,
  showModal: (options: {
    title: string
    placeholder: string
    buttonText: string
    inputType: string
  }) => Promise<string>
) => {
  const handleCodeBlockKeyDown = useCallback((e: KeyboardEvent) => {
    // Only handle 'Enter' key presses
    if (e.key === "Enter") {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const newlineNode = document.createTextNode("\n")

        range.deleteContents()
        range.insertNode(newlineNode)

        range.setStartAfter(newlineNode)
        range.setEndAfter(newlineNode)

        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }, [])

  useEffect(() => {
    const currentEditor = editorRef.current

    const setupCodeBlockListeners = () => {
      if (!currentEditor) return

      const codeBlocks = currentEditor.querySelectorAll(".code-input")
      codeBlocks.forEach(codeBlock => {
        // Ensure type assertion for element to add/remove event listeners
        const htmlElement = codeBlock as HTMLDivElement
        const preElement = htmlElement.closest(".code-block") as HTMLPreElement

        htmlElement.removeEventListener("keydown", handleCodeBlockKeyDown, true)
        htmlElement.removeEventListener(
          "keypress",
          handleCodeBlockKeyDown,
          true
        )
        htmlElement.addEventListener("keydown", handleCodeBlockKeyDown, true)
        htmlElement.addEventListener("keypress", handleCodeBlockKeyDown, true)

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

    setupCodeBlockListeners()

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
      if (currentEditor) {
        const codeBlocks = currentEditor.querySelectorAll(".code-input")
        codeBlocks.forEach(codeBlock => {
          const htmlElement = codeBlock as HTMLDivElement
          htmlElement.removeEventListener(
            "keydown",
            handleCodeBlockKeyDown,
            true
          )
          htmlElement.removeEventListener(
            "keypress",
            handleCodeBlockKeyDown,
            true
          )

          const preElement = htmlElement.closest(
            ".code-block"
          ) as HTMLPreElement
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
    (command: string, value: string | null = null) => {
      editorRef.current?.focus()
      document.execCommand(command, false, value)
      setTimeout(() => {
        handleContentChange(editorRef)
      }, 0)
    },
    [editorRef, handleContentChange]
  )

  const insertLink = useCallback(
    async (
      showLinkInsert?: (
        selection: Selection,
        editorRef: RefObject<HTMLDivElement>
      ) => void,
      editorRefParam?: RefObject<HTMLDivElement>
    ) => {
      const selection = window.getSelection()
      const selectedText = selection?.toString().trim() ?? ""

      if (selectedText && showLinkInsert && editorRefParam) {
        showLinkInsert(selection!, editorRefParam)
        return
      }

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
      } catch (e) {
        console.log("Link insertion cancelled: ", e)
      }
    },
    [execCommand, showModal]
  )

  const insertInlineCode = useCallback(() => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString()
      if (selectedText) {
        const codeHtml = `<code class="inline-code">${selectedText}</code>`
        execCommand("insertHTML", codeHtml)
      } else {
        const codeHtml = '<code class="inline-code">code</code>&nbsp;'
        execCommand("insertHTML", codeHtml)
      }
    }
  }, [execCommand])

  const insertCodeBlock = useCallback(() => {
    const selection = window.getSelection()
    let codeContent = "Paste your code here..."

    if (selection && selection.rangeCount > 0) {
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

    setTimeout(() => {
      const codeBlocks =
        editorRef.current?.querySelectorAll<HTMLElement>(".code-input")
      const lastCodeBlock = codeBlocks?.[codeBlocks.length - 1]
      if (lastCodeBlock) {
        lastCodeBlock.addEventListener("keydown", handleCodeBlockKeyDown, true)
        lastCodeBlock.addEventListener("keypress", handleCodeBlockKeyDown, true)

        const preElement = lastCodeBlock.closest(".code-block")
        if (preElement) {
          preElement.addEventListener("keydown", handleCodeBlockKeyDown, true)
        }

        lastCodeBlock.focus()
        if (lastCodeBlock.textContent === "Paste your code here...") {
          const range = document.createRange()
          range.selectNodeContents(lastCodeBlock)
          selection?.removeAllRanges()
          selection?.addRange(range)
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
