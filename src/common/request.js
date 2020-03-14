import Taro from '@tarojs/taro';
import { baseURL } from './env';

export default function request(url, options) {
  return new Promise((resolve, reject) => {
    const newOptions = {
      headers: {
        'content-type': 'application/json'
      },
      ...options
    };
    Taro.request({
      url: `${baseURL}${url}`,
      ...newOptions,
      success: res => {
        resolve(res.data);
      },
      fail: error => {
        reject(error);
      }
    });
  });
}
