import { setupWorker } from 'rocket-swap-sw';
import { transform } from '../../helpers/json-transform';
import { getStore } from '../../core/store';

export const workerStart = function (): void {
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

export const workerStop = function (): void {
  setupWorker().stop();
};

export const workerRestoreHandlers = function (): void {
  setupWorker().restoreHandlers();
};

export const workerResetHandlers = function (): void {
  setupWorker().resetHandlers();
};