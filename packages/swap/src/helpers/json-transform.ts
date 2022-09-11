import { mockDataType } from './type';
import { rest } from '@swap/sw';

type handlersType = Array<any>

/**
 * 转换mockdata数据结构
 * @param {mockDataType} mockData
 * @returns {Array}
 */
export const transform = function (mockData: mockDataType): handlersType {
  const handlers: handlersType = [];
  Object.entries(mockData).forEach(([key, mockHandle]) => {
    const { method, url } = analysisKey(key);
    if (!rest[method]) {
      console.error(`${key}无效字段`);
      return;
    }
    if (typeof mockHandle === 'function') {
      handlers.push(rest[method](url, mockHandle));
    } else {
      handlers.push(rest[method](url, (req: any, res: any, ctx: any) => res(
        ctx.status(200),
        ctx.json(mockHandle),
      )));
    }
  });
  return handlers;
};

type analysisKeyParams = {
  method: string,
  url: string,
}

const analysisKey = function (key: string): analysisKeyParams {
  const [method, url] = key.split(' ');
  return {
    method: method.toLowerCase(),
    url,
  };
};
