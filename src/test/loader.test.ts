import { vi, describe, test, expect } from 'vitest'

vi.mock('axios', () => ({
  default: {
    get: async url => {
      if (url !== 'https://esm.sh/nokss') {
        return { data: 'XX: ' + url }
      } else {
        throw new Error('XX: ' + url)
      }
    }
  }
}))

import { matcher } from '../matcher'
import { loader } from '../loader'

describe(loader, () => {
  test('returns a loader fetching proper files based on given URL.', async () => {
    const match = matcher({ include: ['https://esm.sh/**'] })
    const load = loader(match, { silent: true })

    await expect(load('https://esm.sh/vite')).resolves.toBe('XX: https://esm.sh/vite')
    await expect(load('https://unpkg.com/vite')).resolves.toBe(undefined)
    await expect(load('https://esm.sh/nokss')).rejects.toThrow('XX: https://esm.sh/nokss')
  })
})
