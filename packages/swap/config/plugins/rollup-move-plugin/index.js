const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function moveServiceWork(options) {
  const { input, output } = options;

  return {
    name: 'move-servicework',
    transform() {
      this.addWatchFile(input);
      return;
    },
    buildStart() {
      if (!fs.existsSync(input)) {
        this.error(`Failed to locate the Service Worker file at: ${input}`);
      }

      console.log('Signing the Service Worker at:\n%s', chalk.cyan(input));

      const workerContent = fs.readFileSync(input, 'utf8');

      this.emitFile({
        type: 'asset',
        fileName: path.basename(output),
        source: workerContent,
      });
    },
  };
};
