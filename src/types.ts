import { Matcher } from 'anymatch'

export interface HttpsImportsOptions {
  include?: Matcher
  exclude?: Matcher
  silent?: boolean
}
