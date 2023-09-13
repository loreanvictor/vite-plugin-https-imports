import { test, expect } from 'vitest'

import httpsImports, { HttpsImportsOptions } from '../index'


test('everything is exported.', () => {
  expect(httpsImports).toBeDefined()
  expect(<HttpsImportsOptions>{}).toBeDefined()
})
