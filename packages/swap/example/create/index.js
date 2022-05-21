
import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://api.weishi.qq.com/trpc.weishi.weishi_h5_proxy.weishi_h5_proxy',
  timeout: 20000,
  withCredentials: true,
  crossDomain: true,
});

export const start = async () => {
  const res = await instance.post('/post', {
    req_body: {
      page_num: 0,
      page_size: 10,
      anchor_person_id: '1596093656739662',
    },
  });
  return res
};

start();



