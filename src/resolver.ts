import { Matcher } from './matcher'


export function resolver(matcher: Matcher) {
  return (id: string, importer?: string) => {
    if (matcher(id)) {
      return id
    } else if (matcher(importer)) {
      return new URL(id, importer).toString()
    }

    return undefined
  }
}


export type Resolver = ReturnType<typeof resolver>
