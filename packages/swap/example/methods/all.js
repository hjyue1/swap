
import axios from 'axios';
import { resolve } from 'path';

export const start = () => {
  return new Promise((resolve) => {
    axios.all([
      axios.get('/get'),
      axios.post('/post'),
    ]).then(axios.spread(function (acct, perms) {
      // 两个请求现在都执行完成
      resolve([acct, perms])
    }))
  })
  
};