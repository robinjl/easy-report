import Taro, { Component } from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';
import Splash from './pages/splash';

import './app.less';
import { queryCurrentUser } from './common/utils';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  componentDidMount() {
    setTimeout(this.redirect, 500);
  }

  redirect() {
    queryCurrentUser()
      .then(({ id }) => {
        Taro.redirectTo({
          url: id ? '/pages/home/index' : '/pages/login/index'
        });
      })
      .catch(() => {
        Taro.redirectTo({
          url: '/pages/login/index'
        });
      });
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: [
      'pages/splash/index',
      'pages/login/index',
      'pages/index/index',
      'pages/home/index',
      'pages/reports/daily/list',
      'pages/reports/daily/create',
      'pages/reports/daily/edit',
      'pages/reports/daily/info',
      'pages/reports/weekly/list',
      // 'pages/reports/weekly/edit',
      // 'pages/reports/weekly/info',
      'pages/statistics/index',
      'pages/statistics/detail',
      'pages/my/index',
      'pages/my/settings',
      'pages/my/about'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页'
        },
        {
          pagePath: 'pages/statistics/index',
          text: '统计'
        },
        {
          pagePath: 'pages/my/index',
          text: '我的'
        }
      ]
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Splash />;
  }
}

Taro.render(<App />, document.getElementById('app'));
