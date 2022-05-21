import 'babel-polyfill';
import jsdom from 'jsdom';

const DEFAULT_HTML = '<html><body></body></html>';
global.document = new jsdom.JSDOM(DEFAULT_HTML);
global.window = global.document.defaultView;
// 为了解决 Mint UI 在 Jest 下报的错 https://github.com/ElemeFE/mint-ui/issues/1440
if (!('WebkitAppearance' in document.documentElement.style)) {
  document.documentElement.style.WebkitAppearance = '';
}
