import webpack, { Compiler, Compilation, version } from 'webpack';
import { RawSource } from 'webpack-sources';
import fs from 'fs';
import path from 'path';
import packageJson from '../../package.json';
import { SERVICE_WORKER_BUILD_PATH } from '../../config/constants';


export default class SwapWebpackPlugin {
  swPath: string
  swName: string

  constructor(swPath = '', swName = path.basename(SERVICE_WORKER_BUILD_PATH)) {
    this.swName = swName;
    this.swPath = this.searchWorkerPath(swPath);
  }

  searchWorkerPath(rawPath: string): string {
    if (rawPath) {
      return path.resolve(rawPath);
    }
    const swPath = path.resolve(__dirname, `../${path.dirname(packageJson.module)}`, this.swName);
    if (fs.existsSync(swPath)) {
      return swPath;
    }
    throw new Error('ServiceWorker File Not Found');
  }

  apply(compiler: Compiler) {
    if (version.startsWith('4.')) {
      compiler.hooks.emit.tap(
        this.constructor.name,
        compilation => this.addAssets(compilation as Compilation),
      );
    } else {
      const { PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER } = webpack.Compilation;
      // https://github.com/webpack/webpack/issues/11425#issuecomment-690547848
      compiler.hooks.thisCompilation.tap(this.constructor.name, (compilation) => {
        compilation.hooks.processAssets.tap({
          name: this.constructor.name,
          // See https://github.com/webpack/webpack/issues/11822#issuecomment-726184972
          stage: PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER - 10,
        }, () => this.addAssets(compilation as Compilation));
      });
    }
  }

  addAssets = (compilation: Compilation) => {
    const file = fs.readFileSync(path.resolve(this.swPath));
    compilation.emitAsset(this.swName, new RawSource(file.toString()));
  }
}
