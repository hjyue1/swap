## 使用 **vue-cli** 进行jest单测
```vue
// App.vue
<template>
  <div id="app">
    <div>{{ liveInfo.user }}</div>
    <div>{{ code }}</div>
    <button class="click" @click="click">+</button>
  </div>
</template>

<script>
import axios from "axios";
import { swapCallWithPromise } from "@tencent/swap";

export default {
  name: "App",
  components: {},
  data() {
    return {
      code: 0,
      liveInfo: {}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    click() {
      this.code = this.code + 1;
    },
    async fetchData() {
      const liveInfo = await this.getLiveInfo();
      this.liveInfo = liveInfo;
      const res = await axios.get(
        "https://yapi.baidu.com/mock/6333/v1/api/list"
      );
      // { data: { code: 200 } }
      this.code = +res.data.code;
    },
    getLiveInfo() {
      return swapCallWithPromise("jsbridge://weseeLive/getLiveInfo");
    }
  }
};
</script>

```

```js
// App.test.js
import Vue from "vue";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { swapJestListen, waitFor } from "@tencent/swap";

swapJestListen();

describe("App.vue", () => {
  it("renders app", async () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toMatch("0");
    const liveInfo = await wrapper.vm.getLiveInfo();
    expect(liveInfo).toEqual({ user: "rocketliu" }); // 根据mock定义的数据
    await waitFor();
    expect(wrapper.text()).toMatch("202");
  });
  it("click", async () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toMatch("0");
    await waitFor();
    await wrapper.find(".click").trigger("click");
    expect(wrapper.text()).toMatch("203");
  });
});

```