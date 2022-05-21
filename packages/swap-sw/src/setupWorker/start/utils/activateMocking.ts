import { StartOptions, SetupWorkerInternalContext } from '../../glossary'

export const activateMocking = async (
  context: SetupWorkerInternalContext,
  options?: StartOptions,
) => {
  context.workerChannel.send('MOCK_ACTIVATE')
  if (options?.isOnline) {
    context.workerChannel?.send('ONLINE')
  }else {
    context.workerChannel?.send('OFFLINE')
  }
  return context.events.once('MOCKING_ENABLED').then(() => {
    if (!options?.quiet) {
      console.groupCollapsed(
        '%c[SWAP] Mocking enabled.',
        'color:orangered;font-weight:bold;',
      )
      console.log('font-weight:bold', 'font-weight:normal')
      console.groupEnd()
    }
  })
}
