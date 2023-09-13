import { Plugin } from 'vite'

import axios from 'axios'
import anymatch from 'anymatch'

import { HttpsImportsOptions } from './types'


export default function(options: HttpsImportsOptions = {}): Plugin {
  const match = (id: string | undefined) =>
    id && id.startsWith('https://')
    && anymatch(options.include || '**', id)
    && !anymatch(options.exclude || [], id)

  return {
    name: 'vite-plugin-https-imports',
    enforce: 'pre',
    apply: 'build',

    resolveId(id: string, importer?: string) {
      if (match(id)) {
        return id
      } else if (match(importer)) {
        return new URL(id, importer).toString()
      }

      return undefined
    },

    async load(id: string) {
      if (match(id)) {
        const chalk = (await import('chalk')).default
        const ora = (await import('ora')).default

        const loading = ora({
          text: chalk.dim('downloading ') + chalk.hex('1450A3')(id),
          isSilent: options.silent
        }).start()

        try {
          const { data } = await axios.get(id)
          loading.succeed(chalk.dim('downloaded ') + chalk.hex('1450A3')(id))

          return data
        } catch (error) {
          loading.fail(chalk.hex('C70039')('failed to download ') + chalk.hex('FF6969')(id))
          throw error
        }
      }
    }
  }
}


export * from './types'
