import { describe, test, expect } from 'vitest'
import { matcher } from '../matcher'
import { resolver } from '../resolver'



describe(resolver, () => {
  test('resolves proper URL based on given options.', () => {
    const match = matcher({
      include: ['https://esm.sh/**', /https:\/\/cdn\.skypack\.dev\/.*/, url => url.startsWith('https://unpkg.com/')],
      exclude: [/nokss/],
    })
    const resolve = resolver(match)

    expect(resolve('https://esm.sh/vite')).toBe('https://esm.sh/vite')
    expect(resolve('https://cdn.skypack.dev/vite')).toBe('https://cdn.skypack.dev/vite')
    expect(resolve('https://unpkg.com/vite')).toBe('https://unpkg.com/vite')
    expect(resolve('https://esm.sh/nokss')).toBe(undefined)
    expect(resolve('https://cdn.skypack.dev/nokss')).toBe(undefined)
    expect(resolve('/pins/vite@3', 'https://esm.sh/vite')).toBe('https://esm.sh/pins/vite@3')
  })
})
