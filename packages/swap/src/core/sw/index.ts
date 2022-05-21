import { setupWorker } from 'swap-sw';
import { transform } from '../../helpers/json-transform';
import { getStore } from '../../core/store';

const workerStart = function (): void {
  if (getStore('mode') === 'JEST') return;

  const handlers = transform(getStore('mockData'));
  const sw = setupWorker(...handlers);
  const { workerOpt, bypassMode, isOnline, baseURL } = getStore();

  sw.start({
    bypassMode,
    isOnline,
    baseURL,
    ...workerOpt,
  });
};

const workerStop = function (): void {
  setupWorker().stop();
};

const workerRestoreHandlers = function (): void {
  setupWorker().restoreHandlers();
};

const workerResetHandlers = function (): void {
  setupWorker().resetHandlers();
};

export {
  workerStart,
  workerStop,
  workerRestoreHandlers,
  workerResetHandlers,
};
