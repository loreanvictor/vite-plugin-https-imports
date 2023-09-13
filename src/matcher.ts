import { minimatch } from 'minimatch'
import { MatcherOptions, Pattern } from './types'


function test(pattern: Pattern, id: string): boolean {
  if (pattern instanceof RegExp) {
    return pattern.test(id)
  } else if (typeof pattern === 'function') {
    return pattern(id)
  } else if (Array.isArray(pattern)) {
    return pattern.some(p => test(p, id))
  } else {
    return minimatch(id, pattern)
  }
}


export function matcher(options: MatcherOptions) {
  return (id: string | undefined) =>
    !!id && id.startsWith('https://')
    && test(options.include || '**', id)
    && !test(options.exclude || [], id)
}


export type Matcher = ReturnType<typeof matcher>
