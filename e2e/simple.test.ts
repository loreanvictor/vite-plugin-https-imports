import { expect } from 'vitest'

import { scenario } from './util'


scenario('simple', async (build, { $, ls, read }) => {
  await build()

  await expect(ls('dist')).resolves.toIncludeSameMembers(['index.html', 'assets'])
  const [ bundle ] = await ls('dist/assets')
  const bundled = await read(`dist/assets/${bundle}`)

  expect(bundled).not.toMatch(/quel/)
  expect(bundled).toMatch(/cleanCandidate/)
})
