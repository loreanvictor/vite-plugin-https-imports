import { expect } from 'vitest'

import { scenario } from './util'


scenario('excluded', async (build, { ls, read }) => {
  await build({
    exclude: [/rehtm/],
  })

  await expect(ls('dist')).resolves.toIncludeSameMembers(['index.html', 'assets'])
  const [ bundle ] = await ls('dist/assets')
  const bundled = await read(`dist/assets/${bundle}`)

  expect(bundled).not.toMatch(/quel/)
  expect(bundled).toMatch(/rehtm/)
})
