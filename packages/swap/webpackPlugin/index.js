'use strict';

var webpack = require('webpack');
var webpackSources = require('webpack-sources');
var fs = require('fs');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var webpack__default = /*#__PURE__*/_interopDefaultLegacy(webpack);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

var name = "rocket-swap";
var version = "2.0.7";
var description = "";
var author = "hjyue1 <hjyue1@163.com>";
var homepage = " ";
var license = "ISC";
var main = "lib/umd/index.js";
var module$1 = "lib/esm/index.js";
var bin = {
	swap: "cli/index.js"
};
var sideEffects = false;
var directories = {
	lib: "lib",
	test: "__tests__"
};
var files = [
	"lib",
	"cli",
	"webpackPlugin"
];
var scripts = {
	start: "babel-node ./example/test.js",
	"build:test": "yarn clean && cross-env NODE_ENV=development rollup -c rollup.config.ts",
	build: "yarn clean && cross-env NODE_ENV=production rollup -c rollup.config.ts",
	clean: "rimraf lib webpackPlugin",
	test: "jest",
	prepublishOnly: "yarn build"
};
var dependencies = {
	axios: "^0.27.2",
	"rocket-swap-jsbridge": "^1.0.9",
	"rocket-swap-sw": "^2.0.3",
	tslib: "^2.4.0"
};
var devDependencies = {
	"@babel/cli": "^7.11.6",
	"@babel/core": "^7.11.6",
	"@babel/node": "^7.10.5",
	"@babel/plugin-transform-modules-commonjs": "^7.10.4",
	"@babel/plugin-transform-runtime": "^7.12.1",
	"@babel/preset-env": "^7.11.5",
	"@babel/runtime": "7.11.2",
	"@rollup/plugin-babel": "^5.2.1",
	"@rollup/plugin-commonjs": "^16.0.0",
	"@rollup/plugin-inject": "^4.0.2",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^10.0.0",
	"@rollup/plugin-replace": "^2.3.4",
	"@types/body-parser": "1.19.0",
	"@types/detect-port": "1.3.0",
	"@types/express": "^4.17.8",
	"@types/fs-extra": "^9.0.1",
	"@types/http-proxy": "1.17.4",
	"@types/jest": "^26.0.14",
	"@types/node": "^14.6.4",
	"@types/node-fetch": "^2.5.7",
	"@types/puppeteer": "^3.0.2",
	"@types/webpack": "^5.28.0",
	"@types/webpack-dev-server": "^3.11.0",
	"@typescript-eslint/eslint-plugin": "^4.8.1",
	"@typescript-eslint/parser": "^4.8.1",
	"apollo-fetch": "^0.7.0",
	"babel-jest": "^26.3.0",
	"babel-loader": "^8.1.0",
	"babel-minify": "^0.5.1",
	"babel-polyfill": "^6.26.0",
	"body-parser": "1.19.0",
	chokidar: "3.4.2",
	"clear-module": "4.1.1",
	"colors-cli": "1.0.27",
	"cross-env": "^7.0.2",
	"detect-port": "1.3.0",
	eslint: "^7.13.0",
	express: "4.17.1",
	"http-proxy": "1.18.1",
	jest: "^26.4.2",
	"jest-canvas-mock": "^2.2.0",
	"jest-html-reporters": "^2.0.4",
	jsdom: "^16.4.0",
	"local-ip-url": "1.0.3",
	"node-sass": "^4.14.1",
	"path-to-regexp": "6.1.0",
	rimraf: "^3.0.2",
	rollup: "^2.33.2",
	"rollup-plugin-node-builtins": "^2.1.2",
	"rollup-plugin-node-globals": "^1.4.0",
	"rollup-plugin-node-polyfills": "^0.2.1",
	"rollup-plugin-terser": "^7.0.2",
	"rollup-plugin-typescript2": "^0.29.0",
	"sass-loader": "^10.0.2",
	"ts-jest": "^26.4.0",
	"ts-loader": "^8.0.3",
	"ts-node": "^9.0.0",
	typescript: "^4.0.2",
	webpack: "^4.44.2",
	"webpack-sources": "^2.2.0"
};
var gitHead = "cee2d3bf320e6b2f9a8627140b51d90a131240af";
var repository = "git@github.com:hjyue1/swap.git";
var packageJson = {
	name: name,
	version: version,
	description: description,
	author: author,
	homepage: homepage,
	license: license,
	main: main,
	module: module$1,
	bin: bin,
	sideEffects: sideEffects,
	directories: directories,
	files: files,
	scripts: scripts,
	dependencies: dependencies,
	devDependencies: devDependencies,
	gitHead: gitHead,
	repository: repository
};

var __dirname$1 = '/Users/liudong/Desktop/github/swap/packages/swap/config';

const SERVICE_WORKER_SOURCE_PATH = path__default["default"].resolve(
  __dirname$1,
  '../',
  'node_modules/rocket-swap-sw/lib',
  'swapSW.js',
);

const SERVICE_WORKER_BUILD_PATH = path__default["default"].resolve(
  __dirname$1,
  '../',
  path__default["default"].dirname(packageJson.module),
  path__default["default"].basename(SERVICE_WORKER_SOURCE_PATH),
);

var constants = {
  SERVICE_WORKER_SOURCE_PATH,
  SERVICE_WORKER_BUILD_PATH,
};

class SwapWebpackPlugin {
    constructor(swPath = '', swName = path__default["default"].basename(constants.SERVICE_WORKER_BUILD_PATH)) {
        this.addAssets = (compilation) => {
            const file = fs__default["default"].readFileSync(path__default["default"].resolve(this.swPath));
            compilation.emitAsset(this.swName, new webpackSources.RawSource(file.toString()));
        };
        this.swName = swName;
        this.swPath = this.searchWorkerPath(swPath);
    }
    searchWorkerPath(rawPath) {
        if (rawPath) {
            return path__default["default"].resolve(rawPath);
        }
        const swPath = path__default["default"].resolve(__dirname, `../${path__default["default"].dirname(packageJson.module)}`, this.swName);
        if (fs__default["default"].existsSync(swPath)) {
            return swPath;
        }
        throw new Error('ServiceWorker File Not Found');
    }
    apply(compiler) {
        if (webpack.version.startsWith('4.')) {
            compiler.hooks.emit.tap(this.swName, compilation => this.addAssets(compilation));
        }
        else {
            const { PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER } = webpack__default["default"].Compilation;
            // https://github.com/webpack/webpack/issues/11425#issuecomment-690547848
            compiler.hooks.thisCompilation.tap(this.swName, (compilation) => {
                compilation.hooks.processAssets.tap({
                    name: this.swName,
                    // See https://github.com/webpack/webpack/issues/11822#issuecomment-726184972
                    stage: PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER - 10,
                }, () => this.addAssets(compilation));
            });
        }
    }
}

module.exports = SwapWebpackPlugin;
