import axios from 'axios'

import { Matcher } from './matcher'
import { LoggerOptions } from './types'


export function loader(matcher: Matcher, options: LoggerOptions) {
  return async (id: string) => {
    if (matcher(id)) {
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
