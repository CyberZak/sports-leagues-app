import '@testing-library/jest-dom'

// Polyfills for jsdom environment where TextEncoder/TextDecoder may be missing
import { TextEncoder, TextDecoder } from 'util'

if (typeof (globalThis as unknown as { TextEncoder?: typeof TextEncoder }).TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(globalThis as any).TextEncoder = TextEncoder
}
if (typeof (globalThis as unknown as { TextDecoder?: typeof TextDecoder }).TextDecoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(globalThis as any).TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder
}

