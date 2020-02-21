import Taro from '@tarojs/taro';

/**
 * 存储当前人信息
 * @param data { id: 1, real_name: 'xx' }
 */
export function setCurrentUser(data) {
  Taro.setStorage({
    key: 'currentUser',
    data: data
  });
}

// 读取当前人信息
export function queryCurrentUser() {
  return Taro.getStorage({
    key: 'currentUser'
  }).then(response => response.data);
}

// 转化时间格式
export function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;
}

// 分组
export function groupBy(objectArray, property) {
  return objectArray.reduce(function(acc, obj) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;
    return acc;
  }, {});
}
