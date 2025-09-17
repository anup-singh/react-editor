import { defaultEditorConfig, mergeEditorConfig } from "../editorConfig"

describe("Editor Configuration System - Basic Tests", () => {
  describe("defaultEditorConfig", () => {
    test("has correct default structure", () => {
      expect(defaultEditorConfig).toHaveProperty("toolbar")
      expect(defaultEditorConfig).toHaveProperty("floatingToolbar")
      expect(defaultEditorConfig).toHaveProperty("features")
      expect(defaultEditorConfig).toHaveProperty("settings")
    })

    test("toolbar has correct default values", () => {
      expect(defaultEditorConfig.toolbar.show).toBe(true)
      expect(defaultEditorConfig.toolbar.items).toBeDefined()
      expect(defaultEditorConfig.toolbar.items.bold).toBe(true)
      expect(defaultEditorConfig.toolbar.items.italic).toBe(true)
    })

    test("settings have correct default values", () => {
      expect(defaultEditorConfig.settings.placeholder).toBe("Start writing...")
      expect(defaultEditorConfig.settings.editorType).toBe("html")
    })
  })

  describe("mergeEditorConfig", () => {
    test("returns default config when no custom config provided", () => {
      const result = mergeEditorConfig()
      expect(result).toEqual(defaultEditorConfig)
    })

    test("merges custom config with defaults", () => {
      const customConfig = {
        toolbar: {
          show: false,
        },
      }

      const result = mergeEditorConfig(customConfig)

      expect(result.toolbar.show).toBe(false)
      expect(result.toolbar.items.bold).toBe(true) // Should keep default
    })

    test("performs deep merge for nested objects", () => {
      const customConfig = {
        toolbar: {
          items: {
            bold: false,
            italic: false,
          },
        },
      }

      const result = mergeEditorConfig(customConfig)

      expect(result.toolbar.items.bold).toBe(false)
      expect(result.toolbar.items.italic).toBe(false)
      expect(result.toolbar.items.underline).toBe(true) // Should keep default
    })
  })
})
