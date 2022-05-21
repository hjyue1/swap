/**
 * @jest-environment node
 */
import { setupWorker } from './setupWorker'

test('returns an error when run in a Node.js environment', () => {
  expect(setupWorker).toThrow(
    '[SWAP] Failed to execute `setupWorker` in a non-browser environment',
  )
})
