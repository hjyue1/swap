
const scheduler: any = typeof setImmediate === 'function' ? setImmediate : setTimeout;

export const waitFor = function (): Promise<any> {
  return new Promise((resolve) => {
    scheduler(resolve);
  });
};
