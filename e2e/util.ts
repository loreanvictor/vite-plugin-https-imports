import { expect, test } from 'vitest'

import { toIncludeSameMembers } from 'jest-extended'
expect.extend({ toIncludeSameMembers })

import { join } from 'path'
import { cp, mkdtemp, rm, access, lstat, readFile } from 'fs/promises'
import { $ } from 'execa'
import { build as _build } from 'vite'

import plugin from '../src'

export type TestFn = (build: (options?: any) => Promise<void>, utils: {
  dir: string
  $: (...args: unknown[]) => Promise<string>
  ls: (path?: string) => Promise<string[]>
  read: (file: string) => Promise<string>
}) => Promise<void>


export function scenario(name: string, testFn: TestFn) {
  test('scnario: ' + name, async () => {
    const fixsrc = name.split(':')[0]
    const fixture = join('e2e', 'fixtures', fixsrc)

    await access(fixture)
    const stat = await lstat(fixture)
    expect(stat.isDirectory()).toBe(true)

    const dir = await mkdtemp('test-')
    await cp(fixture, dir, { recursive: true })

    const cmd = $({ cwd: dir })
    const build = async (options = {}) => {
      await _build({
        root: dir,
        plugins: [plugin(options)],
      })
    }

    try {
      await testFn(build, {
        dir,
        $: async (...args: unknown[]) => (await (cmd as any)(...args)).stdout,
        ls: async (path = '.') => {
          const { stdout } = await cmd`ls -a ${path}`

          return stdout.split('\n').filter(x => x !== '.' && x !== '..')
        },
        read: async file => {
          return await readFile(join(dir, file), 'utf8')
        }
      })
    } finally {
      await rm(dir, { recursive: true })
    }
  })
}
