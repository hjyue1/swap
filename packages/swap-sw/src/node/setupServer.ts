import { interceptClientRequest } from '@mswjs/interceptors/lib/interceptors/ClientRequest'
import { interceptXMLHttpRequest } from '@mswjs/interceptors/lib/interceptors/XMLHttpRequest'
import { createSetupServer } from './createSetupServer'

export const setupServer = createSetupServer(
  interceptClientRequest,
  interceptXMLHttpRequest,
)
