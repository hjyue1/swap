const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout;
const waitFor = function () {
    return new Promise((resolve) => {
        scheduler(resolve);
    });
};

export { waitFor };
