
## 如何在Jest环境下执行
1. 在`jest.config.js`中
    ```js
    // jest.config.js
    module.exports = {
      ...
      setupFilesAfterEnv: ['./jest.setup.js'],
    };

    ```

2. 编写 `jest.setup.js`
    **1).全局启动**

    ```js
    // jest.setup.js
    import { swapJestInit } from '@tencent/swap';

    const mockData = {
      ['POST /post']: {
        post: true,
      },
    };

    const swapServer = swapJestInit(mockData);

    beforeAll(() => {
      return swapServer.listen();
    });
    afterEach(() => {
      return swapServer.resetHandlers();
    });
    afterAll(() => {
      return swapServer.close();
    });
    ```
    **2).局部使用**

    ```js
    // jest.setup.js
    import { swapJestInit } from '@tencent/swap';

    const mockData = {
      ['POST /post']: {
        post: true,
      },
    };

    swapJestInit(mockData);
    ```
    在测试文件中

    ```js
    ...
    import { swapJestListen } from "@tencent/swap";

    swapJestListen()

    describe("App.vue", () => {

      it("renders component", async () => {
        ...
      });
    });


    ```