import { devUtils } from '../../../utils/internal/devUtils'

export interface PrintStartMessageArgs {
  quiet?: boolean
  message?: string
  workerUrl?: string
  workerScope?: string
}

/**
 * Prints a worker activation message in the browser's console.
 */
export function printStartMessage(args: PrintStartMessageArgs = {}) {
  if (args.quiet) {
    return
  }

  const message = args.message || 'Mocking enabled.'

  console.groupCollapsed(
    `%c${devUtils.formatMessage(message)}`,
    'color:orangered;font-weight:bold;',
  )
  // todo
  console.log(
    'font-weight:bold',
    'font-weight:normal',
  )

  if (args.workerUrl) {
    console.log('Worker script URL:', args.workerUrl)
  }

  if (args.workerScope) {
    console.log('Worker scope:', args.workerScope)
  }

  console.groupEnd()
}
