import { vi } from 'vitest'

const axios = {
  put: vi.fn(() => Promise.resolve({ data: {} })),
}

export default axios