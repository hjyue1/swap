
import axios from 'axios';

export const start = async () => {
  const res = await axios.request({
    method: 'get',
    url: '/request'
  });
  return res
};




