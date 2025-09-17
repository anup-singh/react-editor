// Jest setup file
import "@testing-library/jest-dom"

// Mock matchMedia for tests that might use it
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(cb) {
    this.cb = cb
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock getSelection for contentEditable tests
Object.defineProperty(window, "getSelection", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    toString: jest.fn(() => ""),
    removeAllRanges: jest.fn(),
    addRange: jest.fn(),
    getRangeAt: jest.fn(() => ({
      deleteContents: jest.fn(),
      insertNode: jest.fn(),
      setStart: jest.fn(),
      setEnd: jest.fn(),
      setStartAfter: jest.fn(),
      setEndAfter: jest.fn(),
      startOffset: 0,
      endOffset: 0,
      startContainer: document.createElement("div"),
      endContainer: document.createElement("div"),
      toString: jest.fn(() => ""),
    })),
    rangeCount: 0,
    anchorNode: null,
    focusNode: null,
  })),
})

// Mock document.execCommand
Object.defineProperty(document, "execCommand", {
  writable: true,
  value: jest.fn().mockImplementation(() => true),
})

// Mock createRange
Object.defineProperty(document, "createRange", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    setStart: jest.fn(),
    setEnd: jest.fn(),
    deleteContents: jest.fn(),
    insertNode: jest.fn(),
    setStartAfter: jest.fn(),
    setEndAfter: jest.fn(),
    selectNodeContents: jest.fn(),
    collapse: jest.fn(),
    toString: jest.fn(() => ""),
    startOffset: 0,
    endOffset: 0,
    startContainer: document.createElement("div"),
    endContainer: document.createElement("div"),
  })),
})

// Suppress console errors for tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: ReactDOM.render is deprecated")
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
