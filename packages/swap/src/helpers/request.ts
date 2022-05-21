import axios from 'axios';
import { UnKnowObjParam } from './type';

export const request = async function (baseURL: string, url: string, params?: UnKnowObjParam): Promise<UnKnowObjParam> {
  const instance = axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: false,
    headers: { 'x-swap-jsbridge': 'true' },
  });

  const res = await instance.get(url, { params });

  return res.data;
};
